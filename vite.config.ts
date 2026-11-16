import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), "").VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  // Single entry — SPA routing handled by the server / preview fallback
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
  preview: {
    // Serve index.html for all routes in `vite preview`
    proxy: {},
  },
}));
