import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading } from '../ui/heading';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutAlert } from '../action/SignOut';
import { useUserData } from '@/features/dashboard/utils/useUserData';

export const HeaderDashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { userInfo } = useUserData();

  const dataUser = {
    brandName: 'GiziSnap',
    userName: userInfo.username ?? 'User ',
    userAvatar: 'https://github.com/shadcn.png',
    userAvatarFallback: userInfo.username ?? 'User',
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
    <header
      className={`sticky top-0 z-50 flex w-full items-center justify-between border-b px-5 py-3 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <div className='flex items-center gap-5'>
        <SidebarTrigger />
        <Link href={'/'}>
          <Heading size={'h4'}>{dataUser.brandName}</Heading>
        </Link>
      </div>
      <div className='flex items-center gap-5'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className='outline-none cursor-pointer focus:outline-none'
            aria-label='User Menu'
          >
            <div className='flex items-center gap-2'>
              <span className='hidden text-sm md:block'>
                Hello, {dataUser.userName}
              </span>
              <Avatar className='w-8 h-8'>
                <AvatarImage
                  src={dataUser.userAvatar}
                  alt={`@${dataUser.userName}`}
                />
                <AvatarFallback>{dataUser.userAvatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href='/profile' className='w-full'>
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href='/billing' className='w-full'>
                Billing
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href='/team' className='w-full'>
                Team
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href='/subscription' className='w-full'>
                Subscription
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <SignOutAlert />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
