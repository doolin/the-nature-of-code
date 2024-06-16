// TODOD: Change this to allow building and packing.
(function() {
  let walker;

  function setup() {
    // Create a vector here.
    let canvas = createCanvas(450, 240);
    canvas.parent('random-walker');
    background(245, 245, 220);
    // frameRate(1);
    midpoint = createVector(width / 2, height / 2);
    original = createVector(width / 2, height / 2);
    position = createVector(width / 2, height / 2);
    // angleMode(DEGREES)
    walker = new Walker(position, original);
  }

  function draw() {
    walker.step();
    walker.show();
  }

  class Walker {
    constructor(position, original, midpoint) {
      this.o = original;
      this.p = position;
      this.midpoint = midpoint;
    }

    show() {
      stroke([250, 0, 100]);
      point(this.o);
      stroke([0, 0, 150]);
      point(this.p);
      stroke([0, 200, 0]);
      // point(p5.Vector.rotate(this.o.sub(this.midpoint).add(this.midpoint), 0.3))
    }

    wrap(point) {
      // Wrap x around
      if (point.x >= width) {
        point.x = point.x % width;
      } else if (point.x < 0) {
        point.x = (point.x % width) + width;
      }

      // Wrap y around
      if (point.y >= height) {
        point.y = point.y % height;
      } else if (point.y < 0) {
        point.y = (point.y % height) + height;
      }
    }

    step() {
      const choice = floor(random(100));
      if (choice >= 0 && choice < 26) {
          this.o.x++;
          this.p.y++
      } else if (choice >= 26 && choice < 52) {
          this.o.y++;
          this.p.x++;
      } else if (choice >= 52 && choice < 76) {
          this.o.x--;
          this.p.y--;
      } else {
          this.o.y--;
          this.p.x--;
      }

      this.wrap(this.o);
      this.wrap(this.p);
    }
  }

  // Attach setup and draw to the global object
  window.setup = setup;
  window.draw = draw;
})();
