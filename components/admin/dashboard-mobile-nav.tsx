"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
  { label: "Bookings", href: "/admin/dashboard/bookings", icon: CalendarCheck },
  { label: "Messages", href: "/admin/dashboard/messages", icon: MessageSquare },
];

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-card lg:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
