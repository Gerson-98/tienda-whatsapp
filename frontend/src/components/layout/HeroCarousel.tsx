// Hero asimétrico split — diferenciador vs competencia de layout centrado genérico
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/SplitText";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { LightRays } from "@/components/layout/LightRays";
import { useHeroImage } from "@/lib/siteSettings";

const makeSlide = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

export const HeroCarousel = () => {
  const reduce = useReducedMotion();
  const heroImage = useHeroImage(
    "heroHomeImage",
    "/images/hero/interior-minimalista.jpg"
  );

  // Parallax — imagen se mueve al 35% de la velocidad del scroll
  const { scrollY } = useScroll();
  const imgParallaxY = useTransform(
    scrollY,
    [0, 700],
    reduce ? ["0%", "0%"] : ["0%", "-18%"]
  );

  const badgeVariant = makeSlide(0.1);
  const descVariant = makeSlide(0.72);
  const ctaVariant = makeSlide(0.88);

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

      {/* Rayos de luz solar */}
      <LightRays />

      {/* Gradiente legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/10 z-10 pointer-events-none" />

      {/* Imagen con clip-path diagonal + parallax */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[58%] z-0 overflow-hidden"
        style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <motion.img
          src={heroImage}
          alt="Interior con ventanas VentPro"
          className="w-full h-full object-cover scale-110"
          style={{ y: imgParallaxY }}
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
        {/* Marco de ventana */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
          <div className="absolute inset-4 border border-white/15" />
        </div>
      </div>

      {/* Contenido de texto */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 md:pb-20 md:min-h-screen md:flex md:items-center">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            variants={badgeVariant}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Fabricación propia desde 2010
              </span>
            </div>
          </motion.div>

          {/* Título con SplitText word-reveal */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-white">
            <SplitText delay={0.22} stagger={0.06} duration={0.58}>
              Diseño y eficiencia en
            </SplitText>
            <span className="block text-secondary">
              <SplitText delay={0.52} stagger={0.07} duration={0.6}>
                ventanas premium
              </SplitText>
            </span>
          </h1>

          <motion.p
            variants={descVariant}
            initial="hidden"
            animate="visible"
            className="mt-6 text-base md:text-lg text-white/75 font-light leading-relaxed max-w-md"
          >
            Transformamos tu espacio con soluciones modernas, duraderas y de
            alto aislamiento térmico y acústico.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ctaVariant}
            initial="hidden"
            animate="visible"
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
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-white/40">
        <div className="w-px h-10 bg-white/20" />
        <ChevronRight className="rotate-90 h-4 w-4" />
      </div>
    </section>
  );
};
