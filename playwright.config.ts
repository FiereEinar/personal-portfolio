import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: true,
  use: { baseURL: "http://localhost:5173" },
  webServer: {
    command: "npm run dev -- --port 5173",
    url: "http://localhost:5173",
    reuseExistingServer: false,
    env: {
      VITE_SITE_URL: "https://portfolio.example",
      VITE_BASE_PATH: "/",
    },
  },
});
