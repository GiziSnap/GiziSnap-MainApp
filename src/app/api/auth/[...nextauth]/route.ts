import NextAuth, { type AuthOptions, type User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { type AxiosResponse } from "axios";
import type { NextApiHandler } from "next";

// Definisikan tipe untuk response backend
interface BackendLoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
}

// Extend tipe User default NextAuth
interface CustomUser extends NextAuthUser {
  id: string;
  name?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "text",
          placeholder: "user@email.com"
        },
        password: { 
          label: "Password", 
          type: "password" 
        }
      },
      async authorize(credentials) {
        // Validasi input credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Definisi tipe eksplisit untuk response
          const response: AxiosResponse<BackendLoginResponse> = await axios.post(
            `${process.env.NEXTAUTH_URL}/session`, 
            {
              email_address: credentials.email,
              password: credentials.password
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true
            }
          );

          console.log('Authentication Response:', response.data);

          const { success, token, user } = response.data;

          // Tipe guard untuk memastikan keberhasilan login
          if (success && token) {
            return {
              id: user.id || token,
              email: user.email,
              name: user.name
            } as CustomUser;
          }
          
          return null;
        } catch (error) {
          // Tipe guard untuk error axios
          if (axios.isAxiosError(error)) {
            console.error("Authentication error:", {
              responseData: error.response?.data as Record<string, unknown>,
              responseStatus: error.response?.status,
              message: error.message
            });
          } else {
            console.error("Unexpected error:", error);
          }
          return null;
        }
      }
    })
  ],
  callbacks: {
    // Gunakan generics untuk type safety
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Override tipe default user
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name as string | undefined;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };