"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import {
  galleryCaptionSchema,
  type GalleryCaptionValues,
} from "@/lib/validations/gallery";
import type { ActionState } from "@/types";

const BUCKET = "gallery";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function uploadGalleryImage(
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const caption = (formData.get("caption") as string | null) ?? "";
  const category = (formData.get("category") as string | null) ?? "";

  if (!file || file.size === 0) {
    return { status: "error", message: "Please select an image to upload." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      status: "error",
      message: "Only JPG, PNG, WEBP, or AVIF images are allowed.",
    };
  }
  if (file.size > MAX_SIZE) {
    return { status: "error", message: "Image must be smaller than 8MB." };
  }
  if (!category) {
    return { status: "error", message: "Please select a category." };
  }

  try {
    const supabase = createAdminClient();
    const ext = file.name.split(".").pop() || "jpg";
    const storagePath = `${category.toLowerCase()}/${randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Gallery upload error:", uploadError);
      return {
        status: "error",
        message: "Failed to upload image. Please try again.",
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const { error: insertError } = await supabase.from("gallery_images").insert({
      url: publicUrlData.publicUrl,
      storage_path: storagePath,
      caption: caption || null,
      category,
    });

    if (insertError) {
      console.error("Gallery insert error:", insertError);
      await supabase.storage.from(BUCKET).remove([storagePath]);
      return {
        status: "error",
        message: "Failed to save image details. Please try again.",
      };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/dashboard/gallery");

    return { status: "success", message: "Image uploaded successfully." };
  } catch (error) {
    console.error("Gallery upload action error:", error);
    return {
      status: "error",
      message: "Something went wrong while uploading. Please try again.",
    };
  }
}

export async function deleteGalleryImage(
  id: string,
  storagePath: string
): Promise<ActionState> {
  await requireAdmin();

  try {
    const supabase = createAdminClient();

    const { error: storageError } = await supabase.storage
      .from(BUCKET)
      .remove([storagePath]);

    if (storageError) {
      console.error("Gallery storage delete error:", storageError);
    }

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);

    if (error) {
      console.error("Gallery delete error:", error);
      return {
        status: "error",
        message: "Failed to delete image. Please try again.",
      };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/dashboard/gallery");

    return { status: "success", message: "Image deleted successfully." };
  } catch (error) {
    console.error("Gallery delete action error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function updateGalleryCaption(
  values: GalleryCaptionValues
): Promise<ActionState> {
  await requireAdmin();

  const parsed = galleryCaptionSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please provide a valid caption and category.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("gallery_images")
      .update({
        caption: parsed.data.caption || null,
        category: parsed.data.category,
      })
      .eq("id", parsed.data.id);

    if (error) {
      console.error("Gallery caption update error:", error);
      return {
        status: "error",
        message: "Failed to update caption. Please try again.",
      };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/dashboard/gallery");

    return { status: "success", message: "Caption updated successfully." };
  } catch (error) {
    console.error("Gallery caption action error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
