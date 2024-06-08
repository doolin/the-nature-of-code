// TODOD: Change this to allow building and packing.
(function() {
  let walker;

  function setup() {
    // Create a vector here.
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
    }

    show() {
      stroke([150, 0, 0]);
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
    }
  }

  // Attach setup and draw to the global object
  window.setup = setup;
  window.draw = draw;
})();
