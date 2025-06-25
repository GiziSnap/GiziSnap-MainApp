import { getServerSession } from 'next-auth';
import { options as authOptions } from '@/auth';
export const getServerAuthSession = () => getServerSession(authOptions);
