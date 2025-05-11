import 'next-auth';
import { type DefaultSession } from 'next-auth';

// Extend default interfaces for type safety
declare module 'next-auth' {
  interface User {
    id: string;
    username?: string | null;
    email_address?: string | null;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      username?: string | null;
      email_address?: string | null;
    } & DefaultSession['user'];
    accessToken?: string;
    id: string;
    username: string;
    email_address: string;
  }
}

// Extend JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
