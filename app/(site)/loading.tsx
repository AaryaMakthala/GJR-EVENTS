import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-luxe py-24">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <Skeleton className="mx-auto h-4 w-32" />
        <Skeleton className="mx-auto h-10 w-full max-w-md" />
        <Skeleton className="mx-auto h-4 w-full max-w-lg" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
