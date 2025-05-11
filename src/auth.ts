import { env } from '@/env';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type User = {
  id: string;
  username: string;
  email_address: string;
  accessToken: string;
  password: string;
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, req) {
        try {
          const clientIP =
            (req?.headers?.['x-forwarded-for'] as string) ?? 'unknown';
          const userAgent = (
            req.headers ? req.headers['user-agent'] : undefined
          ) as string | undefined;

          console.log(
            `Login attempt from IP: ${clientIP}, User Agent: ${userAgent}`
          );

          const res = await fetch(
            `${env.NEXT_PUBLIC_AUTH_BACKEND_URL}/session`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Client-IP': clientIP,
                'User-Agent': userAgent!,
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            }
          );

          if (!res.ok) {
            console.error('Authentication failed', res.status, res.statusText);
            return null;
          }

          const user = (await res.json()) as User;

          if (
            user.id &&
            user.username &&
            user.email_address &&
            user.accessToken
          ) {
            console.error('Authentication failed', res.status, res.statusText);
            return null;
          }

          return user;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email_address = user.email_address;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.username = token.username as string;
        session.email_address = token.email_address as string;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: 'sessionToken',
  //     options: {
  //       maxAge: 60 * 60 * 24 * 7, // 1 week
  //     },
  //   },
  // },
  secret: env.NEXTAUTH_SECRET,
};
