'use strict'
const NORMAL = '😁';
const LOSE = '🤯';
const WIN = '🥳';
const MINE = '💣';
const FLAG = '🚩';

var board = {
    size: 4,
    mines: 2
};

var gBoard;
var firstTime;
var elTimer;
var interval;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isFirst: true,
    life: 3
}


function initGame() {
    gBoard = buildBoard(board.size);
    renderBoard(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.isFirst = true
    clearInterval(interval);
    elTimer.innerText = '0.000'
}

function win() {
    gGame.isOn = false;
    clearInterval(interval);
    // restart btn
    //happy smiley
    //win sound - cards game
}

function checkGameOver() {
    if (gGame.markedCount === board.mines &&
        board.size * board.size === gGame.shownCount + gGame.markedCount) {
        win();
    } else if (gGame.life === 0) gameOver();
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(interval);
    // restart btn
    //sed smiley
}

function restartBtn() {
    initGame();


}








