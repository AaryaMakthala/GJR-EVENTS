import { FaWhatsapp } from "react-icons/fa";   // or use AiOutlineWhatsApp from "react-icons/ai"
import { WHATSAPP_PHONE } from "@/lib/constants";

export function WhatsAppButton() {
  if (!WHATSAPP_PHONE) return null;

  const sanitizedPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hi GJR Events, I'd like to know more about your services."
  );

  return (
    <a
      href={`https://wa.me/${sanitizedPhone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {/* Replace the icon with WhatsApp SVG */}
      <FaWhatsapp className="h-7 w-7" />   {/* No fill/stroke needed – it's a colored logo */}
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}