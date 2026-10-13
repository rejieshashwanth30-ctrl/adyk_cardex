import { NextResponse } from 'next/server';
import { submitProject } from '@/lib/data/store';
import { SubmissionPayload } from '@/lib/types';

// Simple in-memory rate-limiter simulation per IP / User-Agent (V1 protection)
const submissionsLog = new Map<string, number[]>();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 5; // Max 5 submissions per minute

  const timestamps = submissionsLog.get(identifier) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    return true;
  }

  validTimestamps.push(now);
  submissionsLog.set(identifier, validTimestamps);
  return false;
}

// Basic sanitizer to strip unsafe HTML tags
function sanitizeString(str?: string): string {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function isValidUrl(urlString?: string): boolean {
  if (!urlString) return true; // optional
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate inputs
    const creatorName = sanitizeString(body.creatorName);
    const creatorEmail = sanitizeString(body.creatorEmail);
    const projectTitle = sanitizeString(body.projectTitle);
    const projectDescription = sanitizeString(body.projectDescription);
    const category = sanitizeString(body.category);

    if (!creatorName) {
      return NextResponse.json({ error: 'Creator Name is required.' }, { status: 400 });
    }
    if (!creatorEmail || !creatorEmail.includes('@') || !creatorEmail.includes('.')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!projectTitle) {
      return NextResponse.json({ error: 'Project Title is required.' }, { status: 400 });
    }
    if (!projectDescription || projectDescription.length < 20) {
      return NextResponse.json(
        { error: 'Project Description must be at least 20 characters.' },
        { status: 400 }
      );
    }
    if (!category) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }

    const rawTechs = Array.isArray(body.technologies)
      ? body.technologies
      : typeof body.technologies === 'string'
      ? body.technologies.split(',')
      : [];
    const technologies = rawTechs.map((t: string) => sanitizeString(t)).filter(Boolean);

    if (technologies.length === 0) {
      return NextResponse.json(
        { error: 'Please specify at least one technology.' },
        { status: 400 }
      );
    }

    // Validate external URLs if provided
    const urlsToValidate = [
      body.githubUrl,
      body.liveDemoUrl,
      body.demoVideoUrl,
      body.creatorLinkedIn,
      body.creatorWebsite,
    ];
    for (const url of urlsToValidate) {
      if (url && !isValidUrl(url)) {
        return NextResponse.json(
          { error: `Invalid URL provided: ${url}. URLs must begin with http:// or https://` },
          { status: 400 }
        );
      }
    }

    const imageUrl = sanitizeString(body.imageUrl);
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Please add a project image before submitting.' },
        { status: 400 }
      );
    }

    const payload: SubmissionPayload = {
      creatorName,
      creatorEmail,
      creatorAvatarUrl: sanitizeString(body.creatorAvatarUrl) || undefined,
      creatorWhatsApp: sanitizeString(body.creatorWhatsApp),
      allowWhatsAppContact: Boolean(body.allowWhatsAppContact),
      projectTitle,
      projectDescription,
      category,
      technologies,
      imageUrl,
      problemSolved: sanitizeString(body.problemSolved),
      howItWorks: sanitizeString(body.howItWorks),
      githubUrl: sanitizeString(body.githubUrl),
      liveDemoUrl: sanitizeString(body.liveDemoUrl),
      demoVideoUrl: sanitizeString(body.demoVideoUrl),
      creatorLinkedIn: sanitizeString(body.creatorLinkedIn),
      creatorWebsite: sanitizeString(body.creatorWebsite),
      projectStatus: body.projectStatus || 'BUILDING',
      collaborationOpen: Boolean(body.collaborationOpen),
      lookingFor: Array.isArray(body.lookingFor) ? body.lookingFor : [],
    };

    const result = await submitProject(payload);

    if (!result.success || !result.project) {
      return NextResponse.json({ error: result.error || 'Submission failed' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      submissionId: result.project.id,
      slug: result.project.slug,
      status: result.project.submissionStatus, // "PENDING"
      message:
        'Your project has been received and is currently pending review. It will not be public until approved.',
    });
  } catch (err: unknown) {
    console.error('Error submitting project:', err);
    const message = err instanceof Error ? err.message : 'Unknown server error.';
    return NextResponse.json(
      {
        error: message.includes('DATABASE_URL')
          ? 'Database connection issue. Please verify DATABASE_URL configuration.'
          : `Server error processing submission: ${message}`,
      },
      { status: 500 }
    );
  }
}
