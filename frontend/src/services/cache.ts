// Caché in-memory minimalista con TTL e in-flight deduplication.
// Pensado para datos públicos (catálogo) donde una respuesta fresca cada
// pocos segundos es aceptable. NO usar para datos del panel admin.

type Entry<T> = {
  expiresAt: number;
  value: T;
};

const cache = new Map<string, Entry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

export interface CachedFetchOptions<T> {
  key: string;
  ttlMs: number;
  loader: () => Promise<T>;
  /** Si el caller pasa una señal abortada, no servimos caché expirado. */
  signal?: AbortSignal;
}

export async function cachedFetch<T>(opts: CachedFetchOptions<T>): Promise<T> {
  const { key, ttlMs, loader, signal } = opts;
  const now = Date.now();

  const cached = cache.get(key) as Entry<T> | undefined;
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = loader()
    .then((value) => {
      cache.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);

  if (signal) {
    // Si el caller aborta antes, no romper el cache pero permitir cancelar la espera.
    return new Promise<T>((resolve, reject) => {
      const onAbort = () =>
        reject(
          Object.assign(new Error("aborted"), { name: "AbortError" as const })
        );
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
      promise.then(
        (v) => {
          signal.removeEventListener("abort", onAbort);
          resolve(v);
        },
        (e) => {
          signal.removeEventListener("abort", onAbort);
          reject(e);
        }
      );
    });
  }

  return promise;
}

/** Borra entradas cuya clave empiece por `prefix`. Útil tras mutaciones. */
export function invalidateCache(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key);
  }
}
