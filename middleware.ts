import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * ONLY run Supabase auth checks on admin routes.
     * The public homepage, gallery, and API routes do not need session validation.
     */
    "/admin/:path*",
    
    /* * If you have an explicit login page outside of /admin (like /login), 
     * uncomment the line below:
     * "/login",
     */
  ],
};