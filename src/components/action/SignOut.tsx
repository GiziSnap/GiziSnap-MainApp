
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
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
} from "@/components/ui/alert-dialog";
import { DoorOpen } from 'lucide-react';

export const SignOutAlert = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleSignOut = () => {
        void signOut();
        setIsAlertOpen(false);
    };

    return (
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger className='flex items-center gap-2 hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-sm'>
                    <DoorOpen className='text-white' />
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
                        <AlertDialogCancel onClick={(e) => {
                            e.stopPropagation();
                            setIsAlertOpen(false);
                        }}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-red-500 hover:bg-red-600'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSignOut();
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
