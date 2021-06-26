let looping = true;

let waves = [];
let wave_gap = 100;
let a = 40;
let font = 1;
let fontsize = 18;

let step1 = 1;
let step2 = 1;

var song;

function preload() {
  font = loadFont('/assets/AvenirLTStd_Light.ttf');
  song = loadSound(['/assets/roach.ogg', '/assets/roach.mp3']);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 100);
  angleMode(DEGREES);
  background(0);
  song.play();
  song.playMode('restart');
  song.setLoop(true);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  fill(100);
  text("pond", 100, 100);

  text("   q : sound", 100, height-120);
  text("a, s : wave", 100, height-100);
  text("z, x, c, v  : swirl", 100, height-80);
  text("click : mix", 100, height-60);

  waves.push(new wave(100, 100, 800, 800, 30));

  // noCursor();

  stroke(50, 50, 50);
  noFill();
}

function medallion() {
  this.r = random(100);
  this.g = random(100);
  this.b = random(100);

  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.angle = angle;
  this.angle1 = random(0, 360);
  this.angle2 = this.angle1 + 1;
  this.diam = height-120;

  this.wave_gap = wave_gap;

  this.yoff = 0;

  var self = this;

  this.update = function() {
    this.yoff += 0.01;

    this.angle1+=step1;
    this.angle2+=step2;

    this.xpos1 = width / 2 + this.diam / 2 * cos(this.angle1);
    this.ypos1 = height / 2 + this.diam / 2 * sin(this.angle1);
    this.xpos2 = width / 2 + this.diam / 2 * cos(this.angle2);
    this.ypos2 = height / 2 + this.diam / 2 * sin(this.angle2);
  }

  this.draw = function() {
    noStroke();
    fill(this.r, this.g, this.b, 20);
    noiseLine(this.xpos1, this.ypos1, this.xpos2, this.ypos2, this.yoff);

  }

  this.clear = function() {

  }
}

function wave(x1, y1, x2, y2, angle) {
  this.r = random(100);
  this.g = random(100);
  this.b = random(100);

  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.angle = angle;
  this.angle1 = random(0, 360);
  this.angle2 = this.angle1 + 1;
  this.diam = height-120;

  this.wave_gap = wave_gap;

  this.yoff = 0;

  var self = this;

  this.update = function() {
    this.yoff += 0.01;

    this.angle1+=step1;
    this.angle2-=step2;

    this.xpos1 = width / 2 + this.diam / 2 * cos(this.angle1);
    this.ypos1 = height / 2 + this.diam / 2 * sin(this.angle1);
    this.xpos2 = width / 2 + this.diam / 2 * cos(this.angle2);
    this.ypos2 = height / 2 + this.diam / 2 * sin(this.angle2);
  }

  this.draw = function() {
    noStroke();
    fill(this.r, this.g, this.b, 20);
    noiseLine(this.xpos1, this.ypos1, this.xpos2, this.ypos2, this.yoff);

  }

  this.clear = function() {
    this.poly = [];
  }
}

function draw() {
  if (frameCount > 60) {
    waves.forEach(function(w) {
      w.update();
      w.draw();
      w.clear();
    });
  }

  // if (frameCount % 60 == 0 && waves.length < 5xxzzz) {
  if (frameCount % 10 == 0 && waves.length < 5) {
    waves.push(new wave(100, 100, 800, 800, 30));
  }

  frameCount++;
}

function noiseLine(x1, y1, x2, y2, yoff) {
  let xoff = 0.0;
  let wave_gap = 100;
  let poly = [];
  let poly_reverse = [];

  let line_len = sqrt(sq(x2-x1)+sq(y2-y1));
  let slope = (y2-y1)/(x2-x1);
  let normal_slope = -pow(slope, -1);

  // create noise line
  for (let l = 0; l <= line_len; l += 5) {

    let pct = l/line_len
    let x = x1 + pct*(x2-x1)
    let y = y1 + pct*(y2-y1)

    let line_offset = map(noise(xoff, yoff), 0, 1, -wave_gap/2, wave_gap/2);
    let dx = (line_offset / sqrt(1 + (sq(normal_slope))));
    let dy = normal_slope * dx;
    poly.push([x+dx, y+dy]);

    // add mirror side
    dx = ((line_offset+2) / sqrt(1 + (sq(normal_slope))));
    dy = normal_slope * dx;
    poly_reverse.push([x+dx, y+dy]);

    xoff += 0.05;
  }

  beginShape();
  poly.forEach(function(p) {
    vertex(p[0], p[1]);
  })
  poly_reverse.forEach(function(p) {
    vertex(p[0], p[1]);
  })
  endShape(CLOSE);
}

function mousePressed() {
  // if (looping) {
  //   looping = false;
  //   noLoop();
  // }
  // else {
  //   looping = true;
  //   loop();
  // }

  waves.forEach(function(w) {
    w.r = random(100);
    w.g = random(100);
    w.b = random(100);
  })
}

function keyTyped() {
  if (key === 's') {
    waves.push(new wave(100, 100, 800, 800, 30));
  }
  if (key === 'a') {
    waves.pop();
  }
  if (key === 'z') {
    step1++;
  }
  if (key === 'x') {
    step1--;
  }
  if (key === 'c') {
    step2++;
  }
  if (key === 'v') {
    step2--;
  }
  if (key === 'q') {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
}
