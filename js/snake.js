const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.classList.remove("snake", "food"));

    snake.forEach((segment) => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add("snake");
    });

    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add("food");
}
function moveSnake() {
    if (direction.x === 0 && direction.y === 0) {
        return; // Không làm gì nếu rắn chưa có hướng di chuyển
    }

    const newHead = {
        x: (snake[0].x + direction.x + boardSize) % boardSize,
        y: (snake[0].y + direction.y + boardSize) % boardSize,
    };

    // Kiểm tra nếu đầu rắn va vào chính cơ thể
    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        clearInterval(gameInterval);
        alert("Game Over! Điểm của bạn: " + score);
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    updateBoard();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
    };

    if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 }; // Hướng mặc định: Rắn di chuyển sang phải
    placeFood();
    updateBoard();
    clearInterval(gameInterval); // Đảm bảo không có interval cũ
    gameInterval = setInterval(moveSnake, 200);
}
restartButton.addEventListener("click", startGame);
document.addEventListener("keydown", changeDirection);

createBoard();
startGame();
