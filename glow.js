// you know that feel when you're in a city at night in a car
// and you feel sleepy
// but all the lights feel so full of life
// in the darkness


// create center particle system
//  (yellow, sunlike, arctan2 arm example stretching out to each)

let font,
  fontsize = 20,
  song,
  looping = true,
  mode = 'spiral',
  decayOpacity = 10,
  globColor = ['orange', 'purple', 'red']
  t = 0,
  suns = []

// Debug
let rateDisplay


function preload() {
  font = loadFont('assets/AvenirLTStd_Light.ttf')
  song = loadSound(['assets/dumb.ogg', 'assets/dumb.mp3'])
}

function setup() {
  // Create canvas and init settings
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.style('display', 'block')
  colorMode(RGB,255)
  frameRate(35)


  // Add one sun to center screen
  suns.push(new Sun(0.25*width, height/2, 30, 'yellow'))
  suns.push(new Sun(0.75*width, height/2, 30, 'yellow'))
}

function draw() {
  background(10, decayOpacity)
  drawInfo()

  // frameDisplay()

  suns.forEach(function(s) {
    s.drawFountain()
  })

  t += 0.01
}

function Sun(x, y, w, c) {
  // Sun location
  this.x = x
  this.y = y
  this.w = w
  this.c = color(c)

  this.rotSpeed = 8.5

  defs = {
      name: 'sunfnt',
      colors: globColor,
      shape: 'ellipse',
      gravity: 0.1,
      acceleration: 5,
      sizePercent: 1.01,
      speed: 4,
      lifetime: 100,
      size: [1, 9],
      angle: [0, 0], // random in a range of [startAngle, endAngle]
  }

  // Add color range
  c1 = color('purple')
  c2 = color('green')
  colors = [
    c1,
    lerpColor(c1, c2, 0.1),
    lerpColor(c1, c2, 0.2),
    lerpColor(c1, c2, 0.3),
    lerpColor(c1, c2, 0.4),
    lerpColor(c1, c2, 0.5),
    lerpColor(c1, c2, 0.6),
    lerpColor(c1, c2, 0.7),
    lerpColor(c1, c2, 0.8),
    lerpColor(c1, c2, 0.9),
    c2
  ]
  // defs.colors = colors

  // fount: null for user-defined vars, dict of particle vars, originX, originY
  this.ftn = new Fountain(null, defs, this.x, this.y)

  this.drawCircle = function() {
    fill(this.c)
    circle(this.x, this.y, this.w)
  }

  this.drawFountain = function() {
    this.ftn.Draw()
    // Move particle based on its mode
    let startX, startY, angle
    switch (mode) {
      case 'static':
        startX = this.x
        startY = this.y
        angle = null
        break
      case 'mouse':
        startX = this.x
        startY = this.y
        angle = getAngle(this.x, this.y, mouseX, mouseY)
        angle += random(-20, 20)
        break
      case 'spiral':
        startX = this.x
        startY = this.y
        angle = (t * 360) * this.rotSpeed
        break
    }
    this.ftn.Create(this.x, this.y, angle)
    this.ftn.Step()
  }

}

function getAngle(x0, y0, x1, y1) {
  // Return angle between a line and the x-axis
  angleMode(DEGREES)
  angle = atan2((y1 - y0), (x1 - x0))
  angleMode(RADIANS)
  return angle
}

function drawInfo() {
  // Show keybinds
  textFont(font, fontsize)
  textAlign(LEFT, CENTER)

  // All lines to print. [text, color]
  info = [
    ['glow\n\n', 'white'],
    ['p: pause', (looping) ? 'white' : 'yellow'],
    ['w: color', (keyIsPressed && key=='w') ? 'purple' : 'white'],
    ['a: static mode', (mode=='static') ? 'cyan' : 'white'],
    ['s: spiral mode', (mode=='spiral') ? 'cyan' : 'white'],
    ['d: mouse mode', (mode=='mouse') ? 'cyan' : 'white'],
  ]

  let spirality = suns[0].rotSpeed
  // spiralColor = (keyIsPressed && (key == 'z' || key == 'x')) ? 'purple' : 'white'
  // decayColor = (keyIsPressed && (key == 'c' || key == 'v')) ? 'purple' : 'white'
  spiralColor = 'white'
  decayColor = 'white'
  tweaks = [
    [`z - [ spirality : ${spirality.toFixed(1)} ] + x`, spiralColor],
    [`c - [ decay : ${decayOpacity} ] + v`, decayColor],
  ]

  displayText(info, 0.03*width, 0.83*height)
  displayText(tweaks, 0.88*width, 0.9*height)
}

function displayText(lines, x, y, y_sep=20) {
  lines.forEach(function (line, i) {
    fill(line[1])
    text(line[0], x, y)
    y = y + y_sep
  })
}

function frameDisplay() {
  fill('white')
  if ((frameCount % 30) == 0) {
    rateDisplay = parseInt(frameRate())
  }
  text(rateDisplay, 100, 100)
}

function keyTyped() {
  // Pause
  if (key === 'p') {
    if (looping) {
      looping = false;
      noLoop();
    }
    else {
      looping = true;
      loop();
    }
  }
  // Mouse mode
  else if (key === 'a') {
    mode = 'static'
  }
  // Mouse mode
  else if (key === 'd') {
    mode = 'mouse'
  }
  // Spiral mode
  else if (key === 's') {
    mode = 'spiral'
  }
  // Change rotational speed of suns
  else if (key === 'z') {
    suns.forEach(function (s) {
      s.rotSpeed -= 0.1
    })
  }
  else if (key === 'x') {
    suns.forEach(function (s) {
      s.rotSpeed += 0.1
    })
  }
  // Change redraw opacity (decay)
  else if (key === 'c') {
    decayOpacity -= 1
  }
  else if (key === 'v') {
    decayOpacity += 1
  }
  else if (key === 'w') {
    globColor = [
      color(random(0, 255), random(0, 255), random(0, 255)),
      color(random(0, 255), random(0, 255), random(0, 255)),
      color(random(0, 255), random(0, 255), random(0, 255))
    ]
    suns.forEach(function (s) {
      s.ftn.colors = globColor
    })
  }

  if (!song.isPlaying()) {
    song.play()
    song.setVolume(0.6)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (!song.isPlaying()) {
    song.play()
    song.setVolume(0.6)
  }
}
