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
  beginShape();

  let xoff = 0;

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, wave_crest, wave_trough);
    vertex(x, y);
    xoff += 0.05;
  }
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
