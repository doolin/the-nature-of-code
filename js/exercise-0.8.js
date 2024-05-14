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
  }

  sketch.draw = () => {
    sketch.loadPixels();
    let scale = 0.005;
    // let scale = 0.0005;
    let step = 0.02;

    for (let x = 0; x < sketch.width; x++) {
      for (let y = 0; y < sketch.height; y++) {
        let index = (x + y * sketch.width) * 4;

        let r = sketch.noise(x * scale, y * scale, sketch.frameCount * step) * 255;
        let g = sketch.noise(x * scale + 400, y * scale + 400, sketch.frameCount * step) * 255;
        let b = sketch.noise(x * scale + 800, y * scale + 800, sketch.frameCount * step) * 255;
        let alpha = sketch.noise(x * 0.01, y * 0.01, sketch.frameCount * 0.01) * 155 + 100; // Alpha from 100 to 255

        sketch.pixels[index + 0] = r;
        sketch.pixels[index + 1] = g;
        sketch.pixels[index + 2] = b;
        sketch.pixels[index + 3] = alpha;
      }
    }

    sketch.updatePixels();
    sketch.noFill();
  }
};

let perlinColor = new p5(ex08);
