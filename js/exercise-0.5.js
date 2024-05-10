const ex05 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('gaussian-walker');
    sketch.background(sketch.background_color);
    sketch.textSize(12);
    sketch.fill(0); // black text
    sketch.gx = canvas.width / 2;
    sketch.gy = canvas.height / 2;
    sketch.bx = canvas.width / 2;
    sketch.by = canvas.height / 2;
  };

  sketch.step_green = () => {
    sketch.gx += randomGaussian(0, 3);
    sketch.gy += randomGaussian(0, 3);

    // Wrap x around
    if (sketch.gx >= sketch.width) {
      sketch.gx = sketch.gx % sketch.width;
    } else if (sketch.x < 0) {
      sketch.gx = (sketch.gx % sketch.width) + sketch.width;
    }

    // Wrap y around
    if (sketch.gy >= sketch.height) {
      sketch.gy = sketch.gy % sketch.height;
    } else if (sketch.gy < 0) {
      sketch.gy = (sketch.gy % sketch.height) + sketch.height;
    }
  };

  sketch.step_blue = () => {
    sketch.bx += randomGaussian(0, 3);
    sketch.by += randomGaussian(0, 3);

    // Wrap x around
    if (sketch.bx >= sketch.width) {
      sketch.bx = sketch.bx % sketch.width;
    } else if (sketch.bx < 0) {
      sketch.bx = (sketch.bx % sketch.width) + sketch.width;
    }

    // Wrap y around
    if (sketch.by >= sketch.height) {
      sketch.by = sketch.by % sketch.height;
    } else if (sketch.by < 0) {
      sketch.by = (sketch.by % sketch.height) + sketch.height;
    }
  };

  sketch.show_green = () => {
    sketch.stroke([0, 100, 0]);
    sketch.point(sketch.gx, sketch.gy);
  }

  sketch.show_blue = () => {
    sketch.stroke([0, 0, 150]);
    sketch.point(sketch.bx, sketch.by);
  }

  sketch.mouse_inside_canvas = () => {
    return sketch.mouseX >= 0 && sketch.mouseX <= sketch.width && sketch.mouseY >= 0 && sketch.mouseY <= sketch.height;
  }

  sketch.draw = () => {
    sketch.step_green();
    sketch.show_green();
    sketch.step_blue();
    sketch.show_blue();

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
