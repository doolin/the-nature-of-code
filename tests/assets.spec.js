// @ts-check
const { test, expect } = require('@playwright/test');

const pagesWithMathJax = [
  '/index.html',
  '/chapter1.html',
  '/chapter2.html',
  '/hydrogen.html',
  '/michelson-1881.html',
];

const pagesWithPrism = [
  '/chapter1.html',
  '/chapter2.html',
  '/michelson-1881.html',
];

for (const path of pagesWithMathJax) {
  test(`${path} loads MathJax`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    const hasMathJax = await page.evaluate(() => typeof window.MathJax !== 'undefined');
    expect(hasMathJax, `MathJax should be loaded on ${path}`).toBe(true);
  });
}

for (const path of pagesWithPrism) {
  test(`${path} loads Prism.js`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    const hasPrism = await page.evaluate(() => typeof window.Prism !== 'undefined');
    expect(hasPrism, `Prism.js should be loaded on ${path}`).toBe(true);
  });
}

test('all pages load p5.js', async ({ page }) => {
  const pages = [
    '/index.html',
    '/chapter1.html',
    '/chapter2.html',
    '/hydrogen.html',
    '/hexagon.html',
    '/michelson-1881.html',
  ];

  for (const path of pages) {
    await page.goto(path, { waitUntil: 'networkidle' });
    const hasP5 = await page.evaluate(() => typeof window.p5 !== 'undefined');
    expect(hasP5, `p5.js should be loaded on ${path}`).toBe(true);
  }
});
