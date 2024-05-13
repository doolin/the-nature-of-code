const ex06 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];
  let t = 0.0;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('perlin-walker');
    sketch.background(sketch.background_color);
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;

    sketch.tx = 0;
    sketch.ty = 10000;
  }

  sketch.draw = () => { }
};

let perlinWalker = new p5(ex06);
