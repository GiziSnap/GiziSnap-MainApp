import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import { sidebarMenu } from './sidebar-menu';
import { SidebarGroup } from './SidebarGroup';
import { SidebarGroup as SidebarGroupComponent } from '@/components/ui/sidebar';
import Link from 'next/link';
import { renderElements } from '@/utils/render-elements';

export const Sidebar = () => {
  return (
    <SidebarComponent collapsible="offcanvas">
      <SidebarContent>
        {renderElements({
          of: sidebarMenu,
          keyExtractor: (sidebar) => sidebar.label,
          render: (sidebar) => (
            <SidebarGroup label={sidebar.label} menu={sidebar.menu} />
          ),
        })}
        <SidebarGroupComponent className="absolute bottom-5 w-full">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/"
                  className="text-muted-foreground flex items-center gap-2"
                >
                  <SidebarMenuButton className="py-5">
                    <LogOut />
                    Logout
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroupComponent>
      </SidebarContent>
    </SidebarComponent>
  );
};
