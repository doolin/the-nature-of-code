// Shooting star with p5.js. Here's what we're going to do.
// - Use a functional approach: const shootingStar = (sketch) => { ... }
// - Canvas width 480, height 200, background dark gray #111
// - Start the meteor from the upper left corner of a canvas, offset by (10, 15)
// - travel in a 4 oclock direction 2/3 across the canvas
// - Model the meteor as a sequence of points which starts bright white in color, then leaves a trails which gradually fades
// - have a mouse click anywhere on the canvas to repeat it
// - the file name is shootingStar.js.
// - DO NOT EMIT HTML.

const shootingStar = (sketch) => {
  let star = [];
  let maxTrail = 50;
  let startX = 10;
  let startY = 15;
  let endX = 480 * 2/3;
  let endY = 200 * 2/3;
  let speedX = (endX - startX) / maxTrail;
  let speedY = (endY - startY) / maxTrail;

  sketch.setup = () => {
      let canvas = sketch.createCanvas(480, 200);
      canvas.parent('shooting-star'); // added this line
      sketch.background('#111');
      resetStar();
  };

  sketch.draw = () => {
      sketch.background('#111');
      sketch.noStroke();
      
      for (let i = star.length - 1; i >= 0; i--) {
          let opacity = sketch.map(i, 0, star.length - 1, 0, 255);
          sketch.fill(255, opacity);
          sketch.ellipse(star[i].x, star[i].y, 5);
      }

      if (star.length < maxTrail) {
          let newPoint = {
              x: startX + speedX * star.length,
              y: startY + speedY * star.length
          };
          star.push(newPoint);
      } else {
          resetStar();
      }
  };

  sketch.mousePressed = () => {
      resetStar();
  };

  function resetStar() {
      star = [];
  }
};

const ss = new p5(shootingStar);
