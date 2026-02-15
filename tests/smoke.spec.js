// @ts-check
const { test, expect } = require('@playwright/test');

const pages = [
  { path: '/index.html', title: 'The Nature of Code' },
  { path: '/chapter1.html', title: 'The Nature of Code: Vectors' },
  { path: '/chapter2.html', title: 'The Nature of Code: Vectors' },
  { path: '/hydrogen.html', title: 'Hydrogen in P5' },
  { path: '/hexagon.html', title: 'Hexagons in P5' },
  { path: '/michelson-1881.html', title: "The Nature of Code: Michelson's 1881 Experiment" },
];

for (const { path, title } of pages) {
  test.describe(path, () => {
    test('loads successfully', async ({ page }) => {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
    });

    test('has correct title', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
    });

    test('has no console errors', async ({ page }) => {
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto(path, { waitUntil: 'networkidle' });
      // Allow time for scripts to execute
      await page.waitForTimeout(2000);

      expect(errors).toEqual([]);
    });

    test('has valid HTML structure', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('meta[charset]')).toHaveCount(1);
      await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
    });
  });
}
