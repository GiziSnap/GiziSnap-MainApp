import React from 'react';
import { ArrowRight, CookingPot, ScanSearch, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Ilustration from '@/../public/Ilustration.png';
import Image from 'next/image';
import { Heading } from '@/components/ui/heading';
import { SectionContainer } from '@/components/layouts';
import AnimatedContent from '@/components/ui/animations/animated-content';
import SplitText from '@/components/ui/animations/split-text';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <div id='hero' className='mt-12 overflow-hidden'>
      <SectionContainer className='px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid items-center grid-cols-1 gap-12 md:grid-cols-2'>
          <div>
            <Heading
              variant={'default'}
              className='mb-6 text-4xl font-bold leading-tight'
            >
              <SplitText
                text='Sehatkan Hidupmu dengan GiziSnap'
                duration={1}
                ease="power3.out"
                splitType="words"
                threshold={0}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign='left'
              >

              </SplitText>
            </Heading>
            <p className='mb-8 text-xl text-pretty'>
              Dapatkan informasi gizi yang akurat dan cepat untuk makanan sehat
              Anda dengan teknologi pemindaian canggih kami. GiziSnap membantu
              Anda menjaga pola makan sehat dan seimbang dengan mudah.
            </p>

            <div className='flex space-x-4'>
              <Button className='h-12 px-6 py-6 text-white bg-green-500 hover:bg-green-600'>
                <Link href='/dashboard'>Mulai Sekarang</Link>
                <ArrowRight className='ml-2' size={20} />
              </Button>
              <Button
                variant='outline'
                className='h-12 px-6 text-green-500 border-green-500 hover:bg-green-50'
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className='grid grid-cols-3 gap-4 mt-12'>
              <div className='text-center'>
                <div className='flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-green-50'>
                  <ScanSearch className='text-green-600' size={32} />
                </div>
                <p className='text-sm text-gray-700 dark:text-white'>
                  Pemindaian Makanan
                </p>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-green-50'>
                  <Stethoscope className='text-green-600' size={32} />
                </div>
                <p className='text-sm text-gray-700 dark:text-white'>
                  Analisis Gizi
                </p>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-green-50'>
                  <CookingPot className='text-green-600' size={32} />
                </div>
                <p className='text-sm text-gray-700 dark:text-white'>
                  Rekomendasi Personal
                </p>
              </div>
            </div>
          </div>
          {/* Image/Illustration */}
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
            <div className='hidden md:block'>
              <Image
                src={Ilustration}
                alt='GiziSnap Illustration'
                className='ml-20 w-[400px] object-contain'
              />
            </div>
          </AnimatedContent>
        </div>
      </SectionContainer>
    </div>
  );
};
