'use client';

import { SidebarMenu, SidebarGroup } from '@/components/ui/sidebar';
import { SidebarItem } from './SidebarItem';
import type { MenuItem } from '../config/types';

interface SidebarMainMenuProps {
  items: MenuItem[];
  className?: string;
}

export const SidebarMainMenu = ({ items, className }: SidebarMainMenuProps) => {
  return (
    <SidebarGroup>
      <SidebarMenu className={className}>
        {items.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            items={item.items}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
