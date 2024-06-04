const hexagon = (sketch) => {
  sketch.background_color = [245, 245, 220];

  let width = 580;
  let height = 580;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height); // , sketch.WEBGL);
    canvas.parent('hexagons');
    sketch.background(sketch.background_color);
  }

  sketch.drawHexagon = (x_0, y_0) => {
    sketch.beginShape();
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 3) {
      let x = x_0 * Math.cos(i);
      let y = y_0 * Math.sin(i);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
  }

  sketch.draw = () => {
    let radius = 50
    sketch.background(sketch.background_color);
    // sketch.rotateX(sketch.frameCount * 0.01);
    // sketch.rotateY(sketch.frameCount * 0.01);
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.fill(0, 100, 0);
    sketch.drawHexagon(radius, radius);
    sketch.translate(50, 50, 0);
    sketch.drawHexagon(radius, radius);
  }
}

let hexDraw = new p5(hexagon);
