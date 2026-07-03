"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { ADMIN_EMAIL } from "@/lib/constants";
import type { ActionState } from "@/types";

export async function loginAdmin(
  values: LoginFormValues
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please enter a valid email and password.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  if (
    !ADMIN_EMAIL ||
    email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase()
  ) {
    return {
      status: "error",
      message: "These credentials are not authorized for admin access.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        status: "error",
        message: "Invalid email or password.",
      };
    }

    return { status: "success", message: "Signed in successfully." };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin");
}
