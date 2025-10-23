// frontend/src/vite-env.d.ts

/// <reference types="vite/client" />

// Añade esta sección
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // puedes añadir más variables aquí si las necesitas en el futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
