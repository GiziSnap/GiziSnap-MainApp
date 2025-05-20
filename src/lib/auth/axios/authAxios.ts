import { env } from '@/env';
import axios from 'axios';

const authAxios = axios.create({
  baseURL: env.NEXT_PUBLIC_AUTH_BACKEND_URL,
  headers: {
    // 'Content-Type': 'application/json',
    // 'Acces-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Max-Age': '86400'
  },
});

export default authAxios;
