import { TESTIMONIALS } from "@/lib/constants";
import { TestimonialCard } from "@/components/shared/testimonial-card";

export function Testimonials() {
  return (
    <section className="section-y bg-muted/40">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Client Stories
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Loved by Those We&apos;ve Celebrated With
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
