'use strict'
const NORMAL = '😁';
const LOSE = '🤯';
const WIN = '🥳';
const MINE = '💣';
const FLAG = '🚩';

var board = {
    size: 4,
    mines: 2,
    maxLife: 1
};

var gBoard;
var firstTime;
var elTimer = document.querySelector('h2 span');
var elRestartBtn = document.querySelector('.restartBtn');
var elGameOverMsg = document.querySelector('.gameOverMsg');
var elLives = document.querySelector('.lives h2 span');
var interval;
var bestTime;

var gGame;


function initGame() {
    gBoard = buildBoard(board.size);
    renderBoard(gBoard, '.board-container');
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isFirst: true,
        life: board.maxLife
    }
    clearInterval(interval);
    elTimer.innerText = '0.000';
    elRestartBtn.innerText = NORMAL;
    elGameOverMsg.style.display = 'none'
    elLives.innerText = gGame.life
}

function win() {
    gGame.isOn = false;
    clearInterval(interval);
    elRestartBtn.innerText = WIN;
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
    elRestartBtn.innerText = LOSE;
    elGameOverMsg.style.display = 'block';
}

function restartBtn() {
    board = {
        size: 4,
        mines: 2,
        maxLife: 1
    };
    initGame();
}











