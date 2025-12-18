import { test, expect } from '@playwright/test';

// NOTE: This is a skeleton E2E test for the tracking flow. It requires
// the app to expose test-friendly selectors or run in web mode. Adjust
// selectors to match the real UI (data-testid or accessibilityLabel preferred).

test.describe('Tracking - onboarding -> logging -> dashboard', () => {
  test('onboarding -> triage -> dashboard -> log workout and see XP change', async ({ page }) => {
    // 1) Open app (web build or local dev URL)
    await page.goto('http://localhost:8081');

    // 2) Simulate onboarding: navigate to triage, fill minimal required fields
    // Use data-testid attributes where possible. Here we use placeholder selectors.
    await page.click('text=Começar');

    // Example: fill name and basic biometrics
    await page.fill('input[name="characterName"]', 'E2E Test');
    await page.fill('input[name="age"]', '30');
    await page.fill('input[name="heightCm"]', '175');
    await page.fill('input[name="weightKg"]', '70');

    // Submit triage
    await page.click('text=Finalizar Triagem');

    // 3) On dashboard, assert bioMonitor exists and note XP
    const xpBefore = await page.textContent('[data-testid="bio-total-xp"]');

    // 4) Open Workout log and submit a quick 30-min moderate workout
    await page.click('text=Log de Treino');
    await page.fill('input[aria-label="Duração (min)"]', '30');
    await page.click('text=Salvar');

    // Wait for UI to update
    await page.waitForTimeout(500);

    const xpAfter = await page.textContent('[data-testid="bio-total-xp"]');
    expect(parseInt(xpAfter || '0')).toBeGreaterThan(parseInt(xpBefore || '0'));
  });
});