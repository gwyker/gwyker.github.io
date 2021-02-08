let looping = true;
let frame = 0;
let min_radius = 2
let max_radius
let cursor_size = 60
let min_cursor_size = 40
let max_cursor_size = 200

let wheel_step = 10

let all_x_move = 2
let all_y_move = 0

let shakers = [];
let crawlers = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 100);
	background(0);
	noStroke();

	let gridSize = 35;
	max_radius = (gridSize / 2) + 1.5

	for (let x = 0; x <= width + gridSize; x += gridSize) {
		for (let y = 0; y <= height + gridSize; y += gridSize) {
			shakers.push(new Shaker(x, y));
		}
	}

}


function draw() {
	background(0);
	for (var i = shakers.length - 1; i >= 0; i--) {
		s = shakers[i]
		s.update();
		s.draw();
		// wrap shaker if it gets out of vision
		if (s.x > (windowWidth + max_radius*2)) {
			s.x = -max_radius*2
		}
		else if (s.x < (-max_radius*2)) {
			s.x = windowWidth + max_radius*2
		}
		if (s.y > (windowHeight + max_radius*2)) {
			s.y = -max_radius*2
		}
		else if (s.y < (-max_radius*2)) {
			s.y = windowHeight + max_radius*2
		}
	}

	crawlers.forEach(function (c) {
		c.update()
		c.draw()
	})

	frame++;
}

function Shaker(x, y) {
	this.x = x;
	this.y = y;
	this.color_r = random(0, 100)
	this.color_g = random(0, 100)
	this.color_b = random(0, 100)
	this.radius = random(min_radius, min_radius + 2)
	this.idle_radius = this.radius
	// this.radius = random(1, max_radius)
	this.max_radius = random(3, max_radius)
	this.core_max_radius = this.max_radius
	this.grow = 0.2;
	this.alive = true

	this.white_fill = random(15, 99)
	this.white_step = 3

	this.idle_radius

	this.update = function() {
		// if (random() < 0.5) {
		// 	x_move = 0.1
		// }
		// else {
		// 	x_move = -0.1
		// }
		// if (random() < 0.5) {
		// 	y_move = 0.1
		// }
		// else {
		// 	y_move = -0.1
		// }
		// if (random() < 0.5) {
		// 	grow = 1
		// }
		// else {
		// 	grow = -1
		// }


		this.radius = cursor_size - constrain(
			dist(this.x, this.y, mouseX, mouseY),
			min_radius, cursor_size)

		this.radius = map(
			this.radius,
			min_radius, cursor_size,
			min_radius, max_radius)


		for (var i = 0; i < crawlers.length; i++) {
			c = crawlers[i]
			d = dist(this.x, this.y, c.x, c.y)
			if (d > c.radius) {
				continue
			}
			new_radius = c.radius - constrain(
				d,
				min_radius, c.radius)
			new_radius = map(
				new_radius,
				min_radius, c.radius,
				min_radius, max_radius)

			this.radius = max(this.radius, new_radius)
			
		}

		if (s.radius == min_radius) {
			s.radius = s.idle_radius
			s.idle_radius += s.idle_grow
			if (s.idle_radius > s.min_radius + 2 || s.idle_radius < min_radius) {
				s.idle_grow *= -1;
			}
			this.idling = true
		}





		// if (random() < 0.01) {
		// 	console.log(mouseX, mouseY, this.radius)
		// }

		if (mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < cursor_size) {
			this.max_radius = max_radius
		}
		else {
			this.max_radius = this.core_max_radius
		}


		if (this.radius > this.max_radius) {
			this.grow = -1;
		}
		else if (this.radius <= 1) {
			this.grow = 1;
			// this.max_radius = random(3, max_radius)
		}

		// x_move = all_x_move
		// y_move = all_y_move

		// this.x += x_move;
		// this.y += y_move;

		// this.radius += this.grow
	}

	this.draw = function() {
		noStroke();
		if (mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < cursor_size) {
			this.draw_white()
		}
		else {
			fill(this.color_r, this.color_g, this.color_b);
		}
		// rect(this.x - 1, this.y - 1, 3, 3);
		circle(this.x, this.y, this.radius);
		// stroke(255, 50);
		// line(this.x, this.y, width / 2, height / 2);
	}

	this.draw_white = function() {
		this.white_fill += this.white_step
		if (this.white_fill > 99 || this.white_fill < 15) {
			this.white_step *= -1
		}
		fill(this.white_fill)
	}

	this.draw_idle = function() {
		if (mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < cursor_size) {
			this.draw_white()
		}
		else {
			fill(this.color_r, this.color_g, this.color_b);
		}
		circle(this.x, this.y, this.idle_radius);
	}
}

function Crawler(x, y, dx, dy, r) {
	this.x = x
	this.y = y
	this.radius = r
	this.x_move = random(3, 9)
	this.y_move = random(3, 9)
	console.log(r)

	if (random() < 0.5) {
		this.x_move *= -1
	}
	if (random() < 0.5) {
		this.y_move *= -1
	}

	// this.x_move = constrain(dx, -100, 100)
	// this.y_move = constrain(dy, -100, 100)
	// if (this.x_move >= 0) {
	// 	this.x_move = map(this.x_move, 0, 100, 10, 20)
	// }
	// else {
	// 	this.x_move = map(this.x_move, -100, 0, -20, -10)
	// }
	// if (this.y_move >= 0) {
	// 	this.y_move = map(this.y_move, 0, 100, 10, 20)
	// }
	// else {
	// 	this.y_move = map(this.y_move, -100, 0, -20, -10)
	// }

	this.update = function() {
		this.x += this.x_move
		this.y += this.y_move

		// wrap crawler if it gets out of vision
		if (this.x > (windowWidth + this.radius*2)) {
			this.x = -this.radius*2
		}
		else if (this.x < (-this.radius*2)) {
			this.x = windowWidth + this.radius*2
		}
		if (this.y > (windowHeight + this.radius*2)) {
			this.y = -this.radius*2
		}
		else if (this.y < (-this.radius*2)) {
			this.y = windowHeight + this.radius*2
		}
	}

	this.draw = function() {
	}


}

function mouseReleased() {
	crawlers.push(new Crawler(
		mouseX, mouseY, mouseX-pmouseX, mouseY-pmouseY,
		cursor_size))
}

function mouseWheel(event) {
	if (event.delta < 0) {
		cursor_size += wheel_step
	}
	else {
		cursor_size -= wheel_step
	}

	cursor_size = constrain(cursor_size, min_cursor_size, max_cursor_size)
	console.log("cursor:", cursor_size)

	return false
}

function keyTyped() {
	if (key === 's') {
		all_x_move *= -1
	}
	else if (key === 'd') {
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
