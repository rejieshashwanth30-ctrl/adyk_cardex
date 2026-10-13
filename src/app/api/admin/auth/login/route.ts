import { NextResponse } from 'next/server';
import { authenticateAdmin, getAdminCookieOptions } from '@/lib/auth/adminAuth';

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown-client';

    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Invalid admin credentials.' },
        { status: 400 }
      );
    }

    const result = await authenticateAdmin(email, password, ip);

    if (!result.success || !result.token) {
      return NextResponse.json(
        { error: result.error || 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      admin: result.admin,
      message: 'Admin access authorized.',
    });

    const cookieOptions = getAdminCookieOptions();
    response.cookies.set(cookieOptions.name, result.token, cookieOptions);

    return response;
  } catch (err) {
    console.error('Error during admin login:', err);
    return NextResponse.json(
      { error: 'Invalid admin credentials.' },
      { status: 500 }
    );
  }
}
