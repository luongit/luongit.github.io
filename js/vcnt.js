const words = ["apple", "banana", "cherry", "grape", "orange",'tomato','coconut'];
const images = ["apple.webp", "banana.avif", "cherry.jpg", "grape.webp", "orange.jpg",'tomato.jpg','coconut.png'];
let selectedWord = "";
let selecteImaged = "";
let guessedLetters = [];
let score = 0;
var startTmeInterval;
var startTme = 20;
document.getElementById('time').innerHTML = startTme
const wordDisplay = document.getElementById('word-display');
const lettersContainer = document.getElementById('letters-container');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

function chooseRandomWord() {
    let idx = Math.floor(Math.random() * words.length);
    selectedWord = words[idx];
    selecteImaged = images[idx];
    guessedLetters = [];
    updateWordDisplay();
    updateLettersDisplay();
    message.textContent = "";
}

function updateWordDisplay() {
    wordDisplay.textContent = "";
    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            wordDisplay.textContent += letter + " ";
        } else {
            wordDisplay.textContent += "_ ";
        }
    }
}

function updateLettersDisplay() {
    lettersContainer.innerHTML = "";

    // Lấy danh sách chữ cái của từ đã chọn
    const uniqueLetters = Array.from(new Set(selectedWord.split("")));

    // Thêm chữ cái ngẫu nhiên vào danh sách
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    while (uniqueLetters.length < 15) { // Giới hạn hiển thị 15 chữ cái
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!uniqueLetters.includes(randomLetter)) {
            uniqueLetters.push(randomLetter);
        }
    }

    // Trộn ngẫu nhiên các chữ cái
    const shuffledLetters = uniqueLetters.sort(() => Math.random() - 0.5);

    // Hiển thị các chữ cái
    for (let letter of shuffledLetters) {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        letterElement.addEventListener('click', () => handleLetterClick(letter));
        lettersContainer.appendChild(letterElement);
    }
}

function handleLetterClick(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        checkGameStatus();
    }
}

function checkGameStatus() {
    if (wordDisplay.textContent.replace(/ /g, "") === selectedWord) {
        score++;
        scoreDisplay.textContent = score;
        message.textContent = "Chúc mừng, bạn đã đoán đúng!";
        document.getElementById('show_image').src= 'images/' + selecteImaged
        if (startTmeInterval) {
            clearInterval(startTmeInterval)
        }
    }
}

function handleGuess() {
    const letter = letterInput.value.toLowerCase();
    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        checkGameStatus();
        letterInput.value = "";
    }
}

function resetGame() {
    location.reload()
}

guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);

function setItav() {
    startTmeInterval = setInterval(() => {
       if ( startTme > 0) {
        startTme --;
       }
    
        if (startTme <= 0) {
         clearInterval(startTmeInterval)   
         document.getElementById('game-over').style.transform = 'scale(1)'
        }
    
        document.getElementById('time').innerHTML = startTme
    }, 1000);
}
setItav();
// Khởi tạo trò chơi
chooseRandomWord();
