const ex05 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('gaussian-walker');
    sketch.background(sketch.background_color);
    sketch.textSize(12);
    sketch.fill(0); // black text
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;
  };


  sketch.step = () => {
    sketch.x += randomGaussian(0, 3);
    sketch.y += randomGaussian(0, 3);
  };

  sketch.show = () => {
    sketch.stroke([0, 100, 0]);
    sketch.point(sketch.x, sketch.y);
  }

  sketch.mouse_inside_canvas = () => {
    return sketch.mouseX >= 0 && sketch.mouseX <= sketch.width && sketch.mouseY >= 0 && sketch.mouseY <= sketch.height;
  }

  sketch.draw = () => {
    sketch.step();
    sketch.show();

    if (sketch.mouse_inside_canvas()) {
      // Clear a small area for the text
      sketch.fill(sketch.background_color);
      sketch.noStroke();
      sketch.rect(0, 0, 90, 25);

      sketch.fill(0);
      sketch.text(`x: ${sketch.mouseX.toFixed(0)}, y: ${sketch.mouseY.toFixed(0)}`, 10, 15);
    }
  };
};

let gaussianWalker = new p5(ex05);
