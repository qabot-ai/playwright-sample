import { test, expect } from '@playwright/test';


test('homepage has correct title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('check heading exists', async ({ page }) => {
  await page.goto('https://example.com');
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');
});

