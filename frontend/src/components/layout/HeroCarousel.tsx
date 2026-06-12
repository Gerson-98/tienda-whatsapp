// Hero asimétrico split — diferenciador vs competencia de layout centrado genérico
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { LightRays } from "@/components/layout/LightRays";
import { useHeroImage } from "@/lib/siteSettings";

const makeSlide = (xOffset: number, delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16, x: xOffset },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const HeroCarousel = () => {
  const reduce = useReducedMotion();
  const fadeLeft = makeSlide(reduce ? 0 : -24);
  const heroImage = useHeroImage(
    "heroHomeImage",
    "/images/hero/interior-minimalista.jpg"
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary flex items-center">
      {/* Decorativo: líneas diagonales SVG en el fondo */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diag" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="80" x2="80" y2="0" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* Rayos de luz solar atravesando vidrio */}
      <LightRays />

      {/* Gradiente para legibilidad del texto en mobile y desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/10 z-10 pointer-events-none" />

      {/* Imagen lado derecho con clip-path diagonal — efecto "vista a través de ventana" */}
      <div
        className="glass-sheen absolute inset-y-0 right-0 w-full md:w-[58%] z-0"
        style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <img
          src={heroImage}
          alt="Interior con ventanas VentPro"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1200}
          height={800}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/hero/interior-minimalista.jpg";
          }}
        />
        <div className="absolute inset-0 bg-primary/35" />
        {/* Marco de ventana — divisiones tipo cristal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
          <div className="absolute inset-4 border border-white/15" />
        </div>
      </div>

      {/* Contenido de texto */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 md:pb-20 md:min-h-screen md:flex md:items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Badge de marca */}
          <motion.div variants={fadeLeft}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Fabricación propia desde 2010
              </span>
            </div>
          </motion.div>

          {/* Título — responsive en tamaño */}
          <motion.h1
            variants={fadeLeft}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-white"
          >
            Diseño y eficiencia en{" "}
            <span className="text-secondary">ventanas premium</span>
          </motion.h1>

          <motion.p
            variants={fadeLeft}
            className="mt-6 text-base md:text-lg text-white/75 font-light leading-relaxed max-w-md"
          >
            Transformamos tu espacio con soluciones modernas, duraderas y de
            alto aislamiento térmico y acústico.
          </motion.p>

          {/* CTAs — verticales en mobile, horizontales en sm+ */}
          <motion.div
            variants={fadeLeft}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 font-semibold text-base shadow-lg"
            >
              <Link to="/cotizacion">
                Solicitar Cotización <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-full px-8 text-base"
            >
              <Link to="/proyectos">
                Ver Proyectos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-white/40">
        <div className="w-px h-10 bg-white/20" />
        <ChevronRight className="rotate-90 h-4 w-4" />
      </div>
    </section>
  );
};
