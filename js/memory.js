const startButton = document.getElementById("start-button");
const imageGrid = document.getElementById("image-grid");
const instructions = document.getElementById("instructions");
const scoreDisplay = document.getElementById("score");

const images = ["images/apple.webp", "images/banana.avif", "images/cherry.jpg", "images/grape.webp", "images/orange.jpg",'images/tomato.jpg','images/coconut.png', "images/potato.webp"];

let sequence = [];
let userSequence = [];
let score = 0;
let isUserTurn = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    resetGame();
    instructions.textContent = "Đang hiển thị hình ảnh, hãy nhớ thứ tự!";
    const shuffledImages = shuffle([...images]);
    sequence = shuffledImages.slice(0, 4);

    displaySequence(() => {
        instructions.textContent = "Bây giờ hãy chọn các hình ảnh theo thứ tự!";
        isUserTurn = true;
    });
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    sequence = [];
    userSequence = [];
    imageGrid.innerHTML = "";
    isUserTurn = false;
}

function displaySequence(callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image");
            imageDiv.style.backgroundImage = `url(${sequence[index]})`;
            imageGrid.appendChild(imageDiv);

            setTimeout(() => {
                imageDiv.remove();
            }, 800);

            index++;
        } else {
            clearInterval(interval);
            createClickableGrid();
            callback();
        }
    }, 1000);
}

function createClickableGrid() {
    imageGrid.innerHTML = "";
    const shuffledImages = shuffle([...images]);
    shuffledImages.forEach((imgUrl) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        imageDiv.style.backgroundImage = `url(${imgUrl})`;
        imageDiv.addEventListener("click", () => handleUserClick(imgUrl));
        imageGrid.appendChild(imageDiv);
    });
}

function handleUserClick(imageUrl) {
    if (!isUserTurn) return;

    userSequence.push(imageUrl);
    const currentIndex = userSequence.length - 1;

    if (userSequence[currentIndex] !== sequence[currentIndex]) {
        instructions.innerHTML = "<b>Sai rồi! Nhấn 'Bắt đầu' để chơi lại.</b>";
        isUserTurn = false;
        return;
    }

    if (userSequence.length === sequence.length) {
        score++;
        scoreDisplay.textContent = score;
        instructions.innerHTML = "<b>Tuyệt vời! Nhấn 'Bắt đầu' để chơi lại.</b>";
        isUserTurn = false;
    }
}

startButton.addEventListener("click", startGame);
