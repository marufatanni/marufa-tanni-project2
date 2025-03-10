// ALL Global variables
let board = [];      // Array 
let moveCount = 0;   // Track moves
let timer = 0;       // Track time in seconds
let timerInterval;  

// ALL DOM Elements
const boardElement     = document.getElementById('puzzleBoard');
const moveCountElement = document.getElementById('moveCount');
const timerElement     = document.getElementById('timer');
const newGameButton       = document.getElementById('newGameButton');
const simpleGameButton    = document.getElementById('simpleGameButton');

// Initializes the board in solved order
function initSolvedBoard() {
  board = [];
  for (let i = 1; i <= 16; i++) {
    board.push(i);
  }
}

function shuffleBoard() {
    board.sort(() => Math.random() - 0.5);
  }
  
// 4×4 table
function drawBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < 4; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 4; col++) {
      const index = row * 4 + col;
      const tileValue = board[index];
      const td = document.createElement('td');
      td.id = 'cell' + (row + 1) + (col + 1);

      // Tile class
      td.className = 'tile' + tileValue;

      // Click handler for swapping tiles
      td.onclick = () => clickTile(row, col);
      tr.appendChild(td);
    }
    boardElement.appendChild(tr);
  }
}

function getEmptyTileIndex() {
  return board.indexOf(16);
}

// Checks adjacency -> (up/down/left/right)
function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 4), col1 = index1 % 4;
  const row2 = Math.floor(index2 / 4), col2 = index2 % 4;
  return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

// Tile click function
function clickTile(row, col) {
  const index = row * 4 + col;
  const emptyIndex = getEmptyTileIndex();
  if (isAdjacent(index, emptyIndex)) {
    [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]];
    moveCount++;
    updateMoveCount();
    drawBoard();

    // Short delay for win
    setTimeout(() => { Win(); }, 1000);
  }
}

// Function for updating move count
function updateMoveCount() {
  moveCountElement.textContent = moveCount;
}

// Function for updating timer
function updateTimer() {
  timerElement.textContent = timer;
}

// Function that starts timer
function startTimer() {
  clearInterval(timerInterval);
  timer = 0;
  updateTimer();
  timerInterval = setInterval(() => {
    timer++;
    updateTimer();
  }, 1000);
}

// Function that stops timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Checks if user won.
function Win() {
    if (
        document.getElementById("cell11").className === "tile1"  &&
        document.getElementById("cell12").className === "tile2"  &&
        document.getElementById("cell13").className === "tile3"  &&
        document.getElementById("cell14").className === "tile4"  &&
        document.getElementById("cell21").className === "tile5"  &&
        document.getElementById("cell22").className === "tile6"  &&
        document.getElementById("cell23").className === "tile7"  &&
        document.getElementById("cell24").className === "tile8"  &&
        document.getElementById("cell31").className === "tile9"  &&
        document.getElementById("cell32").className === "tile10" &&
        document.getElementById("cell33").className === "tile11" &&
        document.getElementById("cell34").className === "tile12" &&
        document.getElementById("cell41").className === "tile13" &&
        document.getElementById("cell42").className === "tile14" &&
        document.getElementById("cell43").className === "tile15" &&
        document.getElementById("cell44").className === "tile16"
    ) {
        stopTimer();
        window.alert( //displays message when user wins
            `\uD83C\uDF89 YAY! You solved the puzzle!\n\n` +
            `Time Taken: ${timer} second${timer === 1 ? '' : 's'}\n` +
            `Moves Used: ${moveCount}\n\n` +
            `Click OK to play again, or Cancel to exit.`
        );
        window.location.reload();
      }
    }
  

// Function for starting a new game
function newGame() {
  initSolvedBoard();
  shuffleBoard();
  if (isSolved()) {
    newGame();
    return;
  }
  moveCount = 0;
  updateMoveCount();
  drawBoard();
  startTimer();
}

// Checks if board is in solved order
function isSolved() {
  for (let i = 0; i < 16; i++) {
    if (board[i] !== i + 1) return false;
  }
  return true;
}

// Simple game
function simpleGame() {
  initSolvedBoard();
  [board[14], board[15]] = [board[15], board[14]]; //1 move = win
  moveCount = 0;
  updateMoveCount();
  drawBoard();
  startTimer();
}

// Button listeners
newGameButton.addEventListener('click', newGame);
simpleGameButton.addEventListener('click', simpleGame);

// Launchs a new game when window is reloaded
window.onload = newGame;

document.getElementById("howtoplay").addEventListener("click", () => {
  document.getElementById("play").style.display = "block";
});
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("play").style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
  setInterval(createHeart, 800); 
});

// Function for heart animation
function createHeart() {
  const heartsContainer = document.getElementById('heartsContainer');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '♥'; 
  heart.style.left = Math.random() * 100 + '%';
  heartsContainer.appendChild(heart);
  }
