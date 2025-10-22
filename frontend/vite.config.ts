// vite.config.ts

import path from "path"; // <-- Asegúrate de que esta línea esté al principio
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // --- Esta sección es la clave ---
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ---------------------------------
});
