import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getAllProjectsAdmin,
  reviewProjectSubmission,
  updateProjectAdmin,
  deleteProjectAdmin,
  getAdminStats,
} from '@/lib/data/store';
import { verifyAdminSessionFromRequest } from '@/lib/auth/adminAuth';

function revalidateProjectCaches(slug?: string) {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/explore');
    revalidatePath('/collaboration');
    revalidatePath('/developers');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/admin/projects/pending');
    revalidatePath('/admin/projects/approved');
    revalidatePath('/admin/projects/declined');
    if (slug) {
      revalidatePath(`/projects/${slug}`);
      revalidatePath('/projects/[slug]', 'page');
    }
  } catch (err) {
    console.warn('Cache revalidation notice:', err);
  }
}

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

    // Purge and revalidate public and admin route caches
    revalidateProjectCaches(updated.slug);

    return NextResponse.json({
      success: true,
      project: updated,
      message: `Project status successfully updated to ${decision}.`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update project status' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await verifyAdminSessionFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { id, updates } = body;

    if (!id || !updates || typeof updates !== 'object') {
      return NextResponse.json(
        { error: 'Valid project ID and update fields are required.' },
        { status: 400 }
      );
    }

    const updated = await updateProjectAdmin(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    revalidateProjectCaches(updated.slug);

    return NextResponse.json({
      success: true,
      project: updated,
      message: 'Project successfully updated in PostgreSQL database.',
    });
  } catch (err) {
    console.error('PATCH /api/moderation error:', err);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return PATCH(request);
}

export async function DELETE(request: Request) {
  try {
    const admin = await verifyAdminSessionFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const body = await request.json().catch(() => ({}));
    const id = body.id || searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required for deletion.' },
        { status: 400 }
      );
    }

    const deleted = await deleteProjectAdmin(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    revalidateProjectCaches(deleted.slug);

    return NextResponse.json({
      success: true,
      deletedId: id,
      message: 'Project successfully deleted from PostgreSQL database.',
    });
  } catch (err) {
    console.error('DELETE /api/moderation error:', err);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
