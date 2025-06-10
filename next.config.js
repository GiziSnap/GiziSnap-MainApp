/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';
import { env } from './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
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
            value: env.NEXT_PUBLIC_APP_URL,
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
        source: '/sw.js',
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

  // async rewrites() {
  //     return [
  //         {
  //             source: '/api/registers',
  //             destination: `${env.NEXT_AUTH_BACKEND_URL}/registers`
  //         },
  //         {
  //             source: '/api/session',
  //             destination: `${env.NEXT_AUTH_BACKEND_URL}/session`
  //         }
  //     ]
  // },

  // Webpack konfigurasi tambahan
  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //         config.resolve.fallback = {
  //             ...config.resolve.fallback,
  //             fs: false
  //         };
  //     }
  //     return config;
  // }
};

export default config;
