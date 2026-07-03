import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6 text-center text-secondary-foreground">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </div>
      <p className="mt-6 font-serif text-6xl font-semibold text-gold-light">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold">Page Not Found</h1>
      <p className="mt-3 max-w-md text-secondary-foreground/70">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back to celebrating.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
