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
  test.describe(`${path} links`, () => {
    test('internal links resolve', async ({ page }) => {
      await page.goto(path);

      const links = await page.locator('a[href]').all();
      for (const link of links) {
        const href = await link.getAttribute('href');

        // Only test internal links (starting with / or relative .html)
        if (href.startsWith('/') && href.endsWith('.html')) {
          const response = await page.request.get(href);
          expect(
            response.status(),
            `Link to ${href} from ${path} should resolve`
          ).toBe(200);
        }
      }
    });

    test('stylesheet links resolve', async ({ page }) => {
      await page.goto(path);

      const stylesheets = await page.locator('link[rel="stylesheet"]').all();
      for (const link of stylesheets) {
        const href = await link.getAttribute('href');
        const response = await page.request.get(href);
        expect(
          response.status(),
          `Stylesheet ${href} on ${path} should resolve`
        ).toBe(200);
      }
    });

    test('local script sources resolve', async ({ page }) => {
      await page.goto(path);

      const scripts = await page.locator('script[src]').all();
      for (const script of scripts) {
        const src = await script.getAttribute('src');
        // Only test local scripts, not CDN
        if (src.startsWith('./') || src.startsWith('/')) {
          const response = await page.request.get(src);
          expect(
            response.status(),
            `Script ${src} on ${path} should resolve`
          ).toBe(200);
        }
      }
    });
  });
}
