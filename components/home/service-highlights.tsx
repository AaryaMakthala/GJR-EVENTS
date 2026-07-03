"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Luxury Wedding Planning",
    desc: "From intimate ceremonies to grand destination weddings, we design unforgettable celebrations with elegance, creativity, and flawless execution.",
    number: "01",
  },
  {
    title: "Corporate Events",
    desc: "Professional conferences, product launches, award ceremonies, annual meets, and executive gatherings crafted to elevate your brand.",
    number: "02",
  },
  {
    title: "Private Celebrations",
    desc: "Birthdays, anniversaries, engagements, baby showers, and exclusive private parties tailored to your unique vision.",
    number: "03",
  },
  {
    title: "Premium Décor & Styling",
    desc: "Luxury floral arrangements, thematic décor, custom stages, elegant lighting, and breathtaking venue transformations.",
    number: "04",
  },
  {
    title: "Entertainment & Production",
    desc: "Professional DJs, live music, artists, LED walls, premium lighting, immersive sound systems, and complete event production.",
    number: "05",
  },
  {
    title: "Event Management",
    desc: "End-to-end planning, vendor coordination, guest management, logistics, and on-site execution so you enjoy every moment stress-free.",
    number: "06",
  },
];

export const ServiceHighlights = () => {
  return (
    <section className="relative overflow-hidden bg-[#07090D] py-24 md:py-32 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="absolute left-1/4 top-1/3 h-[450px] w-[450px] rounded-full bg-yellow-400/10 blur-[150px]" />
      </div>

      <div className="container-luxe relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              SIGNATURE SERVICES
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Every celebration deserves exceptional planning, timeless elegance,
            and flawless execution. From intimate gatherings to grand events,
            we create experiences that leave lasting impressions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              className="group rounded-3xl border border-yellow-500/20 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-white/[0.05] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10 text-xl font-bold text-yellow-300 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                {service.number}
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white transition group-hover:text-yellow-300">
                {service.title}
              </h3>

              <p className="leading-7 text-zinc-400">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};