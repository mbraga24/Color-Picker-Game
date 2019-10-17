let numshapes = 7;
let colors = [];
let pickedColor;
let shapes = document.querySelectorAll(".shape");
let colorDisplay = document.getElementById('colorDisplay');
let resultDisplay = document.querySelector("#resultDisplay");
let resetButton = document.querySelector('#reset');
let h1 = document.querySelector('h1');
let modeButtons = document.querySelectorAll('.mode');
let startButton = document.querySelector(".start");

init();

function init() {
	// set up mode listeners
	setupMode();
	// set up circles 
	setupShapes();
	reset();
}

function setupMode() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			if (this.textContent === "Easy") {
				numshapes = 4;
				(document.querySelector("#container")).style.padding = "100px 20px";
			} else {
				numshapes = 7;
				(document.querySelector("#container")).style.padding = "50px 40px";
			}
			reset();
		})
	}
}

function setupShapes() {
	for(let i = 0; i < shapes.length; i++) {
		// Add initial colors to shapes.
		shapes[i].style.backgroundColor = colors[i]
		// Add click listeners to shapes.
		shapes[i].addEventListener('click', function() {
			// Grab color
			let clickedColor = this.style.backgroundColor
			// Compare color to pickedColor
			if (clickedColor === pickedColor) {
				resultDisplay.style.display = "block";
				resultDisplay.textContent = "You got it!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?"
			} else {
				this.style.backgroundColor = "#333333";
				resultDisplay.style.display = "block";
				resultDisplay.textContent = "Try Again!";
				resultDisplay.style.fontSize = "125%";
			}
		})
	}
}

function reset() {
	// generate new colors
	colors = generateColors(numshapes);
	// pick a new color
	pickedColor = pickAColor();
	// assign new color to colorDisplay
	colorDisplay.textContent = pickedColor;
	// display colors
	for (let i = 0; i < shapes.length; i++) {
		if (colors[i]) {
			shapes[i].style.display = 'block';
			// shapes[i].style.backgroundColor = colors[i]; 
		} else {
			shapes[i].style.display = 'none';
		}
		shapes[i].style.backgroundColor = colors[i];
		shapes[i].textContent = "";
	}
	h1.style.backgroundColor = "#004c99";
	resetButton.textContent = "New Colors";
	resultDisplay.textContent = "Can you guess this color ?";
}

resetButton.addEventListener('click', function() {
	reset();
})

function changeColors(color) {
  // loop through all shapes
  for (let j = 0; j < shapes.length; j++) {
    // change each color to match given color
    shapes[j].style.backgroundColor = color;
  }
}
 function pickAColor() {
   let random = Math.floor(Math.random() * colors.length);
   return colors[random];
 }

function generateColors(n) {
	let array = [];
	for (let i = 0; i < n; i++) {
		array.push(randomColors());
	}
	return array;	
}

function randomColors() {
	let red = Math.floor(Math.random() * 256)	
	let green = Math.floor(Math.random() * 256)
	let blue = Math.floor(Math.random() * 256)

	return `rgb(${red}, ${green}, ${blue})`;
}