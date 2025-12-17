import { test, expect } from '@playwright/test';

// Placeholder E2E test for triage flow — currently skipped until web build + server available in CI.
// Use test.skip inside the test body so Playwright doesn't raise a top-level modifier error.
test('triage flow (placeholder) - skipped', async ({ page }) => {
  test.skip(true, 'placeholder test — skip until server available in CI');
  // TODO: Start dev server/build and navigate to triage route
  // await page.goto('http://localhost:8081/triage');
  // await page.fill('input[placeholder="Digite seu nome..."]', 'E2E Tester');
  // await page.click('text=Próximo →');
  expect(true).toBe(true);
});
