const splat = (sketch) => {
  sketch.background_color = [245, 245, 220];
  let opacity = 0;
  let ostep = 2;

  let width = 480;
  let height = 200;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height); // , sketch.WEBGL);
    canvas.parent('splat');
    sketch.background(sketch.background_color);
  }

  sketch.drawSplat = (x_0, y_0) => {
    sketch.beginShape();
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 3) {
      let x = x_0 * Math.cos(i);
      let y = y_0 * Math.sin(i);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);

    // an associated circle.
    // sketch.fill(200,0,0);
    // sketch.circle(x_0, y_0, 20);
  }

  sketch.draw = () => {
    let radius = 50
    sketch.frameRate(30);
    sketch.background(sketch.background_color);
    // sketch.rotateX(sketch.frameCount * 0.01);
    // sketch.rotateY(sketch.frameCount * 0.01);
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.fill(0, 100, 0, opacity);
    // sketch.drawSplat(radius, radius);
    // sketch.translate(50, 50, 0);
    x = width / 2; // random(width);
    y = height / 2; // random(height);
    sketch.translate(x, y);
    sketch.drawSplat(radius, radius);
    opacity = (opacity + ostep) % 255;
  }
}

const splatDraw = new p5(splat);