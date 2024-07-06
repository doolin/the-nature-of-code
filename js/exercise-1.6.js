const ex06 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];
  let t = 0.0;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('perlin-acceleration');
    sketch.background(sketch.background_color);
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;

    sketch.tx = 0;
    sketch.ty = 10000;
  }

  sketch.perlinWalker = () => {
    sketch.stroke(0, 100, 0);
    sketch.strokeWeight(0.25);
    sketch.fill(0, 80, 0, 10);

    sketch.x = map(noise(sketch.tx), 0, 1, 0, sketch.width);
    sketch.y = map(noise(sketch.ty), 0, 1, 0, sketch.height);

    sketch.circle(sketch.x, sketch.y, 20);
    sketch.tx += 0.01;
    sketch.ty += 0.01;
  }

  sketch.draw = () => {
    sketch.perlinWalker();
  }
};

let perlinWalker = new p5(ex06);
