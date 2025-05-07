
import "next-auth";
import { type JWT } from "next-auth/jwt";
import { type DefaultSession } from "next-auth";

// Extend default interfaces for type safety
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

// Extend JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
