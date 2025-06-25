import { env } from '@/env';
import axios from 'axios';

const mlAxios = axios.create({
  baseURL: env.NEXT_PUBLIC_ML_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mlAxios;
