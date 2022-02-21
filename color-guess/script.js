const rgbText = document.querySelector("#rgb-text");
const colorOptions = document.querySelector("#color-options");
const ball = document.querySelectorAll(".ball");
const answer = document.querySelector("#answer");
const resetGame = document.querySelector("#reset-game");
const score = document.querySelector("#score");

function randomColorGen() {
  const randomColor = Math.floor(Math.random() * 256);
  return randomColor;
}

function createText() {
  const rgbColor = document.createElement("p");
  rgbColor.id = "rgb-color";
  rgbText.appendChild(rgbColor);
}

function generateColorCode() {
  const rgbColor = document.querySelector("#rgb-color");
  rgbColor.innerText = `(${randomColorGen()}, ${randomColorGen()}, ${randomColorGen()})`;
}

function backgroundColorBallGenerate() {
  const backgroundColorBall = `rgb(${randomColorGen()}, ${randomColorGen()}, ${randomColorGen()})`;
  return backgroundColorBall;
}

function generateBackgroundColors() {
  const rgbColor = document.querySelector("#rgb-color");
  const randomBall = Math.floor(Math.random() * 6);
  const colorBall = `rgb${rgbColor.innerText}`;

  ball[randomBall].style.backgroundColor = colorBall;

  for (let i = 0; i < ball.length; i += 1) {
    if (i !== randomBall) {
      ball[i].style.backgroundColor = backgroundColorBallGenerate();
    }
  }
}

function incScore() {
  const numberScore = score.innerText;
  let parseScore = parseInt(numberScore, 10);
  parseScore += 3;
  score.innerText = parseScore;
}

function decScore() {
  const numberScore = score.innerText;
  let parseScore = parseInt(numberScore, 10);
  console.log(numberScore, parseScore);
  parseScore -= 1;
  score.innerText = parseScore;
}

function selectedBall(event) {
  const rgbColor = document.querySelector("#rgb-color");
  const compStyle = window.getComputedStyle(event.target);
  const colorBall = `rgb${rgbColor.innerText}`;

  if (compStyle.getPropertyValue("background-color") === colorBall) {
    answer.innerText = "Acertou!";
    answer.style.color = "rgb(84, 137, 207)";

    incScore();
  } else {
    answer.innerText = "Errou! Tente novamente!";
    answer.style.color = "red";

    decScore();
  }
}

colorOptions.addEventListener("click", selectedBall);

function gameChange() {
  generateColorCode();
  generateBackgroundColors();
  answer.innerText = "Escolha uma cor";
  answer.style.color = "rgb(65, 65, 65)";
}

resetGame.addEventListener("click", gameChange);

window.onload = function () {
  createText();
  generateColorCode();
  generateBackgroundColors();
};
