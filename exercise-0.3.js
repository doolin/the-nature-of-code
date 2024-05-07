const s1 = ( sketch ) => {
  
  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('canvas1');
    sketch.background(100, 200, 100);
  };

  sketch.walk = () => {
    sketch.fill(255, 100, 100);
    sketch.ellipse(sketch.width / 2, sketch.height / 2, 50, 50);
  };

  sketch.draw = () => {
    // sketch.fill(255);
    // sketch.ellipse(sketch.width / 2, sketch.height / 2, 50, 50);
    sketch.walk();
  };
};

let myp5 = new p5(s1);
