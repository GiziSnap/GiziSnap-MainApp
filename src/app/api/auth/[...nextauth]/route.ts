import { options } from '@/auth';
import NextAuth from 'next-auth';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(options);

export { handler as GET, handler as POST };
