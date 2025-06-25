import { Toaster } from 'sonner';
import { SessionProvider } from 'next-auth/react';
import { TanstackProvider } from './TanStackProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <TanstackProvider>
        {children}
        <Toaster position='bottom-right' />
      </TanstackProvider>
    </SessionProvider>
  );
};
