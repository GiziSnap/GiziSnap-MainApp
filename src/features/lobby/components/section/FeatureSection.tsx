import React from 'react';
import { Camera, BarChart2, Star } from 'lucide-react';
import FeatureCard from '../card/FeatureCard';
import { SectionContainer } from '@/components/layouts';
import BlurText from '@/components/ui/animations/blur-text';
import RotatingText from '@/components/ui/animations/rotating-text';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: 'Pindai Makanan',
      description:
        'Dapatkan informasi gizi instan dengan memindai makanan Anda.',
    },
    {
      icon: BarChart2,
      title: 'Analisis Gizi',
      description:
        'Lacak asupan gizi dan dapatkan wawasan kesehatan komprehensif.',
    },
    {
      icon: Star,
      title: 'Rekomendasi Personal',
      description:
        'Terima saran makanan sehat yang disesuaikan dengan kebutuhan individu Anda.',
    },
  ];

  return (
    <SectionContainer id='features' className='bg-gray-50 py-16 dark:bg-black'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 flex items-center justify-center text-2xl font-bold'>
            <div className='flex w-fit flex-col items-center justify-center gap-2 lg:flex-row'>
              Fitur Unggulan GiziSnap
              <RotatingText
                className='mx-auto flex w-fit items-center justify-center gap-2 rounded-lg bg-green-300/70 px-2 py-0.5' // Set max-width and use margin auto for centering
                texts={[
                  'Pindai Makanan',
                  'Analisis Gizi',
                  'Rekomendasi Personal',
                ]}
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden pb-0.5'
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </h2>
          <div className='flex justify-center text-justify text-xl'>
            <BlurText
              text='Temukan cara baru untuk menjaga kesehatan Anda dengan teknologi pemindaian makanan kami yang inovatif.'
              delay={100}
              animateBy='words'
              direction='top'
              className='text-muted-foreground'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
