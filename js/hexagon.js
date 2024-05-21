const hexagon = (sketch) => {
  sketch.background_color = [245, 245, 220];

  let width = 480;
  let height = 200;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height, sketch.WEBGL);
    canvas.parent('hexagons');
    sketch.background(sketch.background_color);
  }
}

let hexDraw = new p5(hexagon);