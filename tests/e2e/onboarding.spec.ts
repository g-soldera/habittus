import { test, expect } from '@playwright/test';

test('onboarding -> triage -> dashboard flow', async ({ page }) => {
  // Go to triage page
  await page.goto('/triage');

  // Step 1: Basic info
  await page.getByPlaceholder('Digite seu nome...').fill('E2ETestUser');
  await page.locator('input[placeholder="Ex: 25"]').first().fill('25'); // idade
  await page.getByRole('button', { name: 'Masculino' }).click();
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 2: Biometrics
  await page.getByPlaceholder('Ex: 175').fill('175');
  await page.getByPlaceholder('Ex: 75').fill('75');
  await page.getByPlaceholder('Ex: 15').fill('15');
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 3: Objectives (choose first objective)
  await page.getByRole('button', { name: /Saúde Física/ }).click();
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 4: Health details
  await page.getByPlaceholder('Ex: 3').first().fill('3');
  await page.getByRole('button', { name: /Strength|Strength/i }).first().click().catch(() => {});
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 5: Nutrition
  await page.getByPlaceholder('Ex: Balanceada').fill('Balanceada');
  await page.getByPlaceholder('Ex: 3').nth(1).fill('3'); // meals per day
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 6: Study & Productivity
  await page.getByPlaceholder('Ex: 10').fill('5');
  await page.getByPlaceholder('Ex: 6').fill('2');
  await page.getByRole('button', { name: /Próximo/ }).click();

  // Step 7: Finance & Habits
  await page.getByPlaceholder('Ex: 3000').fill('3000');
  await page.getByPlaceholder('Ex: 5000').fill('0');
  await page.getByPlaceholder('Ex: 7').fill('7');

  // Submit: Criar Personagem
  await page.getByRole('button', { name: /Criar Personagem/ }).click();

  // Wait for navigation to dashboard
  await page.waitForURL('**/(tabs)**', { timeout: 60_000 });

  // Verify that dashboard shows the new user name or streak UI
  await expect(page.getByText('E2ETestUser')).toBeVisible({ timeout: 5000 });
});
