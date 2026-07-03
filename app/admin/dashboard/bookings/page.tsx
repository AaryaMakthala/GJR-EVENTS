import { createAdminClient } from "@/lib/supabase/admin";
import { BookingsTable } from "@/components/admin/bookings-table";

// Caches data for 60 seconds. Massively speeds up page loads while keeping data fresh.
export const revalidate = 60;

async function getAllBookings() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100); // Prevents the mobile browser from struggling under huge datasets

  if (error) {
    console.error("Admin bookings fetch error:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    // 'max-w-full' prevents the container from stretching past the screen width
    <div className="flex flex-col space-y-4 sm:space-y-6 w-full max-w-full px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col gap-1 md:gap-1.5">
        <h1 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Booking Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Search, filter, and manage all incoming booking requests.
        </p>
      </div>

      {/* This wrapper is the key for mobile. 
        It forces anything inside it to respect the screen boundaries. 
      */}
      <div className="w-full overflow-hidden rounded-md border border-border bg-background">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}