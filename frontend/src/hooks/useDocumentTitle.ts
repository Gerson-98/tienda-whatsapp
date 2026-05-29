import { useEffect } from "react";

const BASE_TITLE = "VentPro — Ventanas de Aluminio y PVC en Guatemala";
const SUFFIX = "VentPro";

interface UseDocumentTitleOptions {
  /** Si se pasa, también actualiza la `<meta name="description">`. */
  description?: string;
}

/**
 * Actualiza `document.title` (y opcionalmente la meta description) cada vez
 * que cambia el componente que usa el hook. Restaura el título base al
 * desmontar para que las rutas sin título no hereden el anterior.
 */
export function useDocumentTitle(
  title: string,
  options: UseDocumentTitleOptions = {}
): void {
  const { description } = options;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title === BASE_TITLE ? title : `${title} | ${SUFFIX}`;

    let restoreDescription: string | null = null;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        restoreDescription = meta.getAttribute("content");
        meta.setAttribute("content", description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (description && restoreDescription !== null) {
        const meta = document.querySelector('meta[name="description"]');
        meta?.setAttribute("content", restoreDescription);
      }
    };
  }, [title, description]);
}
