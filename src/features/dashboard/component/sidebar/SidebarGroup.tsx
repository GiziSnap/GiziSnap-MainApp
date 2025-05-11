'use client';

import {
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { SidebarItem } from './SidebarItem';
import { renderElements } from '@/utils/render-elements';
import { ChevronDown } from 'lucide-react';
import { type icons } from 'lucide-react';
import { useState } from 'react';

type IconName = keyof typeof icons;

type MenuItem = {
  title: string;
  url: string;
  icon: IconName;
  submenu?: MenuItem[];
};

type SidebarGroupProps = {
  label: string;
  menu: MenuItem[];
};

export const SidebarGroup = (props: SidebarGroupProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const renderMenuItem = (menu: MenuItem) => {
    if (!menu.submenu) {
      return <SidebarItem icon={menu.icon} title={menu.title} url={menu.url} />;
    }

    const isOpen = openMenus.includes(menu.title);

    return (
      <div>
        <div
          onClick={() => toggleMenu(menu.title)}
          className="flex cursor-pointer items-center justify-between"
        >
          <SidebarItem icon={menu.icon} title={menu.title} url="#" />
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="space-y-1 pl-4">
            {menu.submenu.map((submenu) => (
              <SidebarItem
                key={submenu.title}
                icon={submenu.icon}
                title={submenu.title}
                url={submenu.url}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SidebarGroupComponent>
      <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {renderElements({
            of: props.menu,
            keyExtractor: (menu) => menu.title,
            render: renderMenuItem,
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroupComponent>
  );
};
