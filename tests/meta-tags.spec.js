// @ts-check
const { test, expect } = require('@playwright/test');

const pages = [
  '/index.html',
  '/chapter1.html',
  '/chapter2.html',
  '/hydrogen.html',
  '/hexagon.html',
  '/michelson-1881.html',
];

for (const path of pages) {
  test.describe(`${path} meta tags`, () => {
    test('has meta description', async ({ page }) => {
      await page.goto(path);
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
      const content = await description.getAttribute('content');
      expect(content.length).toBeGreaterThan(0);
    });

    test('has non-empty title', async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test('has charset UTF-8', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('meta[charset="UTF-8"]')).toHaveCount(1);
    });

    test('has viewport meta', async ({ page }) => {
      await page.goto(path);
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveCount(1);
      const content = await viewport.getAttribute('content');
      expect(content).toContain('width=device-width');
    });
  });
}
