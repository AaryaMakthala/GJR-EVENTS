import type { FaqItem, NavLink, ServiceItem, TestimonialItem } from "@/types";

export const SITE_NAME = "GJR EVENTS";
export const SITE_DESCRIPTION =
  "Premium event management and production — DJ, lighting, decor, and full event coordination crafted to perfection.";
export const SITE_URL = "https://gjrevents.com";

export const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || "";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/gallery" },
  { label: "Clients", href: "/clients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT_INFO = {
  managerName: "Jaswanth Reddy",
  role: "Event Manager & Founder",
  phone: "9515720876",
  phoneDisplay: "+91 95157 20876",
  email: "jaswanth7654@gmail.com",
  location: "Hayathnagar, Hyderabad, Telangana",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/g.j.r_events_productions?igsh=OHNnaXl1djRya3E0",
  whatsappChannel: "https://whatsapp.com/channel/0029VbBwjj72P59l3u5ncx0c",
};

export const GALLERY_CATEGORIES = [
  "All",
  "Weddings",
  "Corporate",
  "Birthdays",
  "Engagements",
  "Decor",
] as const;

export const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Product Launch",
  "Other",
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: "dj-sound",
    title: "DJ & Sound",
    description:
      "Professional DJs and premium sound systems that keep every celebration alive from start to finish.",
    icon: "Music",
    features: [
      "Experienced live DJs",
      "Premium sound & speaker systems",
      "Custom playlists for every moment",
      "MC & announcement support",
    ],
  },
  {
    id: "lighting-production",
    title: "Lighting & Production",
    description:
      "Dynamic lighting design that transforms any venue into a stunning, atmosphere-rich celebration.",
    icon: "Sparkles",
    features: [
      "Stage & dance floor lighting",
      "LED & ambient lighting design",
      "Special effects (haze, sparkular, etc.)",
      "Sync'd lighting with music",
    ],
  },
  {
    id: "decor-styling",
    title: "Decor & Styling",
    description:
      "Bespoke decor concepts — florals, backdrops, and thematic installations for every occasion.",
    icon: "Flower2",
    features: [
      "Theme conceptualization",
      "Floral & backdrop design",
      "Stage & entry decor",
      "Custom installations",
    ],
  },
  {
    id: "wedding-events",
    title: "Wedding & Celebration Planning",
    description:
      "Full planning and on-ground coordination for weddings, engagements, and milestone celebrations.",
    icon: "Heart",
    features: [
      "Venue coordination",
      "Vendor management",
      "Full-day event execution",
      "Bridal & groom entry design",
    ],
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    description:
      "Conferences, product launches, and brand experiences executed with precision and polish.",
    icon: "Briefcase",
    features: [
      "Stage & AV production",
      "Guest management",
      "Branding & signage",
      "Full event coordination",
    ],
  },
  {
    id: "milestone-celebrations",
    title: "Milestone Celebrations",
    description:
      "Birthdays, anniversaries, and family milestones celebrated with warmth and grandeur.",
    icon: "PartyPopper",
    features: [
      "Themed party planning",
      "Entertainment booking",
      "Decor & lighting setup",
      "Full event management",
    ],
  },
];

export const SERVICES_NOTE =
  "We handle everything for your event — DJ, lighting, decor, and complete coordination — except food and destination travel. Pricing is discussed personally on a call, tailored to your event.";

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Ananya & Rohan",
    event: "Wedding",
    quote:
      "GJR Events turned our wedding into a dream we never wanted to wake up from. Every detail was flawless.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Vikram Malhotra",
    event: "Corporate Launch",
    quote:
      "Professional, punctual, and incredibly creative. Our product launch was the talk of the industry.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Sharma",
    event: "50th Anniversary",
    quote:
      "They understood our vision instantly and delivered beyond expectations. Truly a premium experience.",
    rating: 5,
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "How far in advance should we book?",
    answer:
      "We recommend booking 4-8 weeks in advance for weddings and large events, though we can accommodate shorter timelines depending on availability.",
  },
  {
    id: "f2",
    question: "What all do you handle for an event?",
    answer:
      "We take care of everything — DJ, sound, lighting, decor, and full event coordination — except food and destination travel arrangements.",
  },
  {
    id: "f3",
    question: "How is pricing decided?",
    answer:
      "Every event is different, so pricing is discussed personally on a call based on your guest count, venue, and requirements. Reach out and we'll walk you through it.",
  },
  {
    id: "f4",
    question: "Where can I see updates about upcoming events?",
    answer:
      "Follow our Instagram page and join our WhatsApp Channel — we post event highlights and availability updates there regularly.",
  },
];
