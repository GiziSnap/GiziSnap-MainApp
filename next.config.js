/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from './src/env.js';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import withSerwist from '@serwist/next';

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const configBuilder = async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    images: {
      domains: ['github.com', 'dummyimage.com'],
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: env.NEXT_PUBLIC_APP_URL ?? '*',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,POST,PUT,DELETE,OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type, Authorization, X-Requested-With',
            },
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
          ]
        },
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
          ],
        },
        {
          source: '/sw.ts',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/javascript; charset=utf-8',
            },
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate',
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self'",
            },
          ],
        }
      ];
    },
    async rewrites() {
      return [
        {
          source: '/auth/login',
          destination: '/auth/login',
        },
      ];
    },
  };

  // Menambahkan konfigurasi Serwist jika dalam mode bukan pengembangan  
  if (phase === PHASE_PRODUCTION_BUILD || (phase === PHASE_DEVELOPMENT_SERVER && process.env.DISABLE_SERWIST !== "true")) {
    return withSerwist({
      swSrc: 'public/sw.ts',
      swDest: 'public/sw.js',
      reloadOnOnline: true,
    })(nextConfig);
  }

  return nextConfig;
};

export default configBuilder;