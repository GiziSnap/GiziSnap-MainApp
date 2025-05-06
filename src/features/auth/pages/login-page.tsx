'use client';

import { PageContainer } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import bg_img1 from '@/../public/bg-img1.jpg';
import { LoginUserForm } from '../component/form/LoginUserForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const LoginPage = () => {
  const router = useRouter();
  return (
    <PageContainer title="Login - GiziSnap">
      <div className="relative flex min-h-screen w-full">
        <div className="absolute top-4 left-4 z-50 flex items-center justify-center rounded-full bg-white/80 ">
          <Button
            variant={'outline'}
            onClick={() => router.push('/')}
            className="flex h-12 w-12 items-center justify-center rounded-full"
          >
            <ArrowLeft size={24} />
          </Button>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src={bg_img1}
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
                Masuk ke GiziSnap
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Lanjutkan Perjalanan Gizi Anda
              </p>
            </CardHeader>
            <CardContent>
              <LoginUserForm />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700">
                  Belum punya akun?{' '}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-green-600 hover:underline"
                  >
                    Daftar di sini
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
