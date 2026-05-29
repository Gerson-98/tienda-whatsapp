import { api } from "@/services/apiClient";
import { cachedFetch } from "@/services/cache";
import type { Category } from "@/types/api";

const CATEGORIES_TTL_MS = 5 * 60_000; // 5 min: cambian raramente

export function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  return cachedFetch({
    key: "categories",
    ttlMs: CATEGORIES_TTL_MS,
    signal,
    loader: () => api.get<Category[]>("/categories"),
  });
}
