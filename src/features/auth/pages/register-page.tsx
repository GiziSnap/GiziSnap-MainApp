'use client';

import { PageContainer } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import bg_img from '@/../public/bg-img1.jpg';
import { RegisterUserForm } from '../component/form/RegisterUserForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const RegisterPage = () => {
  const router = useRouter();
  return (
    <PageContainer title="Daftar - GiziSnap">
      <div className="relative flex min-h-screen w-full">
        <div className="absolute top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/80">
          <Button variant={'ghost'} onClick={() => router.push('/')}>
            <ArrowLeft size={24} />
          </Button>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src={bg_img}
            alt="GiziSnap Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10 flex w-full items-center justify-center px-4">
          <Card className="w-full max-w-md border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-4 text-center">
              <h2 className="text-2xl font-bold text-green-800">
                Daftar di GiziSnap
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Mulai Perjalanan Gizi Anda
              </p>
            </CardHeader>
            <CardContent>
              <RegisterUserForm />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-800">
                  Sudah punya akun?{' '}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-green-700 hover:underline"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};