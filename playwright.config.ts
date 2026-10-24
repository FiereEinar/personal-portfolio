import { defineConfig } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT || 5174);

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: true,
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
    env: {
      VITE_SITE_URL: "https://portfolio.example",
      VITE_BASE_PATH: "/",
    },
  },
});
