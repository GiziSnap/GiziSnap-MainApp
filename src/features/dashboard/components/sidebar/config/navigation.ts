import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Scale,
  ScanSearchIcon,
  UtensilsCrossed,
} from 'lucide-react';
import type { MenuItem, UserProfile, AppInfo } from './types';

export const appInfo: AppInfo[] = [
  {
    name: 'GiziSnap',
    logo: GalleryVerticalEnd,
  },
];

export const userProfile: UserProfile = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

export const sidebarMenu: MenuItem[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Pemindai Makanan',
    url: '/dashboard/scan-food',
    icon: ScanSearchIcon,
  },
  {
    name: 'Data Makanan',
    url: '/dashboard/food-data',
    icon: UtensilsCrossed,
  },
  // {
  //   name: 'Gizi',
  //   url: '#',
  //   icon: Scale,
  //   items: [
  //     {
  //       title: 'Status Gizi',
  //       url: '/dashboard/status-gizi',
  //     },
  //     {
  //       title: 'Kalkulator Gizi',
  //       url: '/dashboard/kalkulator-gizi',
  //     },
  //     {
  //       title: 'Riwayat Gizi',
  //       url: '/dashboard/riwayat-gizi',
  //     },
  //   ],
  // },
];
