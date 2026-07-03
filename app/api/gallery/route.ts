import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Cache this API route for 30 seconds. 
// Massively reduces database reads and stops API spam.
export const revalidate = 30;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  // Your existing pagination logic is perfect. It safely limits the pageSize.
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const pageSize = Math.min(
    24,
    Math.max(1, Number(searchParams.get("pageSize") || "12"))
  );

  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("gallery_images")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (category && category.toLowerCase() !== "all") {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Gallery fetch error:", error);
      return NextResponse.json(
        { error: "Failed to load gallery images." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      images: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
      hasMore: (count ?? 0) > page * pageSize,
    });
  } catch (error) {
    console.error("Gallery route error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}