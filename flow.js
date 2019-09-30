let flock;
var founts = [];
var nodes = [];
var font,
  fontsize = 20,
  song,
  looping = true,
  mode = 'spiral',
  decayOpacity = 10,
  globColor = ['orange'],
  t = 0,
  gridsize = 17

var noiseStep = 0.02,
  detail = 3,
  detailMin = 1,
  detailMax = 7,
  noisePos,
  noiseOffset,
  noiseRange,
  noiseVel,
  threshold = 0.4,
  flowerThreshold = 0.72

let aspect;

var modes = ['grass', 'mainframe', 'pinwheel'],
  mode = ['grass', 'mainframe', 'pinwheel'],
  mode,
  radiusMod = 1.4

var firstcolor = [255, 165, 0],
  secondcolor = [0, 128, 0]

var fieldsize = [800, 500],
  fieldRadius = 1200

var speed,
  speedMin = 1,
  speedMax = 100
  windangle = 270,
  windangleMin = 0,
  windangleMax = 359,
  thickness = 3,
  thicknessMin = 1,
  thicknessMax = 10


var gui
var visible = false
var scribble = new Scribble()

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  // cnv.style('display', 'block');
  // var cnv = createCanvas(600, 400, P2D);
  // cnv.style('display', 'block');
  angleMode(DEGREES)

  // flock = new Flock();
  // // Add an initial set of boids into the system
  // for (let i = 0; i < 10; i++) {
  //   let b = new Boid(width / 2,height / 2);
  //   flock.addBoid(b);
  // }

  // founts.push(new Fount(width/2, 0))
  // founts.push(new Fount(width/2, height))
  // founts.push(new Fount(0, height/2))
  // founts.push(new Fount(width, height/2))

  // Simple rectangle
  // for (let x = fieldX; x < fieldX + fieldsize[0]; x += gridsize) {
  //   for (let y = fieldY; y < fieldY + fieldsize[1]; y += gridsize) {
  //     nodes.push(new Node(x, y, currentMode))
  //   }
  // }

  currentMode = 'grass'
  createNodes()

  
  strokeCap(ROUND)

  aspect = (width/height)
  noiseRange = createVector(5, 5*aspect)
  // Manual offset at origin
  noiseOffset = createVector(0, 0)
  // Noise position starts at origin
  noisePos = createVector(0, 0)
  // Noise is moving to the right
  noiseVel = createVector(0.01, 0.01)
  speed = noiseVel.mag()*1000
  size = 30

  gui = createGui('Settings')
  gui.addGlobals(
    'mode',
    'detail',
    'size',
    'thickness',
    'speed',
    'firstcolor',
    'secondcolor'
    // 'windangle'
    // 'highColor'
    )
  gui.hide()
}

function draw() {
  background(80, 100);

  lColor = color(firstcolor)
  hColor = color(secondcolor)

  windMag = speed/1000
  // noiseVel = p5.Vector.fromAngle(windangle, windMag)
  noiseVel.setMag(windMag)
  // noiseVel.rotate(windangle)

  
  // Move noise location each frame
  noisePos.add(noiseVel)

  // Apply mouse effects
  // mouseEffects.speed()

  // Oscillate circle radius over time
  // circleMod = map(sin(frameCount*10), -1, 1, 1, 1.5)

  // Change current mode
  if (mode != currentMode) {
    currentMode = mode
    nodes = []
    createNodes()
    if (mode == 'mainframe' || mode == 'pinwheel') {
      size = 15
    }
    nodes.forEach(function(node) {
      node.setMode(currentMode)
    })
  }

  nodes.forEach(function(node) {
    node.render(currentMode)
  })

  // founts.forEach(function(f) {
  //   f.drawFountain()
  // })

  // flock.run();
}

