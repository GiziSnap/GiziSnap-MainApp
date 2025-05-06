import React from 'react';
import { ArrowRight, CookingPot, ScanSearch, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Ilustration from '@/../public/Ilustration.png';
import Image from 'next/image';
import { Heading } from '@/components/ui/heading';
import { SectionContainer } from '@/components/layouts';

export const HeroSection = () => {
  return (
    <div id="hero" className="mt-12 overflow-hidden">
      <SectionContainer className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <Heading
              variant={'default'}
              className="mb-6 text-4xl leading-tight font-bold"
            >
              Sehatkan Hidupmu dengan GiziSnap
            </Heading>
            <p className="mb-8 text-xl text-pretty">
              Dapatkan informasi gizi yang akurat dan cepat untuk makanan sehat
              Anda dengan teknologi pemindaian canggih kami. GiziSnap membantu
              Anda menjaga pola makan sehat dan seimbang dengan mudah.
            </p>

            <div className="flex space-x-4">
              <Button className="h-12 bg-green-500 px-6 py-6 text-white hover:bg-green-600">
                Mulai Sekarang
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                variant="outline"
                className="h-12 border-green-500 px-6 text-green-500 hover:bg-green-50"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <ScanSearch className="text-green-600" size={32} />
                </div>
                <p className="text-sm text-gray-700 dark:text-white">
                  Pemindaian Makanan
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <Stethoscope className="text-green-600" size={32} />
                </div>
                <p className="text-sm text-gray-700 dark:text-white">
                  Analisis Gizi
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <CookingPot className="text-green-600" size={32} />
                </div>
                <p className="text-sm text-gray-700 dark:text-white">
                  Rekomendasi Personal
                </p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="hidden md:block">
            <Image
              src={Ilustration}
              alt="GiziSnap Illustration"
              className="ml-20 w-[400px] object-contain"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
