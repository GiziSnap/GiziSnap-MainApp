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
      <div className='relative flex w-full min-h-screen'>
        <div
          className='absolute z-50 flex items-center justify-center w-10 h-10 transition-all rounded-full cursor-pointer top-4 left-4 bg-white/65 hover:bg-white/80'
          onClick={() => router.push('/')}
        >
          <ArrowLeft size={19} />
        </div>
        <div className='absolute inset-0 z-0'>
          <Image
            src={bg_img1}
            alt='GiziSnap Background'
            quality={100}
            className='object-cover w-full h-full'
          />
        </div>

        <div className='z-10 flex items-center justify-center w-full px-4'>
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            scale={1}
            threshold={0.1}
          >
            <Card className='w-full md:max-w-md lg:min-w-[450px] border-0 shadow-2xl bg-white/80 backdrop-blur-sm'>
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
