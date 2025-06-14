'use client';
import { PageContainer, SectionContainer } from '@/components/layouts';
import { MainLoading } from '@/components/MainLoading';
import { Heading } from '@/components/ui/heading';
import { useUserData } from '@/features/dashboard/utils/useUserData';
import { useEffect, use, useState } from 'react';
import { UpdateUserForm } from '../component/form/UpdateUserForm';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type SettingPageProps = {
  params: Promise<{ id: string }>;
};

// State machine untuk status verifikasi yang lebih andal
type VerificationState = 'VERIFYING' | 'ALLOWED' | 'DENIED';

export const SettingProfilePage = ({ params }: SettingPageProps) => {
  const { id } = use(params);
  const { userInfo, sessionStatus } = useUserData();
  const router = useRouter();

  const [verificationState, setVerificationState] =
    useState<VerificationState>('VERIFYING');

  useEffect(() => {
    if (sessionStatus === 'loading') {
      setVerificationState('VERIFYING');
      return;
    }

    if (sessionStatus !== 'authenticated') {
      setVerificationState('DENIED');
      return;
    }

    if (!userInfo?.id) {
      setVerificationState('VERIFYING');
      return;
    }

    if (String(userInfo.id) === String(id)) {
      setVerificationState('ALLOWED');
    } else {
      setVerificationState('DENIED');
    }
  }, [sessionStatus, userInfo, id]);

  useEffect(() => {
    if (verificationState === 'DENIED') {
      toast.error('Anda tidak memiliki akses ke halaman ini.');
      router.push('/dashboard');
    }
  }, [verificationState, router]);

  if (verificationState !== 'ALLOWED') {
    return <MainLoading />;
  }

  return (
    <PageContainer title='Setting - GiziSnap' withFooter withHeader isDashboard>
      <SectionContainer>
        <main className='mx-auto w-full px-4 py-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-screen-lg xl:max-w-[1280px] 2xl:max-w-screen-xl'>
          <Card>
            <CardHeader>
              <Heading size='h2'>Pengaturan Akun</Heading>
              <CardDescription>
                <p>Perbarui detail akun Anda di bawah ini.</p>
              </CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <UpdateUserForm profileId={id} />
            </CardContent>
          </Card>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
