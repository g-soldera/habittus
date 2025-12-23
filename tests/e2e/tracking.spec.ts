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
    // Start triage flow
    await page.click('[data-testid="triage-next-button"]');

    // Fill basic step
    await page.fill('[data-testid="triage-character-name"]', 'E2E Test');
    await page.fill('[data-testid="triage-age"]', '30');
    await page.click('[data-testid="triage-next-button"]');

    // Fill biometrics
    await page.fill('[data-testid="triage-height"]', '175');
    await page.fill('[data-testid="triage-weight"]', '70');
    await page.fill('[data-testid="triage-bodyfat"]', '15');
    await page.click('[data-testid="triage-next-button"]');

    // Complete remaining steps quickly
    await page.click('[data-testid="triage-next-button"]');
    await page.click('[data-testid="triage-next-button"]');
    await page.click('[data-testid="triage-next-button"]');
    await page.click('[data-testid="triage-next-button"]');

    // Submit triage at final step
    await page.click('[data-testid="triage-next-button"]');

    // 3) On dashboard, assert bioMonitor exists and note XP
    const xpBefore = await page.textContent('[data-testid="bio-xp-value"]');

    // 4) Open Workout log and submit a quick 30-min moderate workout
    await page.click('text=Log de Treino');
    await page.fill('[data-testid="log-workout-duration"]', '30');
    await page.click('[data-testid="log-workout-save"]');

    // Wait for UI to update
    await page.waitForTimeout(500);

    const xpAfter = await page.textContent('[data-testid="bio-xp-value"]');
    expect(parseInt(xpAfter || '0')).toBeGreaterThan(parseInt(xpBefore || '0'));
  });
});