(function() {
  let walker;

  function setup() {
    let canvas = createCanvas(450, 240);
    canvas.parent('random-walker');
    background(245, 245, 220);
    walker = new Walker();
  }

  function draw() {
    walker.step();
    walker.show();
  }

  class Walker {
    constructor() {
      this.x = width / 2;
      this.y = height / 2;
      this.width = width;
      this.height = height;
    }

    show() {
      stroke([0, 100, 0]);
      point(this.x, this.y);
    }

    step() {
      const choice = floor(random(100));

      if (choice >= 0 && choice < 26) {
        this.x++;
      } else if (choice >= 26 && choice < 52) {
        this.y++;
      } else if (choice >= 52 && choice < 76) {
        this.x--;
      } else {
        this.y--;
      }

      // Wrap x around
      if (this.x >= this.width) {
        this.x = this.x % this.width;
      } else if (this.x < 0) {
        this.x = (this.x % this.width) + this.width;
      }

      // Wrap y around
      if (this.y >= this.height) {
        this.y = this.y % this.height;
      } else if (this.y < 0) {
        this.y = (this.y % this.height) + this.height;
      }
    }
  }

  // Attach setup and draw to the global object
  window.setup = setup;
  window.draw = draw;
})();
