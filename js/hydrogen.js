const hydrogen = (sketch) => {
  sketch.setup = () => {
    let canvas = sketch.createCanvas(600, 600);
    canvas.parent('hydrogen');
    sketch.noLoop();
    sketch.background(0);
    sketch.noStroke();
    sketch.fill(0, 102, 204, 20); // Blue color with transparency
  };

  sketch.draw = () => {
    sketch.translate(sketch.width / 2, sketch.height / 2);
    let maxRadius = 200;
    let numPoints = 50000;
    
    for (let i = 0; i < numPoints; i++) {
      let r = sketch.randomExponential(1 / maxRadius);
      let theta = sketch.random(sketch.TWO_PI);
      let phi = Math.acos(sketch.random(-1, 1));
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      
      sketch.ellipse(x, y, 10, 10);
    }
  };

  sketch.randomExponential = (lambda) => {
    // Generate a random number with an exponential distribution
    return -Math.log(1.0 - sketch.random()) / lambda;
  };
}

const orbitals = new p5(hydrogen, 'hydrogen');
