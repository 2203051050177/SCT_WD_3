const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('.turn');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameActive = true;

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

function handleCellClick(cell) {
  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentPlayer;
    if (checkWin()) {
      endGame(`${currentPlayer}'s win!`);
    } else if (isDraw()) {
      endGame('Draw!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turn.textContent = `${currentPlayer}'s Turn`;
    }
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => cells[index].textContent === currentPlayer);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function endGame(message) {
  gameActive = false;
  turn.textContent = message;
}

function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  turn.textContent = `${currentPlayer}'s Turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));
restartButton.addEventListener('click', restartGame);