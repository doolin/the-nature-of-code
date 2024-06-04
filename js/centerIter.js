#!/usr/bin/env node

function* circleIterator([xstart, xend], [ystart, yend]) {
  for (let x = xstart; x <= xend; x += 3) {
    for (let y = ystart; y <= yend; y++) {
      yield { x, y };
    }
  }
}
// Export the generator function for use in tests
module.exports = circleIterator;

// Test code
if (require.main === module) {
  const assert = require('assert');
  const { describe, it } = require('node:test');

  describe('circleIterator', () => {
    it('iterates over the correct sequence of values', () => {
      const iter = circleIterator([2, 15], [0, 7]);
      const expectedValues = [
        { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 },
        { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 },
        { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
        { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 },
        { x: 8, y: 0 }, { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 },
        { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 },
        { x: 11, y: 0 }, { x: 11, y: 1 }, { x: 11, y: 2 }, { x: 11, y: 3 },
        { x: 11, y: 4 }, { x: 11, y: 5 }, { x: 11, y: 6 }, { x: 11, y: 7 },
        { x: 14, y: 0 }, { x: 14, y: 1 }, { x: 14, y: 2 }, { x: 14, y: 3 },
        { x: 14, y: 4 }, { x: 14, y: 5 }, { x: 14, y: 6 }, { x: 14, y: 7 }
      ];

      for (const expected of expectedValues) {
        const result = iter.next();
        assert.strictEqual(result.done, false);
        assert.deepStrictEqual(result.value, expected);
      }

      assert.strictEqual(iter.next().done, true);
    });

    it('handles the zero case', () => {
      const iter = circleIterator([0, 0], [0, 0]);
      assert.deepStrictEqual(iter.next(), { done: false, value: { x: 0, y: 0 } });
      assert.deepStrictEqual(iter.next(), { done: true, value: undefined });
    });
  });

  const testRunner = require('node:test');
  testRunner.run();
}
