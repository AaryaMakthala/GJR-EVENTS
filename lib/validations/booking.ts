import { z } from "zod";
import { EVENT_TYPES } from "@/lib/constants";

export const bookingSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be 15 digits or fewer")
    .regex(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain digits, spaces, +, -, and ()"
    ),
  event_type: z.enum(EVENT_TYPES, {
    message: "Please select an event type",
  }),
  event_date: z
    .string()
    .min(1, "Please select an event date")
    .refine((val) => new Date(val).getTime() > Date.now() - 86400000, {
      message: "Event date must be today or in the future",
    }),
  guest_count: z.coerce
    .number({ message: "Please enter the expected number of guests" })
    .int("Guest count must be a whole number")
    .min(1, "Guest count must be at least 1")
    .max(10000, "Guest count seems too large"),
  location: z
    .string()
    .trim()
    .min(2, "Please enter the event location")
    .max(200, "Location is too long"),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long (max 2000 characters)")
    .optional()
    .nullable(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
