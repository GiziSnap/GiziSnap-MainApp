'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { MenuItem } from '../config/types';
import { SidebarSubMenu } from './SidebarSubMenu';

export const SidebarItem = ({ name, url, icon: Icon, items }: MenuItem) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = () => {
    const isDirectMatch = pathname === url;
    const isSubItemMatch = items?.some(
      (subItem) => pathname === subItem.url || pathname.startsWith(subItem.url),
    );

    return isDirectMatch || isSubItemMatch;
  };

  if (items) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem
          className={cn(
            'group',
            isActive() && 'bg-accent text-accent-foreground',
          )}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className='group flex w-full items-center'>
              {Icon && <Icon className='mr-2 h-4 w-4' />}
              <span className='ml-[-8px]'>{name}</span>
              <ChevronRight
                className={cn(
                  'ml-auto size-4 transition-transform duration-200',
                  isOpen ? 'rotate-90' : '',
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent className='overflow-hidden'>
            <SidebarSubMenu items={items} />
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem
      className={cn(
        pathname === url && 'text-accent-foreground bg-slate-300/35',
      )}
    >
      <SidebarMenuButton asChild>
        <Link href={url} className='flex w-full items-center gap-2'>
          {Icon && <Icon className='h-4 w-4' />}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
