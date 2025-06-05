import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { NextFetchEvent } from 'next/server';

type MiddlewareParams = {
  req: NextRequest;
  event: NextFetchEvent;
};

export const middleware = async (req: NextRequest) => {
  const token: Record<string, unknown> | null = await getToken({ req });

  // Jika token tersedia, pengguna sudah dilogin
  if (token) {
    // Arahkan pengguna ke dashboard jika mencoba mengakses halaman login
    if (req.nextUrl.pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else {
    // Jika tidak ada token, pastikan pengguna diarahkan ke halaman login
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
};
