export type ActionState<T = undefined> =
  | { status: "idle" }
  | { status: "success"; message: string; data?: T }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type { Booking, ContactMessage, GalleryImage } from "./database";
