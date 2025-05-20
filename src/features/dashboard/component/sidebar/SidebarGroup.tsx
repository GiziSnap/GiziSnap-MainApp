'use client';

import {
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { SidebarItem } from './SidebarItem';
import { renderElements } from '@/utils/render-elements';
import { type icons } from 'lucide-react';

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
  return (
    <SidebarGroupComponent>
      <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {renderElements({
            of: props.menu,
            keyExtractor: (menu) => menu.title,
            render: (menu) => <SidebarItem {...menu} />,
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroupComponent>
  );
};
