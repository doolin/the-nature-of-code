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
      }

      show() {
          stroke([0, 100, 0]);
          point(this.x, this.y);
      }

      step() {
          const choice = floor(random(120));
          if (choice >= 0 && choice < 31) {
              this.x++;
          } else if (choice >= 31 && choice < 62) {
              this.y++;
          } else if (choice >= 62 && choice < 92) {
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
