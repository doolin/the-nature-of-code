# The Nature of Code

Some of exercises from the book The Nature of Code by Daniel Shiffman
implemented in plain old HTML, CSS, and Javascript. Part of the motivation
was dipping back into a bit of computational visualization, a long running
interest of mine. Another part of the motivation was recapturing the
absolute joy of building a web site in the old fashioned way. The whole
site is hand-rolled, including the CSS. Sometimes it's good to go back
to basics.


## Progress

So far, all the exercises in Chapters 0 and 1 have been either
completed, or in the case of a couple, commented on the lack
of clarity with respect to the question. Subsequent chapters
will be completed as time and interest permit.


## Other Projects leveraging P5.js

These are both nascent, Life(tm) has other plans for me
right now. However, both provide a basis to continue
at some point in the future.

- cloud chamber illustration
- hydrogen energy states
- Michelson 1881 interferometer
- hexagon rendering

These pages (hydrogen.html, hexagon.html, michelson-1881.html) are
intentionally unlinked from the main navigation for now, as they
are works in progress.


## Testing

Tests are written with [Playwright](https://playwright.dev/) and run against
a local static server. To run:

```bash
npm test
```

This starts a local server on port 3000 via `serve`, then runs the test suite.
Use `npm run test:headed` to run with a visible browser, or `npm run test:report`
to view the HTML report from the last run.

The test suite covers:

- **Smoke tests** — all pages load with correct titles, no console errors,
  valid HTML structure (lang, charset, viewport)
- **Meta tags** — every page has a description, title, charset, and viewport
- **Canvas rendering** — p5.js creates canvas elements in every container,
  with non-zero dimensions. WebGL canvases (perlin-terrain, bouncer-2,
  vehicle-acceleration) are marked as `fixme` due to headless rendering
  limitations
- **Internal links** — all `<a>` links to `.html` pages resolve
- **Asset loading** — stylesheets, local scripts, p5.js, MathJax, and
  Prism.js all load successfully

Playwright only needs Chromium installed. On first run:

```bash
npx playwright install chromium
```


## Notes

- The TODO regarding equation correctness on the Michelson page is
  an intentional reminder to verify the Cursor-generated equations.
- The GPT-4o attribution on the hydrogen page is intentional.
