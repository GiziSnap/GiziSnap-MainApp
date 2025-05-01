import { cn } from '@/lib/utils';
import { NavigationLink } from '../component/navbar/NavigationLink';

type DashboardProductSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardProductSection = ({
  children,
  className,
}: DashboardProductSectionProps) => {
  return (
    <section>
      <header className="flex items-center gap-5">
        <NavigationLink label="product" href="/dashboard/product" />
        <NavigationLink label="category" href="/dashboard/category" />
      </header>
      <main className={cn('mt-5', className)}>{children}</main>
    </section>
  );
};
