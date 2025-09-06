const michelsonInterferometer = (sketch) => {
  let canvasWidth = 480;
  let canvasHeight = 300;
  let background_color = [245, 245, 220];
  
  // Interferometer components
  let lightSource, beamSplitter, mirror1, mirror2, detector;
  let lightPath1, lightPath2; // Light path objects
  let etherVelocity = 0; // km/s
  let animationTime = 0;
  
  // Colors
  let lightColor = [255, 255, 0]; // Yellow for light
  let splitterColor = [0, 100, 255]; // Blue for beam splitter
  let mirrorColor = [255, 0, 0]; // Red for mirrors
  let detectorColor = [0, 255, 0]; // Green for detector
  
  sketch.setup = () => {
    let canvas = sketch.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('michelson-interferometer');
    sketch.background(background_color);
    
    // Initialize interferometer components
    initializeComponents();
    
    // Set up velocity slider
    setupVelocitySlider();
  };
  
  function initializeComponents() {
    // Light source (left side)
    lightSource = {
      x: 30,
      y: canvasHeight / 2,
      radius: 12
    };
    
    // Beam splitter (center)
    beamSplitter = {
      x: canvasWidth / 2 - 20,
      y: canvasHeight / 2,
      size: 16
    };
    
    // Mirror 1 (top, parallel to ether wind)
    mirror1 = {
      x: canvasWidth / 2 + 60,
      y: canvasHeight / 2 - 60,
      size: 16,
      isDragging: false
    };
    
    // Mirror 2 (right, perpendicular to ether wind)
    mirror2 = {
      x: canvasWidth / 2 + 120,
      y: canvasHeight / 2,
      size: 16,
      isDragging: false
    };
    
    // Detector (right side)
    detector = {
      x: canvasWidth - 30,
      y: canvasHeight / 2,
      width: 20,
      height: 80
    };
    
    // Light path objects
    lightPath1 = new LightPath(lightSource, beamSplitter, mirror1, detector, 'parallel');
    lightPath2 = new LightPath(lightSource, beamSplitter, mirror2, detector, 'perpendicular');
  }
  
  function setupVelocitySlider() {
    const slider = document.getElementById('ether-velocity');
    const display = document.getElementById('velocity-display');
    
    if (slider && display) {
      slider.addEventListener('input', (e) => {
        etherVelocity = parseFloat(e.target.value);
        display.textContent = etherVelocity;
      });
    }
  }
  
  sketch.draw = () => {
    sketch.background(background_color);
    animationTime += 0.02;
    
    // Draw ether wind indicator
    sketch.drawEtherWind();
    
    // Draw interferometer components
    sketch.drawLightSource();
    sketch.drawBeamSplitter();
    sketch.drawMirror(mirror1);
    sketch.drawMirror(mirror2);
    sketch.drawDetector();
    
    // Draw light paths
    lightPath1.update(etherVelocity, animationTime);
    lightPath2.update(etherVelocity, animationTime);
    lightPath1.draw(sketch);
    lightPath2.draw(sketch);
    
    // Draw interference pattern
    sketch.drawInterferencePattern();
    
    // Draw labels
    sketch.drawLabels();
  };
  
  sketch.drawEtherWind = () => {
    // Draw ether wind arrows
    sketch.stroke(100, 100, 100);
    sketch.strokeWeight(2);
    sketch.fill(100, 100, 100);
    
    for (let i = 0; i < 4; i++) {
      let x = 80 + i * 100;
      let y = 25;
      sketch.arrow(x, y, x + etherVelocity * 2, y);
    }
    
    sketch.fill(0);
    sketch.textAlign(sketch.CENTER);
    sketch.text(`Ether Wind: ${etherVelocity} km/s`, canvasWidth / 2, 20);
  };
  
  sketch.drawLightSource = () => {
    sketch.fill(lightColor);
    sketch.noStroke();
    sketch.ellipse(lightSource.x, lightSource.y, lightSource.radius * 2);
    
    // Add light rays
    sketch.stroke(lightColor);
    sketch.strokeWeight(2);
    for (let i = 0; i < 5; i++) {
      let angle = sketch.map(i, 0, 4, -0.3, 0.3);
      let endX = lightSource.x + 30 * sketch.cos(angle);
      let endY = lightSource.y + 30 * sketch.sin(angle);
      sketch.line(lightSource.x, lightSource.y, endX, endY);
    }
  };
  
  sketch.drawBeamSplitter = () => {
    sketch.fill(splitterColor);
    sketch.noStroke();
    sketch.rect(beamSplitter.x - beamSplitter.size/2, 
                beamSplitter.y - beamSplitter.size/2, 
                beamSplitter.size, beamSplitter.size);
    
    // Draw diagonal line to show it's a beam splitter
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.line(beamSplitter.x - beamSplitter.size/2, beamSplitter.y - beamSplitter.size/2,
                beamSplitter.x + beamSplitter.size/2, beamSplitter.y + beamSplitter.size/2);
  };
  
  sketch.drawMirror = (mirror) => {
    sketch.fill(mirrorColor);
    sketch.noStroke();
    sketch.rect(mirror.x - mirror.size/2, 
                mirror.y - mirror.size/2, 
                mirror.size, mirror.size);
    
    // Draw mirror surface
    sketch.stroke(255);
    sketch.strokeWeight(1);
    sketch.line(mirror.x - mirror.size/2, mirror.y - mirror.size/2,
                mirror.x + mirror.size/2, mirror.y + mirror.size/2);
  };
  
  sketch.drawDetector = () => {
    sketch.fill(detectorColor);
    sketch.noStroke();
    sketch.rect(detector.x - detector.width/2, 
                detector.y - detector.height/2, 
                detector.width, detector.height);
    
    // Draw interference pattern indicator
    sketch.stroke(0);
    sketch.strokeWeight(1);
    for (let i = 0; i < 5; i++) {
      let y = detector.y - detector.height/2 + i * detector.height/4;
      sketch.line(detector.x - detector.width/2 - 10, y,
                  detector.x + detector.width/2 + 10, y);
    }
  };
  
  sketch.drawInterferencePattern = () => {
    // Calculate phase difference based on ether velocity
    let phaseDiff = sketch.calculatePhaseDifference();
    
    // Draw interference pattern at detector
    sketch.stroke(0);
    sketch.strokeWeight(2);
    sketch.noFill();
    
    let patternX = detector.x + 30;
    let patternY = detector.y;
    let patternWidth = 60;
    let patternHeight = 60;
    
    // Draw interference fringes
    for (let i = 0; i < 8; i++) {
      let y = patternY - patternHeight/2 + i * patternHeight/7;
      let intensity = sketch.map(sketch.sin(phaseDiff + i * 0.5), -1, 1, 0.2, 1);
      sketch.strokeWeight(intensity * 3);
      sketch.line(patternX, y, patternX + patternWidth, y);
    }
  };
  
  sketch.calculatePhaseDifference = () => {
    // Simplified calculation of phase difference
    // In reality, this would involve the full relativistic calculation
    let c = 300000; // Speed of light in km/s
    let v = etherVelocity;
    let L = 100; // Path length in arbitrary units
    
    if (v === 0) return 0;
    
    // Approximate phase difference (simplified)
    let phaseDiff = (v * v) / (c * c) * L * 0.1;
    return phaseDiff + animationTime;
  };
  
  sketch.drawLabels = () => {
    sketch.fill(0);
    sketch.textAlign(sketch.CENTER);
    sketch.textSize(12);
    
    sketch.text('Light Source', lightSource.x, lightSource.y + 30);
    sketch.text('Beam Splitter', beamSplitter.x, beamSplitter.y + 30);
    sketch.text('Mirror 1\n(Parallel)', mirror1.x, mirror1.y + 40);
    sketch.text('Mirror 2\n(Perpendicular)', mirror2.x, mirror2.y + 40);
    sketch.text('Detector', detector.x, detector.y + 60);
    sketch.text('Interference\nPattern', detector.x + 100, detector.y);
  };
  
  sketch.arrow = (x1, y1, x2, y2) => {
    let angle = sketch.atan2(y2 - y1, x2 - x1);
    let length = sketch.dist(x1, y1, x2, y2);
    
    sketch.push();
    sketch.translate(x1, y1);
    sketch.rotate(angle);
    sketch.line(0, 0, length, 0);
    sketch.line(length, 0, length - 8, -4);
    sketch.line(length, 0, length - 8, 4);
    sketch.pop();
  };
  
  // Mouse interaction for dragging mirrors
  sketch.mousePressed = () => {
    if (sketch.dist(sketch.mouseX, sketch.mouseY, mirror1.x, mirror1.y) < mirror1.size) {
      mirror1.isDragging = true;
    } else if (sketch.dist(sketch.mouseX, sketch.mouseY, mirror2.x, mirror2.y) < mirror2.size) {
      mirror2.isDragging = true;
    }
  };
  
  sketch.mouseDragged = () => {
    if (mirror1.isDragging) {
      mirror1.x = sketch.mouseX;
      mirror1.y = sketch.mouseY;
    } else if (mirror2.isDragging) {
      mirror2.x = sketch.mouseX;
      mirror2.y = sketch.mouseY;
    }
  };
  
  sketch.mouseReleased = () => {
    mirror1.isDragging = false;
    mirror2.isDragging = false;
  };
};

