import { NextResponse } from 'next/server';
import { getDevelopers } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tech = searchParams.get('tech');
    const availability = searchParams.get('availability');
    const search = searchParams.get('q')?.toLowerCase();

    let developers = await getDevelopers();

    if (search) {
      developers = developers.filter(
        (d) =>
          d.name.toLowerCase().includes(search) ||
          d.role.toLowerCase().includes(search) ||
          d.bio.toLowerCase().includes(search) ||
          d.skills.some((s) => s.toLowerCase().includes(search))
      );
    }

    if (tech) {
      developers = developers.filter((d) =>
        d.skills.some((s) => s.toLowerCase() === tech.toLowerCase())
      );
    }

    if (availability) {
      developers = developers.filter(
        (d) => d.availability.toLowerCase() === availability.toLowerCase()
      );
    }

    return NextResponse.json({ developers, total: developers.length });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch developers' }, { status: 500 });
  }
}
