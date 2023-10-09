const statusDisplay = document.querySelector('.game--status');
const gameResultDisplay = document.querySelector('.game-result');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gamesPlayed = 0;
let gameActive = true;
let xWins = 0;
let oWins = 0;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn - Game ${gamesPlayed + 1}`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === "X") {
            xWins++;
        } else {
            oWins++;
        }
        gameResultDisplay.innerHTML = `Game ${gamesPlayed + 1} : X -  ${xWins}, O -  ${oWins}`;
        gamesPlayed++;
        if (gamesPlayed >= 10) {
            statusDisplay.innerHTML = "Maximum games reached!";
        } else {
            statusDisplay.innerHTML = currentPlayerTurn();
        }
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameResultDisplay.innerHTML = `Game ${gamesPlayed + 1}: It's a draw`;
        gamesPlayed++;
        if (gamesPlayed >= 10) {
            statusDisplay.innerHTML = "Maximum games reached!";
        } else {
            statusDisplay.innerHTML = currentPlayerTurn();
        }
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || gamesPlayed >= 10) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
