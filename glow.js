// you know that feel when you're in a city at night in a car
// and you feel sleepy
// but all the lights feel so full of life
// in the darkness


// create center particle system
//  (yellow, sunlike, arctan2 arm example stretching out to each)

let looping = true,
  t = 0,
  suns = []


function preload() {

}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.style('display', 'block')
  colorMode(RGB,255)
  suns.push(new Sun(width/2, height/2, 30, 'yellow'))
}

function draw() {
  background(0)

  suns.forEach(function(s) {
    s.draw()
  })

  t += 0.01
}

function Sun(x, y, w, c) {
  this.x = x
  this.y = y
  this.w = w

  this.c = color(c)
  function draw() {
    fill(this.c)
    circle(this.x, this.y, this.w)
  }
}

function drawSun() {
  // set sun pos to mouse
  // sun.x = mouseX
  // sun.y = mouseY

  // draw sun
  fill('yellow')
  circle(sun.x, sun.y, sun.w)
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
