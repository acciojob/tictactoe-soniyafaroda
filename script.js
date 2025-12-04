//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";

const messageDiv = document.querySelector(".message");
const submitBtn = document.getElementById("submit");
const inputPage = document.getElementById("player-input");
const gamePage = document.getElementById("game-area");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names!");
        return;
    }

    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;

    inputPage.style.display = "none";
    gamePage.style.display = "block";
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent !== "") return;

        cell.textContent = currentSymbol;

        if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            disableBoard();
            return;
        }

        switchTurn();
    });
});

function switchTurn() {
    if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
    } else {
        currentSymbol = "X";
        currentPlayer = player1;
    }
    messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const winPatterns = [
        [1,2,3], [4,5,6], [7,8,9],      // rows
        [1,4,7], [2,5,8], [3,6,9],      // cols
        [1,5,9], [3,5,7]                // diagonals
    ];

    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return (
            document.getElementById(a).textContent === currentSymbol &&
            document.getElementById(b).textContent === currentSymbol &&
            document.getElementById(c).textContent === currentSymbol
        );
    });
}

function disableBoard() {
    cells.forEach(cell => cell.style.pointerEvents = "none");
}

