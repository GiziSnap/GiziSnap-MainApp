import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { Toaster as Sooner } from 'sonner';
// import { Toaster } from "../ui/toaster";
import { Providers } from './provider/Providers';
import { SessionProvider } from 'next-auth/react';

type AppProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export const AppProvider = forwardRef<HTMLDivElement, AppProviderProps>(
  ({ children, className }, ref) => {
    return (
      <main ref={ref} className={cn(className)}>
        {/* <Providers>{children}</Providers> */}
        {/* <Toaster /> */}
        {/* <Sooner position="top-center" /> */}
      </main>
    );
  }
);

AppProvider.displayName = 'AppProvider';
