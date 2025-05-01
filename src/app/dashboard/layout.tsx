// export {
//   DashboardLayout as default,
//   DashboardLayoutMetadata as metadata,
// } from '@/features/dashboard/layouts/DashboardLayout';
import { DashboardLayout as DashboardLayoutComponent } from '@/features/dashboard/layouts/DashboardLayout';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
};

export default DashboardLayout;
