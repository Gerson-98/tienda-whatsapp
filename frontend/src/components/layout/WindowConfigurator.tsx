// "Diseña tu ventana": el visitante arma su ventana y la envía como punto de partida a la cotización.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  WindowDrawing,
  PROFILE_COLORS,
  GLASSES,
  type WinType,
  type ProfileColor,
  type GlassKind,
} from "@/components/layout/WindowDrawing";
import { cn } from "@/lib/utils";

const TYPES: { id: WinType; label: string; note: string }[] = [
  { id: "corrediza", label: "Corrediza", note: "Se desliza y ahorra espacio" },
  { id: "fija", label: "Fija", note: "Máxima luz y aislamiento" },
  { id: "oscilobatiente", label: "Oscilobatiente", note: "Abre y se inclina para ventilar" },
  { id: "puerta", label: "Puerta", note: "Terrazas, balcones y entradas" },
];


const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <fieldset className="min-w-0">
    <legend className="mb-3 text-sm font-medium text-white/60">{label}</legend>
    {children}
  </fieldset>
);

export const WindowConfigurator = () => {
  const reduce = useReducedMotion();
  const [type, setType] = useState<WinType>("corrediza");
  const [color, setColor] = useState<ProfileColor>("blanco");
  const [glass, setGlass] = useState<GlassKind>("claro");
  const [w, setW] = useState(180);
  const [h, setH] = useState(120);

  const isDoor = type === "puerta";
  const width = clamp(isDoor ? Math.min(w, 120) : w, 50, isDoor ? 120 : 320);
  const height = isDoor ? clamp(h < 190 ? 210 : h, 190, 260) : clamp(h, 50, 240);

  const ratio = isDoor ? Math.min(width / height, 0.62) : width / height;

  const summary = useMemo(() => {
    const t = TYPES.find((x) => x.id === type)!.label.toLowerCase();
    return `${isDoor ? "Puerta" : "Ventana " + t} de PVC, ${width} × ${height} cm, perfil ${PROFILE_COLORS[color].label.toLowerCase()}, vidrio ${GLASSES[glass].label.toLowerCase()}.`;
  }, [type, color, glass, width, height, isDoor]);

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-lg border px-4 text-sm font-medium transition-colors duration-200",
      active
        ? "border-secondary bg-secondary text-secondary-foreground"
        : "border-white/20 text-white/80 hover:border-white/50 hover:text-white"
    );

  return (
    <section className="relative overflow-hidden bg-[hsl(215_35%_10%)] py-20 md:py-28 text-white" id="disena-tu-ventana">
      <div className="container relative z-10 mx-auto">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-4xl font-black leading-none tracking-tighter text-balance md:text-6xl">
            Dibuja tu ventana. <span className="text-secondary">Nosotros la fabricamos.</span>
          </h2>
          <p className="mt-5 text-lg font-light text-white/65">
            Elige tipo, perfil y vidrio, ajusta las medidas y mándanos tu diseño: lo usamos como punto de partida de tu cotización.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Controles */}
          <div className="grid gap-7">
            <Group label="Tipo">
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tipo de ventana">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={type === t.id}
                    onClick={() => setType(t.id)}
                    className={chip(type === t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/50">{TYPES.find((t) => t.id === type)!.note}</p>
            </Group>

            <Group label={`Color del PVC: ${PROFILE_COLORS[color].label}`}>
              <div className="flex gap-3" role="radiogroup" aria-label="Color del perfil de PVC">
                {(Object.keys(PROFILE_COLORS) as ProfileColor[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="radio"
                    aria-checked={color === k}
                    onClick={() => setColor(k)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-lg border px-4 text-sm font-medium transition-colors duration-200",
                      color === k ? "border-secondary text-white" : "border-white/20 text-white/75 hover:border-white/50"
                    )}
                  >
                    <span className="h-6 w-6 rounded-full border border-white/30" style={{ background: `linear-gradient(145deg, ${PROFILE_COLORS[k].hex}, ${PROFILE_COLORS[k].dark})` }} />
                    {PROFILE_COLORS[k].label}
                  </button>
                ))}
              </div>
            </Group>

            <Group label="Vidrio">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Tipo de vidrio">
                {(Object.keys(GLASSES) as GlassKind[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="radio"
                    aria-checked={glass === k}
                    onClick={() => setGlass(k)}
                    className={cn(
                      "overflow-hidden rounded-lg border text-left text-xs font-medium transition-colors duration-200",
                      glass === k ? "border-secondary" : "border-white/20 hover:border-white/50"
                    )}
                  >
                    <span className="block h-9 w-full" style={{ background: GLASSES[k].bg }} />
                    <span className="block px-2.5 py-2 text-white/85">{GLASSES[k].label}</span>
                  </button>
                ))}
              </div>
            </Group>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-white/60">
                <span className="flex justify-between">
                  Ancho <strong className="tabular-nums text-white">{width} cm</strong>
                </span>
                <input type="range" min={50} max={isDoor ? 120 : 320} step={5} value={width} onChange={(e) => setW(+e.target.value)} className="cfg-range" aria-label="Ancho en centímetros" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white/60">
                <span className="flex justify-between">
                  Alto <strong className="tabular-nums text-white">{height} cm</strong>
                </span>
                <input type="range" min={isDoor ? 190 : 50} max={isDoor ? 260 : 240} step={5} value={height} onChange={(e) => setH(+e.target.value)} className="cfg-range" aria-label="Alto en centímetros" />
              </label>
            </div>
          </div>

          {/* Vista previa */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#d6e2ea] to-[#a3b7c4] p-6 text-foreground md:p-8">
              <div className="relative flex h-[320px] items-center justify-center md:h-[430px]">
                <motion.div
                  key={type}
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <div
                    className="relative"
                    style={ratio >= 1.25 ? { width: "92%" } : { height: "100%", aspectRatio: String(ratio), maxWidth: "92%" }}
                  >
                    <WindowDrawing type={type} w={width} h={height} material="pvc" color={color} glass={glass} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs tabular-nums text-slate-600">{width} cm</span>
                    <span className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs tabular-nums text-slate-600">{height} cm</span>
                  </div>
                </motion.div>
              </div>
              <p className="mt-6 border-t border-slate-400/40 pt-5 text-sm leading-relaxed text-slate-700" aria-live="polite">
                {summary}
              </p>
              <QuoteLink summary={summary} />
            </div>
            <p className="mt-3 text-xs text-white/40">Vista ilustrativa. Medidas y acabados se confirman en la visita técnica sin costo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuoteLink = ({ summary }: { summary: string }) => (
  <Link
    to={`/cotizacion?diseno=${encodeURIComponent(summary)}`}
    className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-secondary px-8 font-semibold text-secondary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(215_35%_10%)]"
  >
    Cotizar esta ventana <ArrowRight className="h-4 w-4" />
  </Link>
);
