"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteGalleryImage,
  updateGalleryCaption,
} from "@/lib/actions/gallery";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GalleryImage } from "@/types";

const UPLOAD_CATEGORIES = GALLERY_CATEGORIES.filter((c) => c !== "All");

export function AdminGalleryCard({ image }: { image: GalleryImage }) {
  const [editOpen, setEditOpen] = useState(false);
  const [caption, setCaption] = useState(image.caption ?? "");
  const [category, setCategory] = useState(image.category);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleSaveCaption() {
    startTransition(async () => {
      const result = await updateGalleryCaption({
        id: image.id,
        caption,
        category,
      });
      if (result.status === "success") {
        toast.success(result.message);
        setEditOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  function handleDelete() {
    startDeleteTransition(async () => {
      const result = await deleteGalleryImage(image.id, image.storage_path);
      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-square">
        <Image
          src={image.url}
          alt={image.caption || "Gallery image"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Image Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label>Caption</Label>
                  <Input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSaveCaption} disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The image will be permanently
                  removed from the gallery and storage.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="truncate text-xs text-muted-foreground">
          {image.caption || "No caption"}
        </p>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {image.category}
        </Badge>
      </div>
    </div>
  );
}
