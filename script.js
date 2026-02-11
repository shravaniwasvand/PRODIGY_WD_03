const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const boardElement = document.querySelector('.board');

const pvpBtn = document.getElementById('pvpBtn');
const pvcBtn = document.getElementById('pvcBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let vsAI = false;
let gameActive = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

pvpBtn.addEventListener('click', () => startGame(false));
pvcBtn.addEventListener('click', () => startGame(true));
restartButton.addEventListener('click', restartGame);

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

function startGame(aiMode) {
    vsAI = aiMode;
    gameActive = true;
    boardElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    resetBoard();
    statusText.textContent = `Turn: ${currentPlayer}`;
}

function handleCellClick(cell, index) {
    if (!gameActive || board[index] !== "" ) return;

    playerMove(cell, index);

    if (vsAI && gameActive) {
        setTimeout(aiMove, 300);
    }
}

function playerMove(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = `It's a draw! 🤝`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turn: ${currentPlayer}`;
}

function aiMove() {
    const emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    if (emptyIndices.length === 0) return;

    
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const cell = cells[randomIndex];
    board[randomIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins! 🖥️💥`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = `It's a draw! 🤝`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

function resetBoard() {
    board.fill("");
    currentPlayer = "X";
    cells.forEach(cell => (cell.textContent = ""));
}

function restartGame() {
    gameActive = true;
    resetBoard();
    statusText.textContent = `Turn: ${currentPlayer}`;
}


