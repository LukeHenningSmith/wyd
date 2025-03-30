import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: "./src/setupTests.ts",
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      exclude: ["src/api/**/*", "src/components/ui/**/*"],
    },
  },
});
