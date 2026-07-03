import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Changed to a relative flex column to allow pages to dictate their own spacing
    <div className="relative flex min-h-screen flex-col m-0 p-0">
      <Navbar />
      
      {/* The children (your pages) will now sit at absolute top-0. 
        Your Hero component is already built to handle this perfectly. 
      */}
      {children}
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}