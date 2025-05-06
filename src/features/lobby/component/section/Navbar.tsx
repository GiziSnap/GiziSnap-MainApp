import { Button } from '@/components/ui/button';
import Icon from '@../../public/icon.png';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar as DesktopNavbar } from '../navlink/desktop/Navbar';
import { Navbar as NavbarMobile } from '../navlink/mobile/Navbar';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image src={Icon} alt="GiziSnap Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Menu */}
          <DesktopNavbar />

          {/* Authentication Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link href="/auth/login">
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Masuk
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              <Link href="/auth/register">Daftar</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <NavbarMobile />
        </div>
      </div>
    </nav>
  );
};
