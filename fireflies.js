let frame = 0;
let yoff = 0.0;
let wave_crest = -100;
let wave_trough = 0;


function setup() {
  createCanvas(1920, 1080);
  colorMode(RGB, 100);
  background(50);
  noCursor();
}

function wave() {
  fill(80);
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, wave_crest, wave_trough);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawFlies() {
  let x = map(noise(xoff, yoff), 0, 1, 0, width);
  let y = map(noise(xoff, yoff), 0, 1, 0, height);

  fill(100, 100, 0);
  ellipse(x, y, 1, 1);
}


function draw() {
  wave();
  if (frame % 5 == 0) {
    wave_crest++;
    wave_trough++;
  }

  if (wave_crest > height) {
    noLoop();
  }
}

// function mouseReleased() {
//   if (mouseX > 0 && mouseX < 450 && mouseY > 0 && mouseY < 450) {
//     noLoop();
//   }
//   else {
//     loop();
//   }
// }