import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch for DJ, lighting, decor, weddings, corporate events, and celebrations.",
};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z" />
    </svg>
  );
}

const CONTACT_DETAILS = [
  { icon: MapPin, label: "Visit Us", value: CONTACT_INFO.location },
  { icon: Phone, label: "Call Us", value: CONTACT_INFO.phoneDisplay, href: `tel:+91${CONTACT_INFO.phone}` },
  { icon: Mail, label: "Email Us", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
];

export default function ContactPage() {
  return (
    // FIX: Swapped to <main>, added pt-28 lg:pt-36 to clear the fixed navbar, added px for mobile edges
    <main className="min-h-screen bg-black text-white pt-24 lg:pt-32 px-4 sm:px-8 pb-16">
      
      <PageHeader
        eyebrow="Get In Touch"
        title="We'd Love to Hear From You"
        description={`Speak directly with ${CONTACT_INFO.managerName}, our ${CONTACT_INFO.role.toLowerCase()}, about your event.`}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">

          {/* LEFT */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-xl font-semibold tracking-widest text-[#D4AF37]">
                CONTACT INFORMATION
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Reach out anytime — we respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {CONTACT_DETAILS.map((detail) => {
                const content = (
                  <div className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37]">
                      <detail.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        {detail.label}
                      </p>
                      <p className="text-sm text-white">{detail.value}</p>
                    </div>
                  </div>
                );

                return detail.href ? (
                  <a key={detail.label} href={detail.href} className="block group">
                    <div className="rounded-xl border border-[#D4AF37]/20 bg-black transition-all duration-300 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                      {content}
                    </div>
                  </a>
                ) : (
                  <div
                    key={detail.label}
                    className="rounded-xl border border-[#D4AF37]/20 bg-black"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-black"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>

              <a
                href={SOCIAL_LINKS.whatsappChannel}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-black"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(212,175,55,0.05)] sm:p-10 transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)]">
              <ContactForm />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}