import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 2 * 60 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  reporter: [['list'], ['github']],
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev:metro',
    url: 'http://localhost:8081',
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
});
