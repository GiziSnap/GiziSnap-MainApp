import axios from 'axios';
import { type AxiosError } from 'axios';
import { env } from '@/env';

const axiosInstance = axios.create({
  baseURL: env.NEXT_AUTH_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(String(error)))
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('Axios Error:', {
      response: error.response?.data,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;