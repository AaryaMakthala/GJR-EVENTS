"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/20 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg shadow-black/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Increased heights for a more premium, spacious feel */}
      <nav className="container-luxe flex h-16 lg:h-[80px] items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="flex items-center transition-opacity duration-300 hover:opacity-80" 
          aria-label={SITE_NAME}
        >
          <span className="flex items-center">
           <Image
  src="/logo.png"
  alt={`${SITE_NAME} logo`}
  width={240}
  height={80}
  priority
  // h-[48px] makes it bigger on mobile, h-[72px] keeps your perfect PC size
  className="w-auto object-contain transition-all duration-300 h-[48px] lg:h-[72px]"
/>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300",
                pathname === link.href
                  ? "text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  : "text-gray-200 hover:text-[#D4AF37]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Premium Golden Button */}
        <div className="hidden lg:flex items-center h-full">
          <Link
            href="/booking"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            Book Event
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-200 transition-colors hover:text-[#D4AF37] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu remains unchanged */}
      {open && (
        <div className="border-t border-[#D4AF37]/20 bg-[rgba(0,0,0,0.95)] backdrop-blur-xl lg:hidden transition-all duration-300 ease-in-out">
          <div className="container-luxe flex flex-col gap-2 py-6 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-4 py-3 text-sm font-medium uppercase tracking-widest transition-colors",
                  pathname === link.href
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-300 hover:bg-white/5 hover:text-[#D4AF37]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition-all active:scale-95"
            >
              Book Event
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}