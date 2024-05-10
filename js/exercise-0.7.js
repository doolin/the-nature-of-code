const ex06 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];
  let t = 0.0;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('perlin-walker');
    sketch.background(sketch.background_color);
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;
  }

  sketch.timeSeries = () => {
    sketch.background(sketch.background_color);
    let xoff = t;
    sketch.noFill();
    sketch.stroke(0, 100, 0);
    sketch.strokeWeight(2);
    sketch.beginShape();
    for (let i = 0; i < sketch.width; i++) {
      let y = sketch.noise(xoff) * sketch.height;
      xoff += 0.01;
      sketch.vertex(i, y);
    }
    sketch.endShape();
    t += 0.01;
  }

  sketch.draw = () => {
    sketch.timeSeries();
  }
};

let perlinWalker = new p5(ex06);
