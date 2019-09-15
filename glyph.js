let curves = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  angleMode(DEGREES)
  for (let i = 0; i < 50; i++) {
    curves.push(new Curve(randomInt(0, width), randomInt(0, height)))
  }
}

function draw() {
  background(50, 50, 50)
  curves.forEach(function(c) {
    c.draw()
  })
}

class Curve {
  constructor(x, y) {
    self.x = x
    self.y = y
  }
wssssssaas
  draw() {
    let anchor1 = [self.x, self.y]
    let anchor2 = [self.x+randomInt(-400, 400), self.y+randomInt(-400, 400)]

    let bend1 = [self.x+randomInt(-400, 400), self.y+randomInt(-400, 400)]
    let bend2 = [self.x+randomInt(-400, 400), self.y+randomInt(-400, 400)]
    stroke(color('blue'))
    noFill()
    bezier(...anchor1, ...bend1, ...bend2, ...anchor2)
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}