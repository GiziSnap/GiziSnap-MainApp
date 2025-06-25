import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET: z.string(),
    NEXT_AUTH_BACKEND_URL: z.string().url(),
    VAPID_PRIVATE_KEY: z.string(),
    // GITHUB_SECRET: z.string(),
    // GITHUB_ID: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_AUTH_BACKEND_URL: z.string(),
    NEXT_PUBLIC_ML_API_URL: z.string(),
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_AUTH_BACKEND_URL: process.env.NEXT_AUTH_BACKEND_URL,
    // GITHUB_SECRET: process.env.GITHUB_SECRET,
    // GITHUB_ID: process.env.GITHUB_ID,
    NEXT_PUBLIC_AUTH_BACKEND_URL: process.env.NEXT_PUBLIC_AUTH_BACKEND_URL,
    NEXT_PUBLIC_ML_API_URL: process.env.NEXT_PUBLIC_ML_API_URL,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  onValidationError: (error) => {
    console.error('Environment variable validation error:', error);
    throw new Error('Invalid environment variables');
  },
  // skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
