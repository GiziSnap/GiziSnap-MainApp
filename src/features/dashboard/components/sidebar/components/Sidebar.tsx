'use client';

import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { SidebarUser } from './SidebarUser';
import { SidebarMainMenu } from './SidebarMainMenu';
import { AppHeader } from './AppHeader';
import { appInfo, sidebarMenu } from '../config/navigation';

export const Sidebar = (
  props: React.ComponentProps<typeof SidebarPrimitive>,
) => {
  return (
    <SidebarPrimitive collapsible='icon' {...props}>
      <SidebarHeader>
        <AppHeader teams={appInfo} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMainMenu items={sidebarMenu} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>

      <SidebarRail />
    </SidebarPrimitive>
  );
};
