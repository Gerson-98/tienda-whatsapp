// src/pages/HomePage.tsx

import { ServicesSection } from "@/components/layout/ServicesSection";
import { ContactForm } from "@/components/layout/ContactForm";
import { Testimonials } from "@/components/layout/Testimonials";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ProjectGallery } from "@/components/layout/ProjectGallery";
import { MotionSection } from "@/components/motion/FadeInSection";
import { ContactInfo } from "@/components/layout/ContactInfo";

// HomePage solo debe exportar el contenido principal <main>
export function HomePage() {
  return (
    <main className="-mt-16">
      <HeroCarousel />
      <div className="relative z-30 -mt-32 rounded-t-3xl bg-transparent">
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
          <ContactForm />
        </MotionSection>

        <MotionSection>
          <ContactInfo />
        </MotionSection>
      </div>
    </main>
  );
}
