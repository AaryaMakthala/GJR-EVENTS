import { createAdminClient } from "@/lib/supabase/admin";
import { GalleryManager } from "@/components/admin/gallery-manager";

// Caches data for 60 seconds.
export const revalidate = 60;

async function getAllImages() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50); // Hard limit to save memory and bandwidth on mobile devices

  if (error) {
    console.error("Admin gallery fetch error:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminGalleryPage() {
  const images = await getAllImages();
  
  return (
    <div className="w-full px-2 sm:px-4">
      <GalleryManager images={images} />
    </div>
  );
}