let frame = 0;
let yoff = 0.0;
let h_wave_crest = -100;
let h_wave_trough = 0;
let v_wave_crest = -100;
let v_wave_trough = 0;
let h_delta = 1;
let v_delta = 1;
let looping = true;


function setup() {
  createCanvas(1920, 1080);
  colorMode(RGB, 100);
  background(50);
  noCursor();
}

function waveTop() {
  fill(80);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, v_wave_crest, v_wave_trough);
    vertex(x, y);
    cur.push([x, y+8]);
    xoff += 0.05;
  }
  yoff += 0.01;
  len = cur.length;
  for (let i = 0; i < len; i++) {
    let p = cur.pop()
    vertex(p[0], p[1]);
  }
  endShape(CLOSE);
}

function waveLeft() {
  fill(80);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let y = 0; y <= height; y += 10) {
    let x = map(noise(xoff, yoff), 0, 1, h_wave_crest, h_wave_trough);
    vertex(x, y);
    cur.push([x+8, y]);
    xoff += 0.05;
  }
  yoff += 0.01;
  len = cur.length;
  for (let i = 0; i < len; i++) {
    let p = cur.pop()
    vertex(p[0], p[1]);
  }
  endShape(CLOSE);
}

function drawFlies() {
  let x = map(noise(xoff, yoff), 0, 1, 0, width);
  let y = map(noise(xoff, yoff), 0, 1, 0, height);

  fill(100, 100, 0);
  ellipse(x, y, 1, 1);
}


function draw() {
  h_wave_crest = mouseX - 5;
  h_wave_trough = mouseX + 5;
  v_wave_crest = mouseY - 5;
  v_wave_trough = mouseY + 5;
  waveLeft();
  waveTop();
  rotate(90);
  // if (h_wave_crest > width) {
  //   h_delta = -1;
  // }
  // else if (h_wave_crest < 0) {
  //   h_delta = 1;
  // }
  // if (v_wave_crest > height) {
  //   v_delta = -1;
  // }
  // else if (v_wave_crest < 0) {
  //   v_delta = 1;
  // }
  // if (frame % 5 == 0) {
  //   h_wave_crest += h_delta;
  //   h_wave_trough += h_delta;
  //   v_wave_crest += v_delta;
  //   v_wave_trough += v_delta;
  // }
}

function mouseReleased() {
  if (looping) {
    noLoop();
    looping = false;
  }
  else {
    loop();
    looping = true;
  }
}
