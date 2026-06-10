import { useCallback } from "react";

/**
 * Sigue el cursor sobre una tarjeta para alimentar el resplandor
 * radial de `.glass-glow` (variables --mx / --my en index.css).
 */
export function useGlassGlow() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);
}
