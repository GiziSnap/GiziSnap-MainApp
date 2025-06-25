import { type LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  title: string;
  url: string;
}

export interface MenuItem {
  name: string;
  url: string;
  icon?: LucideIcon;
  items?: SubMenuItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface AppInfo {
  name: string;
  logo: LucideIcon;
}
