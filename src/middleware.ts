import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from './env';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  if (token) {
    if (pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  if (!token) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/login'],
};
