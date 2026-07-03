import { Star } from "lucide-react";
import type { TestimonialItem } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0d10] p-8 transition-all hover:border-[#D4AF37]/50 hover:bg-[#121316]">
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Gold Stars */}
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>

        {/* Quote */}
        <p className="mt-5 flex-1 font-serif text-lg italic text-zinc-300">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Name & Event */}
        <div className="mt-6 border-t border-zinc-800 pt-6">
          <p className="font-serif text-base font-semibold uppercase tracking-wider text-white">
            {testimonial.name}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            {testimonial.event}
          </p>
        </div>
      </div>
    </div>
  );
}