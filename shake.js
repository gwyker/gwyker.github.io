function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();

	let gridSize = 35;

	for (let x = gridSize; x <= width; x += gridSize) {
	  for (let y = gridSize; y <= height; y += gridSize) {
	    noStroke();
	    fill(255);
	    rect(x - 1, y - 1, 3, 3);
	    stroke(255, 50);
	    line(x, y, width / 2, height / 2);
	  }
	}
}