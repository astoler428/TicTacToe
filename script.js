let cells = [...document.querySelectorAll(".cell")];
cells.forEach((cell) => cell.addEventListener("click", makeMove));
let turnLabel = document.getElementById("turn");
let restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);
let player1Turn = true;
let gameOver = false;
let player1Moves = [];
let player2Moves = [];
let winnableCombos = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

function makeMove() {
  if (!gameOver && this.innerHTML == "") {
    if (player1Turn) {
      this.innerHTML = "x";
      player1Moves.push(this.id);
    } else {
      this.innerHTML = "o";
      player2Moves.push(this.id);
    }
    checkWin();
    if (!gameOver) updatePlayerTurn();
  }
}

function updatePlayerTurn() {
  if (player1Turn) {
    player1Turn = false;
    turnLabel.innerHTML = "Player 2's turn";
  } else {
    player1Turn = true;
    turnLabel.innerHTML = "Player 1's turn";
  }
}

function restartGame() {
  player1Turn = true;
  gameOver = false;
  cells.forEach((cell) => (cell.innerHTML = ""));
  turnLabel.innerHTML = "Player 1's turn";
  player1Moves = [];
  player2Moves = [];
}

function checkWin() {
  let playerMoves = player1Turn ? player1Moves : player2Moves;
  winnableCombos.forEach((combo) => {
    if (combo.every((cell) => playerMoves.includes(cell))) gameOver = true;
  });

  if (gameOver) {
    turnLabel.innerHTML = (player1Turn ? "Player 1" : "Player 2") + " wins!";
    return true;
  }

  return checkDraw();
}

function checkDraw() {
  if (!gameOver && player1Moves.length + player2Moves.length == 9) {
    turnLabel.innerHTML = "Game ends in a draw";
    return (gameOver = true);
  }
}
