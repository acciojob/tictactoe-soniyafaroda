let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameOver = false;

document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") return;

  document.getElementById("input-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";

  currentPlayer = player1;
  document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent !== "" || gameOver) return;

    if (currentPlayer === player1) {
      cell.textContent = "x";
    } else {
      cell.textContent = "o";
    }

    if (checkWin()) {
      document.querySelector(".message").textContent =
        `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    // Switch turn
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  const winningCombos = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];

  return winningCombos.some(combo => {
    const [a,b,c] = combo;

    const cellA = document.getElementById(a).textContent;
    const cellB = document.getElementById(b).textContent;
    const cellC = document.getElementById(c).textContent;

    return cellA !== "" && cellA === cellB && cellB === cellC;
  });
}
