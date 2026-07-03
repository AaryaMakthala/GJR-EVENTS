"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { uploadGalleryImage } from "@/lib/actions/gallery";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const UPLOAD_CATEGORIES = GALLERY_CATEGORIES.filter((c) => c !== "All");

export function GalleryUploadDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    // --- 10MB FILE SIZE LIMIT CHECK ---
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("Image size exceeds 10MB. Please select a smaller photo.");
      e.target.value = ""; // Crucial: Clears the input so they can try again
      setPreview(null); // Removes any previous preview
      return;
    }
    // ----------------------------------

    setPreview(URL.createObjectURL(file));
  }

  function onSubmit(formData: FormData) {
    if (category) formData.set("category", category);

    startTransition(async () => {
      const result = await uploadGalleryImage(formData);
      if (result.status === "success") {
        toast.success(result.message);
        formRef.current?.reset();
        setPreview(null);
        setCategory("");
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </DialogTrigger>
      {/* Added max-h-[90vh] and overflow-y-auto to ensure the dialog fits on small mobile screens */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Gallery Image</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="file">Image File (Max 10MB)</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              required
            />
            {preview && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-40 w-full rounded-md object-cover"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {UPLOAD_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Input id="caption" name="caption" placeholder="e.g. Riya & Arjun's Wedding" />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !category || !preview} className="w-full sm:w-auto">
              {isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}