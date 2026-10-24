// Soluciones: lista a la izquierda y vista de la solución elegida a la derecha (cada ventana se dibuja).
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Waves, ThermometerSun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WindowDrawing, type WinType } from "@/components/layout/WindowDrawing";
import { cn } from "@/lib/utils";

type Service = { id: string; title: string; description: string; draw?: WinType; icon?: typeof Waves };

const services: Service[] = [
  { id: "corredizas", title: "Ventanas corredizas", draw: "corrediza", description: "Ideales para espacios modernos, maximizan la luz y la vista con un deslizamiento suave y sin esfuerzo." },
  { id: "fijas", title: "Ventanas fijas", draw: "fija", description: "Perfectas para seguridad y aislamiento. Ofrecen una solución duradera sin partes móviles." },
  { id: "oscilobatientes", title: "Ventanas oscilobatientes", draw: "oscilobatiente", description: "Versatilidad y ventilación segura con su doble sistema de apertura, perfectas para cualquier clima." },
  { id: "puertas", title: "Puertas de PVC", draw: "puerta", description: "Combina seguridad y estilo con nuestras puertas de PVC, disponibles para terrazas, balcones y entradas." },
  { id: "acustico", title: "Aislamiento acústico", icon: Waves, description: "Reduce el ruido exterior significativamente, creando un ambiente de paz y tranquilidad en tu hogar." },
  { id: "termico", title: "Aislamiento térmico", icon: ThermometerSun, description: "Mantén tu hogar fresco en verano y cálido en invierno, optimizando el consumo de energía." },
];

const Visual = ({ s }: { s: Service }) => {
  if (s.draw) {
    const door = s.draw === "puerta";
    return (
      <div className={cn("mx-auto", door ? "w-[34%] max-w-[170px]" : "w-[78%] max-w-[360px]")}>
        <WindowDrawing type={s.draw} w={door ? 90 : 150} h={door ? 210 : 120} material={door ? "pvc" : "aluminio"} color={door ? "grafito" : "blanco"} glass="claro" />
      </div>
    );
  }
  const Icon = s.icon!;
  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
      {[0, 1, 2].map((n) => (
        <span
          key={n}
          aria-hidden
          className="absolute inset-0 rounded-full border border-secondary/60 motion-safe:animate-[soundwave_3s_ease-out_infinite]"
          style={{ animationDelay: `${n}s` }}
        />
      ))}
      <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Icon className="h-11 w-11" aria-hidden />
      </span>
    </div>
  );
};

export const ServicesSection = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto">
        <div className="mb-12 grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tighter text-balance md:text-6xl">
            Soluciones en PVC y aluminio para cada espacio
          </h2>
          <p className="text-lg font-light text-muted-foreground md:text-right">
            Confort, seguridad y estética — en tu hogar o en tu próximo proyecto.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div role="tablist" aria-label="Soluciones" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-border lg:px-0 lg:pb-0">
            {services.map((s) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(s.id)}
                  onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setActive(s.id)}
                  className={cn(
                    "group relative shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-left font-display text-base font-bold tracking-tight transition-colors duration-300",
                    "lg:flex lg:items-center lg:justify-between lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-border lg:px-1 lg:py-6 lg:text-2xl",
                    on ? "border-primary bg-primary text-primary-foreground lg:bg-transparent lg:text-primary" : "border-border text-foreground/70 hover:text-foreground"
                  )}
                >
                  <span>{s.title}</span>
                  <ArrowRight className={cn("hidden h-5 w-5 transition-all duration-300 lg:block", on ? "translate-x-0 text-secondary opacity-100" : "-translate-x-2 opacity-0")} aria-hidden />
                  <span className={cn("absolute bottom-[-1px] left-0 hidden h-[2px] bg-secondary transition-[width] duration-500 lg:block", on ? "w-full" : "w-0")} aria-hidden />
                </button>
              );
            })}
          </div>

          <div className="glass-glow relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[hsl(203_55%_20%)] p-8 text-white md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,hsl(var(--secondary)/0.25),transparent_70%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                role="tabpanel"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 grid min-h-[380px] content-between gap-8"
              >
                <div className="flex min-h-[230px] items-center">
                  <Visual s={current} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{current.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-white/75">{current.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12">
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
