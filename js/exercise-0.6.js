const ex06 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];
  let randomCounts = [];

  sketch.setup = () => {
    createCanvas(480, 200);
    canvas.parent('custom-distribution');
    // sketch.background(sketch.background_color);

    for (let i = 0; i < 20; i++) {
      randomCounts[i] = 0;
    }
  }
  
  sketch.draw = () => {
    background(255);
  
    // Pick a random number and increase the count
    let index = int(sketch.acceptreject() * randomCounts.length);
    randomCounts[index]++;
  
    // Draw a rectangle to graph results
    stroke(0);
    strokeWeight(2);
    fill(127);
  
    let w = width / randomCounts.length;
  
    for (let x = 0; x < randomCounts.length; x++) {
      rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
    }
  }
  
  // An algorithm for picking a random number based on monte carlo method
  // Here probability is determined by formula y = x
  sketch.acceptreject = () => {
    // We do this “forever” until we find a qualifying random value.
    while (true) {
      // Pick a random value.
      let r1 = random(1);
      // Assign a probability.
      let probability = r1;
      // Pick a second random value.
      let r2 = random(1);
  
      //{!3} Does it qualify?  If so, we’re done!
      if (r2 < probability) {
        return r1;
      }
    }
  }
};

let customDistribution = new p5(ex06);
