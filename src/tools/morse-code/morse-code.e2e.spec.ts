import { test, expect } from '@playwright/test';

test.describe('Tool - Morse code', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/morse-code');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Morse code - IT Tools');
  });

  test('', async ({ page }) => {

  });
});