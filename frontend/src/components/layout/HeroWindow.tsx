// Portada con una ventana real: las hojas se abren al cargar y el visitante puede abrirlas o cerrarlas.
// El sol (brillo ámbar) sigue al cursor sobre el vidrio — la idea de "luz atravesando el vidrio".
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useHeroImage } from "@/lib/siteSettings";

const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN_DEFAULT = 0.6;

const Line = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Sash = ({ side, x }: { side: "left" | "right"; x: ReturnType<typeof useTransform<number, string>> }) => (
  <motion.div
    aria-hidden
    style={{ x }}
    className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-1/2 will-change-transform`}
  >
    {/* perfil de PVC blanco */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#eef1f3] to-[#cfd6da] p-[8px] sm:p-[10px]">
      {/* vidrio */}
      <div className="relative h-full w-full overflow-hidden bg-primary/15">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.04)_38%,rgba(255,255,255,.16)_62%,rgba(255,255,255,0)_100%)]" />
        <div className="win-glass absolute inset-0" />
      </div>
    </div>
    <span
      className={`absolute top-1/2 h-14 w-[5px] -translate-y-1/2 rounded-full bg-[#aab3b9] ${side === "left" ? "right-[3px]" : "left-[3px]"}`}
    />
  </motion.div>
);

export const HeroWindow = () => {
  const reduce = useReducedMotion();
  const heroImage = useHeroImage("heroHomeImage", "/images/hero/interior-minimalista.webp");

  const open = useMotionValue(reduce ? OPEN_DEFAULT : 0);
  const leftX = useTransform(open, (v) => `${-v * 100}%`);
  const rightX = useTransform(open, (v) => `${v * 100}%`);

  const frameRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const c = animate(open, OPEN_DEFAULT, { duration: 1.9, delay: 0.75, ease: EASE });
    return () => c.stop();
  }, [open, reduce]);

  useEffect(() => open.on("change", (v) => { if (rangeRef.current) rangeRef.current.value = String(Math.round(v * 100)); }), [open]);

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, -50]);

  const setSun = (e: React.PointerEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    if (dragging.current) {
      const cx = r.left + r.width / 2;
      open.set(Math.min(1, Math.max(0, Math.abs(e.clientX - cx) / (r.width * 0.46))));
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_40%,hsl(var(--secondary)/0.14),transparent_70%)]" />

      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 pb-16 pt-40 sm:px-6 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-14 lg:pt-48">
        {/* Texto */}
        <div>
          <h1 className="font-display text-5xl font-black leading-[0.98] tracking-tighter text-white text-balance sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            <Line delay={0.1}>Ventanas que</Line>
            <Line delay={0.22}>dejan entrar</Line>
            <Line delay={0.34} className="text-white">
              la{" "}
              <span className="relative inline-block text-secondary">
                luz.
                <svg aria-hidden viewBox="0 0 120 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.16em] w-full overflow-visible">
                  <motion.path
                    d="M2 9 C 30 2, 70 2, 118 8"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
                  />
                </svg>
              </span>
            </Line>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mt-7 max-w-md text-base font-light leading-relaxed text-white/75 md:text-lg"
          >
            Fabricamos ventanas y puertas de PVC en Guatemala desde 2010: aislamiento térmico y acústico, hechas a tu medida.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-full bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90">
              <Link to="/cotizacion">
                Solicitar cotización <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full border-2 border-white/30 px-8 text-base text-white hover:border-white hover:bg-white/10 hover:text-white">
              <a href="#disena-tu-ventana">
                Diseña tu ventana <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Ventana */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mx-auto w-full max-w-[430px] lg:ml-auto lg:w-fit lg:max-w-none"
        >
          <div
            ref={frameRef}
            onPointerMove={setSun}
            onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setSun(e); }}
            onPointerUp={() => { dragging.current = false; }}
            onPointerCancel={() => { dragging.current = false; }}
            className="relative aspect-[4/4.1] w-full lg:h-[min(calc(100svh-16rem),500px)] lg:w-auto cursor-grab touch-pan-y select-none rounded-[3px] bg-gradient-to-br from-white via-[#eef1f3] to-[#cdd4d8] p-[11px] ring-1 ring-white/30 active:cursor-grabbing sm:p-[14px]"
            style={{ ["--gx" as string]: "70%", ["--gy" as string]: "30%" }}
          >
            <div className="relative h-full w-full overflow-hidden bg-primary">
              <motion.img
                src={heroImage}
                alt="Interior luminoso con ventanas VentPro"
                className="absolute inset-0 h-[112%] w-full -top-[6%] object-cover"
                style={{ y: imgY }}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1200}
                height={800}
                draggable={false}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/hero/interior-minimalista.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent to-primary/40" />
              <Sash side="left" x={leftX} />
              <Sash side="right" x={rightX} />
              {/* sol sobre el vidrio */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{ background: "radial-gradient(260px circle at var(--gx) var(--gy), hsl(var(--secondary) / 0.42), transparent 65%)" }}
              />
            </div>
          </div>

          <label className="mt-5 flex items-center gap-4 text-sm text-white/65">
            <span className="shrink-0">Abre la ventana</span>
            <input
              ref={rangeRef}
              type="range"
              min={0}
              max={100}
              defaultValue={reduce ? Math.round(OPEN_DEFAULT * 100) : 0}
              onChange={(e) => open.set(+e.target.value / 100)}
              className="cfg-range w-full"
              aria-label="Abrir o cerrar las hojas de la ventana"
            />
          </label>
        </motion.div>
      </div>
    </section>
  );
};
