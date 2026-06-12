// Sección diferenciadora — rompe el ritmo visual, contrasta con el fondo claro
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useGlassGlow } from "@/lib/useGlassGlow";
import { LightRays } from "@/components/layout/LightRays";

const DIFFERENTIATORS = [
  {
    icon: HeartHandshake,
    title: "Asesoría técnica sin costo",
    description:
      "Nuestro equipo visita tu proyecto, mide, recomienda y cotiza. Sin compromiso, desde una sola ventana hasta un desarrollo completo.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía real de por vida",
    description:
      "No ofrecemos garantías de letra pequeña. Cada perfil, sellado y herraje está respaldado por nosotros. Si algo falla, lo resolvemos sin costo.",
  },
  {
    icon: Zap,
    title: "Entrega en 15 días hábiles",
    description:
      "Fabricamos bajo pedido con precisión. Sin retrasos ni excusas: te entregamos en el tiempo prometido o te devolvemos el anticipo.",
  },
];

export const WhyVentPro = () => {
  const reduce = useReducedMotion();
  const handleGlow = useGlassGlow();

  return (
    <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
      {/* Patrón decorativo de fondo */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-why" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-why)" />
      </svg>

      {/* Rayos de luz solar atravesando vidrio */}
      <LightRays />

      <div className="container mx-auto relative z-10">
        {/* Cabecera asimétrica */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-12 md:items-end">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white">
            Lo que nos hace diferentes
          </h2>
          <p className="text-white/60 font-light text-lg md:text-right">
            No somos otro proveedor de ventanas. Somos el equipo que hace que tu inversión,
            en casa o en obra, valga.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={reduce ? undefined : fadeUp}
              onMouseMove={handleGlow}
              className="glass-glow glass-sheen relative bg-white/[0.06] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary mb-5">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative z-10 font-display font-bold text-xl text-white mb-3 line-clamp-2">
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
  );
};
