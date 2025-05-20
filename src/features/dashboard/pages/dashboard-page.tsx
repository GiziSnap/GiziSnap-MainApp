'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { MainLoading } from '@/components/MainLoading';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  // Loading state
  if (status === 'loading') {
    return <MainLoading />;
  }

  // Jika tidak ada sesi (tambahan pengamanan)
  if (!session) {
    return <div>Anda belum login</div>;
  }

  return (
    <PageContainer title="Dashboard" withFooter withHeader isDashboard>
      <SectionContainer padded container className="min-h-screen">
        <div>
          <h1>Selamat Datang, {session.user.username ?? 'Pengguna'}</h1>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
