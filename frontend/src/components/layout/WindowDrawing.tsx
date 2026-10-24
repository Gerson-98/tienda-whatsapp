// Dibujo de una ventana hecho con HTML/CSS: se usa en el configurador y en la sección de soluciones.
// Todo en px a partir del ancho medido, así los perfiles guardan la proporción real al cambiar medidas.
import { useEffect, useRef, useState } from "react";

export type WinType = "corrediza" | "fija" | "abatible" | "oscilobatiente" | "puerta";
export type Material = "aluminio" | "pvc";

export const PROFILE_COLORS = {
  blanco: { label: "Blanco", hex: "#F2F4F5", dark: "#C9D0D4" },
  grafito: { label: "Negro grafito", hex: "#272C31", dark: "#14171A" },
  bronce: { label: "Bronce", hex: "#6C5140", dark: "#4B372B" },
  plata: { label: "Plata anodizado", hex: "#B8BFC5", dark: "#8E979E" },
} as const;
export type ProfileColor = keyof typeof PROFILE_COLORS;

export const GLASSES = {
  claro: { label: "Claro", bg: "linear-gradient(180deg,#8CC6EA 0%,#C9E6F6 52%,#F6DDB0 100%)" },
  tintado: { label: "Tintado gris", bg: "linear-gradient(180deg,#4F6573 0%,#7F959F 55%,#B4A78B 100%)" },
  reflectivo: { label: "Reflectivo azul", bg: "linear-gradient(160deg,#2C7BC4 0%,#7DBDEB 50%,#E4C27F 100%)" },
  esmerilado: { label: "Esmerilado", bg: "linear-gradient(180deg,#E7EFF4 0%,#F4F7F9 100%)" },
} as const;
export type GlassKind = keyof typeof GLASSES;

type Props = {
  type: WinType;
  /** ancho y alto en cm: solo se usan por su proporción */
  w: number;
  h: number;
  material?: Material;
  color?: ProfileColor;
  glass?: GlassKind;
  className?: string;
};

const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width || 300);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width || 300));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
};

const Pane = ({ glass, frosted }: { glass: GlassKind; frosted: boolean }) => (
  <div
    className="win-glass absolute inset-0 transition-[background] duration-500"
    style={{ background: GLASSES[glass].bg }}
  >
    {frosted && (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.55) 1px, transparent 1.4px), radial-gradient(rgba(180,200,212,.35) 1px, transparent 1.4px)",
          backgroundSize: "7px 7px, 11px 11px",
          backdropFilter: "blur(2px)",
        }}
      />
    )}
    {/* horizonte: luz entrando */}
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/35 to-transparent" />
  </div>
);

const Handle = ({ color, vertical = true, className = "" }: { color: string; vertical?: boolean; className?: string }) => (
  <span
    aria-hidden
    className={`absolute rounded-full transition-colors duration-500 ${className}`}
    style={{
      background: color,
      width: vertical ? 5 : 22,
      height: vertical ? 22 : 5,
      boxShadow: "0 0 0 1px rgba(0,0,0,.18)",
    }}
  />
);

export const WindowDrawing = ({
  type,
  w,
  h,
  material = "aluminio",
  color = "blanco",
  glass = "claro",
  className = "",
}: Props) => {
  const [ref, W] = useWidth();
  const c = PROFILE_COLORS[color];
  const fw = Math.max(7, W * (material === "pvc" ? 0.07 : 0.048)); // marco
  const sw = Math.max(5, fw * 0.62); // hoja
  const frosted = glass === "esmerilado";
  const ratio = type === "puerta" ? Math.min(w / h, 0.62) : w / h;

  const sashStyle = {
    background: `linear-gradient(145deg, ${c.hex}, ${c.dark})`,
    padding: sw,
  } as const;

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ aspectRatio: `${ratio}` }}>
      <div
        className="absolute inset-0 rounded-[2px] transition-colors duration-500"
        style={{
          background: `linear-gradient(145deg, ${c.hex}, ${c.dark})`,
          padding: fw,
          boxShadow: "0 0 0 1px rgba(23,34,48,.22)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden" style={{ background: "#0003" }}>
          {type === "fija" && <Pane glass={glass} frosted={frosted} />}

          {type === "corrediza" && (
            <>
              <div className="absolute inset-y-0 left-0 w-[53%]" style={sashStyle}>
                <div className="relative h-full w-full overflow-hidden">
                  <Pane glass={glass} frosted={frosted} />
                </div>
              </div>
              <div
                className="absolute inset-y-0 right-0 w-[53%]"
                style={{ ...sashStyle, boxShadow: "-2px 0 0 rgba(0,0,0,.18)" }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Pane glass={glass} frosted={frosted} />
                </div>
                <Handle color={c.dark} className="left-[3px] top-1/2 -translate-y-1/2" />
              </div>
              <svg aria-hidden viewBox="0 0 40 12" className="absolute left-1/2 top-[8%] w-[16%] -translate-x-1/2 text-white/70">
                <path d="M2 6h36M2 6l5-4M2 6l5 4M38 6l-5-4M38 6l-5 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}

          {(type === "abatible" || type === "oscilobatiente") && (
            <div className="absolute inset-0" style={sashStyle}>
              <div className="relative h-full w-full overflow-hidden">
                <Pane glass={glass} frosted={frosted} />
                <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path d="M100 0 L0 50 L100 100" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
                  {type === "oscilobatiente" && (
                    <path d="M0 0 L50 100 L100 0" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.3" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
                  )}
                </svg>
              </div>
              <Handle color={c.dark} className="right-[3px] top-1/2 -translate-y-1/2" />
            </div>
          )}

          {type === "puerta" && (
            <div className="absolute inset-0" style={sashStyle}>
              <div className="relative h-full w-full">
                <div className="absolute inset-x-0 top-0 h-[64%] overflow-hidden">
                  <Pane glass={glass} frosted={frosted} />
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-[36%] border-t transition-colors duration-500"
                  style={{ background: `linear-gradient(180deg, ${c.dark}, ${c.hex})`, borderColor: "rgba(0,0,0,.2)" }}
                />
                <Handle color={c.hex} className="right-[3px] top-[58%]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
