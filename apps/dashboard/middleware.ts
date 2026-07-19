import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isRoot = request.nextUrl.pathname === '/';

  if (!refreshToken && !isLoginPage && !isRoot) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (refreshToken && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isRoot) {
    return NextResponse.redirect(
      new URL(refreshToken ? '/dashboard' : '/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/'],
};