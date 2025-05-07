import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Tambahkan logika redirect jika diperlukan
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null
    },
    pages: {
      signIn: '/auth/login'
    }
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*'
  ]
};