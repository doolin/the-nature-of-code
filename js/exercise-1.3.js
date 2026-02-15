const ex13 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];
  let diameter = 36;
  let radius = diameter / 2;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('bouncer-1');
    sketch.background(sketch.background_color);

    sketch.position = createVector(100, 100);
    sketch.velocity = createVector(2.5, 2);
  }
  
  // TODO: adjust bounding box with respect to the disk diameter
  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.position.add(sketch.velocity);
  
    // bounding box
    let bbx = sketch.width - radius;
    if (sketch.position.x > bbx || sketch.position.x < radius) {
      sketch.velocity.x = sketch.velocity.x * -1;
    }

    let bby = sketch.height - radius;
    if (sketch.position.y > bby || sketch.position.y < radius) {
      sketch.velocity.y = sketch.velocity.y * -1;
    }

    sketch.stroke(0);
    sketch.fill([0, 100, 0]);
    sketch.circle(sketch.position.x, sketch.position.y, diameter);
  }
}

let bouncer1 = new p5(ex13);


const sketch3DBox = (sketch) => {
  sketch.angle = 0;
  sketch.background_color = [245, 245, 220];
  sketch.vertices = [];
  // TODO: Needs to be sphere radius
  let radius = 36;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 300, sketch.WEBGL);
    canvas.parent('bouncer-2');
    sketch.frameRate(30);
    sketch.position = sketch.createVector(50, 50, 50);
    sketch.velocity = sketch.createVector(2.5, 2, 1.5);
  };

  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.orbitControl();

    sketch.noFill();

    // TODO: fix these values to use radius
    let boxWidth = 100;
    sketch.box(200);
    let bbx = boxWidth - (radius/2);

    sketch.push()
    sketch.translate(sketch.position.x, sketch.position.y, sketch.position.z);
    sketch.noStroke(); // Disable wireframe
    sketch.fill(0, 100, 0); // Apply color to the sphere
    // TODO: change to radius argument
    sketch.sphere(20);
    sketch.pop();

    sketch.position.add(sketch.velocity);
    if (sketch.position.x > bbx || sketch.position.x < -bbx) {
      sketch.velocity.x = sketch.velocity.x * -1;
    }
    if (sketch.position.y > bbx || sketch.position.y < -bbx) {
      sketch.velocity.y = sketch.velocity.y * -1;
    }

    if (sketch.position.z > bbx || sketch.position.z < -bbx) {
      sketch.velocity.z = sketch.velocity.z * -1;
    }
  };
};

let box3D = new p5(sketch3DBox);
