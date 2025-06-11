import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import icon from '@/../public/icon512_rounded.png';
import { Loader2 } from 'lucide-react';

const Preload = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const [isMounted, setIsMounted] = useState(false);
  const curtainRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    setIsMounted(true); // Set state saat komponen dimuat  

    if (curtainRef.current && loaderRef.current) {
      const tl = gsap.timeline();

      // Animasi tirai  
      tl.to(curtainRef.current, {
        scaleY: 1,
        transformOrigin: 'top',
        duration: 1,
        ease: 'back.out(1.7)',
      })
        .to(loaderRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.5')
        .to(loaderRef.current, {
          scale: 1.2,
          duration: 1,
          ease: 'ease-in-out',
        })
        .to(loaderRef.current, {
          scale: 1,
          duration: 1,
          ease: 'ease-in-out',
        })
        .to(curtainRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1,
          delay: 1,
          ease: 'back.in(1.7)',
        });
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='relative flex h-screen items-center justify-center overflow-hidden'>
      <div
        ref={curtainRef}
        className='absolute top-0 left-0 w-full h-full bg-white scale-y-0 transform origin-top'
      ></div>
      <div
        ref={loaderRef}
        className='flex flex-col items-center justify-center text-center opacity-0'
      >
        <Image src={icon} alt='Icon' width={128} height={128} className='mb-4' />
        <h1 className='text-4xl font-bold '>Sedang Memuat...</h1>
        <p className='text-lg  mt-2'>Harap tunggu sebentar.</p>
        <div className='mt-4'>
          <Loader2
            className='animate-spin text-primary'
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Preload;