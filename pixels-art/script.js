// Referencia - https://www.educative.io/edpresso/how-to-generate-a-random-color-in-javascript
function randomColorGenerator() {
  let randomNumber = Math.random() * 16777215; // em HEX, FFFFFF
  randomNumber = Math.floor(randomNumber); // Retorna o menor inteiro
  randomNumber = randomNumber.toString(16); // Converte DEC -> string HEX
  const randomColor = randomNumber.padStart(6, 0); // Preenche no início com 0 até a string ter 6 caracteres
  return `#${randomColor}`;
}

function addRandomColor() {
  const firstColor = document.querySelector("#first-color");
  const secondColor = document.querySelector("#second-color");
  const thirdColor = document.querySelector("#third-color");

  firstColor.style.backgroundColor = randomColorGenerator();
  secondColor.style.backgroundColor = randomColorGenerator();
  thirdColor.style.backgroundColor = randomColorGenerator();
}

function removeOtherSelections() {
  const colors = document.querySelectorAll(".color");
  for (let i = 0; i < colors.length; i += 1) {
    if (colors[i].className === "color selected") {
      colors[i].className = "";
      colors[i].className = "color";
    }
  }
}

/*
  referencia:
  https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
  */
function addSelectedClass() {
  document.querySelectorAll(".color").forEach((item) => {
    item.addEventListener("click", (event) => {
      removeOtherSelections();
      if (event.target.classList[1] !== "selected") {
        event.target.className += " selected";
      }
    });
  });
}

const colorButton = document.querySelector("#more-color");
colorButton.addEventListener("click", () => {
  const colorPalette = document.querySelector("#color-palette");
  const newColor = document.createElement("div");
  newColor.style.backgroundColor = randomColorGenerator();
  newColor.className = "color";
  colorPalette.appendChild(newColor);
  addSelectedClass();
});

function addSelectedColor() {
  document.querySelectorAll(".pixel").forEach((item) => {
    item.addEventListener("click", (originEvent) => {
      const color = document.querySelector(".selected");
      /*
      REFERENCIA
      https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
    */
      const compStyle = window.getComputedStyle(color);
      const selectedColor = compStyle.getPropertyValue("background-color");
      originEvent.target.style.backgroundColor = selectedColor;
    });
  });
}

function clearBoard() {
  const button = document.querySelector("#clear-board");
  button.addEventListener("click", () => {
    document.querySelectorAll(".pixel").forEach((item) => {
      item.style.backgroundColor = "white";
    });
  });
}

function generatePixels(size) {
  const lines = document.querySelectorAll(".line");

  for (let i = 0; i < lines.length; i += 1) {
    for (let i2 = 0; i2 < size; i2 += 1) {
      const pixels = document.createElement("div");
      pixels.className = "pixel";
      lines[i].appendChild(pixels);
    }
  }
}

function generateLines(size) {
  const pixelBoard = document.querySelector("#pixel-board");
  for (let i = 0; i < size; i += 1) {
    const lines = document.createElement("div");
    lines.className = "line";
    pixelBoard.appendChild(lines);
  }
  generatePixels(size);
}

function removeLines() {
  const lines = document.querySelectorAll(".line");
  for (let i = 0; i < lines.length; i += 1) {
    lines[i].remove();
  }
}

function pixelBoardSize(size) {
  const pixelBoard = document.querySelector("#pixel-board");
  const tam = size * 42;
  pixelBoard.style.width = `${tam}px`;
  pixelBoard.style.height = `${tam}px`;
}

function generateBoard(size, boardSizeValue) {
  if (boardSizeValue === "") {
    alert("Board inválido!");
  } else {
    removeLines();
    generateLines(size);
    pixelBoardSize(size);
    addSelectedClass();
    addSelectedColor();
    clearBoard();
  }
}

function checkSize(size) {
  if (size <= 5) {
    return 5;
  }
  if (size >= 50) {
    return 50;
  }

  return size;
}

function selectSize() {
  const button = document.querySelector("#generate-board");
  button.addEventListener("click", () => {
    const boardSize = document.querySelector("#board-size");
    const size = checkSize(boardSize.value);

    generateBoard(size, boardSize.value);
    boardSize.value = "";
  });
}

window.onload = function loadWindow() {
  const black = document.querySelector("#black-color");
  black.className += " selected";
  generateBoard(5);
  addRandomColor();
};

selectSize();
