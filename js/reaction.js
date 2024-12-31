const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const message = document.getElementById("message");
const reactionTimeDisplay = document.getElementById("reaction-time");

let timeout;
let startTime;
let isGameActive = false;

function startGame() {
    message.textContent = "Đợi màu sắc thay đổi...";
    gameArea.style.backgroundColor = "#ccc";
    reactionTimeDisplay.textContent = "0";
    isGameActive = false;

    const randomDelay = Math.random() * 3000 + 2000; // Từ 2 đến 5 giây
    timeout = setTimeout(() => {
        gameArea.style.backgroundColor = "#28a745"; // Chuyển sang màu xanh
        message.textContent = "Nhấn ngay!";
        startTime = Date.now();
        isGameActive = true;
    }, randomDelay);
}

function handleClick() {
    if (!isGameActive) {
        if (gameArea.style.backgroundColor === "rgb(40, 167, 69)") {
            message.textContent = "Bạn nhấn quá sớm! Thử lại.";
        } else {
            message.textContent = "Bạn chưa bắt đầu trò chơi!";
        }
        clearTimeout(timeout);
        return;
    }

    const reactionTime = Date.now() - startTime;
    message.textContent = "Tuyệt vời! Thử lại nhé.";
    reactionTimeDisplay.textContent = reactionTime;
    isGameActive = false;
}

startButton.addEventListener("click", () => {
    clearTimeout(timeout);
    startGame();
});

gameArea.addEventListener("click", handleClick);
