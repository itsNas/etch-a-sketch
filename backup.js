//set the default variable
const defaultColor = 'black'
const defaultBtn = 'color'
const defaultSize = 32

let currentColor = defaultColor
let currentBtn = defaultBtn
let currentSize = defaultSize

//link all html elements so we can start manipulate the DOM 
const colorSelector = document.getElementById("color-selector");
const colorBtn = document.getElementById("color-btn");
const rainbow = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const gridBoard = document.getElementById("grid-board");

//DOM manipulation section. This will run the function that we want after action
colorSelector.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentBtn("color");
rainbow.onclick = () => setCurrentBtn("rainbow");
eraserBtn.onclick = () => setCurrentBtn("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)

//set current parameter section
function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentBtn(newBtn) {
    currentBtn = newBtn
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

//change size section
function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(num) {
    sizeValue.innerHTML = `${num} x ${num}`
}

//reload grid section
function reloadGrid() {
    clearGrid();
    draw(currentSize);
}

function clearGrid() {
    gridBoard.innerHTML = '';
}

// function to draw the sketch
function draw() {
    let size = currentSize
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement("div")
        gridSquare.classList.add = ("grid-square")
        gridSquare.addEventListener("mouseover", changeColor)
        gridBoard.appendChild(gridSquare);
    }
}

//change color section
function changeColor(e) {
    if (currentBtn === "rainbow") {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentBtn === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentBtn === "eraser") {
        e.target.style.backgroundColor = " rgb(240, 240, 233)";
    }
}
window.onload = () => {
    draw(defaultSize)
}