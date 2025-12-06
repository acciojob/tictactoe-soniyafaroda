const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const game = document.getElementById("game");
const playerForm = document.getElementById("player-form");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let playerOne = "";
let playerTwo = "";
let currentPlayer = "";
let mark = "X";
let board = Array(9).fill("");

submitBtn.addEventListener("click", () => {
    if (!p1.value || !p2.value) {
        alert("Enter both player names!");
        return;
    }

    playerOne = p1.value;
    playerTwo = p2.value;

    currentPlayer = playerOne;

    playerForm.classList.add("hidden");
    game.classList.remove("hidden");

    message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let id = parseInt(cell.id) - 1;

        if (board[id] !== "") return;

        board[id] = mark;
        cell.textContent = mark;

        if (checkWin()) {
            message.textContent = `${currentPlayer} congratulations you won!`;
            disableBoard();
            return;
        }

        switchTurn();
    });
});

function switchTurn() {
    if (mark === "X") {
        mark = "O";
        currentPlayer = playerTwo;
    } else {
        mark = "X";
        currentPlayer = playerOne;
    }
    message.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return wins.some(comb =>
        comb.every(idx => board[idx] === mark)
    );
}

function disableBoard() {
    cells.forEach(c => c.style.pointerEvents = "none");
}
