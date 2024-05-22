const hexagon = (sketch) => {
  sketch.background_color = [245, 245, 220];

  let width = 480;
  let height = 200;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height, sketch.WEBGL);
    canvas.parent('hexagons');
    sketch.background(sketch.background_color);
  }

  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateY(sketch.frameCount * 0.01);
    sketch.stroke(0);
    sketch.fill(0, 100, 0);
    sketch.beginShape();
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 3) {
      let x = 100 * Math.cos(i);
      let y = 100 * Math.sin(i);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
  }
}

let hexDraw = new p5(hexagon);