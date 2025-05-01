import { PageContainer, SectionContainer } from '@/components/layouts';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { DashboardProductSection } from '../layouts/DashboardProductSection';
import { Sidebar } from '../component/sidebar';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const DashboardPage = () => {
  return (
    <PageContainer title="Dashboard" withFooter withHeader isDashboard>
      <SectionContainer
        padded
        container
        className="min-h-screen"
      ></SectionContainer>
    </PageContainer>
  );
};
