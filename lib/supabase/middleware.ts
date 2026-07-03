import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase isn't configured yet — let requests through unauthenticated
  // rather than crashing local development before .env.local is filled in.
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  return updateSessionWithSupabase(request, supabaseUrl, supabaseAnonKey);
}

async function updateSessionWithSupabase(
  request: NextRequest,
  supabaseUrl: string,
  supabaseAnonKey: string
) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin") && path !== "/admin";
  const isAuthorizedAdmin =
    !!user &&
    !!user.email &&
    user.email.toLowerCase() ===
      (process.env.ADMIN_EMAIL || "").toLowerCase();

  if (isAdminArea && !isAuthorizedAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.searchParams.set("redirected", "1");
    return NextResponse.redirect(url);
  }

  if (path === "/admin" && isAuthorizedAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
