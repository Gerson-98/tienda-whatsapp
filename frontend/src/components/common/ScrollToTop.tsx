import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hace scroll al inicio cuando cambia la ruta. Respeta navegaciones que
 * incluyen un hash (#sección) y motion preferences del usuario.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // dejamos que el navegador resuelva el ancla
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname, hash]);

  return null;
};
