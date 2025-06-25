'use client';

import { useUserData } from '@/features/dashboard/utils/useUserData';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const { userInfo } = useUserData();

  const userName = userInfo?.username ?? 'Guest';

  if (status === 'loading') {
    return (
      <nav className='flex h-8 items-center gap-5'>
        <div className='h-5 w-24 animate-pulse rounded-md bg-gray-300'></div>
        <div className='h-5 w-16 animate-pulse rounded-md bg-gray-300'></div>
        <div className='h-5 w-20 animate-pulse rounded-md bg-gray-300'></div>
      </nav>
    );
  }

  return (
    <nav className='flex items-center gap-5'>
      <Link href='/dashboard'>Dashboard</Link>

      {status === 'authenticated' ? (
        <>
          {userName && (
            <span className='text-sm font-medium'>Hi, {userName}</span>
          )}

          <button
            onClick={() => signOut()}
            className='rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600'
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href='/auth/login'>Login</Link>
          <Link href='/auth/register'>Register</Link>
        </>
      )}
    </nav>
  );
};
