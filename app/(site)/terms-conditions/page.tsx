import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions for using GJR Events' services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <section className="section-y bg-background">
        <div className="container-luxe max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using the GJR Events website and submitting a
              booking or contact request, you agree to be bound by these
              Terms & Conditions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              2. Booking Requests
            </h2>
            <p className="mt-3">
              Submitting a booking request through our website does not
              constitute a confirmed booking. All bookings are subject to
              availability confirmation and a formal agreement between GJR
              Events and the client.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              3. Payments & Deposits
            </h2>
            <p className="mt-3">
              A deposit is required to secure your event date once a booking
              is confirmed. Remaining payments are scheduled according to
              the terms outlined in your service agreement.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              4. Cancellations
            </h2>
            <p className="mt-3">
              Cancellation policies vary based on the services booked and
              will be detailed in your individual service agreement.
              Deposits may be non-refundable depending on the timing of
              cancellation.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              5. Liability
            </h2>
            <p className="mt-3">
              GJR Events is not liable for circumstances beyond our
              reasonable control, including but not limited to weather,
              vendor failure, or force majeure events affecting the planned
              celebration.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              6. Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website, including images, text, and
              branding, is the property of GJR Events and may not be
              reproduced without written consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              7. Governing Law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of India, and any
              disputes shall be resolved within the jurisdiction of
              Hyderabad, Telangana.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
