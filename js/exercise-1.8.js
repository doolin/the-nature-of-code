// Iinitial GPT-4o prompt:
// This script will use p5.js to create a canvas with
// a filled circle which is initially traveling in a 
// random direction at a constant velocity. The circle
// then changes direction towards the current pointer
// location, given the pointer is in the canvas.
// We want to use the p5.js Vector capabilities for
// position and valocity.

// TODO:
// - Add a text box showing the x, y position of the disk
// - Add trails tp show the path of the disk
// - Use actual physical values for say earth/moon
// - Add controls for changing parameters
const gravity = (sketch) => {
  let canvasWidth = 480;
  let canvasHeight = 200;
  let background_color = [245, 245, 220];
  let radius = 20;
  let G = 0.5; //6.67430e-11;
  let ballMass = 1;
  let pointerMass = 300;
  let time_delta = 1;
  let direction;


  sketch.setup = () => {
    let canvas = sketch.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('gravity');
    sketch.background_color = background_color;
    sketch.position = sketch.createVector(canvas.width / 2, canvas.height / 2);
    // sketch.velocity = sketch.createVector(random(-3, 3), random(-3, 3));
    sketch.velocity = sketch.createVector(0, 0);
  };

  sketch.pointerInCanvas = () => {
    return sketch.mouseX > 0 && sketch.mouseX < sketch.width && sketch.mouseY > 0 && sketch.mouseY < sketch.height;
  }

  sketch.checkEdges = () => {
    let bbx = sketch.width - radius / 2;
    if (sketch.position.x > bbx || sketch.position.x < radius / 2) {
      sketch.velocity.x = sketch.velocity.x * -1;
    }

    let bby = sketch.height - radius / 2;
    if (sketch.position.y > bby || sketch.position.y < radius / 2) {
      sketch.velocity.y = sketch.velocity.y * -1;
    }
  }

  sketch.getR = () => {
    let mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
    let R = p5.Vector.sub(mouse, sketch.position).mag();
    if (R < 20) {
      R = 20;
    }
    return R;
  }

  sketch.acceleration = () => {
    let mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
    let direction = p5.Vector.sub(mouse, sketch.position);
    direction.normalize();
    let R = sketch.getR();
    acceleration = G * pointerMass / pow(R, 2);
    return direction.mult(acceleration * time_delta);
  }

  sketch.draw = () => {
    let direction;

    sketch.background(sketch.background_color);

    // Determine the vector towards the pointer
    let mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
    direction = p5.Vector.sub(mouse, sketch.position);
    direction.normalize();

    if (sketch.pointerInCanvas()) {
      // speed = sketch.velocity.mag();
      sketch.velocity.add(sketch.acceleration());
    }
    sketch.position.add(sketch.velocity);

    sketch.checkEdges();

    sketch.fill([0, 100, 0]);
    sketch.ellipse(sketch.position.x, sketch.position.y, radius, radius);
  };

}

const gravity_p5 = new p5(gravity);