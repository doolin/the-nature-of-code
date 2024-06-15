// TODOD: Change this to allow building and packing.
(function() {
  let walker;

  function setup() {
    // Create a vector here.
    let canvas = createCanvas(450, 240);
    canvas.parent('random-walker');
    background(245, 245, 220);
    position = createVector(width / 2, height / 2);
    walker = new Walker(position);
  }

  function draw() {
    walker.step();
    walker.show();
  }

  class Walker {
    constructor(position) {
      this.x = width / 2;
      this.y = height / 2;
      this.p = position;
    }

    show() {
      stroke([150, 0, 0]);
      point(this.x, this.y);
      stroke([0, 0, 150]);
      point(this.p);
    }

    step() {
      const choice = floor(random(100));
      if (choice >= 0 && choice < 26) {
          this.x++;
          this.p.y++
      } else if (choice >= 26 && choice < 52) {
          this.y++;
          this.p.x++;
      } else if (choice >= 52 && choice < 76) {
          this.x--;
          this.p.y--;
      } else {
          this.y--;
          this.p.x--;
      }

      // Wrap x around
      if (this.x >= width) {
        this.x = this.x % width;
      } else if (this.x < 0) {
        this.x = (this.x % width) + width;
      }

      // Wrap y around
      if (this.y >= height) {
        this.y = this.y % height;
      } else if (this.y < 0) {
        this.y = (this.y % height) + height;
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
