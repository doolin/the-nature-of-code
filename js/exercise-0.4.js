const ex04 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];
  let stdDevSlider;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('paint-spatters');
    sketch.background(sketch.background_color);
    sketch.textSize(12);
    sketch.fill(0); // black text
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;
    sketch.midpoint_x = sketch.x;
    sketch.midpoint_y = sketch.y;

    stdDevSlider = sketch.createSlider(1, 50, 5);
    let slider_y = sketch.height / 2 - stdDevSlider.width / 2 + canvas.position().y;
    let slider_x = sketch.width + 20 + canvas.position().x;
    stdDevSlider.position(slider_x, slider_y);
    stdDevSlider.style('height', '200px');
    stdDevSlider.style('rotate', '270deg'); // Rotates the slider to vertical
  };

  sketch.step = () => {
    sketch.x = sketch.midpoint_x + (10 * randomGaussian(0, 3));
    sketch.y = sketch.midpoint_y + (10 * randomGaussian(0, 3));
  };

  sketch.drawDisc = () => {
    let sigma = stdDevSlider.value();
    let x = sketch.randomGaussian(sketch.midpoint_x, sigma);
    let y = sketch.randomGaussian(sketch.midpoint_y, sigma);

    // Draw a mostly transparent disc
    sketch.noStroke();
    sketch.fill(0, 100, 0, 50); // Mostly transparent green
    sketch.ellipse(x, y, 7, 7);
  };

  sketch.show = () => {
    sketch.stroke([0, 100, 0]);
    sketch.point(sketch.x, sketch.y);
  }

  sketch.mouse_inside_canvas = () => {
    return sketch.mouseX >= 0 && sketch.mouseX <= sketch.width && sketch.mouseY >= 0 && sketch.mouseY <= sketch.height;
  }

  sketch.draw = () => {
    // sketch.step();
    // sketch.show();
    sketch.drawDisc();

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

let spatterPaint = new p5(ex04, 'paint-spatters');
