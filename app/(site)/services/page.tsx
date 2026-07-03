import { ChevronDown } from "lucide-react";
import { SERVICES, SERVICES_NOTE } from "@/lib/constants";
import { ServiceCard } from "@/components/shared/service-card";
import { Faq } from "@/components/shared/faq";
import { Cta } from "@/components/shared/cta";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.35]"
          style={{ backgroundImage: "url('/dj1.png')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#07090D]" />

        <div className="relative z-10 px-4 text-center">
          <h1 className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-5xl font-bold tracking-wide text-transparent md:text-7xl">
            SIGNATURE SERVICES
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Expert production, luxury décor, entertainment, and flawless event
            execution tailored to create unforgettable experiences.
          </p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-yellow-400">
          <ChevronDown size={34} />
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-[#07090D] py-24 text-white">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08),transparent_60%)]" />
          <div className="absolute left-1/3 top-1/4 h-[450px] w-[450px] rounded-full bg-yellow-400/10 blur-[150px]" />
        </div>

        <div className="container-luxe relative">
          {/* Note */}
          <div className="mb-14 rounded-3xl border border-yellow-500/20 bg-white/[0.03] p-8 backdrop-blur-sm">
            <p className="text-center text-lg leading-8 text-zinc-300">
              {SERVICES_NOTE}
            </p>
          </div>

          {/* Services */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Bottom Box */}
          <div className="mt-20 rounded-3xl border border-yellow-500/20 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
              Complete Event Management
            </h3>

            <p className="mx-auto max-w-3xl leading-8 text-zinc-400">
              We specialize in premium event planning, live entertainment,
              professional DJ setups, stage fabrication, thematic decoration,
              luxury lighting, and complete event production.

              <br />
              <br />

              <span className="font-semibold text-yellow-300">
                Food, beverages, photography, and videography are not included
                in our service offerings.
              </span>
            </p>
          </div>
        </div>
      </section>

      <Faq />
      <Cta />
    </>
  );
}