import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scan Food",
};

const ScanFoodLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default ScanFoodLayout;