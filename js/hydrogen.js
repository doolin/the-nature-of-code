const hydrogen_ground = (sketch) => {
  sketch.setup = () => {
    let canvas = sketch.createCanvas(200, 200);
    canvas.parent('hydrogen-1s');
    sketch.noLoop();
    sketch.background('#eee');
    sketch.noStroke();
    sketch.fill(0, 102, 224, 20); // Blue color with transparency
  };

  sketch.draw = () => {
    sketch.translate(sketch.width / 2, sketch.height / 2);
    let maxRadius = 200;
    let numPoints = 50000;
    
    for (let i = 0; i < numPoints; i++) {
      let r = sketch.randomExponential(1 / (maxRadius/2));

      let theta = sketch.random(sketch.TWO_PI);
      let phi = Math.acos(sketch.random(-1, 1));
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      sketch.ellipse(x, y, 2, 2);

      let probabilityDensity = Math.pow((2 - (r / maxRadius)), 2) * Math.exp(-r / (maxRadius / 2));
      if (sketch.random() < probabilityDensity) {
        sketch.ellipse(x, y, 2, 2);
      }
    }
  };

  sketch.randomExponential = (lambda) => {
    // Generate a random number with an exponential distribution
    return -Math.log(1.0 - sketch.random()) / lambda;
  };
}

const orbitals1s = new p5(hydrogen_ground, 'hydrogen');

const hydrogen = (sketch) => {
  sketch.setup = () => {
    let canvas = sketch.createCanvas(200, 200);
    canvas.parent('hydrogen-2p');
    sketch.noLoop();
    sketch.background('#eee');
    sketch.noStroke();
    sketch.fill(0, 102, 224, 20); // Blue color with transparency
  };

  sketch.draw = () => {
    sketch.translate(sketch.width / 2, sketch.height / 2);
    let maxRadius = 200;
    let numPoints = 50000;
    
    for (let i = 0; i < numPoints; i++) {
      let r = sketch.randomExponential(1 / (maxRadius/2));

      // 2p state
      let theta = Math.acos(sketch.random(-1, 1));
      let phi = sketch.random(sketch.TWO_PI);
      let x = r * Math.sin(theta) * Math.cos(phi);
      let y = r * Math.sin(theta) * Math.sin(phi);
      let z = r * Math.cos(theta);

      // 2p state
      let probabilityDensity = Math.pow(r, 2) * Math.exp(-r / (maxRadius / 2)) * Math.pow(Math.cos(theta), 2);

      // Use probability density to decide if we draw a point
      if (sketch.random() < probabilityDensity) {
        sketch.ellipse(x, z, 2, 2);
      }

    }
  };

  sketch.randomExponential = (lambda) => {
    // Generate a random number with an exponential distribution
    return -Math.log(1.0 - sketch.random()) / lambda;
  };
}

const orbitals2p = new p5(hydrogen, 'hydrogen');

