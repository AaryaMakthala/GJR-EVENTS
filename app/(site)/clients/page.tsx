import type { Metadata } from "next";
import Image from "next/image";
import { TESTIMONIALS, SOCIAL_LINKS } from "@/lib/constants";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { Cta } from "@/components/shared/cta";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Hear from the clients GJR Events has celebrated with — weddings, corporate events, and milestone celebrations.",
};

export default function ClientsPage() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-[320px] md:h-[420px]">

        {/* BACKGROUND IMAGE */}
        <Image
          src="/thanks.png"
          alt="Client Stories Background"
          fill
          priority
          className="object-cover"
        />

        {/* STRONG READABILITY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

        {/* TEXT CONTENT */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
              Client Stories
            </p>

            <h1 className="text-3xl md:text-5xl font-serif text-white font-semibold">
              Celebrations We&apos;re Proud Of
            </h1>

            <p className="mt-4 text-sm md:text-base text-zinc-100 max-w-2xl mx-auto">
              Every event is a partnership. Here&apos;s what our clients have to say about working with GJR Events.
            </p>
          </div>

        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#050608]">
        <div className="container-luxe">

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center text-center">
            <p className="mb-6 text-sm uppercase tracking-widest text-zinc-400">
              See more moments from past events on our Instagram.
            </p>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-[#D4AF37] px-8 py-3 text-sm font-bold tracking-widest text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
            >
              Visit Our Instagram
            </a>
          </div>

        </div>
      </section>

      <Cta />
    </>
  );
}