import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import Icon from '../../../../public/icon.png';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Navbar as DesktopNavbar } from '../component/navlink/desktop/Navbar';
import { Navbar as NavbarMobile } from '../component/navlink/mobile/Navbar';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
