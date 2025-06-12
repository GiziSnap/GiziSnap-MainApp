'use client';
import { PageContainer, SectionContainer } from '@/components/layouts';
import { MainLoading } from '@/components/MainLoading';
import { Heading } from '@/components/ui/heading';
import { useUserData } from '@/features/dashboard/utils/useUserData';
import { useEffect, useState } from 'react';
import { UpdateUserForm } from '../component/form/UpdateUserForm';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { redirect } from 'next/navigation';

type SettingPageProps = {
  params: Promise<{ id: string }>;
};

export const SettingProfilePage = ({ params }: SettingPageProps) => {
  console.log('SettingProfilePage: Rendering component');
  const { userInfo, sessionStatus } = useUserData();
  const [id, setId] = useState<string | null>(null);

  // Mengambil ID dari params
  useEffect(() => {
    const fetchId = async () => {
      const { id: newId } = await params;
      setId(newId);
    };

    void fetchId();
  }, [params]);

  // Redirect jika ID tidak sesuai
  useEffect(() => {
    if (id && sessionStatus !== 'loading') {
      if (!userInfo?.id) {
        console.log(
          'UserInfo or UserInfo ID is undefined, waiting for data or redirecting to login',
        );
        return; // Jangan lakukan redirect ke home, tunggu data atau tangani secara berbeda
      }
      console.log('ID from params:', id);
      console.log('UserInfo ID:', userInfo.id);
      console.log('Type of ID from params:', typeof id);
      console.log('Type of UserInfo ID:', typeof userInfo.id);
      console.log('Types match:', typeof id === typeof userInfo.id);
      if (String(id) !== String(userInfo.id)) {
        console.log('Redirecting due to ID mismatch after type conversion');
        redirect('/');
      } else {
        console.log('IDs match after type conversion, no redirect needed');
      }
    }
  }, [id, userInfo, sessionStatus]);

  // Tampilkan loading saat data pengguna sedang dimuat
  if (sessionStatus === 'loading') {
    console.log('SettingProfilePage: Showing loading due to sessionStatus');
    return <MainLoading />;
  }

  // Tampilkan loading tambahan jika id belum siap atau userInfo belum lengkap
  if (!id || !userInfo?.id) {
    console.log(
      'SettingProfilePage: Showing loading due to missing id or userInfo',
    );
    return <MainLoading />;
  }

  console.log('SettingProfilePage: Rendering main content');
  return (
    <PageContainer title='Setting - GiziSnap' withFooter withHeader isDashboard>
      <SectionContainer>
        <main className='mx-auto w-full px-4 py-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-screen-lg xl:max-w-[1280px] 2xl:max-w-screen-xl'>
          <Card>
            <CardHeader>
              <Heading size='h2'>Akun Settings</Heading>
              <CardDescription>
                <p>Update akun anda</p>
              </CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>{id && <UpdateUserForm profileId={id} />}</CardContent>
          </Card>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
