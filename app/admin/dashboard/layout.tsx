import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardMobileNav } from "@/components/admin/dashboard-mobile-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader email={user.email ?? ""} />
        <main className="flex-1 p-6 pb-24 lg:pb-6">{children}</main>
      </div>
      <DashboardMobileNav />
    </div>
  );
}
