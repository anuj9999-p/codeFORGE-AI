import { Hero } from "@/components/features/landing/hero";
import { StatsCompanies } from "@/components/features/landing/stats-companies";
import { FeatureShowcase } from "@/components/features/landing/feature-showcase";
import { Testimonials } from "@/components/features/landing/testimonials";
import { Pricing } from "@/components/features/landing/pricing";
import { FAQ } from "@/components/features/landing/faq";
import { Newsletter } from "@/components/features/landing/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCompanies />
      <FeatureShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
    </>
  );
}
