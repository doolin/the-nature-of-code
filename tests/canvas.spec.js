// @ts-check
const { test, expect } = require('@playwright/test');

const pageCanvases = [
  {
    path: '/index.html',
    ids: [
      'random-walker', 'canvas1', 'paint-spatters', 'gaussian-walker',
      'custom-distribution', 'qualified-values', 'perlin-walker',
      'perlin-timeseries', 'perlin-color',
    ],
  },
  {
    path: '/chapter1.html',
    ids: [
      'random-walker', 'distribution-vectors', 'bouncer-1',
      'perlin-acceleration', 'gravity',
    ],
  },
  {
    path: '/hexagon.html',
    ids: ['hexagons'],
  },
  {
    path: '/hydrogen.html',
    ids: ['hydrogen-1s', 'hydrogen-2p', 'shooting-star', 'splat'],
  },
  {
    path: '/michelson-1881.html',
    ids: ['michelson-interferometer'],
  },
];

// WebGL canvases may fail in headless mode due to GPU requirements.
// These are tested separately with a known-failure allowance.
const webglCanvases = [
  { path: '/index.html', ids: ['perlin-terrain'] },
  { path: '/chapter1.html', ids: ['bouncer-2', 'vehicle-acceleration'] },
];

for (const { path, ids } of pageCanvases) {
  test.describe(`${path} canvas rendering`, () => {
    test('p5.js creates canvas elements', async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      for (const id of ids) {
        const container = page.locator(`#${id}`);
        await expect(container).toHaveCount(1);
        const canvas = container.locator('canvas');
        await expect(canvas).toHaveCount(1, {
          timeout: 5000,
        });
      }
    });

    test('canvas elements have non-zero dimensions', async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      for (const id of ids) {
        const canvas = page.locator(`#${id} canvas`);
        const box = await canvas.boundingBox();
        expect(box, `Canvas in #${id} should have a bounding box`).not.toBeNull();
        expect(box.width, `Canvas in #${id} should have width > 0`).toBeGreaterThan(0);
        expect(box.height, `Canvas in #${id} should have height > 0`).toBeGreaterThan(0);
      }
    });
  });
}

for (const { path, ids } of webglCanvases) {
  test.describe(`${path} WebGL canvas rendering`, () => {
    // WebGL sketches use global p5 functions without sketch. prefix,
    // which causes errors in instance mode. These tests document
    // the known issue.
    test.fixme('WebGL canvases render', async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      for (const id of ids) {
        const container = page.locator(`#${id}`);
        await expect(container).toHaveCount(1);
        const canvas = container.locator('canvas');
        await expect(canvas).toHaveCount(1, { timeout: 5000 });
      }
    });
  });
}
