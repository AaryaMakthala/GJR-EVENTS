"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const sentence: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delay: 0.3, staggerChildren: 0.05 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const particles = [
  { left: "15%", top: "22%", size: 4, delay: 0, showOnMobile: true },
  { left: "80%", top: "45%", size: 3, delay: 1.5, showOnMobile: true },
  { left: "50%", top: "75%", size: 5, delay: 3, showOnMobile: true },
  { left: "75%", top: "18%", size: 3, delay: 2, showOnMobile: false },
  { left: "25%", top: "65%", size: 4, delay: 4, showOnMobile: false },
  { left: "62%", top: "30%", size: 2, delay: 1, showOnMobile: false },
];

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black text-white m-0 p-0 block">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 25, ease: "easeOut" }}
          style={{ transformOrigin: "center top" }}
        >
          <div className="hidden sm:block absolute inset-0">
            <Image
              src="/hero-desktop.jpeg"
              alt="GJR Events"
              fill
              priority
              className="object-cover object-top"
            />
          </div>

          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/hero-mobile.jpeg"
              alt="GJR Events"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {!prefersReducedMotion &&
          particles.map((p, i) => (
            <motion.span
              key={i}
              className={cn(
                "absolute rounded-full bg-[#D4AF37] blur-[1px]",
                !p.showOnMobile && "hidden sm:block"
              )}
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{
                y: [0, -40, 0],
                x: [0, 15, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 12 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[100svh] max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-6 pb-20 sm:pb-0">

        {/* WELCOME */}
        <motion.h1
          className="text-[38px] sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-center leading-[1.05] mb-4 sm:mb-6"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {"WELCOME TO GJR EVENTS".split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block mx-2">
              {word.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letter}
                  className="inline-block bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] bg-clip-text text-transparent"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[18px] sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.25em] uppercase text-gray-200 text-center mb-6 sm:mb-8"
        >
          Luxury Celebrations & Bespoke Events
        </motion.h2>

        {/* GOLD DIVIDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0 }}
          className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4"
        />

        {/* DESCRIPTION — royal serif italic gold treatment */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="font-serif italic text-[15px] sm:text-base md:text-lg tracking-wide max-w-xl mb-8 sm:mb-10 text-center bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
        >
          We craft unforgettable luxury experiences with precision, elegance, and perfection.
        </motion.p>

        {/* BUTTON */}
        <Link href="/booking">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] px-8 py-3.5 sm:px-10 sm:py-4"
          >
            <span className="relative z-10 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-black">
              Plan Your Event
            </span>
          </motion.div>
        </Link>

        {/* EXPLORE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={handleScrollDown}
          className="mt-10 sm:mt-12 flex flex-col items-center cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[#D4AF37]"
          >
            <ChevronDown size={22} />
          </motion.div>

          <p className="mt-2 text-[10px] tracking-[0.4em] text-gray-400 uppercase">
            Explore More
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;