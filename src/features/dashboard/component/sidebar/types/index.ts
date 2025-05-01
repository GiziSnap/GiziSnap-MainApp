export type SidebarItemProps = {
  title: string;
  url: string;
  icon: string;
  submenu?: SidebarItemProps[];
};

export type SidebarMenuType = {
  label: string;
  menu: SidebarItemProps[];
}[];
