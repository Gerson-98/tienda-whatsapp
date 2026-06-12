import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Square,
  ShieldCheck,
  Waves,
  RefreshCw,
  DoorOpen,
  ThermometerSun,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useGlassGlow } from "@/lib/useGlassGlow";

const services = [
  {
    icon: Square,
    title: "Ventanas Corredizas",
    description:
      "Ideales para espacios modernos, maximizan la luz y la vista con un deslizamiento suave y sin esfuerzo.",
  },
  {
    icon: ShieldCheck,
    title: "Ventanas Fijas",
    description:
      "Perfectas para seguridad y aislamiento. Ofrecen una solución duradera sin partes móviles.",
  },
  {
    icon: RefreshCw,
    title: "Ventanas Oscilobatientes",
    description:
      "Versatilidad y ventilación segura con su doble sistema de apertura, perfectas para cualquier clima.",
  },
  {
    icon: DoorOpen,
    title: "Puertas de PVC",
    description:
      "Combina seguridad y estilo con nuestras puertas de PVC, disponibles para terrazas, balcones y entradas.",
  },
  {
    icon: Waves,
    title: "Aislamiento Acústico",
    description:
      "Reduce el ruido exterior significativamente, creando un ambiente de paz y tranquilidad en tu hogar.",
  },
  {
    icon: ThermometerSun,
    title: "Aislamiento Térmico",
    description:
      "Mantén tu hogar fresco en verano y cálido en invierno, optimizando el consumo de energía.",
  },
];

export const ServicesSection = () => {
  const reduce = useReducedMotion();
  const handleGlow = useGlassGlow();

  const windowServices = services.slice(0, 4);
  const performanceServices = services.slice(4);

  const renderCard = ({ icon: Icon, title, description }: (typeof services)[number]) => (
    <motion.div
      key={title}
      variants={reduce ? undefined : fadeUp}
      onMouseMove={handleGlow}
      className="group glass-glow glass-sheen relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Ícono */}
      <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" aria-hidden />
      </div>

      {/* Contenido */}
      <h3 className="relative z-10 mt-5 font-display font-bold text-xl mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Línea de acento inferior — se expande en hover */}
      <div className="relative z-10 mt-5 h-0.5 bg-secondary rounded-full w-12 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
            Nuestras soluciones en{" "}
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">PVC</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg font-light">
            Productos diseñados para el confort, la seguridad y la estética — en tu hogar
            o en tu próximo proyecto.
          </p>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {windowServices.map(renderCard)}
        </motion.div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {performanceServices.map(renderCard)}
        </motion.div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/productos">
              Ver catálogo completo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
