const ex07 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];
  let randomCounts = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('custom-distribution');
    sketch.background(sketch.background_color);
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;

    sketch.prevX = sketch.x;
    sketch.prevY = sketch.y;

    for (let i = 0; i < 100; i++) {
      randomCounts[i] = 0;
    }
  }
  
  sketch.barGraph = () => {
    // Pick a random number and increase the count
    let index = int(sketch.acceptreject() * randomCounts.length);
    randomCounts[index]++;
  
    // Draw a rectangle to graph results
    sketch.stroke(0, 100, 0);
    sketch.strokeWeight(2);
    sketch.fill(0, 127, 0);
  
    let w = sketch.width / randomCounts.length;
  
    for (let x = 0; x < randomCounts.length; x++) {
      sketch.rect(x * w, sketch.height - randomCounts[x], w - 1, randomCounts[x]);
    }
  }

  sketch.walker = () => {
    sketch.prevX = sketch.x;
    sketch.prevY = sketch.y;

    let step = 10 * sketch.acceptreject();
    sketch.x += random(-step, step);
    sketch.y += random(-step, step);

    // Wrap around logic for x and y coordinates
    sketch.x = (sketch.x + sketch.width) % sketch.width;
    sketch.y = (sketch.y + sketch.height) % sketch.height;

    // Check for wrapping to draw line correctly
    if (Math.abs(sketch.x - sketch.prevX) > sketch.width / 2) {
      sketch.prevX = sketch.x; // Prevent drawing a line across the canvas
    }
    if (Math.abs(sketch.y - sketch.prevY) > sketch.height / 2) {
      sketch.prevY = sketch.y; // Prevent drawing a line across the canvas
    }

    sketch.stroke(0, 100, 0);
    sketch.line(sketch.prevX, sketch.prevY, sketch.x, sketch.y);
  }

  sketch.draw = () => {
    // sketch.barGraph();
    sketch.walker();
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

let customDistribution = new p5(ex07);
