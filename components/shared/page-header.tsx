export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, hsl(var(--gold)/0.3), transparent 45%)",
        }}
      />
      {/* Adjusted padding here: pt-24 pb-8 */}
      <div className="container-luxe relative pt-24 pb-8 sm:pt-32 sm:pb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-secondary-foreground/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}