function createNodes() {
    // Create noise line nodes
    let fieldX = width/2 - fieldsize[0]/2
    let fieldY = height/2 - fieldsize[1]/2

    // Perlin noise placement
    let placementRes = 50
    let rows = floor(fieldsize[1] / gridsize)
    let cols = floor(fieldsize[0] / gridsize)
    for (let x = fieldX; x < fieldX + fieldsize[0]; x += gridsize) {
      for (let y = fieldY; y < fieldY + fieldsize[1]; y += gridsize) {
        let noiz = noise(
          map(x, fieldX, fieldX + fieldsize[0], 0, placementRes),
          map(y, fieldY, fieldY + fieldsize[1], 0, placementRes)
        )
        if (noiz > threshold) {
          if (noiz > flowerThreshold) {
            var hasFlower = true
          }
          else {
            var hasFlower = false
          }
          if (currentMode == 'grass') {
            var x_off = map(y, fieldY, fieldY + fieldsize[1], 100, -100)
            var y_off = map(y, fieldY, fieldY + fieldsize[1], gridsize*11, -gridsize*11)
          }
          else {
            var x_off = 0
            var y_off = 0
          }
          nodes.push(new Node(x+x_off, y+y_off, currentMode, hasFlower))
        }
        // Circle radius constraint
        // let distToCenter = dist(x, y, width/2, height/2)
        // let distThreshMod = map(distToCenter, 0, fieldRadius, 0, 1-threshold)
        // if (noiz > threshold+distThreshMod) {
        //   if (noiz > flowerThreshold) {
        //     var hasFlower = true
        //   }
        //   else {
        //     var hasFlower = false
        //   }
        //   let x_off = map(y, fieldY, fieldY + fieldsize[1], 100, -100)
        //   let y_off = map(y, fieldY, fieldY + fieldsize[1], gridsize*11, -gridsize*11)
        //   nodes.push(new Node(x+x_off, y+y_off, currentMode, hasFlower))
        // }
      }
    }
}

class mouseEffects {

  static offset() {
    // Update noise location using mouse location
    noiseOffset.x = map(mouseX, 0, width, 0, noiseRange.x)
    noiseOffset.y = map(mouseY, 0, height, 0, noiseRange.y)
  }

  static resolution() {
    // Update noise detail using mouse location
    detail = map(mouseX, 0, width, 0.001, 4)
  }

  static speed() {
    // Update noise velocity using mouse location (from center screen)
    noiseVel.x = map(mouseX - width/2, -width/2, width/2, -0.08, 0.08)
    noiseVel.y= map(mouseY - height/2, -height/2, height/2, -0.08, 0.08)
  }

}

class Node {
  constructor(x, y, mode, hasFlower) {
    this.x = x
    this.y = y
    this.mode = mode
    this.angle = 0
    this.flowerColor = color('red')
    this.flowerColor.setAlpha(0)
    this.hasFlower = hasFlower
    this.flowerSize = 8
  }

  render() {
    let noise = this.getNoise()
    switch (this.mode) {
      case 'grass':
        var angle = map(noise, 0, 1, 0, 360) + 90
        // var angle = 0
        // if (abs(this.angle - angle) < 30) {
        //   print(angle)
        //   angle = this.angle
        // }
        stroke(lerpColor(lColor, hColor, noise))
        strokeWeight(thickness)
        noFill()
        var endX = this.x+cos(angle)*size
        var endY = this.y+sin(angle)*size
        line(
          this.x,
          this.y,
          endX,
          endY,
          )
        if (this.hasFlower) {
          fill(this.flowerColor)
          noStroke()
          drawFlower(
            this.x+cos(angle)*(size+0.6*this.flowerSize), this.y+sin(angle)*(size+0.6*this.flowerSize),
            this.flowerSize, this.flowerColor
          )
        }
        break
      case 'bezier':
        angle = map(noise, 0, 1, 0, 360)
        stroke(lerpColor(lColor, hColor, noise))
        noFill()
        bezier(
          this.x, this.y,
          this.x+size, this.y+size,
          this.x-size, this.y-size,
          this.x+cos(angle)*size, this.y+sin(angle)*size,
          )
        break
      case 'mainframe':
        var radius = map(noise, 0, 1, 0, size*radiusMod)
        noStroke()
        fill(lerpColor(lColor, hColor, noise))
        ellipse(this.x, this.y, radius)
        break
      case 'pinwheel':
        let radialVel = expMap(noise, 0, 1, 1, 90)
        this.angle += radialVel
        if (this.angle > 360) {
          this.angle -= 360
        }
        noStroke()
        fill(lerpColor(hColor, lColor, noise))
        push()
        translate(this.x, this.y)
        rotate(this.angle)

        triangle(
          -size/2, -(sqrt(3)*size/4)*(1/3),
          size/2, -sqrt(3)*size/4*(1/3),
          0, sqrt(3)*size/4*(4/3))
        pop()
        break

      default:
        break
    }
  }

  setMode(mode) {
    if (mode == 'random') {
      this.mode = modes[Math.floor(Math.random()*modes.length)]
    }
    else {
      this.mode = mode
    }
  }

  getNoise() {
    let x = map(this.x, 0, width, 0, detail)
    let y = map(this.y, 0, height, 0, detail*aspect)
    // print(self.x, x)
    return noise(
      x + noisePos.x + noiseOffset.x,
      y + noisePos.y + noiseOffset.y
      )
  }
}

