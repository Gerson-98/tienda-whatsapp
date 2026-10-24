// src/pages/HomePage.tsx

import { ServicesSection } from "@/components/layout/ServicesSection";
import { ContactForm } from "@/components/layout/ContactForm";
import { Testimonials } from "@/components/layout/Testimonials";
import { HeroWindow } from "@/components/layout/HeroWindow";
import { WindowConfigurator } from "@/components/layout/WindowConfigurator";
import { ProjectGallery } from "@/components/layout/ProjectGallery";
import { MotionSection } from "@/components/motion/FadeInSection";
import { WhyVentPro } from "@/components/layout/WhyVentPro";

export function HomePage() {
  return (
    <main className="-mt-20">
      <HeroWindow />

      {/* Diferenciador: el visitante dibuja su ventana y la manda a cotizar */}
      <WindowConfigurator />

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
        <ContactForm />
      </MotionSection>
    </main>
  );
}
