import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import { Header } from '../elements/Header';
import { Footer } from '../elements/Footer';
import { HeaderDashboard } from '../elements/HeaderDashboard';
// import { HeaderDashboard } from "../elements/HeaderDashboard";

type PageContainerProps = {
  withHeader?: boolean;
  withFooter?: boolean;
  title?: string;
  isDashboard?: boolean;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
  (
    {
      className,
      children,
      withHeader = false,
      withFooter = false,
      isDashboard = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='h-full w-full'>
        {/* Uncomment the line below if you want to use HeaderDashboard instead of Header */}
        {withHeader && (isDashboard ? <HeaderDashboard /> : <Header />)}

        <main ref={ref} className={cn('flex flex-col', className)} {...props}>
          {children}
        </main>
        {withFooter && <Footer className='mt-auto' />}
      </div>
    );
  },
);

PageContainer.displayName = 'PageContainer';
