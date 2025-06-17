import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Setting",
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default ProfileLayout;