let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 10 }];

food = { x: 6, y: 7 };

function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 32 ||
    snake[0].x <= 0 ||
    snake[0].y >= 20 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function isSnake(snake, foodX, foodY) {
  for (let i = 0; i < snakeArr.length; i++) {
    if (snake[i].x == foodX || snake[i].y == foodY) {
      return true;
    }
  }
  return false;
}

function gameEngine() {
  musicSound.play();
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 10, y: 10 }];
    musicSound.play();
    score = 0;
    showScore.innerHTML = "Score: " + score;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (speed < 10 && score >= 20) {
      speed = speed * 1.015;
    }
    if (score > hiscoreval) {
      hscoreval = score;
      localStorage.setItem("hscore", JSON.stringify(hscoreval));
      showHscore.innerHTML = "Highest Score: " + hscoreval;
    }
    showScore.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let foodX = Math.round(2 + (30 - 2) * Math.random());
    let foodY = Math.round(2 + (18 - 2) * Math.random());
    while (isSnake(snakeArr, foodX, foodY)) {
      foodX = Math.round(2 + (30 - 2) * Math.random());
      foodY = Math.round(2 + (18 - 2) * Math.random());
    }
    food = { x: foodX, y: foodY };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

musicSound.play();
let hscore = localStorage.getItem("hscore");
if (hscore === null) {
  hscoreval = 0;
  localStorage.setItem("hscore", JSON.stringify(hscoreval));
} else {
  hiscoreval = JSON.parse(hscore);
  showHscore.innerHTML = "Highest Score: " + hscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;

      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;

      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;

      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;

      break;
  }
});
