//set the default variable
const defaultColor = "black";
const defaultBtn = "color";
const defaultSize = 32;

let currentColor = defaultColor;
let currentBtn = defaultBtn;
let currentSize = defaultSize;

//link all html elements so we can start manipulate the DOM
const colorSelector = document.getElementById("color-selector");
const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const gridBoard = document.getElementById("grid-board");

//DOM manipulation section. This will run the function that we want after action
colorSelector.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentBtn("color");
rainbowBtn.onclick = () => setCurrentBtn("rainbow");
eraserBtn.onclick = () => setCurrentBtn("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);

//set current parameter section
function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentBtn(newBtn) {
    activateBtn(newBtn);
    currentBtn = newBtn;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

//change size section
function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(num) {
    sizeValue.innerHTML = `${num} x ${num}`;
}

//reload grid section
function reloadGrid() {
    clearGrid();
    draw(currentSize);
}

function clearGrid() {
    gridBoard.innerHTML = "";
}

// function to draw the sketch
function draw(size) {
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add = "grid-square";
        gridSquare.style.border = "1px grey solid";
        gridSquare.addEventListener("mouseover", changeColor);
        gridBoard.appendChild(gridSquare);
    }
}

//change color section
function changeColor(e) {
    if (currentBtn === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentBtn === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentBtn === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

// activate styling when user choose mode
function activateBtn(newBtn) {
    if (currentBtn === "rainbow") {
        rainbowBtn.classList.remove("active");
    } else if (currentBtn === "color") {
        colorBtn.classList.remove("active");
    } else if (currentBtn === "eraser") {
        eraserBtn.classList.remove("active");
    }
    if (newBtn === "rainbow") {
        rainbowBtn.classList.add("active");
    } else if (newBtn === "color") {
        colorBtn.classList.add("active");
    } else if (newBtn === "eraser") {
        eraserBtn.classList.add("active");
    }
}

window.onload = () => {
    draw(defaultSize);
    activateBtn(defaultBtn);
};