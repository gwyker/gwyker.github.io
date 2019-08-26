let pins = [],
  climbers = []

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(RGB, 256)
  angleMode(DEGREES)

  // Create initial pins
  // let gridSize = 50
  // for (let x = 0; x <= width + gridSize; x += gridSize) {
  //   for (let y = 0; y <= height + gridSize; y += gridSize) {
  //     pins.push(new Pin(x, y))
  //   }
  // }
  // Random locations
  for (let i=0; i<15; i++) {
    pins.push(new Pin(random(width), random(height)))
  }

  climbers.push(new Climber(pins[0]))
}

function draw() {
  background(0)

  pins.forEach(function (p) {
    // p.update()
    p.wrap()
    p.render()
  })

  climbers.forEach(function (c) {
    c.update()
    pins.some(function (p) {
      return c.collide(p)
    })
    c.render()
  })


}

class Pin{
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(1, 1)
    this.acceleration = createVector(0, 0)
    this.r = 20
    this.maxspeed = 5
    this.color = color(255, 102, 156)
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  run() {
    this.update()
    this.wrap()
    this.render()
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wrap at edge
  wrap() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // Draw as a circle
  render() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.r);
  }
}

class Climber {
  // Takes a pin as its first node
  constructor(p) {
    this.lastNode = null
    this.node = p
    this.color = color('yellow')
    this.strokeWidth = 3
    this.rotateSpeed = .003
    this.angle = p5.Vector.fromAngle(0).mult(max(width, height) * 1.5)
  }

  update() {
    // Rotate line by rotSpeed
    this.angle.rotate(this.rotateSpeed)
  }

  render() {
    push()
    translate(this.node.position)
    stroke(this.color)
    strokeWeight(this.strokeWidth)
    line(-this.angle.x, -this.angle.y, this.angle.x, this.angle.y)
    pop()
  }

  collide(p) {
    if (p == this.node || p == this.lastNode) {
      return 0
    }
    let lineCoords = [
      this.node.position.x - this.angle.x,
      this.node.position.y - this.angle.y,
      this.node.position.x + this.angle.x,
      this.node.position.y + this.angle.y
    ]
    if (collideLineCircle(...lineCoords, p.position.x, p.position.y, p.r)) {
      this.color = color(random(255), random(255), random(255))
      this.lastNode = this.node
      this.node = p
      return 1
    }
  }
}
