const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// intializing function
init();
function init() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.cursor = 'pointer';
        box.classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
boxes.forEach(function (box, index) {
    box.addEventListener('click', () => {
        if (!newGameBtn.classList.contains('active')) {
            handleClick(index);
            box.style.cursor = "default";
        }
    });
})
function swapTurn() {
    if (!newGameBtn.classList.contains('active')) {
        if (currentPlayer === 'X') currentPlayer = '0';
        else currentPlayer = 'X';
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
}
function checkGameOver() {
    winningPositions.forEach((element) => {
        if (gameGrid[element[0]] == currentPlayer && gameGrid[element[1]] == currentPlayer && gameGrid[element[2]] == currentPlayer) {
            boxes[element[0]].classList.add('win');
            boxes[element[1]].classList.add('win');
            boxes[element[2]].classList.add('win');
            gameInfo.innerText = `${currentPlayer} WON`;
            newGameBtn.classList.add('active');
            boxes.forEach((box) => { box.style.cursor = 'default'; })
        }
        else if (gameGrid.indexOf('') === -1) {
            newGameBtn.classList.add('active');
            gameInfo.textContent = "It's a tie";
        }
        else { return; }
    })
}
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        checkGameOver();
        swapTurn();
    }
}
newGameBtn.addEventListener('click', init);
