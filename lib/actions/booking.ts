"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import {
  formatBookingNotification,
  sendTelegramNotification,
} from "@/lib/telegram";
import type { ActionState } from "@/types";

export async function createBooking(
  values: BookingFormValues
): Promise<ActionState> {
  const parsed = bookingSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("bookings").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      event_type: data.event_type,
      event_date: data.event_date,
      guest_count: data.guest_count,
      location: data.location,
      message: data.message || null,
      status: "pending",
    });

    if (error) {
      console.error("Booking insert error:", error);
      return {
        status: "error",
        message:
          "We couldn't save your booking right now. Please try again shortly.",
      };
    }

    await sendTelegramNotification(formatBookingNotification(data));

    revalidatePath("/admin/dashboard/bookings");

    return {
      status: "success",
      message:
        "Your booking request has been received! Our team will reach out within 24 hours.",
    };
  } catch (error) {
    console.error("Booking action error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
