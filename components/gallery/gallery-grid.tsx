"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryImage } from "@/types";

export function GalleryGrid({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const [category, setCategory] = useState<string>("All");
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const params = new URLSearchParams({
          category,
          pageSize: "24",
        });
        const res = await fetch(`/api/gallery?${params.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        setImages(json.images ?? []);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      }
    });
  }, [category]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              category === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {isPending ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center px-4">
          <p className="font-serif text-xl font-semibold">No images yet</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Images for this category will appear here once our team adds
            them from the admin dashboard.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setLightbox(image)}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted"
            >
              <Image
                src={image.url}
                alt={image.caption || "GJR Events gallery photo"}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {image.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {image.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent
          className="max-w-3xl border-none bg-transparent p-0 shadow-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {lightbox?.caption || "Gallery image"}
          </DialogTitle>
          {lightbox && (
            <div className="relative">
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[80vh]">
                <Image
                  src={lightbox.url}
                  alt={lightbox.caption || "GJR Events gallery photo"}
                  fill
                  className="rounded-lg object-contain"
                  sizes="90vw"
                />
              </div>
              {lightbox.caption && (
                <p className="mt-3 text-center text-sm text-white/80">
                  {lightbox.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}