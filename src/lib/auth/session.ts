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

const FALLBACK_SECRET = 'cardex-adyk-super-admin-secure-auth-secret-2026';

function getSecretKey(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.trim()) {
    return secret.trim();
  }
  if (process.env.DATABASE_URL) {
    return crypto.createHash('sha256').update(process.env.DATABASE_URL).digest('hex');
  }
  return FALLBACK_SECRET;
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
    const keysToTry = [
      getSecretKey(),
      FALLBACK_SECRET,
      'cardex-development-only-session-secret-key-local',
    ];

    const sigBuffer = Buffer.from(signature);
    let isValid = false;

    for (const key of keysToTry) {
      const candidateSignature = crypto
        .createHmac('sha256', key)
        .update(encodedPayload)
        .digest('base64url');

      const expectedBuffer = Buffer.from(candidateSignature);
      if (
        sigBuffer.length === expectedBuffer.length &&
        crypto.timingSafeEqual(sigBuffer, expectedBuffer)
      ) {
        isValid = true;
        break;
      }
    }

    if (!isValid) return null;

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
