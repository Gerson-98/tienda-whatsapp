// Pequeño wrapper alrededor de console.* que:
// - En DEV: imprime normalmente.
// - En PROD: silencia logs/info/debug; warn/error siguen funcionando.
//
// Úsalo en lugar de `console.*` en código de aplicación. Así, cuando algún
// día integremos un reporter real (Sentry, LogRocket...), solo cambiamos
// este archivo y todo el código existente se beneficia.

const isDev = import.meta.env.DEV;

/* eslint-disable no-console */
export const logger = {
  debug: (...args: unknown[]) => {
    if (isDev) console.debug(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
    // En prod, conservamos los warns? Por ahora los silenciamos; cambiar
    // según política. Pendiente reporter remoto.
  },
  error: (...args: unknown[]) => {
    // Siempre logueamos errores; en prod son los únicos que llegarán al
    // reporter remoto cuando se integre.
    console.error(...args);
  },
};
/* eslint-enable no-console */
