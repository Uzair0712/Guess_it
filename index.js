// Constants of the Game
const RANGE_OF_NUMBERS = 20;
const MAX_POSSIBLE_SCORE = 20;

// First let's select all the required elements from the DOM

const restartButton = document.querySelector(".restart");
const resultText = document.querySelector(".result-text");
const input = document.querySelector("#number");
const checkButton = document.querySelector(".check");
const message = document.querySelector(".message");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");
const mainContainer = document.querySelector("main");

// Here Let's generate some random number between 0 to 20 for the Game
function generateNumber() {
  return Math.floor(Math.random() * RANGE_OF_NUMBERS) + 1;
}

// These are few state variables of the Game
let actualNumber = generateNumber();
let score = MAX_POSSIBLE_SCORE;
let highScore = 0;

// Function for resetting the Game
function resetGame() {
  message.textContent = "Start guessing...";
  resultText.textContent = "?";
  scoreElement.textContent = MAX_POSSIBLE_SCORE;
  score = MAX_POSSIBLE_SCORE;
  input.value = "";
  checkButton.disabled = false;
  actualNumber = generateNumber();
  mainContainer.classList.remove("green");
  mainContainer.classList.remove("red");
}

// Function for the matching the number
function matchNumbers(e) {
  e.preventDefault();
  const inputNumber = +input.value;
  if (!input.value) {
    message.textContent = "No number";
    return;
  }
  if (inputNumber === actualNumber) {
    resultText.textContent = actualNumber;
    message.textContent = "👍 Correct Number!";
    mainContainer.classList.add("green");
    checkButton.disabled = true;
    if (highScore < score) highScore = score;
    highScoreElement.textContent = highScore;
    return;
  }
  if (inputNumber > actualNumber) {
    message.textContent = "📈 Too high";
  }
  if (inputNumber < actualNumber) {
    message.textContent = "📉 Too low";
  }
  score--;
  scoreElement.textContent = score;
  if (score === 0) {
    message.textContent = "👎 You lost the Game";
    mainContainer.classList.add("red");
    checkButton.disabled = true;
  }
}

restartButton.addEventListener("click", resetGame);
checkButton.addEventListener("click", matchNumbers);
