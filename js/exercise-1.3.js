const ex13 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 200);
    canvas.parent('bouncer-1');
    sketch.background(sketch.background_color);

    sketch.position = createVector(100, 100);
    sketch.velocity = createVector(2.5, 2);
  }
  
  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.position.add(sketch.velocity);
  
    if (sketch.position.x > sketch.width || sketch.position.x < 0) {
      sketch.velocity.x = sketch.velocity.x * -1;
    }
    if (sketch.position.y > sketch.height || sketch.position.y < 0) {
      sketch.velocity.y = sketch.velocity.y * -1;
    }

    sketch.stroke(0);  
    sketch.fill([0, 100, 0]);
    sketch.circle(sketch.position.x, sketch.position.y, 48);
  }
}

let bouncer1 = new p5(ex13);
