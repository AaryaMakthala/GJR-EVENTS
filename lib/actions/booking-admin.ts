"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import type { BookingStatus } from "@/types/database";
import type { ActionState } from "@/types";

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<ActionState> {
  await requireAdmin();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Booking status update error:", error);
      return {
        status: "error",
        message: "Failed to update booking status.",
      };
    }

    revalidatePath("/admin/dashboard/bookings");
    return { status: "success", message: "Booking status updated." };
  } catch (error) {
    console.error("Booking status action error:", error);
    return { status: "error", message: "Something went wrong." };
  }
}

export async function deleteBooking(id: string): Promise<ActionState> {
  await requireAdmin();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Booking delete error:", error);
      return { status: "error", message: "Failed to delete booking." };
    }

    revalidatePath("/admin/dashboard/bookings");
    return { status: "success", message: "Booking deleted." };
  } catch (error) {
    console.error("Booking delete action error:", error);
    return { status: "error", message: "Something went wrong." };
  }
}
