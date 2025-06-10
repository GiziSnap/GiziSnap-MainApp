import { AppProvider } from '@/components/layouts/AppProvider';
import '@/styles/globals.css';

import { type Metadata } from 'next';
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
      lang='en'
      className={`${geist.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
