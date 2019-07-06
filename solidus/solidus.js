var looping = true
var t = 0

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(RGB, 255);
  grn = color(40, 200, 40)
  fill(grn);
  noStroke();
}

function draw() {
  background(10, 10);
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
