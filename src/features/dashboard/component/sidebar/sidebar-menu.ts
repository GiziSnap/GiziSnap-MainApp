import { type icons } from 'lucide-react';

type MenuItemType = {
  title: string;
  url: string;
  icon: keyof typeof icons;
  submenu?: MenuItemType[];
};

export const sidebarMenu: { label: string; menu: MenuItemType[] }[] = [
  {
    label: 'Dashboard',
    menu: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'LayoutDashboard',
      },
      {
        title: 'Pemindai Makanan',
        url: '/dashboard/banner',
        icon: 'Camera',
      },
      {
        title: 'Gizi',
        url: '/dashboard/gizi',
        icon: 'Scale',
        submenu: [
          {
            title: 'Status Gizi',
            url: '/dashboard/gizi/status',
            icon: 'HeartPulse',
          },
          {
            title: 'Kalkulator Gizi',
            url: '/dashboard/gizi/kalkulator',
            icon: 'Calculator',
          },
          {
            title: 'Riwayat',
            url: '/dashboard/gizi/riwayat',
            icon: 'History',
          },
        ],
      },
    ],
  },
];
