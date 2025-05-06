'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { FeaturesSection } from '../component/section/FeatureSection';
import { Footer } from '../component/section/Footer';
import { HeroSection } from '../component/section/HeroSection';
import { Navbar } from '../component/section/Navbar';
import { TabsSection } from '../component/section/TabsSection';

export const LandingPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TabsSection />
        <Footer />
      </div>
    </PageContainer>
  );
};
