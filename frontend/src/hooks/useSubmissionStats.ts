import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/services/apiClient";
import { fetchSubmissionStats } from "@/services/api/submissions";
import type { SubmissionStats } from "@/types/api";

const ZERO_STATS: SubmissionStats = { total: 0, pending: 0, newToday: 0 };

/**
 * Fetch de estadísticas del panel admin. Independiente de filtros/paginación
 * para evitar refetch innecesarios. Expone `adjustPending` para mantener
 * sincronizado el contador local cuando hacemos optimistic update.
 */
export function useSubmissionStats() {
  const [stats, setStats] = useState<SubmissionStats>(ZERO_STATS);
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchSubmissionStats(controller.signal)
      .then(setStats)
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.kind === "aborted") return;
        // Silencioso: las stats no bloquean la UI. El listado tiene su propio banner.
      });
    return () => controller.abort();
  }, [retryNonce]);

  const refresh = useCallback(() => setRetryNonce((n) => n + 1), []);

  const adjustPending = useCallback((delta: number) => {
    setStats((prev) => ({
      ...prev,
      pending: Math.max(0, prev.pending + delta),
    }));
  }, []);

  return { stats, refresh, adjustPending };
}