function drawFlower(x, y, size, colr) {
  // fill(0, 128, 0, 80)
  // ellipse(x+size*0.2, y+size*0.4, size*0.4)
  // ellipse(x+size*0.2, y-size*0.4, size*0.4)
  // ellipse(x+size*0.5, y, size*0.4)
  // ellipse(x-size*0.2, y+size*0.4, size*0.4)
  // ellipse(x-size*0.2, y-size*0.4, size*0.4)
  // ellipse(x-size*0.5, y, size*0.4)
  fill(colr)
  ellipse(x, y, size)
}

function expMap(value, s1, e1, s2, e2) {
  s2 = log(s2)
  e2 = log(e2)
  // print(value, s2, e2)
  return exp(s2 + (e2 - s2) * ((value - s1) / (e1 - s1)))
}

// function Fount(x, y) {
//   this.x = x
//   this.y = y

//   defs = {
//     name: 'sunfnt',
//     colors: globColor,
//     shape: 'ellipse',
//     gravity: 0.1,
//     acceleration: 5,
//     sizePercent: 1.005,
//     speed: 4,
//     lifetime: 300,
//     size: [1, 9],
//     angle: [0, 0], // random in a range of [startAngle, endAngle]
//   }
//   this.ftn = new Fountain(null, defs, this.x, this.y)

//   this.drawCircle = function() {
//     fill(this.c)
//     circle(this.x, this.y, this.w)
//   }

//   this.drawFountain = function() {
//     this.ftn.Draw()
//     // Move particle
//     this.ftn.Create(this.x, this.y, randRange(0, 360))
//     this.ftn.Step()
//   }
// }

  // // Add color range
  // c1 = color('purple')
  // c2 = color('green')
  // colors = [
  //   c1,
  //   lerpColor(c1, c2, 0.1),
  //   lerpColor(c1, c2, 0.2),
  //   lerpColor(c1, c2, 0.3),
  //   lerpColor(c1, c2, 0.4),
  //   lerpColor(c1, c2, 0.5),
  //   lerpColor(c1, c2, 0.6),
  //   lerpColor(c1, c2, 0.7),
  //   lerpColor(c1, c2, 0.8),
  //   lerpColor(c1, c2, 0.9),
  //   c2
  // ]
  // defs.colors = colors

  // fount: null for user-defined vars, dict of particle vars, originX, originY
















// Add a new boid into the System
// function mouseDragged() {
//   flock.addBoid(new Boid(mouseX, mouseY));
// }

// function renderVoronoi(boids) {
//   let sites = []
//   boids.forEach(element => {
//     sites.push([element.position.x, element.position.y])
//   });
//   voronoiSiteFlag(false);
//   voronoiSiteStrokeWeight(0);
//   voronoiSiteStroke(0);
//   voronoiSites(sites)
//   voronoi(windowWidth, windowHeight)
//   voronoiDraw(0, 0, true, true)
//   voronoiClearSites()
// }

// function randRange(min, max) {
//   return random() * (max-min) + min;
// }






// // The Nature of Code
// // Daniel Shiffman
// // http://natureofcode.com

// // Flock object
// // Does very little, simply manages the array of all the boids

// function Flock() {
//   // An array for all the boids
//   this.boids = []; // Initialize the array
// }

// Flock.prototype.run = function() {
//   for (let i = 0; i < this.boids.length; i++) {
//     this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
//   }
//   // renderVoronoi(this.boids);
// }

// Flock.prototype.addBoid = function(b) {
//   this.boids.push(b);
// }

// // The Nature of Code
// // Daniel Shiffman
// // http://natureofcode.com

// // Boid class
// // Methods for Separation, Cohesion, Alignment added

// function Boid(x, y) {
//   this.acceleration = createVector(0, 0);
//   this.velocity = createVector(random(-1, 1), random(-1, 1));
//   this.position = createVector(x, y);
//   this.r = 3.0;
//   this.maxspeed = 3;    // Maximum speed
//   this.maxforce = 0.05; // Maximum steering force
// }

// Boid.prototype.run = function(boids) {
//   this.flock(boids);
//   this.update();
//   this.borders();
//   // this.render();
// }

// Boid.prototype.applyForce = function(force) {
//   // We could add mass here if we want A = F / M
//   this.acceleration.add(force);
// }

