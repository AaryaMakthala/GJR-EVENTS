"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import {
  formatContactNotification,
  sendTelegramNotification,
} from "@/lib/telegram";
import type { ActionState } from "@/types";

export async function createContactMessage(
  values: ContactFormValues
): Promise<ActionState> {
  const parsed = contactSchema.safeParse(values);

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

    const { error } = await supabase.from("contact_messages").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      is_read: false,
    });

    if (error) {
      console.error("Contact insert error:", error);
      return {
        status: "error",
        message:
          "We couldn't send your message right now. Please try again shortly.",
      };
    }

    await sendTelegramNotification(formatContactNotification(data));

    revalidatePath("/admin/dashboard/messages");

    return {
      status: "success",
      message: "Thank you for reaching out! We'll respond within 24 hours.",
    };
  } catch (error) {
    console.error("Contact action error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
