import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  WHATSAPP_PHONE: z.string().optional(),
  ADMIN_EMAIL: z.string().optional(),
});

let hasValidated = false;

/**
 * Validates presence of critical environment variables and warns
 * (without throwing) so local development isn't blocked, while making
 * misconfiguration visible in server logs.
 */
export function validateEnv() {
  if (hasValidated) return;
  hasValidated = true;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) return;

  const missing: string[] = [];
  if (!parsed.data.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!parsed.data.SUPABASE_SERVICE_ROLE_KEY)
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!parsed.data.ADMIN_EMAIL) missing.push("ADMIN_EMAIL");

  if (missing.length > 0) {
    console.warn(
      `[GJR Events] Missing environment variables: ${missing.join(
        ", "
      )}. Some features will not work until these are set in .env.local.`
    );
  }
}
