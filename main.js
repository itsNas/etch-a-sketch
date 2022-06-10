//default variable
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

//set currentColor with new argument after onclick
function setCurrentColor(newColor) {
    currentColor = newColor;
}
//set currentMode with new argument after onclick
function setCurrentMode(newMode) {
    currentMode = newMode;
}
//set currentSize with new value after 
function setCurrentSize(newSize) {
    currentSize = newSize;
}
// Link various html element to script
const gridBoard = document.getElementById("grid-board");
const gridSize = document.getElementById("grid-value");
const sliderValue = document.getElementById("slider-value");
const sizeValue = document.getElementById("size-value");
const colorSelector = document.getElementById("color-selector");
const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");

// DOM manipulation for button, slider and color selector
colorSelector.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sliderValue.onmousemove = (e) => updateSize(e.target.value);
sliderValue.onchange = (e) => changeSize(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// When the size is changed, we set the grid size, update the size value (text), and reload the grid.
function changeSize(value) {
    setCurrentSize(value);
    updateSize(value);
    reloadGrid();
}


// when update the size, the text will changes according to value
function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

// When we reload the grid (which happens when "Clear grid" is pressed), we ensure that we clear the grid and that the size is still the current size.
function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

//will clear the grid when clear button is pressed
function clearGrid() {
    gridBoard.innerHTML = '';
}

// Creates the base grid and includes the code that says "when the mouse goes over the squares, draw."
function setupGrid(size) {
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.addEventListener("mouseover", changeColor);
        gridSquare.addEventListener("mousedown", changeColor);
        gridBoard.appendChild(gridSquare);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white'
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
}