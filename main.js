//cache  dom
const gridBoard = document.getElementById('grid-board');
const gridSize = document.getElementById("grid-value");
const sliderValue = document.getElementById("slider-value");
const sizeValue = document.getElementById("size-value");
const selectColor = document.getElementById("select-color");
const colorBtn = document.getElementById("color-btn");
const rainbowColor = document.getElementById("rainbow-color");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");




sliderValue.onchange = (e) => setupGrid(e.target.value);
sliderValue.onmousemove = (e) => updateSize(e.target.value);


function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function changeSize(value) {
    updateSize(value);
}

function setupGrid(size) {
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.style.backgroundColor = "blue";
        gridBoard.insertAdjacentElement("beforeend", gridSquare);
    }
}

setupGrid()