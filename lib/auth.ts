import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/constants";

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) return null;
  if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;

  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin");
  }
  return user;
}
