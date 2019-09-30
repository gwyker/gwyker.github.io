let looping = true;
let xoff = 0.0;
let yoff = 0.0;
let x_step = 0.01;
let y_step = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 100);
  angleMode(DEGREES);
  background(100);
  // noCursor();
}

function draw() {
	let x = random(width);
	let y = random(height);
	let val = noise(x / width, y / height);
	console.log(val);
	// if (val > 0.5) {
	fill(0, 0, val * 100);
	drop = new raindrop(x, y);
	drop.display();
	// }

}

function raindrop(startX, startY) {
	this.x = startX;
	this.y = startY;
	this.display = function() {
		translate(this.x, this.y);
		rotate(random(360));
		ellipse(0, 0, 15, 10);
	}
}

function mousePressed() {
	if (looping) {
		looping = false;
		noLoop();
	}
	else {
		looping = true;
		loop();
	}
}

function keyTyped() {
	if (key === 'd') {
		x_step += 0.01;
	}
	else if (key === 'f') {
		y_step += 0.01;
	}
}