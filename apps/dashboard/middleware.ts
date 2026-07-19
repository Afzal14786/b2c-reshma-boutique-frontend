import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Check for the refresh token (HttpOnly cookie set by backend)
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isRoot = request.nextUrl.pathname === '/';

  // 2. If no refresh token and trying to access protected route -> redirect to login
  if (!refreshToken && !isLoginPage && !isRoot) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. If refresh token exists and on login page -> redirect to dashboard
  if (refreshToken && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Root path: redirect to dashboard if authenticated, else to login
  if (isRoot) {
    return NextResponse.redirect(
      new URL(refreshToken ? '/dashboard' : '/login', request.url)
    );
  }

  return NextResponse.next();
}

// 5. Apply middleware to all dashboard routes and login/root
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/'],
};