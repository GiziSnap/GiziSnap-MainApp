'use client';

import { SectionContainer } from '@/components/layouts';
import { FeaturesSection } from '../component/FeatureSection';
import { Footer } from '../component/Footer';
import { HeroSection } from '../component/HeroSection';
import { Navbar } from '../component/Navbar';

export const LandingPage = () => {
  return (
    <SectionContainer>
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </SectionContainer>
  );
};
