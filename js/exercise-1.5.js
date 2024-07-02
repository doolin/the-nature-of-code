// TODO:
//   - Add a limit to the velocity.
//   - Add velocity and acceleration text values to the canvas
const car = (sketch) => {
  sketch.angle = 0;
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 300, sketch.WEBGL);
    canvas.parent('vehicle-acceleration');
    sketch.frameRate(30);
    sketch.position = sketch.createVector(0, -20, 0);
    sketch.velocity = sketch.createVector(1, 0, 0);
    sketch.acceleration = sketch.createVector(0, 0, 0);

    canvas.elt.tabIndex = 0; // Make the canvas focusable
    canvas.elt.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        sketch.acceleration.x += 0.01;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sketch.acceleration.x -= 0.01;
      }
    });
  };

  // Two boxes, one solid which is ground, one clear and
  // empty which provides a bounding box.
  // The position will wrap.
  // Acceleration will be zero or maybe less than zero (decay) unless key is pressed.
  // Acceleration will need to determine sign of velocity to decay properly.
  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.orbitControl();

    // The slab.
    sketch.fill([0, 100, 0]);
    sketch.stroke('#fff');
    sketch.box(300, 10, 300);

    // Now translate "up" and position for the small box.
    sketch.translate(sketch.position);
    sketch.fill([100, 0, 0]);
    sketch.box(10, 10, 10);

    sketch.position.add(sketch.velocity);
    sketch.velocity.add(sketch.acceleration);

    // Wrap the position around the box.
    if (sketch.position.x > 150) {
      sketch.position.x = -150;
    } else if (sketch.position.x < -150) {
      sketch.position.x = 150;
    }
  };

  sketch.keyPressed = () => {
    if (sketch.keyCode === UP_ARROW) {
      sketch.acceleration.x += 0.01;
    } else if (sketch.keyCode === DOWN_ARROW) {
      sketch.acceleration.x -= 0.01;
    }
  };
}

const vehicleAcceleration = new p5(car);