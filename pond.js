let looping = true;
let frame = 0;

let waves = [];
let wave_gap = 100;
let a = 40;
let font = 1;
let fontsize = 18;

let step1 = 1;
let step2 = 1;

function preload() {
  font = loadFont('./AvenirLTStd_Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 100);
  angleMode(DEGREES);
  background(0);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  fill(100);
  text("pond", 100, 100);

  text("a, s : wave", 100, height-100);
  text("z, x : swirl", 100, height-80);
  text("click : mix", 100, height-60);
  
  

  waves.push(new wave(100, 100, 800, 800, 30));

  // noLoop();
  noCursor();

  stroke(50, 50, 50);
  noFill();

  // stroke(0, 100, 0);
  // ellipse(width/2, height/2, height-120, height-120);


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

  console.log(this.xpos1, this.ypos1, this.xpos2, this.ypos2)


  this.poly = [];

  this.pos = 0;
  this.wave_gap = wave_gap;

  this.yoff = 0;

  var self = this;

  this.update = function() {
    // let xoff = 0;
    // for (let x = 0; x <= width; x += 10) {
    //   let y = map(noise(xoff, this.yoff), 0, 1, this.pos, this.pos + this.wave_gap);
      
    //   this.poly.push([x, y]);
    //   xoff += 0.05;
    // }
    this.yoff += 0.01;
    this.pos += 1;

    this.angle1+=step1;
    this.angle2-=step2;

    // if (this.angle1

    this.xpos1 = width / 2 + this.diam / 2 * cos(this.angle1);
    this.ypos1 = height / 2 + this.diam / 2 * sin(this.angle1);
    this.xpos2 = width / 2 + this.diam / 2 * cos(this.angle2);
    this.ypos2 = height / 2 + this.diam / 2 * sin(this.angle2);
  }

  this.draw = function() {
    // fill(this.r,this.g, this.b, a);

    // // add same line reversed and offset
    // let len = this.poly.length;
    // // for (let i = len-1; i >= 0; i--) {
    // //   let p = this.poly[i];
    // //   this.poly.push([p[0], p[1]+8]);
    // // }

    // let pol = new Polygon2D();

    // // draw poly rotated at center
    // // translate(this.poly[round(len/2)][0], this.poly[round(len/2)][1]);
    // rotate(this.angle);
    // noStroke();
    // beginShape();
    // this.poly.forEach(function(p, i) {
    //   pol.add(new Vec2D(p[0], p[1]));
    // });
    // this.poly.slice().reverse().forEach(function(p, i) {
    //   pol.add(new Vec2D(p[0], p[1]+8));
    // });

    // var clipper = new SutherlandHodgemanClipper(new Rect(new Vec2D(self.x1+125, self.y1+125), new Vec2D(self.x2-125, self.y2-125)));

    // pol = clipper.clipPolygon(pol);

    // pol.vertices.forEach(function(v) {
    //   vertex(v.x, v.y);
    // })
    // endShape(CLOSE);
    // // translate(-this.poly[round(len/2)][0], -this.poly[round(len/2)][1]);
    // rotate(-this.angle);

    // stroke(0, 100, 0);
    // line(this.xpos1, this.ypos1, this.xpos2, this.ypos2);
    noStroke();
    fill(this.r, this.g, this.b, 20);
    noiseLine(this.xpos1, this.ypos1, this.xpos2, this.ypos2, this.yoff);

  }
  // this.draw = function() {
  //   fill(this.r,this.g, this.b, a);

  //   // add same line reversed and offset
  //   let len = this.poly.length;
  //   // for (let i = len-1; i >= 0; i--) {
  //   //   let p = this.poly[i];
  //   //   this.poly.push([p[0], p[1]+8]);
  //   // }

  //   let pol = new Polygon2D();

  //   // draw poly rotated at center
  //   // translate(this.poly[round(len/2)][0], this.poly[round(len/2)][1]);
  //   rotate(this.angle);
  //   beginShape();
  //   this.poly.forEach(function(p, i) {
  //     pol.add(new Vec2D(p[0], p[1]));
  //   });
  //   this.poly.slice().reverse().forEach(function(p, i) {
  //     pol.add(new Vec2D(p[0], p[1]+8));
  //   });

  //   var clipper = new SutherlandHodgemanClipper(new Rect(new Vec2D(self.x1+125, self.y1+125), new Vec2D(self.x2-125, self.y2-125)));

  //   pol = clipper.clipPolygon(pol);

  //   pol.vertices.forEach(function(v) {
  //     vertex(v.x, v.y);
  //   })
  //   endShape(CLOSE);
  //   // translate(-this.poly[round(len/2)][0], -this.poly[round(len/2)][1]);
  //   rotate(-this.angle);
  // }

  this.clear = function() {
    this.poly = [];
  }
}

function draw() {
  waves.forEach(function(w) {
    w.update();
    w.draw();
    w.clear();
  });

  if (frame % 60 == 0 && waves.length < 5) {
    waves.push(new wave(100, 100, 800, 800, 30));
  }

  // frame++;
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
  if (key === 'a') {
    // x_step += 0.01;
    waves.push(new wave(100, 100, 800, 800, 30));
  }
  if (key === 's') {
    // x_step += 0.01;
    waves.pop();
  }
  if (key === 'z') {
    step1++;
  }
  if (key === 'x') {
    step1--;
  }
}