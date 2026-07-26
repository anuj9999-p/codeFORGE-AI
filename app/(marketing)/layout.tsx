import { Navbar } from "@/components/features/landing/navbar";
import { Footer } from "@/components/features/landing/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
