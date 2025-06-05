'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex h-screen flex-col items-center justify-center text-center'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mt-4 text-lg'>
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => typeof window !== 'undefined' && router.back()}
        className='mt-6 rounded bg-blue-500 px-4 py-2 text-white'
      >
        Go Back
      </button>
      <Link href='/' className='mt-2 text-blue-500 underline'>
        Go to Home
      </Link>
    </div>
  );
}
