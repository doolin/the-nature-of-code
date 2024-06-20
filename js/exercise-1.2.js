const ex12 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];
  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('distribution-vectors');
    sketch.background(sketch.background_color);
    // TODO: rename to half_width and half_height
    let width = canvas.width / 2;
    let height = canvas.height / 2;

    sketch.walkers = new Array(
      [sketch.createVector(width, height), sketch.createVector(width, height)],
      [sketch.createVector(width, height), sketch.createVector(width, height)],
      [sketch.createVector(width, height), sketch.createVector(width, height)]
    )
  }
  
  sketch.walkerVector = (previous, current, color) => {
    // Deleting these makes a cool radial pattern
    previous.x = current.x;
    previous.y = current.y;

    let step = 10 * sketch.acceptreject();
    current.x += random(-step, step);
    current.y += random(-step, step);

    // Wrap around logic for x and y coordinates
    current.x = (current.x + sketch.width) % sketch.width;
    current.y = (current.y + sketch.height) % sketch.height;

    // Check for wrapping to draw line correctly
    if (Math.abs(current.x - previous.x) > sketch.width / 2) {
      previous.x = current.x; // Prevent drawing a line across the canvas
    }
    if (Math.abs(current.y - previous.y) > sketch.height / 2) {
      previous.y = current.y; // Prevent drawing a line across the canvas
    }

    sketch.stroke(color);
    sketch.line(previous.x, previous.y, current.x, current.y);
  }

  sketch.draw = () => {
    sketch.walkerVector(sketch.walkers[0][0], sketch.walkers[0][1], [200, 100, 150]);
    sketch.walkerVector(sketch.walkers[1][0], sketch.walkers[1][1], [0, 0, 200]);
    sketch.walkerVector(sketch.walkers[2][0], sketch.walkers[2][1], [0, 100, 0]);
  }
  
  sketch.acceptreject = () => {
    // We do this “forever” until we find a qualifying random value.
    while (true) {
      let r1 = random(1);
      let probability = r1*r1;

      // Pick a second random value.
      let r2 = random(1);
  
      // Pick the actual value. {!3} Does it qualify?  If so, we’re done!
      if (r2 < probability) {
        return probability;
      }
    }
  }
};

let distributionVectors = new p5(ex12);