// // We accumulate a new acceleration each time based on three rules
// Boid.prototype.flock = function(boids) {
//   let sep = this.separate(boids);   // Separation
//   let ali = this.align(boids);      // Alignment
//   let coh = this.cohesion(boids);   // Cohesion
//   // Arbitrarily weight these forces
//   sep.mult(1.5);
//   ali.mult(1.0);
//   coh.mult(1.0);
//   // Add the force vectors to acceleration
//   this.applyForce(sep);
//   this.applyForce(ali);
//   this.applyForce(coh);
// }

// // Method to update location
// Boid.prototype.update = function() {
//   // Update velocity
//   this.velocity.add(this.acceleration);
//   // Limit speed
//   this.velocity.limit(this.maxspeed);
//   this.position.add(this.velocity);
//   // Reset accelertion to 0 each cycle
//   this.acceleration.mult(0);
// }

// // A method that calculates and applies a steering force towards a target
// // STEER = DESIRED MINUS VELOCITY
// Boid.prototype.seek = function(target) {
//   let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
//   // Normalize desired and scale to maximum speed
//   desired.normalize();
//   desired.mult(this.maxspeed);
//   // Steering = Desired minus Velocity
//   let steer = p5.Vector.sub(desired,this.velocity);
//   steer.limit(this.maxforce);  // Limit to maximum steering force
//   return steer;
// }

// Boid.prototype.render = function() {
//   // Draw a triangle rotated in the direction of velocity
//   let theta = this.velocity.heading() + radians(90);
//   fill(127);
//   stroke(200);
//   push();
//   translate(this.position.x, this.position.y);
//   rotate(theta);
//   beginShape();
//   vertex(0, -this.r * 2);
//   vertex(-this.r, this.r * 2);
//   vertex(this.r, this.r * 2);
//   endShape(CLOSE);
//   pop();
// }

// // Wraparound
// Boid.prototype.borders = function() {
//   if (this.position.x < -this.r)  this.position.x = width + this.r;
//   if (this.position.y < -this.r)  this.position.y = height + this.r;
//   if (this.position.x > width + this.r) this.position.x = -this.r;
//   if (this.position.y > height + this.r) this.position.y = -this.r;
// }

// // Separation
// // Method checks for nearby boids and steers away
// Boid.prototype.separate = function(boids) {
//   let desiredseparation = 25.0;
//   let steer = createVector(0, 0);
//   let count = 0;
//   // For every boid in the system, check if it's too close
//   for (let i = 0; i < boids.length; i++) {
//     let d = p5.Vector.dist(this.position,boids[i].position);
//     // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
//     if ((d > 0) && (d < desiredseparation)) {
//       // Calculate vector pointing away from neighbor
//       let diff = p5.Vector.sub(this.position, boids[i].position);
//       diff.normalize();
//       diff.div(d);        // Weight by distance
//       steer.add(diff);
//       count++;            // Keep track of how many
//     }
//   }
//   // Average -- divide by how many
//   if (count > 0) {
//     steer.div(count);
//   }

//   // As long as the vector is greater than 0
//   if (steer.mag() > 0) {
//     // Implement Reynolds: Steering = Desired - Velocity
//     steer.normalize();
//     steer.mult(this.maxspeed);
//     steer.sub(this.velocity);
//     steer.limit(this.maxforce);
//   }
//   return steer;
// }

// // Alignment
// // For every nearby boid in the system, calculate the average velocity
// Boid.prototype.align = function(boids) {
//   let neighbordist = 50;
//   let sum = createVector(0,0);
//   let count = 0;
//   for (let i = 0; i < boids.length; i++) {
//     let d = p5.Vector.dist(this.position,boids[i].position);
//     if ((d > 0) && (d < neighbordist)) {
//       sum.add(boids[i].velocity);
//       count++;
//     }
//   }
//   if (count > 0) {
//     sum.div(count);
//     sum.normalize();
//     sum.mult(this.maxspeed);
//     let steer = p5.Vector.sub(sum, this.velocity);
//     steer.limit(this.maxforce);
//     return steer;
//   } else {
//     return createVector(0, 0);
//   }
// }

// // Cohesion
// // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
// Boid.prototype.cohesion = function(boids) {
//   let neighbordist = 50;
//   let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
//   let count = 0;
//   for (let i = 0; i < boids.length; i++) {
//     let d = p5.Vector.dist(this.position,boids[i].position);
//     if ((d > 0) && (d < neighbordist)) {
//       sum.add(boids[i].position); // Add location
//       count++;
//     }
//   }
//   if (count > 0) {
//     sum.div(count);
//     return this.seek(sum);  // Steer towards the location
//   } else {
//     return createVector(0, 0);
//   }
// }


