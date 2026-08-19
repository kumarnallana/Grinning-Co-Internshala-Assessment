import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Ingredients } from "@/components/sections/Ingredients";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LeadGen } from "@/components/sections/LeadGen";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <HowItWorks />
        <ProductShowcase />
        <Ingredients />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <LeadGen />
      </main>
      <Footer />
    </>
  );
}
