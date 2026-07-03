import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { PageHeader } from "@/components/shared/page-header";
import { Cta } from "@/components/shared/cta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore GJR Events' portfolio of weddings, corporate events, birthdays, and bespoke celebrations.",
};

export const dynamic = "force-dynamic";

async function getInitialImages() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(24);

    if (error) {
      console.error("Gallery page fetch error:", error);
      return [];
    }
    return data ?? [];
  } catch (error) {
    console.error("Gallery page error:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getInitialImages();

  return (
    <>
      <PageHeader
        eyebrow="Our Portfolio"
        title="A Glimpse Into Our Celebrations"
        description="Every event tells a story. Browse moments we've crafted for our clients across weddings, corporate galas, and milestone celebrations."
      />
      <section className="section-y bg-background">
        <div className="container-luxe">
          <GalleryGrid initialImages={images} />
        </div>
      </section>
      <Cta />
    </>
  );
}
