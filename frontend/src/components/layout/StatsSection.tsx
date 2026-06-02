import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const STATS = [
  { value: "+200", label: "Proyectos" },
  { value: "15+", label: "Años de experiencia" },
  { value: "100%", label: "Garantía" },
  { value: "GT", label: "Toda Guatemala" },
];

export const StatsSection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-muted/50 py-16 border-y border-border">
      <div className="container mx-auto">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={reduce ? undefined : fadeUp}
              className="text-center"
            >
              <div className="font-display font-black text-4xl md:text-5xl text-primary tracking-tighter">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
