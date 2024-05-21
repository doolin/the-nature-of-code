const ex010 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];

  let width = 480;
  let height = 200;
  let scl = 15; // cell size
  let theta_z = 0.0;

  make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
  }

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height, sketch.WEBGL);
    canvas.parent('perlin-terrain');
    sketch.background(sketch.background_color);

    sketch.width = canvas.width;
    sketch.cols = floor(canvas.width / scl);

    sketch.height = canvas.height;
    sketch.rows = floor(canvas.height / scl);

    sketch.z = make2DArray(sketch.cols, sketch.rows); // z is what the source uses.

    sketch.zoff = 0;
    sketch.scl = scl;
  }

  sketch.calculate = () => {
    let xoff = 0;
    for (let i = 0; i < sketch.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < sketch.rows; j++) {
        sketch.z[i][j] = map(noise(xoff, yoff,sketch.zoff), 0, 1, -120, 120);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
    sketch.zoff += 0.01;
  }

  sketch.render = () => {
     // Every cell is an individual quad
     for (let x = 0; x < sketch.z.length-1; x++) {
      beginShape(QUAD_STRIP);
      for (let y = 0; y < sketch.z[x].length; y++) {
        // one quad at a time
        // each quad's color is determined by the height value at each vertex
        // (clean this part up)
        sketch.stroke(0);
        let currentElevation = sketch.z[x][y];
        let currentShade = map(currentElevation, -120, 120, 0, 255);
        sketch.fill(currentShade, 255);
        let xCoordinate = x*sketch.scl; // -sketch.width/2;
        let yCoordinate = y*sketch.scl; // -sketch.height/2;
        sketch.vertex(xCoordinate, yCoordinate, sketch.z[x][y]);
        sketch.vertex(xCoordinate + sketch.scl, yCoordinate, sketch.z[x+1][y]);
      }
      endShape();
    }
  }

  sketch.drawQuadStrip = () => {
    sketch.background(sketch.background_color);
    sketch.stroke(0, 100, 0);
    sketch.strokeWeight(1);
    sketch.fill(0, 170, 0, 100);

    sketch.calculate();

    sketch.push();

    sketch.translate(0, 20, -200);
    sketch.rotateX(PI/3);
    sketch.rotateZ(theta_z);

    for (let x = 0; x < (sketch.cols - 1); x++) {
      let x_0 = (x * sketch.scl) - (sketch.width / 2);
      let x_1 = (x * sketch.scl) - (sketch.width / 2) + sketch.scl;

      sketch.beginShape(QUAD_STRIP);

      for (let y = 0; y < sketch.rows; y++) {
        let y_0 = (y * sketch.scl) - (sketch.height / 2);

        // let currentElevation = sketch.z[x][y];
        // let currentShade = map(currentElevation, -120, 120, 0, 255);
        // sketch.fill(currentShade, 125);

        sketch.vertex(x_0, y_0, sketch.z[x][y]);
        sketch.vertex(x_1, y_0, sketch.z[x+1][y]);
      }
      sketch.endShape();
    }

    sketch.pop();

    // this works
    theta_z += 0.0025;
  }

  sketch.draw = () => {
    sketch.drawQuadStrip();
  }
};

let perlinTerrain = new p5(ex010);
