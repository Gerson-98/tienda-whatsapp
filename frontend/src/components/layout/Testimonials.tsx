import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "Ana Pérez",
    location: "Guatemala City",
    role: "Propietaria",
    comment:
      "El aislamiento acústico es increíble. ¡Mi apartamento es mucho más tranquilo ahora!",
    rating: 5,
  },
  {
    name: "Carlos González",
    location: "Antigua Guatemala",
    role: "Arquitecto",
    comment:
      "La calidad de las ventanas superó mis expectativas. La eficiencia energética mejoró notablemente.",
    rating: 5,
  },
  {
    name: "Lucía Morales",
    location: "Quetzaltenango",
    role: "Propietaria",
    comment:
      "Un servicio al cliente excepcional de principio a fin. ¡Totalmente recomendados!",
    rating: 5,
  },
];

export const Testimonials = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-muted/50 py-24 border-y border-border">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Testimonios
          </span>
          <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tighter">
            La confianza de nuestros{" "}
            <span className="text-gradient">clientes</span>
          </h2>
        </div>
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={reduce ? undefined : fadeUp}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <span className="font-display text-5xl text-primary leading-none">
                “
              </span>
              <p className="text-muted-foreground italic mt-2 leading-relaxed">
                {t.comment}
              </p>
              <div className="flex items-center gap-1 text-secondary mt-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
