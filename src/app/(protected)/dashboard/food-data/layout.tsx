import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Data',
};

const FoodDataLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default FoodDataLayout;
