const s1 = ( sketch ) => {
  
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(450, 200);
    canvas.parent('canvas1');
    sketch.background(sketch.background_color);
    sketch.textSize(12);
    sketch.fill(0); // black text
    sketch.width = canvas.width;
    sketch.height = canvas.height;
    sketch.x = canvas.width / 2;
    sketch.y = canvas.height / 2;
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
    const choice = sketch.floor(sketch.random(10));
    if (choice === 0) {
      sketch.weighted_direction();
    } else {
      sketch.random_direction();
    }

    // Wrap x around
    if (sketch.x >= sketch.width) {
      sketch.x = sketch.x % sketch.width;
    } else if (sketch.x < 0) {
      sketch.x = (sketch.x % sketch.width) + sketch.width;
    }

    // Wrap y around
    if (sketch.y >= sketch.height) {
      sketch.y = sketch.y % sketch.height;
    } else if (sketch.y < 0) {
      sketch.y = (sketch.y % sketch.height) + sketch.height;
    }
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

let myp5 = new p5(s1);
