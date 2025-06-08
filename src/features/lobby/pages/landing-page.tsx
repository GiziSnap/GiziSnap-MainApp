'use client';

import { PageContainer } from '@/components/layouts';
import { FeaturesSection } from '../components/section/FeatureSection';
import { Footer } from '../components/section/Footer';
import { HeroSection } from '../components/section/HeroSection';
import { Navbar } from '../components/section/Navbar';
import { TabsSection } from '../components/section/TabsSection';

export const LandingPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <div className='pt-16'>
        <HeroSection />
        <FeaturesSection />
        <TabsSection />
        <Footer />
      </div>
    </PageContainer>
  );
};
