import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  try {
    if (!NEXTAUTH_SECRET) {
      console.error(
        'NEXTAUTH_SECRET is not defined. Middleware cannot function securely.',
      );
      return NextResponse.next();
    }

    const token = await getToken({ req, secret: NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const isLoggedIn = !!token;

    const isProtectedRoute =
      pathname.startsWith('/dashboard') || pathname.startsWith('/profile');

    const isAuthRoute =
      pathname.startsWith('/auth/login') ||
      pathname.startsWith('/auth/register');

    if (isLoggedIn && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!isLoggedIn && isProtectedRoute) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('error', 'middleware_error');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Mencocokkan semua path request kecuali yang dimulai dengan:
     * - api (rute API)
     * - _next/static (file statis)
     * - _next/image (file optimasi gambar)
     * - favicon.ico (file favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
