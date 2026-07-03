"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import type { ActionState } from "@/types";

export async function markMessageRead(
  id: string,
  isRead: boolean
): Promise<ActionState> {
  await requireAdmin();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: isRead })
      .eq("id", id);

    if (error) {
      console.error("Message read update error:", error);
      return { status: "error", message: "Failed to update message." };
    }

    revalidatePath("/admin/dashboard/messages");
    return { status: "success", message: "Message updated." };
  } catch (error) {
    console.error("Message read action error:", error);
    return { status: "error", message: "Something went wrong." };
  }
}

export async function deleteMessage(id: string): Promise<ActionState> {
  await requireAdmin();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Message delete error:", error);
      return { status: "error", message: "Failed to delete message." };
    }

    revalidatePath("/admin/dashboard/messages");
    return { status: "success", message: "Message deleted." };
  } catch (error) {
    console.error("Message delete action error:", error);
    return { status: "error", message: "Something went wrong." };
  }
}
