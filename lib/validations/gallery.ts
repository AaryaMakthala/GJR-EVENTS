import { z } from "zod";
import { GALLERY_CATEGORIES } from "@/lib/constants";

const CATEGORY_VALUES = GALLERY_CATEGORIES.filter((c) => c !== "All") as [
  string,
  ...string[],
];

export const galleryUploadSchema = z.object({
  caption: z.string().trim().max(150, "Caption is too long").optional(),
  category: z.enum(CATEGORY_VALUES, {
    message: "Please select a category",
  }),
});

export const galleryCaptionSchema = z.object({
  id: z.string().uuid(),
  caption: z.string().trim().max(150, "Caption is too long"),
  category: z.enum(CATEGORY_VALUES, {
    message: "Please select a category",
  }),
});

export type GalleryUploadValues = z.infer<typeof galleryUploadSchema>;
export type GalleryCaptionValues = z.infer<typeof galleryCaptionSchema>;
