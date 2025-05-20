import { env } from '@/env';

export const AXIOS_AUTH = {
  baseUrl: env.NEXT_PUBLIC_AUTH_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
