import axios, { type AxiosError } from 'axios';

const authService = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
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
