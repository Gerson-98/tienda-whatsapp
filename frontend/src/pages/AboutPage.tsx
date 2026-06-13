// src/pages/AboutPage.tsx

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Gem, Lightbulb, Users, Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useHeroImage } from "@/lib/siteSettings";
import { useGlassGlow } from "@/lib/useGlassGlow";
import { LightRays } from "@/components/layout/LightRays";

const VALUES = [
  {
    icon: Gem,
    title: "Calidad insuperable",
    description:
      "Materiales de primera y técnicas probadas para un producto final que perdure.",
  },
  {
    icon: Lightbulb,
    title: "Innovación constante",
    description:
      "Las últimas tecnologías en aislamiento y seguridad al servicio de tu hogar.",
  },
  {
    icon: Users,
    title: "Compromiso con el cliente",
    description:
      "Te acompañamos antes, durante y después de la instalación.",
  },
];

const TIMELINE = [
  { year: "2010", title: "Nacemos", text: "Carlos Valdés funda VentPro en un pequeño taller." },
  { year: "2014", title: "Crecimiento", text: "Ampliamos operaciones a toda la zona metropolitana." },
  { year: "2019", title: "Innovación", text: "Incorporamos sistemas de aislamiento térmico premium." },
  { year: "2024", title: "Líderes", text: "Más de 200 proyectos entregados en Guatemala." },
];

export const AboutPage = () => {
  const reduce = useReducedMotion();
  const handleGlow = useGlassGlow();
  const heroImage = useHeroImage("heroAboutImage", "/images/hero/about-hero.jpg");

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative min-h-[45vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Somos VentPro
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light text-white/85">
            Más que ventanas: creamos espacios llenos de luz, confort y seguridad.
          </p>
        </div>
      </div>

      {/* MISIÓN / VISIÓN */}
      <section className="container mx-auto py-20">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <div className="inline-flex bg-primary/10 rounded-xl p-3 text-primary mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="font-display font-bold text-xl mb-3">Misión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser tus asesores de confianza en confort y eficiencia energética,
              combinando artesanía y tecnología para superar tus expectativas.
            </p>
          </motion.div>
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <div className="inline-flex bg-secondary/15 rounded-xl p-3 text-secondary mb-4">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="font-display font-bold text-xl mb-3">Visión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Convertirnos en la marca líder en soluciones de aluminio y PVC de
              Centroamérica, sinónimo de calidad y diseño.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="bg-muted/50 py-20 border-y border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
              Un recorrido de <span className="text-secondary">15 años</span>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />
            <motion.div
              variants={reduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-12"
            >
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  variants={reduce ? undefined : fadeUp}
                  className={`relative pl-12 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-12 ${
                    i % 2 === 0 ? "" : "lg:[&>div]:order-2"
                  }`}
                >
                  <div
                    className={`absolute left-4 lg:left-1/2 top-2 h-3 w-3 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background`}
                  />
                  <div
                    className={
                      i % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:pl-8 lg:col-start-2"
                    }
                  >
                    <div className="font-display font-black text-3xl text-primary tracking-tighter">
                      {t.year}
                    </div>
                    <h3 className="font-display font-bold text-lg mt-1">
                      {t.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
        {/* Patrón decorativo de fondo */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pilares" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pilares)" />
        </svg>

        {/* Rayos de luz solar atravesando vidrio */}
        <LightRays />

        <div className="container mx-auto relative z-10">
          {/* Cabecera asimétrica */}
          <div className="mb-14 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-12 md:items-end">
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white">
              Nuestros pilares
            </h2>
            <p className="text-white/60 font-light text-lg md:text-right">
              Tres principios que guían cada proyecto, desde la primera visita
              hasta el último ajuste en obra.
            </p>
          </div>

          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {VALUES.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={reduce ? undefined : fadeUp}
                onMouseMove={handleGlow}
                className="glass-glow glass-sheen relative bg-white/[0.06] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary mb-5">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="relative z-10 font-display font-bold text-xl text-white mb-3">
                  {title}
                </h3>
                <p className="relative z-10 text-white/60 text-sm leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter mb-4">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto mb-8 font-light">
            Explora nuestros proyectos o cotiza el tuyo sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/proyectos">
                Ver proyectos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/cotizacion">Cotizar ahora</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
