import ShaderBackground from "@/components/ShaderBackground";
import { Navbar }        from "@/components/Navbar";
import { HeroSection }   from "@/components/sections/HeroSection";
import { StatsBar }      from "@/components/sections/StatsBar";
import { ServicesSection }    from "@/components/sections/ServicesSection";
import { HowItWorks }    from "@/components/sections/HowItWorks";
import { WhySection }    from "@/components/sections/WhySection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection }    from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer }        from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <HowItWorks />
        <WhySection />
        <CertificatesSection />
        <PricingSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
