import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false }, // keep admin login out of search engines
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, hsl(var(--gold)/0.3), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}