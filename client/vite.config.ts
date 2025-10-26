import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, "tsconfig.json")],
      ignoreConfigErrors: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",

    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
    include: ["src/__tests__/**/*.test.{ts,tsx}"],
  },
});
