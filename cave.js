let frame = 0;
let yoff = 0.0;
let h_wave_crest1 = 900;
let h_wave_trough1 = 1000;
let v_wave_crest1 = 900;
let v_wave_trough1 = 1000;
let h_wave_crest2 = 900;
let h_wave_trough2 = 1000;
let v_wave_crest2 = 900;
let v_wave_trough2 = 1000;
let h_delta1 = 3;
let h_d1 = 3;
let v_delta1 = 1.5;
let v_d1 = 1.5;
let h_delta2 = -2;
let h_d2 = -2;
let v_delta2 = -3;
let v_d2 = -3;
let looping = true;
let hR = 80;
let hG = 80;
let hB = 80;
let vR = 80;
let vG = 80;
let vB = 80;
let a = 40;


function setup() {
  createCanvas(1900, 1000);
  colorMode(RGB, 100);
  background(50);
  noCursor();
}

function waveTop1() {
  fill(vR, vG, vB, a);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, v_wave_crest1, v_wave_trough1);
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
function waveTop2() {
  fill(vR, vG, vB, a);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, v_wave_crest2, v_wave_trough2);
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

function waveLeft1() {
  fill(hR, hG, hB, a);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let y = 0; y <= height; y += 10) {
    let x = map(noise(xoff, yoff), 0, 1, h_wave_crest1, h_wave_trough1);
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
function waveLeft2() {
  fill(hR, hG, hB, a);
  beginShape();

  let xoff = 0;

  let cur = []

  for (let y = 0; y <= height; y += 10) {
    let x = map(noise(xoff, yoff), 0, 1, h_wave_crest2, h_wave_trough2);
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
  // h_wave_crest = mouseX - 5;
  // h_wave_trough = mouseX + 5;
  // v_wave_crest = mouseY - 5;
  // v_wave_trough = mouseY + 5;
  waveLeft1();
  waveTop1();
  waveLeft2();
  waveTop2();
  rotate(90);
  if (random(100) < 2) {
    hR = random(100);
    hG = random(100);
    hB = random(100);
  }
  if (random(100) < 2) {
    vR = random(100);
    vG = random(100);
    vB = random(100);
  }
  if (((h_wave_crest1 + h_wave_trough1) / 2) > width) {
    h_delta1 = -h_d1;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  else if (((h_wave_crest1 + h_wave_trough1) / 2) < 0) {
    h_delta1 = h_d1;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  if (((v_wave_crest1 + v_wave_trough1) / 2) > height) {
    v_delta1 = -v_d1;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  else if (((v_wave_crest1 + v_wave_trough1) / 2) < 0) {
    v_delta1 = v_d1;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  if (((h_wave_crest2 + h_wave_trough2) / 2) > width) {
    h_delta2 = h_d2;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  else if (((h_wave_crest2 + h_wave_trough2) / 2) < 0) {
    h_delta2 = -h_d2;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  if (((v_wave_crest2 + v_wave_trough2) / 2) > height) {
    v_delta2 = v_d2;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  else if (((v_wave_crest2 + v_wave_trough2) / 2) < 0) {
    v_delta2 = -v_d2;
    // R = random(100);
    // G = random(100);
    // B = random(100);
  }
  if (frame % 5 == 0) {
    h_wave_crest1 += h_delta1;
    h_wave_trough1 += h_delta1;
    v_wave_crest1 += v_delta1;
    v_wave_trough1 += v_delta1;
    h_wave_crest2 += h_delta2;
    h_wave_trough2 += h_delta2;
    v_wave_crest2 += v_delta2;
    v_wave_trough2 += v_delta2;
  }
}

// function mouseReleased() {
//   if (looping) {
//     noLoop();
//     looping = false;
//   }
//   else {
//     loop();
//     looping = true;
//   }
// }

function mousePressed() {
  hR = random(100);
  hG = random(100);
  hB = random(100);
  vR = random(100);
  vG = random(100);
  vB = random(100);
}
