"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6 text-center text-secondary-foreground">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Something Went Wrong</h1>
      <p className="mt-3 max-w-md text-secondary-foreground/70">
        We ran into an unexpected issue. Please try again, or return to the
        homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
