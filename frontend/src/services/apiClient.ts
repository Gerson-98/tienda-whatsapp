// Capa única de comunicación con el backend NestJS.
// Centraliza: URL base, headers, auth, timeout, manejo de errores, interceptor 401.

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT_MS = 12_000;

/**
 * Categoría del error producido por una llamada al backend.
 * - network: el navegador no pudo contactar al servidor (offline, CORS, DNS).
 * - timeout: el servidor no respondió en el tiempo límite.
 * - unauthorized: 401/403 — sesión inválida o ausente.
 * - server: el servidor respondió con un status >= 400 distinto de 401/403.
 * - parse: la respuesta no es JSON válido cuando esperábamos JSON.
 * - aborted: el caller canceló la petición.
 */
export type ApiErrorKind =
  | "network"
  | "timeout"
  | "unauthorized"
  | "server"
  | "parse"
  | "aborted";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly payload?: unknown;

  constructor(
    kind: ApiErrorKind,
    message: string,
    options?: { status?: number; payload?: unknown; cause?: unknown }
  ) {
    super(message);
if (options?.cause !== undefined) Object.defineProperty(this, 'cause', { value: options.cause });
    this.name = "ApiError";
    this.kind = kind;
    this.status = options?.status;
    this.payload = options?.payload;
  }

  /** Mensaje listo para mostrarle al usuario, sin tecnicismos. */
  get userMessage(): string {
    switch (this.kind) {
      case "network":
        return "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
      case "timeout":
        return "El servidor está tardando demasiado en responder. Intenta de nuevo en unos minutos.";
      case "unauthorized":
        return "Tu sesión expiró. Vuelve a iniciar sesión.";
      case "server":
        return "Ocurrió un problema en el servidor. Por favor, intenta más tarde.";
      case "parse":
        return "El servidor devolvió una respuesta inesperada.";
      case "aborted":
        return "La petición fue cancelada.";
    }
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Query params; valores null/undefined se omiten. */
  query?: Record<string, string | number | undefined | null>;
}

type SessionExpiredListener = () => void;
const sessionExpiredListeners = new Set<SessionExpiredListener>();

/** Suscríbete para reaccionar a 401/403 globalmente (ej. redirect a login). */
export function onSessionExpired(listener: SessionExpiredListener): () => void {
  sessionExpiredListeners.add(listener);
  return () => sessionExpiredListeners.delete(listener);
}

function notifySessionExpired() {
  localStorage.removeItem("access_token");
  sessionExpiredListeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // listener errores no deben romper el flujo
    }
  });
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const base = API_URL?.replace(/\/$/, "") ?? "";
  const url = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    params.append(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

/**
 * Petición tipada. Lanza siempre `ApiError` ante cualquier fallo.
 * Si `signal` se aborta externamente, lanza ApiError("aborted").
 */
export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    auth = false,
    signal: externalSignal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    query,
  } = options;

  if (!API_URL) {
    throw new ApiError(
      "network",
      "VITE_API_URL no está configurada. Revisa tu archivo .env."
    );
  }

  // Combinamos signal externo con timeout interno
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort("timeout"), timeoutMs);
  const onExternalAbort = () => controller.abort("external");
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort("external");
    else externalSignal.addEventListener("abort", onExternalAbort);
  }

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = localStorage.getItem("access_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", onExternalAbort);

    if (externalSignal?.aborted) {
      throw new ApiError("aborted", "La petición fue cancelada.", { cause: err });
    }
    // Si abortamos por timeout, el reason será "timeout"
    if (controller.signal.aborted && controller.signal.reason === "timeout") {
      throw new ApiError("timeout", "Tiempo de espera agotado.", { cause: err });
    }
    throw new ApiError("network", "Error de red.", { cause: err });
  }

  clearTimeout(timeoutId);
  externalSignal?.removeEventListener("abort", onExternalAbort);

  if (response.status === 401 || response.status === 403) {
    notifySessionExpired();
    throw new ApiError("unauthorized", "Sesión inválida o expirada.", {
      status: response.status,
    });
  }

  if (!response.ok) {
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }
    throw new ApiError(
      "server",
      `Error del servidor (${response.status}).`,
      { status: response.status, payload }
    );
  }

  // 204 / sin contenido
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    // Devolvemos el texto si no es JSON; el caller decide
    return (await response.text()) as unknown as T;
  }

  try {
    return (await response.json()) as T;
  } catch (err) {
    throw new ApiError("parse", "No se pudo interpretar la respuesta.", {
      cause: err,
    });
  }
}

export const api = {
  get: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "PATCH", body }),
  delete: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};
