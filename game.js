const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let gameState = Array(15).fill(null).map(() => Array(15).fill(null));

function createBoard() {
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (gameState[row][col] || checkWinner()) return;

    gameState[row][col] = currentPlayer;
    cell.classList.add(`taken-${currentPlayer}`);
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `玩家 ${currentPlayer} 胜利！`;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `轮到玩家 ${currentPlayer}`;
    }
}

function checkWinner() {
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            if (gameState[row][col]) {
                if (checkDirection(row, col, 1, 0) || // 横向
                    checkDirection(row, col, 0, 1) || // 纵向
                    checkDirection(row, col, 1, 1) || // 斜向 /
                    checkDirection(row, col, 1, -1)) { // 斜向 \
                    return true;
                }
            }
        }
    }
    return false;
}

function checkDirection(row, col, rowInc, colInc) {
    let count = 0;
    const player = gameState[row][col];

    for (let i = 0; i < 5; i++) {
        const newRow = row + i * rowInc;
        const newCol = col + i * colInc;
        if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && gameState[newRow][newCol] === player) {
            count++;
        } else {
            break;
        }
    }

    return count === 5;
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    gameState = Array(15).fill(null).map(() => Array(15).fill(null));
    currentPlayer = "X";
    statusText.textContent = "轮到玩家 X";
    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

// 初始化游戏
resetGame();
createBoard();
