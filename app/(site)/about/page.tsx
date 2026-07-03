import type { Metadata } from "next";
import Link from "next/link";
import { Award, HeartHandshake, Mail, Phone, Target, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Cta } from "@/components/shared/cta";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about GJR Events — a premium event management company dedicated to crafting unforgettable celebrations.",
};

const VALUES = [
  { icon: HeartHandshake, title: "Client-First", description: "Every decision we make starts with understanding your vision and priorities." },
  { icon: Award, title: "Uncompromising Quality", description: "We partner only with the finest vendors and hold every detail to a premium standard." },
  { icon: Target, title: "Precision Execution", description: "Meticulous planning and on-ground coordination ensure flawless delivery, every time." },
  { icon: Users, title: "Dedicated Team", description: "A passionate team of planners, designers, and coordinators invested in your story." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Crafting Celebrations With Heart"
        description="GJR Events was founded on a simple belief: every celebration deserves to be extraordinary."
      />

      {/* FOUNDER SECTION — now directly after Our Story */}
      <section className="py-20 bg-[#050608]">
        <div className="container-luxe">
          <div className="border border-zinc-800 bg-[#0c0d10] p-8 sm:p-12 rounded-2xl grid md:grid-cols-[auto,1fr] gap-8 md:gap-10 items-start md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-zinc-900 font-serif text-3xl font-semibold text-[#D4AF37]">
              JR
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Meet The Founder
              </span>
              <h2 className="mt-2 font-serif text-3xl text-white uppercase tracking-wider">
                {CONTACT_INFO.managerName}
              </h2>
              <p className="text-sm text-[#D4AF37] uppercase tracking-widest mt-1">
                {CONTACT_INFO.role}
              </p>

              <p className="mt-6 text-zinc-400 max-w-xl leading-relaxed">
                With a decade of experience in premium event management, {CONTACT_INFO.managerName} leads every GJR Events celebration personally — from first consultation to final send-off — ensuring each detail reflects the standard our clients expect.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#D4AF37]" /> {CONTACT_INFO.phoneDisplay}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#D4AF37]" /> {CONTACT_INFO.email}
                </span>
              </div>

              <Link
                href="/booking"
                className="mt-8 inline-block border border-[#D4AF37] px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-20 bg-[#0c0d10] text-white">
        <div className="container-luxe grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Who We Are</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Elevating Events Into Experiences</h2>
            <p className="mt-5 text-zinc-400">GJR Events is a full-service premium event management company specializing in weddings, corporate gatherings, and milestone celebrations.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[ { val: "500+", label: "Events Delivered" }, { val: "10+", label: "Years of Excellence" }, { val: "50+", label: "Trusted Partners" }, { val: "98%", label: "Client Satisfaction" } ].map((stat, i) => (
              <div key={i} className="border border-zinc-800 bg-[#050608] p-6 rounded-lg text-center">
                <p className="font-serif text-3xl font-semibold text-[#D4AF37]">{stat.val}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-[#050608]">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">What Drives Us</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">Our Core Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="border border-zinc-800 bg-[#0c0d10] p-8 text-center rounded-xl hover:border-[#D4AF37]/50 transition-all">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-zinc-900 text-[#D4AF37]">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-white uppercase tracking-wider">{value.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}