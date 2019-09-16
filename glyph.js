let curves = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  angleMode(DEGREES)
  for (let i = 0; i < 50; i++) {
    curves.push(new Curve(randInt(0, width), randInt(0, height)))
  }
}

function draw() {
  background(50, 50, 50)
  curves.forEach(function(c) {
    c.draw()
  })
}

class Glyph {
    constructor(curves) {
        self.c = curves
    }
}

class Curve {
  constructor(x, y) {
    self.x = x
    self.y = y
    self.anchor1 = [self.x, self.y]
    self.anchor2 = [self.x+randInt(-400, 400), self.y+randInt(-400, 400)]

    self.bend1 = [self.x+randInt(-400, 400), self.y+randInt(-400, 400)]
    self.bend2 = [self.x+randInt(-400, 400), self.y+randInt(-400, 400)]
  }
  draw() {
    stroke(color('blue'))
    strokeWeight(6)
    noFill()
    bezier(...self.anchor1, ...self.bend1, ...self.bend2, ...self.anchor2)
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randInt(min, max) {
    return random() * (max-min) + min;
}