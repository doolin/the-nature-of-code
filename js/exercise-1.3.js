// const ex13 = ( sketch ) => {
//   sketch.background_color = [245, 245, 220];

//   sketch.setup = () => {
//     let canvas = sketch.createCanvas(480, 200);
//     canvas.parent('bouncer-1');
//     sketch.background(sketch.background_color);

//     sketch.position = createVector(100, 100);
//     sketch.velocity = createVector(2.5, 2);
//   }
  
//   sketch.draw = () => {
//     sketch.background(sketch.background_color);
//     sketch.position.add(sketch.velocity);
  
//     if (sketch.position.x > sketch.width || sketch.position.x < 0) {
//       sketch.velocity.x = sketch.velocity.x * -1;
//     }
//     if (sketch.position.y > sketch.height || sketch.position.y < 0) {
//       sketch.velocity.y = sketch.velocity.y * -1;
//     }

//     sketch.stroke(0);  
//     sketch.fill([0, 100, 0]);
//     sketch.circle(sketch.position.x, sketch.position.y, 48);
//   }
// }

// let bouncer1 = new p5(ex13);


const sketch3DBox = (sketch) => {
  sketch.angle = 0;
  sketch.background_color = [200, 200, 200];
  sketch.vertices = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(480, 480, sketch.WEBGL);
    canvas.parent('bouncer-1');

    let size = 200;
    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        for (let k = -1; k <= 1; k += 2) {
          sketch.vertices.push(sketch.createVector(i * size / 2, j * size / 2, k * size / 2));
        }
      }
    }
  };

  sketch.draw = () => {
    sketch.background(sketch.background_color);
    sketch.rotateX(sketch.angle);
    sketch.rotateY(sketch.angle);
    sketch.rotateZ(sketch.angle * 0.7);
    drawBox();
    // sketch.angle += 0.01;
  };

  function drawBox() {
    sketch.beginShape();
    for (let i = 0; i < 4; i++) {
      sketch.vertex(sketch.vertices[i].x, sketch.vertices[i].y, sketch.vertices[i].z);
    }
    sketch.endShape(sketch.CLOSE);

    sketch.beginShape();
    for (let i = 4; i < 8; i++) {
      sketch.vertex(sketch.vertices[i].x, sketch.vertices[i].y, sketch.vertices[i].z);
    }
    sketch.endShape(sketch.CLOSE);

    for (let i = 0; i < 4; i++) {
      sketch.beginShape();
      sketch.vertex(sketch.vertices[i].x, sketch.vertices[i].y, sketch.vertices[i].z);
      sketch.vertex(sketch.vertices[i + 4].x, sketch.vertices[i + 4].y, sketch.vertices[i + 4].z);
      sketch.endShape(sketch.CLOSE);
    }
  }
};

let box3D = new p5(sketch3DBox);
