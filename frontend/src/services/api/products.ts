import { api } from "@/services/apiClient";
import { cachedFetch } from "@/services/cache";
import type { Product } from "@/types/api";

export type ProductsQuery = {
  search?: string;
  sortBy?: string;
  signal?: AbortSignal;
};

const PRODUCTS_TTL_MS = 30_000; // 30s: catálogo casi-estático

export function fetchProducts(query: ProductsQuery = {}): Promise<Product[]> {
  const { search, sortBy, signal } = query;
  const cacheKey = `products|s=${search ?? ""}|o=${sortBy ?? ""}`;
  return cachedFetch({
    key: cacheKey,
    ttlMs: PRODUCTS_TTL_MS,
    signal,
    loader: () =>
      api.get<Product[]>("/products", {
        query: { search, sortBy },
        // No pasamos signal aquí: el cache deduplica peticiones; si el caller
        // aborta, lo manejamos a nivel del cache wrapper.
      }),
  });
}
