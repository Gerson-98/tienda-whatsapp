import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 200, prefix: "+", label: "Proyectos completados" },
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 100, suffix: "%", label: "Satisfacción garantizada" },
  { value: 18, label: "Departamentos atendidos" },
];

const AnimatedNumber = ({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) { count.set(to); return; }
    const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="bg-accent/40 py-10 md:py-16 border-y border-primary/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 md:px-8 ${
                i < STATS.length - 1 ? "md:border-r md:border-primary/15" : ""
              }`}
            >
              {/* Línea decorativa vertical */}
              <div className="w-1 h-10 bg-secondary rounded-full mb-4" />

              <div className="font-display font-black text-3xl md:text-5xl text-primary tracking-tighter leading-none">
                <AnimatedNumber to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground uppercase tracking-widest leading-tight max-w-[120px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
