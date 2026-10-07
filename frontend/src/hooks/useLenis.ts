import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inicializa Lenis smooth scroll globalmente.
 * Se desactiva si el usuario prefiere reduced motion (Lenis lo respeta nativamente).
 */
export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
};
