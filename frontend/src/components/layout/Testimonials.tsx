// Testimonios: una cita grande a la vez sobre fondo nocturno; el visitante cambia de voz o rota sola.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const ROTATE_MS = 7000;

const testimonials = [
  {
    name: "Ana Pérez",
    location: "Guatemala City",
    role: "Propietaria",
    comment: "El aislamiento acústico es increíble. ¡Mi apartamento es mucho más tranquilo ahora!",
  },
  {
    name: "Carlos González",
    location: "Antigua Guatemala",
    role: "Arquitecto",
    comment: "La calidad de las ventanas superó mis expectativas. La eficiencia energética mejoró notablemente.",
  },
  {
    name: "Lucía Morales",
    location: "Quetzaltenango",
    role: "Propietaria",
    comment: "Un servicio al cliente excepcional de principio a fin. ¡Totalmente recomendados!",
  },
];

export const Testimonials = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % testimonials.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduce]);

  const t = testimonials[active];

  return (
    <section
      className="relative overflow-hidden bg-[hsl(215_35%_8%)] py-28 text-white md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--secondary)/0.16),transparent)]" />
      <span aria-hidden className="pointer-events-none absolute left-[4%] top-6 select-none font-display text-[18rem] font-black leading-none text-white/[0.04] md:text-[26rem]">
        “
      </span>

      <div className="container relative mx-auto">
        <h2 className="max-w-xl font-display text-3xl font-black leading-tight tracking-tighter text-balance md:text-5xl">
          La confianza de nuestros <span className="font-normal italic text-secondary">clientes</span>
        </h2>

        <div className="mt-14 min-h-[15rem] md:mt-20 md:min-h-[17rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex gap-1 text-secondary" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="max-w-4xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance md:text-5xl lg:text-[3.4rem]">
                {t.comment}
              </blockquote>
              <figcaption className="mt-8 text-white/65">
                <span className="font-semibold text-white">{t.name}</span> · {t.role}, {t.location}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 grid max-w-3xl grid-cols-3 gap-3 md:mt-16 md:gap-6" role="tablist" aria-label="Elegir testimonio">
          {testimonials.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="group text-left focus-visible:outline-none"
              >
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15 group-focus-visible:ring-2 group-focus-visible:ring-secondary group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-[hsl(215_35%_8%)]">
                  {on && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-secondary"
                      initial={{ width: reduce || paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce || paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span className={`mt-3 block text-sm font-semibold transition-colors ${on ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
                  {item.name}
                </span>
                <span className="block text-xs text-white/60">{item.role}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
