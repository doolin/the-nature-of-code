const car = (sketch) => {
  sketch.angle = 0;
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 300, sketch.WEBGL);
    canvas.parent('vehicle-acceleration');
    sketch.frameRate(30);
    sketch.position = sketch.createVector(0, -20, 0);
    sketch.velocity = sketch.createVector(1, 0, 0);
  };

  // Two boxes, one solid which is ground, one clear and
  // empty which provides a bounding box.
  // The position will wrap.
  // Acceleration will be zero or maybe less than zero (decay) unless key is pressed.
  // Acceleration will need to determine sign of velocity to decay properly.
  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.orbitControl();

    sketch.fill([0, 100, 0]);
    sketch.stroke('#fff');
    sketch.box(300, 10, 300);
    // Now translate up (y) 10 and draw another box.
    // sketch.translate(0, -20, 0);
    // sketch.translate(sketch.position.x, sketch.position.y, sketch.position.z);
    sketch.translate(sketch.position);
    sketch.fill([100, 0, 0]);
    sketch.box(10, 10, 10);
    // sketch.translate(sketch.position.x, sketch.position.y, sketch.position.z);
    // sketch.rotateX(sketch.angle);
    // sketch.rotateY(sketch.angle);
    // sketch.rotateZ(sketch.angle);
    // sketch.box(90);
    // sketch.angle += 0.1;
    sketch.position.add(sketch.velocity);

    // Wrap the position around the box.
    if (sketch.position.x > 150) {
      sketch.position.x = -150;
    }
  };
}

const vehicleAcceleration = new p5(car);