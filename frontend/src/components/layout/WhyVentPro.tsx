// Diferenciadores: composición editorial (título fijo a la izquierda, promesas como filas a la derecha).
import { useRef, useEffect } from "react";
import { ShieldCheck, Zap, HeartHandshake, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { viewportOnce } from "@/lib/animations";

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

const STATS = [
  { value: 200, prefix: "+", label: "proyectos completados" },
  { value: 15, suffix: "+", label: "años de experiencia" },
  { value: 100, suffix: "%", label: "satisfacción garantizada" },
  { value: 18, label: "departamentos atendidos" },
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
    const controls = animate(count, to, { duration: 1.4, ease: "easeOut" });
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

export const WhyVentPro = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container mx-auto grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Columna fija: título y cifras */}
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tighter text-balance md:text-6xl">
            Lo que nos hace <span className="text-primary">diferentes</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg font-light text-muted-foreground">
            No somos otro proveedor de ventanas. Somos el equipo que hace que tu inversión, en casa o en obra, valga.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-5xl font-black tracking-tighter text-primary md:text-6xl">
                    <AnimatedNumber to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Promesas como filas */}
        <ul className="border-t border-border">
          {DIFFERENTIATORS.map(({ icon: Icon, title, description }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative border-b border-border"
            >
              <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-5 py-9 md:gap-8 md:py-12">
                <span className="mt-1 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground md:h-16 md:w-16">
                  <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <ArrowUpRight className="mt-2 hidden h-6 w-6 text-border transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-secondary md:block" aria-hidden />
              </div>
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-0 bg-secondary transition-[width] duration-700 ease-out group-hover:w-full" aria-hidden />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
