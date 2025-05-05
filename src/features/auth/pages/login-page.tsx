'use client';

import { PageContainer } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import Medical_Illustration from '@/../public/Ilustration1.png';
import { LoginUserForm } from '../component/form/LoginUserForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const LoginPage = () => {
  return (
    <PageContainer title="Login - GiziSnap">
      <div className="flex min-h-screen flex-row-reverse">
        <div className="relative flex w-1/2 items-center justify-center bg-green-50 p-12">
          <div className="absolute top-12 z-10 text-center">
            <h1 className="mb-4 text-3xl font-bold text-green-900">
              Pantau Gizi Anda dengan Mudah
            </h1>
            <p className="mx-auto max-w-md text-lg text-green-700">
              GiziSnap membantu Anda memahami dan mengelola asupan nutrisi
              secara akurat dan sederhana
            </p>
          </div>
          <Image
            src={Medical_Illustration}
            width={500}
            height={500}
            alt="GiziSnap Ilustrasi"
            className="relative z-0 max-h-[600px] max-w-full object-contain"
          />
        </div>

        <div className="flex w-1/2 items-center justify-center p-12">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="pb-4 text-center">
              <h2 className="text-2xl font-bold text-green-800">
                Daftar di GiziSnap
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Mulai Perjalanan Gizi Anda
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
