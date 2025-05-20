import axios, { type AxiosError } from 'axios';
import { env } from '@/env';

const authService = axios.create({
  baseURL: env.NEXT_AUTH_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

authService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const errorMessage =
        (error.response.data as { message?: string })?.message ??
        'terjadi kesalahan';
      console.log(errorMessage);
    } else if (error.request) {
      throw new Error('Tidak dapat terhubung ke server');
    } else {
      throw new Error('Kesalahan jaringan');
    }
  }
);

export default authService;
