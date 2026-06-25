import ShaderBackground from "@/components/ShaderBackground";
import { Navbar }        from "@/components/Navbar";
import { HeroSection }   from "@/components/sections/HeroSection";
import { ServicesSection }    from "@/components/sections/ServicesSection";
import { HowItWorks }    from "@/components/sections/HowItWorks";
import { WhySection }    from "@/components/sections/WhySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { MediaSection }  from "@/components/sections/MediaSection";
import { InstructionSection } from "@/components/sections/InstructionSection";
import { GeographySection }   from "@/components/sections/GeographySection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
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
        <ServicesSection />
        <HowItWorks />
        <WhySection />
        <PricingSection />
        <MediaSection />
        <InstructionSection />
        <GeographySection />
        <CertificatesSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
