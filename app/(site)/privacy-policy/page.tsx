import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read GJR Events' privacy policy regarding data collection and usage.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section-y bg-background">
        <div className="container-luxe max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p className="mt-3">
              GJR Events collects information you voluntarily provide when
              submitting a booking request or contact form, including your
              name, email address, phone number, event details, and any
              additional messages you share with us.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use the information you provide solely to respond to your
              inquiries, plan and coordinate your event, and communicate
              updates related to your booking. We do not sell or rent your
              personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              3. Data Storage & Security
            </h2>
            <p className="mt-3">
              Your data is stored securely using Supabase infrastructure with
              industry-standard encryption and access controls. Access to
              your data is restricted to authorized GJR Events personnel
              only.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              4. Third-Party Services
            </h2>
            <p className="mt-3">
              We use trusted third-party services, including Supabase for
              data storage and Telegram for internal notifications, to
              operate our booking system efficiently. These providers are
              bound by their own privacy and security practices.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              5. Your Rights
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us at
              hello@gjrevents.com.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              6. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this privacy policy periodically. Continued use
              of our website constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
