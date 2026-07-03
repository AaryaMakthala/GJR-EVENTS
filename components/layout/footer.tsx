import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  CONTACT_INFO,
  NAV_LINKS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";

// --- Icon Definitions ---
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
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.11 8.11 0 0 1-4.13-1.13l-.3-.17-3.06.76.82-2.98-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.12-8.1 2.17 0 4.2.84 5.74 2.38a8.06 8.06 0 0 1 2.38 5.74c0 4.47-3.64 8.09-8.12 8.09Zm4.45-6.06c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

// --- Main Footer Component ---
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050608] text-gray-300">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              alt={`${SITE_NAME} logo`}
              width={200}
              height={64}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            {SITE_DESCRIPTION}
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-white uppercase tracking-wider">Explore</h3>
          <ul className="mt-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-gray-400 transition-colors hover:text-[#D4AF37]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-white uppercase tracking-wider">Contact</h3>
          <ul className="mt-6 space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <span>{CONTACT_INFO.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
              <a href={`tel:+91${CONTACT_INFO.phone}`} className="hover:text-[#D4AF37]">
                {CONTACT_INFO.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#D4AF37]">
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/50">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs uppercase tracking-widest text-gray-500 md:flex-row">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D4AF37]">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-[#D4AF37]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}