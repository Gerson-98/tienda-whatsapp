import { Loader2 } from "lucide-react";

/**
 * Skeleton/spinner mostrado mientras una ruta lazy carga su chunk.
 * Mantiene espacio mínimo para evitar saltos de layout.
 */
export const RouteFallback = () => {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Cargando…"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
      <span className="sr-only">Cargando…</span>
    </div>
  );
};
