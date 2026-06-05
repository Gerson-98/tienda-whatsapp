// src/pages/HomePage.tsx

import { ServicesSection } from "@/components/layout/ServicesSection";
import { ContactForm } from "@/components/layout/ContactForm";
import { Testimonials } from "@/components/layout/Testimonials";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ProjectGallery } from "@/components/layout/ProjectGallery";
import { MotionSection } from "@/components/motion/FadeInSection";
import { ContactInfo } from "@/components/layout/ContactInfo";
import { StatsSection } from "@/components/layout/StatsSection";
import { CTASection } from "@/components/layout/CTASection";
import { WhyVentPro } from "@/components/layout/WhyVentPro";

export function HomePage() {
  return (
    <main className="-mt-20">
      <HeroCarousel />

      <StatsSection />

      {/* Sección diferenciadora — rompe el ritmo justo después del hero */}
      <WhyVentPro />

      <MotionSection animateOnLoad={true}>
        <ProjectGallery />
      </MotionSection>

      <MotionSection>
        <ServicesSection />
      </MotionSection>

      <MotionSection>
        <Testimonials />
      </MotionSection>

      <MotionSection>
        <CTASection />
      </MotionSection>

      <MotionSection>
        <ContactForm />
      </MotionSection>

      <MotionSection>
        <ContactInfo />
      </MotionSection>
    </main>
  );
}
