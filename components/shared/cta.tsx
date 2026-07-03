import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta({
  title = "Ready to Begin Your Celebration?",
  description = "Share your vision with us and let our team craft an experience your guests will remember forever.",
  primaryLabel = "Start Planning",
  primaryHref = "/booking",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-y bg-secondary text-secondary-foreground">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary via-secondary to-secondary/80 p-10 text-center sm:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, hsl(var(--gold)/0.35), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-secondary-foreground/70">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
