'use client';

import { PageContainer } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import bg_img1 from '@/../public/bg-img1.jpg';
import { LoginUserForm } from '../component/form/LoginUserForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AnimatedContent from '@/components/ui/animations/animated-content';

export const LoginPage = () => {
  const router = useRouter();

  return (
    <PageContainer title='Login - GiziSnap'>
      <div className='relative flex min-h-screen w-full'>
        <div
          className='absolute top-4 left-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/65 transition-all hover:bg-white/80'
          onClick={() => router.push('/')}
        >
          <ArrowLeft size={19} />
        </div>
        <div className='absolute inset-0 z-0'>
          <Image
            src={bg_img1}
            alt='GiziSnap Background'
            quality={100}
            className='h-full w-full object-cover'
          />
        </div>

        <div className='z-10 flex w-full items-center justify-center px-4'>
          <AnimatedContent
            distance={100}
            direction='horizontal'
            reverse={false}
            duration={1}
            ease='power3.out'
            initialOpacity={0}
            scale={1}
            threshold={0.1}
          >
            <Card className='w-full border-0 bg-white/80 shadow-2xl backdrop-blur-sm md:max-w-md lg:min-w-[450px]'>
              <CardHeader className='pb-4 text-center'>
                <h2 className='text-2xl font-bold text-green-800'>
                  Masuk ke GiziSnap
                </h2>
                <p className='mt-2 text-sm text-gray-600'>
                  Lanjutkan Perjalanan Gizi Anda
                </p>
              </CardHeader>
              <CardContent>
                {/* User Login Form */}
                <LoginUserForm />
                <div className='mt-4 text-center'>
                  <p className='text-sm text-gray-700'>
                    Belum punya akun?{' '}
                    <Link
                      href='/auth/register'
                      className='font-semibold text-green-600 hover:underline'
                    >
                      Daftar di sini
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedContent>
        </div>
      </div>
    </PageContainer>
  );
};
