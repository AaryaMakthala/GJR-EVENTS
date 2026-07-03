import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { validateEnv } from "@/lib/env";

validateEnv();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Event Management`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "event management",
    "wedding planner",
    "luxury events",
    "corporate events India",
    "GJR Events",
  ],
  openGraph: {
    title: `${SITE_NAME} | Premium Event Management`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Event Management`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // Added bg-black, m-0, p-0, and overflow-x-hidden to completely eliminate gaps
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-black text-white m-0 p-0 overflow-x-hidden min-h-screen`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}