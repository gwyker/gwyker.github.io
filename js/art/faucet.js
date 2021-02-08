

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  angleMode(DEGREES)
}

function draw() {
  background(10, 1)

  // faucet(width/2, height/2, width, 8)
  // let gridSize = 150
  // for (let x = 0; x <= width + gridSize; x += gridSize) {
  //   for (let y = 0; y <= height + gridSize; y += gridSize) {
  //     dragon(x, y, 5)
  //   }
  // }
  dragon(width/2, height/2, 9)
}

// Recursive draw function
function faucet(x, y, w, depth) {
  if (depth == 0) {
    return
  }
  // Draw circle

  stroke(color(202, 100 - (depth * 20), 100))
  noFill()
  ellipse(x, y, w)

  faucet(x - sin(x * PI), y, w/2, depth-1)
  faucet(x + sin(x * PI), y, w/2, depth-1)
  faucet(x, y - sin(y * PI), w/2, depth-1)
  faucet(x, y + sin(y * PI), w/2, depth-1)
}

// dragon function takes location (x,y) and depth d
function dragon(x, y, d) {
  fill(color(0, 100, 100, 20))
  ellipse(x, y, 10 * d)

  fill(color(285, 55, 67, 20)) // dark purple
  ellipse(x, y, 5 * d)

  // ensure size s is more than zero
  if (d > 0) {
    var x1 = x + (8 * d * cos(35 * d * 1.5 * abs((frameCount/100) % 100 - 50)));
    var y1 = y + (8 * d * sin(35 * d * 1.5 * abs((frameCount/100) % 100 - 50)));
    var x2 = x - (8 * d * cos(35 * d * 1.5 * abs((frameCount/100) % 100 - 50)));
    var y2 = y - (8 * d * sin(35 * d * 1.5 * abs((frameCount/100) % 100 - 50)));

    dragon(x1, y1, d - 1);
    dragon(x2, y2, d - 1);
  }

}


class Faucet {
  constructor(x, y, w, levels) {
    this.pos = createVector(x, y)
    this.levels = levels
    this.w = w
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.w)

  }
}

