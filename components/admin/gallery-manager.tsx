import { AdminGalleryCard } from "@/components/admin/admin-gallery-card";
import { GalleryUploadDialog } from "@/components/admin/gallery-upload-dialog";
import { ImageOff } from "lucide-react";
import type { GalleryImage } from "@/types";

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Gallery Manager</h1>
          <p className="text-sm text-muted-foreground">
            Upload, edit, and organize your portfolio images.
          </p>
        </div>
        <GalleryUploadDialog />
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
          <ImageOff className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-serif text-lg font-semibold">
            No images uploaded yet
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Click &ldquo;Upload Image&rdquo; to add your first photo to the
            gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((image) => (
            <AdminGalleryCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}
