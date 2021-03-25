'use strict'

//Neighbors loop
function countNeighbors(board, idxI, idxJ) {
    var NegsCount = 0;
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i === idxI && j === idxJ) continue;
            if (j < 0 || j >= board.length) continue;
            var neighborCell = board[i][j];
            if (neighborCell.isMine) NegsCount++;
        }
    }
    return NegsCount;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            currCell.minesAroundCount = countNeighbors(board, i, j)
        }
    }
}


function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isMarked) return;
    if (gGame.isFirst) {
        //timer
        elTimer = document.querySelector('h2 span');
        firstTime = new Date().getTime();
        interval = setInterval(timer, 100)

        addMines(i, j);
        setMinesNegsCount(gBoard);
        gGame.isFirst = false;
    }

    //if number
    gBoard[i][j].isShown = true;
    gGame.shownCount++;

    //if empty cell
    if (gBoard[i][j].minesAroundCount === 0) expandShown(gBoard, i, j);

    //if mine
    if (gBoard[i][j].isMine) gGame.life--;
    elLives.innerText = gGame.life;


    //apdate DOM
    renderBoard(gBoard, '.board-container');
    checkGameOver();
}


function expandShown(board, idxI, idxJ) {
    if (board[idxI][idxJ].isMine) return
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i === idxI && j === idxJ) continue;
            if (j < 0 || j >= board.length) continue;
            var neighborCell = board[i][j];
            if (!neighborCell.isMine && !neighborCell.isShown && !neighborCell.isMarked) {
                neighborCell.isShown = true;
                gGame.shownCount++;
                if (neighborCell.minesAroundCount === 0) expandShown(board, i, j);// recursive: bonus
            }
        }
    }
}

function cellMarked(i, j) {
    if (!gGame.isOn) return;
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
    renderBoard(gBoard, '.board-container');
    gGame.markedCount += (gBoard[i][j].isMarked) ? 1 : -1;
    checkGameOver();
}

function addMines(firstI, firstJ) {
    var nums = createArray(gBoard.length * gBoard.length);
    var firstIdx = firstI * gBoard.length + firstJ
    nums.splice(firstIdx, 1);
    for (var i = 0; i < board.mines; i++) {
        var iANDj = randomNum(nums)
        var idxI = parseInt(iANDj / gBoard.length)
        var idxJ = iANDj % gBoard.length
        gBoard[idxI][idxJ].isMine = true;
    }
}

function color(elCell) {
    console.log(elCell);
}