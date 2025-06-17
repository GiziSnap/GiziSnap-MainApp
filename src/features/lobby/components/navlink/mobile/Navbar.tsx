import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = () => {
    void signOut();
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className='md:hidden'>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='p-2 text-gray-700 hover:text-green-600 dark:text-white'
          >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='w-full'>
          <SheetHeader className='border-b border-gray-200'>
            <SheetTitle>Navigasi</SheetTitle>
            <SheetDescription>
              Menu Navigasi untuk menjelajahi fitur dan informasi lebih lanjut
              tentang NutriSnap.
            </SheetDescription>
          </SheetHeader>
          <div className='space-y-1 pb-3'>
            <Button
              variant={'ghost'}
              onClick={() => scrollToSection('hero')}
              className='block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-green-50 dark:text-white'
            >
              Beranda
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => scrollToSection('features')}
              className='block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-green-50 dark:text-white'
            >
              Fitur
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => scrollToSection('about')}
              className='block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-green-50 dark:text-white'
            >
              Tentang
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => scrollToSection('contact')}
              className='block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-green-50 dark:text-white'
            >
              Kontak
            </Button>
            <Separator className='my-2' />
            {session ? (
              <div className='mt-4 flex flex-col space-y-2 px-3 pt-3'>
                <Link href='/dashboard'>
                  <Button className='w-full bg-green-500 text-white hover:bg-green-600'>
                    Dashboard
                  </Button>
                </Link>
                <Link href='' onClick={handleLogout}>
                  <Button
                    variant='outline'
                    className='w-full border-green-500 text-green-500 hover:bg-green-50'
                  >
                    Keluar
                  </Button>
                </Link>
              </div>
            ) : (
              <div className='mt-4 flex flex-col space-y-2 px-3 pt-3'>
                <Link href='/auth/login'>
                  <Button className='w-full bg-green-500 text-white hover:bg-green-600'>
                    Masuk
                  </Button>
                </Link>
                <Link href='/auth/register'>
                  <Button
                    variant='outline'
                    className='w-full border-green-500 text-green-500 hover:bg-green-50'
                  >
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
