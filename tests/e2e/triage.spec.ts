import { test, expect } from '@playwright/test';

// Placeholder E2E test for triage flow — currently skipped until web build + server available in CI.
test.skip('triage flow (placeholder)', async ({ page }) => {
  // TODO: Start dev server/build and navigate to triage route
  // await page.goto('http://localhost:8081/triage');
  // await page.fill('input[placeholder="Digite seu nome..."]', 'E2E Tester');
  // await page.click('text=Próximo →');
  expect(true).toBe(true);
});
