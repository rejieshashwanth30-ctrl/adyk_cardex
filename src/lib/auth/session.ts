import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'cardex_admin_session';
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface SessionPayload {
  adminId: string;
  email: string;
  role: string;
  issuedAt: number;
  expiresAt: number;
}

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.DATABASE_URL ||
    'adyk-cardex-super-secure-production-secret-token-key-2026'
  );
}

/**
 * Sign session payload using HMAC-SHA256
 */
export function createSessionToken(adminId: string, email: string, role: string): string {
  const now = Date.now();
  const payload: SessionPayload = {
    adminId,
    email,
    role,
    issuedAt: now,
    expiresAt: now + SESSION_DURATION_SECONDS * 1000,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify and parse session token (Edge/Proxy safe, no database or bcrypt dependency)
 */
export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || !token.includes('.')) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', getSecretKey())
      .update(encodedPayload)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;

    const json = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const payload: SessionPayload = JSON.parse(json);

    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
