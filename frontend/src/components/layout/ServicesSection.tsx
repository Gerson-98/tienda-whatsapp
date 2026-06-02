import { motion, useReducedMotion } from "framer-motion";
import {
  Square,
  ShieldCheck,
  Waves,
  RefreshCw,
  DoorOpen,
  ThermometerSun,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

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

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Soluciones
          </span>
          <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tighter">
            Nuestras soluciones en{" "}
            <span className="text-gradient">PVC</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg font-light">
            Productos diseñados para el confort, la seguridad y la estética de tu hogar.
          </p>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={reduce ? undefined : fadeUp}
              className="group bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary p-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-display font-bold text-xl mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
