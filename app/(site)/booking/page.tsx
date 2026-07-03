import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { BookingForm } from "@/components/booking/booking-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Book Your Event",
  description:
    "Start planning your wedding, corporate event, or celebration with GJR Events. Submit your booking request today.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's Get Started"
        title="Book Your Celebration"
        description="Share your event details and our team will craft a personalized proposal within 24 hours."
      />
      {/* Tightened top padding (pt-4) to pull the form up toward the header */}
      <section className="pt-4 pb-24 bg-background">
        <div className="container-luxe max-w-3xl">
          <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-xl" />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}