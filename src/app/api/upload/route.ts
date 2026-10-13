import { NextResponse } from 'next/server';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

// Maximum allowed upload size: 5 MB
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

// In-memory rate limiting: 10 uploads per minute per IP
const uploadRateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxUploads = 10;

  const timestamps = (uploadRateMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxUploads) {
    return true;
  }
  timestamps.push(now);
  uploadRateMap.set(ip, timestamps);
  return false;
}

/**
 * Verify actual binary magic bytes to guarantee file matches claimed image format
 */
function verifyMagicBytes(buffer: Buffer, claimedMime: string): boolean {
  if (buffer.length < 12) return false;

  if (claimedMime === 'image/jpeg') {
    // JPEG starts with FF D8 FF
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (claimedMime === 'image/png') {
    // PNG starts with 89 50 4E 47
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  if (claimedMime === 'image/webp') {
    // WebP has RIFF at 0..3 and WEBP at 8..11
    const riff = buffer.subarray(0, 4).toString('ascii');
    const webp = buffer.subarray(8, 12).toString('ascii');
    return riff === 'RIFF' && webp === 'WEBP';
  }

  return false;
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ADYK CARDEX Image Upload' });
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Upload rate limit exceeded. Please wait a minute before uploading again.' },
        { status: 429 }
      );
    }

    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { error: 'Invalid form submission. Multipart form-data is required.' },
        { status: 400 }
      );
    }

    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Please select an image file to upload.' },
        { status: 400 }
      );
    }

    // 1. Validate File Size (Max 5 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `Image file exceeds maximum allowed size of 5 MB (Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: 'The selected file is empty.' },
        { status: 400 }
      );
    }

    // 2. Validate MIME type
    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          error: 'Unsupported file format. Only JPG, PNG, and WebP images are permitted.',
        },
        { status: 400 }
      );
    }

    // 3. Read buffer and verify binary magic bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!verifyMagicBytes(buffer, mimeType)) {
      return NextResponse.json(
        {
          error:
            'File integrity validation failed. Uploaded content does not match genuine JPEG, PNG, or WebP binary data.',
        },
        { status: 400 }
      );
    }

    // 4. Generate collision-resistant sanitized filename
    const extensionMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };
    const extension = extensionMap[mimeType] || 'webp';
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const safeFilename = `cardex-project-${Date.now()}-${uniqueId}.${extension}`;

    // 5. Store File (Vercel Blob in Production or local filesystem fallback)
    let publicUrl = '';

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import('@vercel/blob');
        const blob = await put(`projects/${safeFilename}`, buffer, {
          access: 'public',
          contentType: mimeType,
        });
        publicUrl = blob.url;
      } catch (blobErr) {
        console.error('Vercel Blob upload failed, falling back to local storage:', blobErr);
      }
    }

    // Fallback to local public uploads if Vercel Blob is not configured
    if (!publicUrl) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, safeFilename);
      await fs.promises.writeFile(filePath, buffer);
      publicUrl = `/uploads/projects/${safeFilename}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: file.name,
      size: file.size,
      mimeType,
      message: 'Project image uploaded successfully.',
    });
  } catch (err) {
    console.error('Image upload server error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred during image upload.' },
      { status: 500 }
    );
  }
}
