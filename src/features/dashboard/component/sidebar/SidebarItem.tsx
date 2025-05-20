'use client';

import { Icon } from '@/components/ui/icon';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type icons } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarSubMenu } from './SidebarSubMenu';

type SidebarItemProps = {
  url: string;
  title: string;
  icon: keyof typeof icons;
  submenu?: SidebarItemProps[];
};

export const SidebarItem = (props: SidebarItemProps) => {
  const pathName = usePathname();
  const activeLink = pathName === props.url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={activeLink}>
        <Link href={props.url} className="flex items-center gap-2">
          <Icon name={props.icon} size={20} className="mr-2" />
          <span>{props.title}</span>
        </Link>
      </SidebarMenuButton>
      <SidebarSubMenu submenu={props.submenu ?? []} />
    </SidebarMenuItem>
  );
};
