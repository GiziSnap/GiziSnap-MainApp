import { env } from '@/env';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

type User = {
  id: string;
  username: string;
  email_address: string;
  accessToken: string;
  password: string;
};

type DecodedToken = {
  user_id: string;
  username: string;
  email: string;
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
            (req?.headers?.['x-forwarded-for'] as string | undefined) ??
            'unknown';
          const userAgent: string | undefined = req.headers
            ? (req.headers['user-agent'] as string | undefined)
            : undefined;

          console.log(
            `Login attempt from IP: ${clientIP}, User Agent: ${userAgent}`,
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
            },
          );

          if (!res.ok) {
            console.error('Authentication failed', res.status, res.statusText);
            return null;
          }

          const response = (await res.json()) as {
            token?: string;
            [key: string]: unknown;
          };
          console.log('Authenticated user:', response);

          if (!response.token) {
            console.error('Token is missing in user data', response);
            return null;
          }

          let decodedToken: DecodedToken | null = null;
          if (typeof response.token === 'string') {
            decodedToken = (jwtDecode as (token: string) => DecodedToken)(
              response.token,
            );
          } else {
            console.error('Token is not a string:', response.token);
            return null;
          }
          return {
            id: decodedToken.user_id,
            username: decodedToken.username,
            email_address: decodedToken.email,
            accessToken: response.token,
          };
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
