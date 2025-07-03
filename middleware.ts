import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req: NextRequest) => {
  // Add custom middleware logic here if needed
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/course/:path*/enroll',
    '/profile/:path*',
    '/api/courses/:path*/enroll',
    '/api/enrollments/:path*',
  ],
}; 