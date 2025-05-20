'use client';

import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Icon } from '@/components/ui/icon';
import { type icons } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { renderElements } from '@/utils/render-elements';
import { useState } from 'react';

type SubMenuItem = {
  title: string;
  url: string;
  icon: keyof typeof icons;
};

type SidebarSubMenuProps = {
  submenu: SubMenuItem[];
};

export const SidebarSubMenu = ({ submenu }: SidebarSubMenuProps) => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenuSub>
      {renderElements({
        of: submenu,
        keyExtractor: (submenuItem) => submenuItem.title,
        render: (submenuItem) => (
          <SidebarMenuSubItem>
            <SidebarMenuButton asChild>
              <Link
                href={submenuItem.url}
                className={`flex w-full items-center ${pathName === submenuItem.url ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Icon name={submenuItem.icon} size={20} className="mr-4" />
                {submenuItem.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        ),
      })}
    </SidebarMenuSub>
  );
};
