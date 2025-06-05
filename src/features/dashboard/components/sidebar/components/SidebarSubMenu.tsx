'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { SubMenuItem } from '../config/types';

interface SidebarSubMenuProps {
  items: SubMenuItem[];
}

export const SidebarSubMenu = ({ items }: SidebarSubMenuProps) => {
  const pathname = usePathname();

  return (
    <SidebarMenuSub>
      {items.map((subItem) => (
        <SidebarMenuSubItem
          key={subItem.title}
          className={cn(
            pathname === subItem.url &&
              'bg-primary/10 text-primary font-semibold',
          )}
        >
          <SidebarMenuSubButton asChild>
            <Link href={subItem.url}>{subItem.title}</Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};
