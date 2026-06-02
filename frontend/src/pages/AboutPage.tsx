// src/pages/AboutPage.tsx

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Gem, Lightbulb, Users, Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";

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

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div className="relative min-h-[40vh] flex items-center bg-primary text-primary-foreground overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero/about-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container relative z-10 mx-auto text-center py-20">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Somos VentPro
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light opacity-90">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Nuestra historia
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tighter">
              Un recorrido de <span className="text-gradient">15 años</span>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
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
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "" : "md:[&>div]:order-2"
                  }`}
                >
                  <div
                    className={`absolute left-4 md:left-1/2 top-2 h-3 w-3 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background`}
                  />
                  <div
                    className={
                      i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8 md:col-start-2"
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
      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
            Nuestros <span className="text-gradient">pilares</span>
          </h2>
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
              className="bg-card rounded-2xl p-8 border border-border text-center"
            >
              <div className="inline-flex bg-primary/10 rounded-xl p-4 text-primary mb-4">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container mx-auto pb-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
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
