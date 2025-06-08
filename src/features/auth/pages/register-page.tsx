'use client';

import { PageContainer } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import bg_img from '@/../public/bg-img1.jpg';
import { RegisterUserForm } from '../component/form/RegisterUserForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import AnimatedContent from '@/components/ui/animations/animated-content';

export const RegisterPage = () => {
  const router = useRouter();
  return (
    <PageContainer title='Daftar - GiziSnap'>
      <div className='relative flex w-full min-h-screen'>
        <div
          className='absolute z-50 flex items-center justify-center w-10 h-10 transition-all rounded-full cursor-pointer top-4 left-4 bg-white/65 hover:bg-white/80'
          onClick={() => router.push('/')}
        >
          <ArrowLeft size={19} />
        </div>
        <div className='absolute inset-0 z-0'>
          <Image
            src={bg_img}
            alt='GiziSnap Background'
            quality={100}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='relative z-10 flex items-center justify-center w-full px-4'>
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={true}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            scale={1}
            threshold={0.1}
          >
            <Card className='w-full md:max-w-md lg:min-w-[450px] border-0 shadow-2xl bg-white/80 backdrop-blur-sm'>
              <CardHeader className='pb-4 text-center'>
                <h2 className='text-2xl font-bold text-green-800'>
                  Daftar di GiziSnap
                </h2>
                <p className='mt-2 text-sm text-gray-700'>
                  Mulai Perjalanan Gizi Anda
                </p>
              </CardHeader>
              <CardContent>
                <RegisterUserForm />
                <div className='mt-4 text-center'>
                  <p className='text-sm text-gray-800'>
                    Sudah punya akun?{' '}
                    <Link
                      href='/auth/login'
                      className='font-semibold text-green-700 hover:underline'
                    >
                      Masuk di sini
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
