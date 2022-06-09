// default variable
const defaultColor = "black";
const defaultMode = "color";
const defaultSize = 16

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;


// Link various html element to script
const gridBoard = document.getElementById('grid-board');
const gridSize = document.getElementById("grid-value");
const sliderValue = document.getElementById("slider-value");
const sizeValue = document.getElementById("size-value");
const colorSelector = document.getElementById("color-selector");
const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");

//set current color
function setCurrentColor(newColor) {
    currentColor = newColor;
}
//set current mode
function setCurrentMode(newMode) {
    currentMode = newMode;
}
//set current size
function setCurrentSize(newSize) {
    currentSize = newSize;
}

// DOM manipulation for button, slider and color selector
colorSelector.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sliderValue.onchange = (e) => setupGrid(e.target.value);
sliderValue.onmousemove = (e) => updateSize(e.target.value);

// when update the size, the text will changes according to value
function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

//will clear the grid when clear button is pressed
function clearGrid() {
    gridBoard.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function changeSize(value) {
    setCurrentSize(value);
    updateSize(value);
    reloadGrid();
}

function changeColor(e) {
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
    //this.style.backgroundColor = "black"
}



function setupGrid(size) {
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.addEventListener("mouseover", changeColor);
        gridBoard.insertAdjacentElement("beforeend", gridSquare);
    }
}
window.onload = () => {
    setupGrid(defaultSize)
}