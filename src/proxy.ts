import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Protect Admin Area
    if (pathname === '/admin/login') {
      // If admin is already authenticated, redirect to dashboard
      const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (sessionToken && verifySessionToken(sessionToken)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return createClient(request);
    }

    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const session = sessionToken ? verifySessionToken(sessionToken) : null;

      if (!session) {
        const loginUrl = new URL('/admin/login', request.url);
        if (pathname !== '/admin') {
          loginUrl.searchParams.set('redirect', pathname);
        }
        return NextResponse.redirect(loginUrl);
      }
    }

    // Protect Admin API routes (except login)
    if (
      (pathname.startsWith('/api/admin/') && !pathname.startsWith('/api/admin/auth/login')) ||
      pathname === '/api/moderation'
    ) {
      const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const session = sessionToken ? verifySessionToken(sessionToken) : null;

      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized. Admin authentication required.' },
          { status: 401 }
        );
      }
    }

    return createClient(request);
  } catch (err) {
    console.error('Proxy execution fallback:', err);
    return NextResponse.next();
  }
}

export default proxy;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
