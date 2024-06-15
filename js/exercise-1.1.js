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
      // point(this.p);
      // stroke([0, 200, 0]);
      point(p5.Vector.rotate(this.o.sub(this.midpoint).add(this.midpoint), 0.3))
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

      // Wrap x around
      if (this.o.x >= width) {
        this.o.x = this.x % width;
      } else if (this.o.x < 0) {
        this.o.x = (this.o.x % width) + width;
      }

      // Wrap y around
      if (this.o.y >= height) {
        this.o.y = this.o.y % height;
      } else if (this.o.y < 0) {
        this.o.y = (this.o.y % height) + height;
      }

      // Wrap p.x around
      if (this.p.x >= width) {
        this.p.x = this.p.x % width;
      } else if (this.p.x < 0) {
        this.p.x = (this.p.x % width) + width;
      }

      // Wrap p.y around
      if (this.p.y >= height) {
        this.p.y = this.p.y % height;
      } else if (this.p.y < 0) {
        this.p.y = (this.p.y % height) + height;
      }
    }
  }

  // Attach setup and draw to the global object
  window.setup = setup;
  window.draw = draw;
})();
