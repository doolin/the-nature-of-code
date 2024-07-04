// This script will use p5.js to create a canvas with
// a filled circle which is initially traveling in a 
// random direction at a constant velocity. The circle
// then changes direction towards the current pointer
// location, given the pointer is in the canvas.
// We want to use the p5.js Vector capabilities for
// position and valocity.

// TODO:
// - Have the default behavior match the 2D bouncer when
//   the pointer is not in the canvas.
const gravity = (sketch) => {
  let canvasWidth = 480;
  let canvasHeight = 200;
  let background_color = [245, 245, 220];
  let radius = 20;
  let G = 6.67430e-11;
  let ballMass = 1;
  let pointerMass = 1;
  let time_delta = 1;


  sketch.setup = () => {
    let canvas = sketch.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('gravity');
    sketch.background_color = background_color;
    sketch.position = sketch.createVector(canvas.width / 2, canvas.height / 2);
    sketch.velocity = sketch.createVector(random(-3, 3), random(-3, 3));
  };

  sketch.acceleration = () => {
    let mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
    let direction = p5.Vector.sub(mouse, sketch.position);
    direction.normalize();
    acceleration = G * pointerMass / pow(direction.mag(), 2);
    return direction.mult(acceleration)
  }

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

  sketch.draw = () => {
    let direction;

    sketch.background(sketch.background_color);

    // Determine the vector towards the pointer
    let mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
    direction = p5.Vector.sub(mouse, sketch.position);
    direction.normalize();

    if (sketch.pointerInCanvas()) {
      speed = sketch.velocity.mag();
      sketch.velocity = direction.mult(speed);
    }
    sketch.position.add(sketch.velocity);

    sketch.checkEdges();

    sketch.fill([0, 100, 0]);
    sketch.ellipse(sketch.position.x, sketch.position.y, radius, radius);
  };

}

const gravity_p5 = new p5(gravity);