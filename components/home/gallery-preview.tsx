"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/types";

// Reusable Gallery Card with built-in navigation
const GalleryCard = ({ image }: { image: GalleryImage }) => (
  <Link href="/gallery" className="block">
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-black/40 cursor-pointer"
    >
      <Image
        src={image.url}
        alt={image.caption || "Event highlight"}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
      {/* Gold/Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-bold">
          View Moment
        </span>
        {image.caption && (
          <p className="text-white text-sm mt-2 font-medium">
            {image.caption}
          </p>
        )}
      </div>
    </motion.div>
  </Link>
);

export const GalleryPreview = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const fetchPreviewImages = async () => {
      try {
        const params = new URLSearchParams({ pageSize: "6" });
        const res = await fetch(`/api/gallery?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setImages(json.images ?? []);
      } catch (err) {
        console.error("Failed to load gallery preview:", err);
        setError("Could not load gallery preview. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreviewImages();
  }, []);

  if (!isMounted) return null;

  return (
    <section
      className="relative py-24 md:py-32 bg-[#07090D] text-white overflow-hidden -mt-6 sm:mt-0"
      aria-label="Gallery preview"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-yellow-400/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              A GLIMPSE OF MAGIC
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg font-light mt-4">
            Every detail crafted with precision. Every moment designed to be unforgettable.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-xl bg-white/5 border border-white/10" />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="flex flex-col items-center justify-center rounded-xl border border-red-500/20 py-16 text-center bg-black/30 backdrop-blur">
              <p className="text-red-400 text-lg">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 rounded-full bg-yellow-400/20 text-yellow-300 text-sm hover:bg-yellow-400 hover:text-black transition">
                Retry
              </button>
            </motion.div>
          ) : images.length === 0 ? (
            <motion.div key="empty" className="flex flex-col items-center justify-center rounded-xl border border-white/10 py-20 text-center bg-black/30 backdrop-blur">
              <p className="text-xl font-semibold text-yellow-300 tracking-wide">NO MOMENTS CAPTURED YET</p>
            </motion.div>
          ) : (
            <motion.div key="gallery" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <GalleryCard key={image.id} image={image} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/gallery"
            className="inline-block px-10 py-4 rounded-full border border-[#D4AF37]/40 text-yellow-300 tracking-[0.25em] text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          >
            VIEW FULL PORTFOLIO
          </Link>
        </motion.div>
      </div>
    </section>
  );
};