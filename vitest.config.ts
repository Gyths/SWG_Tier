// vitest.config.ts (Versión limpia)

import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"), // Solo el alias interno
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    server: {
      deps: {
        external: ["next-auth"], // Mantenemos este por si acaso
      },
    },
  },
});