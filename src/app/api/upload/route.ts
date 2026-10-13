import { NextResponse } from 'next/server';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

// Maximum allowed upload size: 10 MB (generously accommodates phone camera uploads)
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// Permitted MIME types (including variations reported by different mobile and desktop browsers)
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/jfif',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

// In-memory rate limiting: 60 uploads per minute per IP (relaxed in development)
const uploadRateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return false; // Never rate limit in development or local Wi-Fi testing
  }

  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxUploads = 60;

  const timestamps = (uploadRateMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxUploads) {
    return true;
  }
  timestamps.push(now);
  uploadRateMap.set(ip, timestamps);
  return false;
}

/**
 * Verify actual binary magic bytes to guarantee file matches genuine image formats
 */
function verifyMagicBytes(buffer: Buffer, claimedMime: string): boolean {
  if (buffer.length < 8) return false;

  const mime = claimedMime.toLowerCase();

  // JPEG / JPG / PJPEG starts with FF D8
  if (mime.includes('jpeg') || mime.includes('jpg') || mime.includes('jfif')) {
    return buffer[0] === 0xff && buffer[1] === 0xd8;
  }

  // PNG starts with 89 50 4E 47
  if (mime.includes('png')) {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // WebP has RIFF at 0..3 and WEBP at 8..11
  if (mime.includes('webp')) {
    const riff = buffer.subarray(0, 4).toString('ascii');
    const webp = buffer.subarray(8, 12).toString('ascii');
    return riff === 'RIFF' && webp === 'WEBP';
  }

  // GIF starts with GIF87a or GIF89a
  if (mime.includes('gif')) {
    const header = buffer.subarray(0, 6).toString('ascii');
    return header === 'GIF87a' || header === 'GIF89a';
  }

  // AVIF contains ftyp box
  if (mime.includes('avif')) {
    const header = buffer.subarray(4, 16).toString('ascii');
    return header.includes('ftyp');
  }

  // SVG contains XML or SVG tag
  if (mime.includes('svg')) {
    const snippet = buffer.subarray(0, 512).toString('utf8');
    return snippet.includes('<svg') || snippet.includes('<?xml');
  }

  // Fallback signature check for unknown MIME headers
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return true;
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF') return true;

  return false;
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ADYK CARDEX Image Upload' });
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'local-client';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Upload rate limit exceeded. Please wait a minute before uploading again.' },
        { status: 429 }
      );
    }

    // Check Content-Length upfront to reject oversized uploads before stream truncation
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `Image file exceeds maximum allowed size of 10 MB (Current size: ${(contentLength / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    const formData = await request.formData().catch((formErr) => {
      console.error('Multipart form parsing failed:', formErr);
      return null;
    });

    if (!formData) {
      return NextResponse.json(
        { error: 'Invalid form submission or payload exceeds allowed limit (Max 10 MB).' },
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

    // 1. Validate File Size (Max 10 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `Image file exceeds maximum allowed size of 10 MB (Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
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

    // 2. Normalize and validate MIME type (with extension fallback for phone file pickers)
    let mimeType = (file.type || '').toLowerCase().trim();
    const originalExt = path.extname(file.name || '').toLowerCase();

    if (!mimeType || mimeType === 'application/octet-stream') {
      if (originalExt === '.jpg' || originalExt === '.jpeg' || originalExt === '.jfif') {
        mimeType = 'image/jpeg';
      } else if (originalExt === '.png') {
        mimeType = 'image/png';
      } else if (originalExt === '.webp') {
        mimeType = 'image/webp';
      } else if (originalExt === '.gif') {
        mimeType = 'image/gif';
      } else if (originalExt === '.avif') {
        mimeType = 'image/avif';
      } else if (originalExt === '.svg') {
        mimeType = 'image/svg+xml';
      }
    }

    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          error: 'Unsupported file format. Please upload a JPG, PNG, WebP, GIF, or AVIF image.',
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
            'File integrity validation failed. Uploaded content does not match genuine image data.',
        },
        { status: 400 }
      );
    }

    // 4. Generate collision-resistant sanitized filename
    const extensionMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/pjpeg': 'jpg',
      'image/jfif': 'jpg',
      'image/png': 'png',
      'image/x-png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/avif': 'avif',
      'image/svg+xml': 'svg',
    };
    const extension = extensionMap[mimeType] || originalExt.replace('.', '') || 'jpg';
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
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, safeFilename);
        await fs.promises.writeFile(filePath, buffer);
        publicUrl = `/uploads/projects/${safeFilename}`;
      } catch (fsErr) {
        console.warn('Local filesystem write failed, falling back to data URL:', fsErr);
        // Resilient fallback: base64 data URL ensures submission never fails
        publicUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      }
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
