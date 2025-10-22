// src/pages/AboutPage.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, Lightbulb, Users } from "lucide-react"; // Iconos para nuestros valores
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// --- CAMBIO PARA ANIMACIONES: Importar MotionSection y MotionItem ---
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";

// Datos ficticios para el equipo (sin cambios)
const teamMembers = [
  {
    name: "Carlos Valdés",
    role: "Fundador y Director General",
    imageUrl: "/images/team/founder.jpg",
  },
  {
    name: "Ana Rivas",
    role: "Jefa de Proyectos",
    imageUrl: "/images/team/manager.jpg",
  },
  {
    name: "Luis Fernandez",
    role: "Técnico Especialista",
    imageUrl: "/images/team/technician.jpg",
  },
];

export const AboutPage = () => {
  return (
    <main className="-mt-16">
      {/* ========================================================== */}
      {/* === CAMBIO MAYOR: SECCIÓN HERO CON IMAGEN DE FONDO Y OVERLAY === */}
      {/* ========================================================== */}
      <div
        className="relative z-[-1] h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/about-hero.jpg')" }}
      >
        {/* Overlay oscuro para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white container pt-16">
          {" "}
          {/* Ajuste de padding */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Somos VentPro</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg md:text-xl">
            Más que ventanas, creamos espacios llenos de luz, confort y
            seguridad para tu vida.
          </p>
        </div>
      </div>
      {/* ========================================================== */}
      {/* ===          FIN CAMBIO SECCIÓN HERO                   === */}
      {/* ========================================================== */}

      {/* SECCIÓN: NUESTRA HISTORIA */}
      {/* --- CAMBIO PARA ANIMACIONES: Envolver en MotionSection y MotionItem --- */}
      <MotionSection className="container py-20">
        <MotionItem className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-muted-foreground mb-4">
              VentPro nació en 2010 en un pequeño taller, con una idea simple
              pero poderosa de nuestro fundador, Carlos Valdés: las familias
              merecían ventanas que no solo se vieran bien, sino que realmente
              funcionaran. Frustrado por la baja calidad y el pobre aislamiento
              de las opciones en el mercado, Carlos dedicó años a perfeccionar
              la técnica de instalación de ventanas de PVC.
            </p>
            <p className="text-muted-foreground">
              Lo que comenzó con recomendaciones de boca en boca, gracias a una
              obsesión por el detalle y la satisfacción del cliente, hoy se ha
              convertido en una empresa líder, reconocida por su calidad y
              compromiso. Cada proyecto lleva consigo el mismo espíritu
              fundador: transformar hogares y mejorar vidas, una ventana a la
              vez.
            </p>
          </div>
          <div>
            <img
              src="/images/team/history1.jpg"
              alt="Taller original de VentPro"
              className="rounded-lg shadow-lg"
            />
          </div>
        </MotionItem>
      </MotionSection>

      {/* SECCIÓN: NUESTRA MISIÓN */}
      {/* --- CAMBIO PARA ANIMACIONES: Envolver en MotionSection y MotionItem --- */}
      <div className="bg-muted">
        <MotionSection className="container py-20">
          <MotionItem className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/team/history2.jpg"
                alt="Equipo de VentPro planificando un proyecto"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground mb-4">
                Nuestra misión va más allá de instalar ventanas. Buscamos ser
                tus asesores de confianza en confort y eficiencia energética.
                Creemos que cada hogar es único, por lo que ofrecemos una
                atención personalizada desde la primera llamada hasta el último
                ajuste.
              </p>
              <p className="text-muted-foreground">
                Combinamos la artesanía tradicional con la tecnología más
                avanzada para garantizar que cada instalación no solo cumpla,
                sino que supere tus expectativas. Queremos que, al mirar a
                través de una de nuestras ventanas, veas un futuro más claro,
                tranquilo y seguro.
              </p>
            </div>
          </MotionItem>
        </MotionSection>
      </div>

      {/* SECCIÓN: NUESTROS VALORES */}
      {/* --- CAMBIO PARA ANIMACIONES: Envolver en MotionSection y cada valor en MotionItem --- */}
      <MotionSection className="container py-20 text-center">
        <MotionItem>
          <h2 className="text-3xl font-bold mb-10">Nuestros Pilares</h2>
        </MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MotionItem className="flex flex-col items-center">
            <Gem className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calidad Insuperable</h3>
            <p className="text-muted-foreground">
              Solo usamos materiales de primera y técnicas probadas para
              garantizar un producto final que perdure.
            </p>
          </MotionItem>
          <MotionItem className="flex flex-col items-center">
            <Lightbulb className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovación Constante</h3>
            <p className="text-muted-foreground">
              Buscamos activamente las últimas tecnologías en aislamiento y
              seguridad para ofrecerte lo mejor.
            </p>
          </MotionItem>
          <MotionItem className="flex flex-col items-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Compromiso con el Cliente
            </h3>
            <p className="text-muted-foreground">
              Tu satisfacción es nuestra prioridad. Te acompañamos antes,
              durante y después de la instalación.
            </p>
          </MotionItem>
        </div>
      </MotionSection>

      {/* SECCIÓN: CALL TO ACTION */}
      {/* --- CAMBIO PARA ANIMACIONES: Envolver en MotionSection y MotionItem --- */}
      <div className="bg-muted">
        {" "}
        {/* Añadido fondo para que el CTA se vea mejor contra la siguiente sección */}
        <MotionSection className="container py-20 text-center">
          <MotionItem>
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para transformar tu espacio?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Permítenos mostrarte por qué somos la mejor opción para tu
              proyecto. Explora nuestro trabajo o contáctanos para una
              cotización sin compromiso.
            </p>
          </MotionItem>
          <MotionItem>
            <Button size="lg" asChild>
              <Link to="/proyectos">Ver Nuestros Proyectos</Link>
            </Button>
          </MotionItem>
        </MotionSection>
      </div>
    </main>
  );
};
