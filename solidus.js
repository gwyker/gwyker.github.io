var looping = true
var t = 0

// texture for the particle
let particle_texture = null;

// variable holding our particle system
let ps = [];

function preload() {
  particle_texture = loadImage("assets/particle_texture.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(RGB, 255);
  grn = color(40, 200, 40)
  fill(grn);
  noStroke();
}

function run_particle() {
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);

  ps.forEach(function (p) {
    p.applyForce(wind);
    p.run();
    for (let i = 0; i < 2; i++) {
      p.addParticle();
    }
  })
}

function draw() {
  // background(10, 10);
  background(0)
  // run_particle();
  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      var x_offset = 20 * sin(2 * PI * t + angle)
      var y_offset = 20 * cos(2 * PI * t + angle)
      const myX = x + x_offset
      const myY = y + y_offset;

      rand_color = color(random(0, 255), random(0, 255), random(0, 255))
      // rand color
      from_color = color(255, 0, 0) // red
      to_color = color(0, 0, 255) // blue
      ypos_color = lerpColor(from_color, to_color, y_offset/20)
      fill(ypos_color)

      ellipse(myX, myY, 10); // draw particle
      }
    }

  t += 0.01
}

function mouseReleased() {

}

function mouseWheel(event) {

}

function keyTyped() {
  if (key === 'd') {
    if (looping) {
      looping = false;
      noLoop();
    }
    else {
      looping = true;
      loop();
    }
  }
}
