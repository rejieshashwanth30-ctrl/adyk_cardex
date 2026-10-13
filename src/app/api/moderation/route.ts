import { NextResponse } from 'next/server';
import { getAllProjectsAdmin, reviewProjectSubmission, getAdminStats } from '@/lib/data/store';
import { verifyAdminSessionFromRequest } from '@/lib/auth/adminAuth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminSessionFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const allProjects = await getAllProjectsAdmin();
    const stats = await getAdminStats();

    return NextResponse.json({
      projects: allProjects,
      stats,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load projects for moderation' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verify authentication
    const admin = await verifyAdminSessionFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { id, decision, adminNotes } = body;

    // 2. Validate action
    if (!id || (decision !== 'APPROVED' && decision !== 'DECLINED')) {
      return NextResponse.json(
        { error: 'Valid project ID and decision (APPROVED or DECLINED) are required.' },
        { status: 400 }
      );
    }

    // 3. Process update with admin audit info
    const auditNotes = adminNotes?.trim()
      ? adminNotes.trim()
      : `Reviewed by ${admin.name} (${admin.email}) at ${new Date().toISOString()}`;

    const updated = await reviewProjectSubmission(id, decision, auditNotes, admin.id);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      project: updated,
      message: `Project status successfully updated to ${decision}.`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update project status' }, { status: 500 });
  }
}
