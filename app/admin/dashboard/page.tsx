import Link from "next/link";
import {
  CalendarCheck,
  CalendarClock,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

export const revalidate = 60; // or whatever's appropriate — not force-dynamic

async function getDashboardStats() {
  const supabase = createAdminClient();

  const [bookingsRes, pendingRes, messagesRes, galleryRes, recentBookingsRes] =
    await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false),
      supabase.from("gallery_images").select("id", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  return {
    totalBookings: bookingsRes.count ?? 0,
    pendingBookings: pendingRes.count ?? 0,
    unreadMessages: messagesRes.count ?? 0,
    totalImages: galleryRes.count ?? 0,
    recentBookings: recentBookingsRes.data ?? [],
  };
}

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      href: "/admin/dashboard/bookings",
    },
    {
      label: "Pending Bookings",
      value: stats.pendingBookings,
      icon: CalendarClock,
      href: "/admin/dashboard/bookings",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      href: "/admin/dashboard/messages",
    },
    {
      label: "Gallery Images",
      value: stats.totalImages,
      icon: ImageIcon,
      href: "/admin/dashboard/gallery",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="border-border/60 transition-colors hover:border-primary/40">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-2 font-serif text-3xl font-semibold">
                    {card.value}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <card.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-border/60">
        <CardContent className="p-6">
          <h2 className="font-serif text-lg font-semibold">Recent Bookings</h2>
          <div className="mt-4 divide-y divide-border">
            {stats.recentBookings.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No bookings yet.
              </p>
            ) : (
              stats.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{booking.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.event_type} &middot; {formatDateTime(booking.created_at)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "completed"
                        ? "success"
                        : booking.status === "cancelled"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
