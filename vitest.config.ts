import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure this alias is set up
    },
  },
  test: {
    globals: true, // Enables global `expect` and other Vitest globals
    setupFiles: "./src/setupTests.ts", // Add this line
    environment: "jsdom", // Ensure the test environment is set to jsdom
    coverage: {
      provider: "istanbul", // or 'v8'
      include: ["src/**/*"],
    },
  },
});
