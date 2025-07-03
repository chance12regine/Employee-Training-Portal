import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      department?: string;
      position?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    department?: string;
    position?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    department?: string;
    position?: string;
  }
} 