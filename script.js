const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");

const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let currentUserName = "";

submitBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === "" || player2 === "") return;

    currentUserName = player1;

    document.getElementById("player-form").style.display = "none";
    game.style.display = "block";

    message.textContent = `${currentUserName}, you're up`;
});

const winningCombinations = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent !== "") return;

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `${currentUserName} congratulations you won!`;
            disableBoard();
            return;
        }

        switchPlayer();
    });
});

function switchPlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        currentUserName = player2;
    } else {
        currentPlayer = "X";
        currentUserName = player1;
    }

    message.textContent = `${currentUserName}, you're up`;
}

function checkWinner() {
    return winningCombinations.some(comb => {
        return comb.every(id => {
            return document.getElementById(id).textContent === currentPlayer;
        });
    });
}

function disableBoard() {
    cells.forEach(cell => cell.style.pointerEvents = "none");
}
