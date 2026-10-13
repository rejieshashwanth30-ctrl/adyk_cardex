import { NextResponse } from 'next/server';
import { getApprovedProjects } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tech = searchParams.get('tech');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('q')?.toLowerCase();
    const collaborateOnly = searchParams.get('collaborate') === 'true';

    let projects = await getApprovedProjects();

    if (search) {
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.technologies.some((t) => t.toLowerCase().includes(search)) ||
          p.creatorName.toLowerCase().includes(search)
      );
    }

    if (tech) {
      projects = projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())
      );
    }

    if (category) {
      projects = projects.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (status) {
      projects = projects.filter((p) => p.status.toLowerCase() === status.toLowerCase());
    }

    if (collaborateOnly) {
      projects = projects.filter((p) => p.collaborationOpen);
    }

    return NextResponse.json({ projects, total: projects.length });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
