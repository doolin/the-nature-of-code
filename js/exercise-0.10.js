const ex010 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];

  let width = 480;
  let height = 200;
  let rows = 3;
  let cols = 2;
  let cellWidth = width / cols;
  let cellHeight = height / rows;
  let grid;
  let theta = 0.0;

  make2DArray = (cols, rows) => {
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    console.log(arr);
    return arr;
  }

  sketch.setup = () => {
    let canvas = sketch.createCanvas(width, height, sketch.WEBGL);
    canvas.parent('perlin-terrain');
    // sketch.pixelDensity(1);
    sketch.background(sketch.background_color);
    sketch.width = canvas.width;
    sketch.height = canvas.height;
    sketch.z = make2DArray(cols, rows); // z is what the source uses.
    sketch.zoff = 0;
    sketch.scl = 20; // cell size

    // sketch.noLoop();
  }

  sketch.calculate = () => {
    let xoff = 0;
    for (let i = 0; i < cols; i++) {
      let yoff = 0;
      for (let j = 0; j < rows; j++) {
        sketch.z[i][j] = 100; // map(noise(xoff, yoff,sketch.zoff), 0, 1, -120, 120);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
    sketch.zoff+=0.01;
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
        let xCoordinate = x*sketch.scl-sketch.width/2;
        let yCoordinate = y*sketch.scl-sketch.height/2;
        sketch.vertex(xCoordinate, yCoordinate, sketch.z[x][y]);
        sketch.vertex(xCoordinate + sketch.scl, yCoordinate, sketch.z[x+1][y]);
      }
      endShape();
    }
  }

  sketch.drawLandscape = () => {
    sketch.stroke(100);

    sketch.circle(0, 0, 10);
    sketch.beginShape(QUAD_STRIP);
    for (let x = 0; x < sketch.z.length; x++) {
      for (let y = 0; y < sketch.z[x].length; y++) {
        sketch.vertex(x*sketch.scl, y*sketch.scl, sketch.z[x][y]);
      }
    }
    sketch.endShape();
  }

  sketch.draw = () => {
    sketch.drawLandscape();
    // This is all from the book.
    // sketch.calculate();
    // sketch.background(255);
    // sketch.push();
    // sketch.translate(0, 20, -200);
    // sketch.rotateX(PI / 3);
    // sketch.rotateZ(theta);
    // sketch.render();
    // sketch.pop();
    // theta += 0.0025;
  }
};

let perlinTerrain = new p5(ex010);
