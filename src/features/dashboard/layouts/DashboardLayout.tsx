// import { Sidebar } from '@/features/dashboard/component/sidebar/Sidebar';
import { cookies } from 'next/headers';

type DashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

import { type Metadata } from 'next';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '../components/sidebar/components/Sidebar';
import { useSession } from 'next-auth/react';

export const DashboardLayoutMetadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};

export const DashboardLayout = async ({
  children,
  className,
}: DashboardLayoutProps) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* <Sidebar /> */}
      <Sidebar />
      <main className={cn('flex w-full flex-col', className)}>{children}</main>
    </SidebarProvider>
  );
};
