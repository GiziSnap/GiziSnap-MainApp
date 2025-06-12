import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUserData } from '@/features/dashboard/utils/useUserData';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export function SidebarUser() {
  const { userInfo, userAvatar } = useUserData();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    redirect('/');
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={userAvatar ?? '/default-avatar.jpg'}
                  alt={userInfo.username ?? 'User'}
                />
                <AvatarFallback className='rounded-lg'>
                  {userInfo.username?.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {userInfo.username ?? 'Guest'}
                </span>
                <span className='truncate text-xs'>
                  {userInfo.email_address ?? 'N/A'}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-56 rounded-lg'>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={userAvatar ?? '/default-avatar.jpg'}
                    alt={userInfo.username ?? 'User'}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {userInfo.username?.charAt(0) ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {userInfo.username ?? 'Guest'}
                  </span>
                  <span className='truncate text-xs'>
                    {userInfo.email_address ?? 'N/A'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/dashboard/${userInfo.id}/profile`}>
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
