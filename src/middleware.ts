import { getToken } from 'next-auth/jwt';  
import { NextResponse } from 'next/server';  
import type { NextRequest } from 'next/server';  

export const middleware = async (req: NextRequest) => {  
  const token: Record<string, unknown> | null = await getToken({ req });  

  if (token) {  
    if (req.nextUrl.pathname === '/auth/login') {  
      return NextResponse.redirect(new URL('/dashboard', req.url));  
    }  
    return NextResponse.next();  
  } else {  
    if (req.nextUrl.pathname.startsWith('/dashboard')) {  
      return NextResponse.redirect(new URL('/auth/login', req.url));  
    }  
  }  

  return NextResponse.next();  
};