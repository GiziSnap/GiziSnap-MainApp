'use client';

import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
        {children}
        <Toaster position='top-center'/>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      </ThemeProvider > */}
    </SessionProvider>
  );
};
