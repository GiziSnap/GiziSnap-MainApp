'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DoorOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const SignOutAlert = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter(); // Move this to the top for better organization

  const handleSignOut = () => {
    setIsAlertOpen(false);
    signOut({ redirect: false })
      .then(() => {
        toast.success('Anda telah berhasil keluar.');
        router.push('/');
      })
      .catch(() => {
        toast.error('Gagal keluar. Silakan coba lagi.');
      });
  };

  return (
    <div className='w-full' onClick={(e) => e.stopPropagation()}>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger className='flex items-center gap-2'>
          <DoorOpen className='h-4 w-4' />
          Logout
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                e.stopPropagation();
                setIsAlertOpen(false);
              }}
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500 hover:bg-red-600'
              onClick={(e) => {
                e.stopPropagation();
                handleSignOut(); // Call the sign-out handler
              }}
            >
              Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
