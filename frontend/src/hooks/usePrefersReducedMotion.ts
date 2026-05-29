import { useEffect, useState } from "react";

/**
 * Devuelve `true` si el sistema operativo del usuario tiene activada la
 * preferencia "reduced motion". Es reactivo: si el usuario cambia la
 * preferencia mientras la app está abierta, el hook se actualiza.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
