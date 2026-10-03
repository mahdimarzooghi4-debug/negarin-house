import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--no-zygote"]
    } : undefined
  },
  webServer: {
    command: "pnpm --filter @negarin/web start --hostname 127.0.0.1",
    env: { NEGARIN_UI_PREVIEW: "1" },
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
