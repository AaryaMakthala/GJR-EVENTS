import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { ServiceHighlights } from "@/components/home/service-highlights";
import { Cta } from "@/components/shared/cta";

export const metadata: Metadata = {
  title: "GJR Events | Premium Event Management & Luxury Celebrations",
  description: "GJR Events crafts bespoke weddings, corporate events, and milestone celebrations with unmatched elegance and precision.",
};

export default function HomePage() {
  return (
    // This <main> tag now correctly controls the entire page's boundaries
    <main className="relative w-full overflow-hidden bg-[#050608] text-white min-h-screen m-0 p-0">
      <Hero />
      <GalleryPreview />
      <ServiceHighlights />
      <Cta />
    </main>
  );
}