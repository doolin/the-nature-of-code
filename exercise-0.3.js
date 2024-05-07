const s1 = ( sketch ) => {
  
  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('canvas1');
    sketch.background(245, 245, 220);
    sketch.textSize(12); // Set the text size for better visibility
    sketch.fill(0); // Set the text color to black
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;
  };

  sketch.walk = () => {
    // sketch.fill(255, 100, 100);
    // sketch.ellipse(sketch.width / 2, sketch.height / 2, 50, 50);
  };

  sketch.step = () => {
    const choice = sketch.floor(sketch.random(120));
    if (choice >= 0 && choice < 31) {
      sketch.x++;
    } else if (choice >= 31 && choice < 62) {
      sketch.y++;
    } else if (choice >= 62 && choice < 92) {
      sketch.x--;
    } else {
      sketch.y--;
    }
  };

  sketch.show = () => {
    // sketch.stroke(245, 245, 220);
    sketch.stroke(0, 245, 0);
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
      sketch.fill(100, 200, 100);
      sketch.noStroke();
      sketch.rect(0, 0, 90, 25);

      sketch.fill(0);
      sketch.text(`x: ${sketch.mouseX.toFixed(0)}, y: ${sketch.mouseY.toFixed(0)}`, 10, 15);
    }
  };
};

let myp5 = new p5(s1);