// Light path class to handle the animation of light beams
class LightPath {
  constructor(source, splitter, mirror, detector, direction) {
    this.source = source;
    this.splitter = splitter;
    this.mirror = mirror;
    this.detector = detector;
    this.direction = direction; // 'parallel' or 'perpendicular'
    this.animationPhase = 0;
  }
  
  update(etherVelocity, time) {
    this.animationPhase = time;
    this.etherVelocity = etherVelocity;
  }
  
  draw(sketch) {
    sketch.stroke(255, 255, 0, 200);
    sketch.strokeWeight(3);
    
    // Calculate light speed based on ether velocity
    let lightSpeed = this.calculateLightSpeed();
    
    // Draw light beam from source to beam splitter
    this.drawBeamSegment(sketch, this.source, this.splitter, 0);
    
    // Draw light beam from beam splitter to mirror
    this.drawBeamSegment(sketch, this.splitter, this.mirror, 1);
    
    // Draw light beam from mirror back to beam splitter
    this.drawBeamSegment(sketch, this.mirror, this.splitter, 2);
    
    // Draw light beam from beam splitter to detector
    this.drawBeamSegment(sketch, this.splitter, this.detector, 3);
  }
  
  drawBeamSegment(sketch, start, end, segmentIndex) {
    let totalDistance = sketch.dist(start.x, start.y, end.x, end.y);
    let animationOffset = this.animationPhase * 50; // Animation speed
    let segmentOffset = segmentIndex * totalDistance;
    
    // Calculate how much of the beam should be visible
    let visibleLength = (animationOffset - segmentOffset) % (totalDistance * 4);
    
    if (visibleLength > 0 && visibleLength < totalDistance) {
      let ratio = visibleLength / totalDistance;
      let endX = sketch.lerp(start.x, end.x, ratio);
      let endY = sketch.lerp(start.y, end.y, ratio);
      
      sketch.line(start.x, start.y, endX, endY);
      
      // Draw light particle at the end
      sketch.fill(255, 255, 0);
      sketch.noStroke();
      sketch.ellipse(endX, endY, 6, 6);
    }
  }
  
  calculateLightSpeed() {
    // Simplified calculation - in reality this would be more complex
    let c = 1; // Base speed of light
    if (this.direction === 'parallel') {
      // Light traveling parallel to ether wind
      return c + this.etherVelocity * 0.01;
    } else {
      // Light traveling perpendicular to ether wind
      return c;
    }
  }
}

// Initialize the visualization
const michelsonViz = new p5(michelsonInterferometer);
