const ex06 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];
  let randomCounts = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('custom-distribution');
    sketch.background(sketch.background_color);
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;

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

  sketch.step = () => {
    let r = sketch.floor(sketch.random(4));
    switch (r) {
      case 0:
        sketch.x++;
        break;
      case 1:
        sketch.x--;
        break;
      case 2:
        sketch.y++;
        break;
      case 3:
        sketch.y--;
        break;
    }
  }

  sketch.walker = () => {
    // x = sketch.constrain(x, 0, sketch.width - 1);
    // y = sketch.constrain(y, 0, sketch.height - 1);
    sketch.step();
    sketch.stroke(0, 100, 0);
    sketch.point(sketch.x, sketch.y);
  }

  sketch.draw = () => {
    // sketch.barGraph();
    sketch.walker();
  }
  
  // An algorithm for picking a random number based on monte carlo method
  // Here probability is determined by formula y = x
  sketch.acceptreject = () => {
    // We do this “forever” until we find a qualifying random value.
    while (true) {
      let r1 = random(1);
      let probability = r1*r1;

      // Pick a second random value.
      let r2 = random(1);
  
      // Pick the actual value. {!3} Does it qualify?  If so, we’re done!
      if (r2 < probability) {
        return r1;
      }
    }
  }
};

let customDistribution = new p5(ex06);
