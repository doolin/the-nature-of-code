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

  sketch.random_direction = () => {
    const choice = sketch.floor(sketch.random(4));
    if (choice >= 0 && choice < 1) {
      sketch.x++;
    } else if (choice >= 1 && choice < 2) {
      sketch.y++;
    } else if (choice >= 2 && choice < 3) {
      sketch.x--;
    } else {
      sketch.y--;
    }
  };

  sketch.weighted_direction = () => {
    let mx = sketch.mouseX.toFixed(0)
    let my = sketch.mouseY.toFixed(0)
    let sx = sketch.x.toFixed(0)
    let sy = sketch.y.toFixed(0)
    let distance = sketch.dist(mx, my, sx, sy);
    let weights = [mx - sx, my - sy].map(x => x / distance);

    sketch.x += weights[0];
    sketch.y += weights[1];
  }

  sketch.step = () => {
    const choice = sketch.floor(sketch.random(2));
    if (choice === 0) {
      sketch.random_direction();
    } else {
        sketch.weighted_direction();
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
