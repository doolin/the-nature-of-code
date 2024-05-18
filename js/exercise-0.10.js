const ex010 = ( sketch ) => {
  sketch.background_color = [245, 245, 220];

  let width = 480;
  let height = 200;
  let rows = 2;
  let cols = 2;
  let cellWidth = width / cols;
  let cellHeight = height / rows;
  let grid;
  let theta = 0.0;

  make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    console.log(cols);

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
    sketch.scl = 10; // cell size

    // sketch.noLoop();
  }

  sketch.calculate = () => {
    let xoff = 0;
    for (let i = 0; i < cols; i++) {
      let yoff = 0;
      for (let j = 0; j < rows; j++) {
        sketch.z[i][j] = map(noise(xoff, yoff,sketch.zoff), 0, 1, -120, 120);
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

    for (let x = 0; x < 7; x++) {
      let x_0 = x*sketch.scl;
      let x_1 = (x+1)*sketch.scl;

      sketch.beginShape(QUAD_STRIP);

      for (let y = 0; y < 5; y++) {
        let y_0 = y*sketch.scl;

        sketch.vertex(x_0, y_0, 0);
        sketch.vertex(x_1, y_0, 0);  
      }
      sketch.endShape();
    }
  }

  sketch.draw = () => {
    sketch.drawQuadStrip();
  }
};

let perlinTerrain = new p5(ex010);
