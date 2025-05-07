import { AppProvider } from '@/components/layouts/AppProvider';
import { Providers } from '@/components/layouts/provider/Providers';
import ToastProvider from '@/components/layouts/provider/ToastProvider';
import '@/styles/globals.css';

import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist } from 'next/font/google';

export const metadata: Metadata = {
  title: 'GiziSnap',
  description: 'GiziSnap: Aplikasi Pemindaian Makanan untuk Gizi Sehat',
  icons: [{ rel: 'icon', url: '/icon.png' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning={true}
      lang="en"
      className={`${geist.variable}`}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
