const ex08 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];
  let t = 0.0;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('perlin-color');
    sketch.pixelDensity(1);
    sketch.background(sketch.background_color);
    sketch.width = canvas.width;
    sketch.height = canvas.height;

    console.log(sketch.width, sketch.height);

    sketch.tx = 0;
    sketch.ty = 10000;
  }

  sketch.draw = () => {
    sketch.loadPixels();
    let xoff = 0.0;

    for (let x = 0; x < sketch.width; x++) {
      let yoff = 0.0;

      for (let y = 0; y < sketch.height; y++) {
        let bright = sketch.map(noise(xoff, yoff), 0, 1, 0, 255);
        let index = (x + (y * sketch.width)) * 4;

        sketch.pixels[index] = bright;
        sketch.pixels[index + 1] = bright;
        sketch.pixels[index + 2] = bright;
        sketch.pixels[index + 3] = 255; // alpha
        yoff += 0.01;
      }
      xoff += 0.01;
    }
    sketch.updatePixels();
  }
};

let perlinColor = new p5(ex08);
