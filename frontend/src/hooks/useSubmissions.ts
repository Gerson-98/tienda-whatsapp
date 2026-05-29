import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/services/apiClient";
import {
  listSubmissions,
  markSubmissionStatus,
} from "@/services/api/submissions";
import type { Submission } from "@/types/api";

export interface SubmissionFilters {
  status: string;
  type: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

interface UseSubmissionsArgs {
  searchTerm: string;
  filters: SubmissionFilters;
  page: number;
  limit: number;
  onPendingDelta?: (delta: number) => void;
}

/**
 * Encapsula la lectura y mutación de submissions del panel admin:
 * debounce, cancelación, optimistic update con rollback, y
 * actualización paralela de stats vía callback `onPendingDelta`.
 */
export function useSubmissions(args: UseSubmissionsArgs) {
  const { searchTerm, filters, page, limit, onPendingDelta } = args;

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const debounceTimer = setTimeout(() => {
      setIsLoading(true);
      setError(null);

      listSubmissions({
        page,
        limit,
        search: searchTerm,
        status: filters.status,
        type: filters.type,
        signal: controller.signal,
      })
        .then((data) => {
          setSubmissions(data.data);
          setTotal(data.total);
        })
        .catch((err: unknown) => {
          if (err instanceof ApiError) {
            if (err.kind === "aborted" || err.kind === "unauthorized") return;
            setError(err.userMessage);
          } else {
            setError("No se pudo cargar la información.");
          }
        })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [searchTerm, filters, page, limit, retryNonce]);

  const retry = useCallback(() => setRetryNonce((n) => n + 1), []);

  const markAsRead = useCallback(
    async (id: string): Promise<{ ok: boolean; error?: string }> => {
      let prevStatus: string | undefined;
      setSubmissions((prev) =>
        prev.map((sub) => {
          if (sub.id !== id) return sub;
          prevStatus = sub.status;
          return { ...sub, status: "LEIDO" };
        })
      );
      const wasNew = prevStatus === "NUEVO";
      if (wasNew) onPendingDelta?.(-1);

      try {
        await markSubmissionStatus(id, "LEIDO");
        return { ok: true };
      } catch (err) {
        // Rollback
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === id ? { ...sub, status: prevStatus ?? sub.status } : sub
          )
        );
        if (wasNew) onPendingDelta?.(+1);
        const message =
          err instanceof ApiError
            ? err.userMessage
            : "No se pudo marcar como leído.";
        return { ok: false, error: message };
      }
    },
    [onPendingDelta]
  );

  return {
    submissions,
    total,
    isLoading,
    error,
    retry,
    markAsRead,
  };
}
