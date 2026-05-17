"use client";
import { usePathname } from "next/navigation";

import { AdminSidebar } from "@/components/admin/layout/sidebar";
import { useGetAdminProfile } from "@/hooks/auth/useGetProfile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { admin } = useGetAdminProfile();

  if (pathname.includes("/admin/login")) {
    return children;
  }

  return (
    <main className="flex h-full">
      <AdminSidebar></AdminSidebar>
      <div className="bg-[#F8FAFC] p-8 h-full w-full lg:w-[calc(100%-288px)]   relative overflow-scroll">
        {children}
      </div>
    </main>
  );
}
