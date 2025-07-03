import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      const isOnCourseEnroll = nextUrl.pathname.includes('/enroll');
      const isOnApiEnrollments = nextUrl.pathname.startsWith('/api/enrollments');
      const isOnApiCoursesEnroll = nextUrl.pathname.includes('/api/courses') && nextUrl.pathname.includes('/enroll');

      if (isOnDashboard || isOnProfile || isOnCourseEnroll || isOnApiEnrollments || isOnApiCoursesEnroll) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
}); 