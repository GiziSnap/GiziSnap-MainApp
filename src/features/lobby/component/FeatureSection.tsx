import React from 'react';
import { Camera, BarChart2, Star } from 'lucide-react';
import FeatureCard from './card/FeatureCard';

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
    <section id="features" className="bg-gray-50 py-16 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Fitur Unggulan GiziSnap</h2>
          <p className="text-xl">
            Temukan cara baru untuk menjaga kesehatan Anda dengan teknologi
            pemindaian makanan kami yang inovatif.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
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
    </section>
  );
};
