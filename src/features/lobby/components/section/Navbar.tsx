import { Button } from '@/components/ui/button';
import Icon from '@../../public/icon.png';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar as DesktopNavbar } from '../navlink/desktop/Navbar';
import { Navbar as NavbarMobile } from '../navlink/mobile/Navbar';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/'>
              <Image src={Icon} alt='GiziSnap Logo' className='h-10 w-auto' />
            </Link>
          </div>

          <DesktopNavbar />

          <div className='hidden items-center space-x-4 md:flex'>
            {session ? (
              <div className='flex items-center space-x-4'>
                <Link href='/dashboard'>
                  <Button className='bg-green-500 text-white hover:bg-green-600'>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  className='border border-green-500 bg-white text-green-500 hover:bg-green-50 hover:text-green-600'
                  onClick={handleLogout}
                >
                  Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link href='/auth/login'>
                  <Button className='bg-green-500 text-white hover:bg-green-600'>
                    Masuk
                  </Button>
                </Link>
                <Link href='/auth/register'>
                  <Button
                    variant='ghost'
                    className='border border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600'
                  >
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <NavbarMobile />
        </div>
      </div>
    </nav>
  );
};
