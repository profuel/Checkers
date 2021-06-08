/*---------- Cached Variables ----------*/

let board;
let boardWidth;
let leftPieces = 0;

function selectBoard(boardName) {
    selectedBoard = boardName;
    boardTitle.innerHTML = boards[boardName]['boardName'];
    board = boards[boardName]['board'].slice();
    boardWidth = boards[boardName]['boardWidth'];
    reloadBoard();
}

let removedPieces = 0;

let boardHeight = 0;

// parses pieceId's and returns the index of that piece's place on the board
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

// DOM references
const cells = document.querySelectorAll("td");
const boardTitle = document.querySelectorAll("#board-title")[0];
let redsPieces = document.querySelectorAll("p");
let moves = document.querySelectorAll(".moves")[0];
moves.innerHTML = "";

let playerPieces;

// selected piece properties
let selectedPiece = {};

let movesHistory = [];
/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
function givePiecesEventListeners() {
    for (let i = 0; i < redsPieces.length; i++) {
        redsPieces[i].removeAttribute("onclick");
        redsPieces[i].addEventListener("click", getPlayerPieces);
    }
}

/*---------- Logic ----------*/

function resetState() {

    leftPieces = 0;
    for(let i; i< board.length; i++) {
        if (board[i]) leftPieces++;
    }
    removedPieces = 0;

    boardHeight = board.length / boardWidth;

// parses pieceId's and returns the index of that piece's place on the board
    findPiece = function (pieceId) {
        let parsed = parseInt(pieceId);
        return board.indexOf(parsed);
    };

// DOM references
    redsPieces = document.querySelectorAll("p");
    moves = document.querySelectorAll(".moves")[0];
    moves.innerHTML = "";

// selected piece properties
    selectedPiece = {
        pieceId: -1,
        indexOfBoardPiece: -1,
        allowUp: false,
        allowDown: false,
        allowLeft: false,
        allowRight: false,
        allow: false
    };
    movesHistory = [];
}

// holds the length of the players piece count
function getPlayerPieces() {
    playerPieces = redsPieces;
    resetBorders();
}

// resets borders to default
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.allow = false;
    selectedPiece.allowUp = false;
    selectedPiece.allowDown = false;
    selectedPiece.allowLeft = false;
    selectedPiece.allowRight = false;
}

// gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    getAvailableSpaces();
    givePieceBorder();
}

// gets the moves that the selected piece can make
function getAvailableSpaces() {
    const column = selectedPiece.indexOfBoardPiece % boardWidth;
    const row = parseInt(selectedPiece.indexOfBoardPiece / boardWidth);

    if (row > 1 &&
        board[selectedPiece.indexOfBoardPiece - 2*boardWidth ] === null &&
        board[selectedPiece.indexOfBoardPiece - 1*boardWidth ] !== null &&
        cells[selectedPiece.indexOfBoardPiece - 2*boardWidth].classList.contains("noPieceHere") !== true) {
        selectedPiece.allowUp = true;
        selectedPiece.allow = true;
    }
    if (row < boardHeight-1 &&
        board[selectedPiece.indexOfBoardPiece + 2*boardWidth ] === null &&
        board[selectedPiece.indexOfBoardPiece + 1*boardWidth ] !== null &&
        cells[selectedPiece.indexOfBoardPiece + 2*boardWidth].classList.contains("noPieceHere") !== true) {
        selectedPiece.allowDown = true;
        selectedPiece.allow = true;
    }
    if (column > 1 &&
        board[selectedPiece.indexOfBoardPiece - 2 ] === null &&
        board[selectedPiece.indexOfBoardPiece - 1 ] !== null &&
        cells[selectedPiece.indexOfBoardPiece - 2].classList.contains("noPieceHere") !== true) {
        selectedPiece.allowLeft = true;
        selectedPiece.allow = true;
    }
    if (column < boardHeight-1 &&
        board[selectedPiece.indexOfBoardPiece + 2 ] === null &&
        board[selectedPiece.indexOfBoardPiece + 1 ] !== null &&
        cells[selectedPiece.indexOfBoardPiece + 2].classList.contains("noPieceHere") !== true) {
        selectedPiece.allowRight = true;
        selectedPiece.allow = true;
    }
}

// gives the piece a green highlight for the user (showing its movable)
function givePieceBorder() {
    if (selectedPiece.allow) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        giveCellsClick();
    }
}

// gives the cells on the board a 'click' bassed on the possible moves
function giveCellsClick() {
    if (selectedPiece.allowDown) {
        cells[selectedPiece.indexOfBoardPiece + 2*boardWidth].setAttribute("onclick", "makeMove("+2*boardWidth+")");
    }
    if (selectedPiece.allowUp) {
        cells[selectedPiece.indexOfBoardPiece - 2*boardWidth].setAttribute("onclick", "makeMove("+"-"+2*boardWidth+")");
    }
    if (selectedPiece.allowRight) {
        cells[selectedPiece.indexOfBoardPiece + 2].setAttribute("onclick", "makeMove("+2+")");
    }
    if (selectedPiece.allowLeft) {
        cells[selectedPiece.indexOfBoardPiece - 2].setAttribute("onclick", "makeMove("+"-2"+")");
    }
}

/* v when the cell is clicked v */

// makes the move that was clicked
function makeMove(number) {
    addHistoryMove(
        selectedPiece.indexOfBoardPiece,
        selectedPiece.indexOfBoardPiece + number,
        removedPieces === 0
    );
    movesHistory.push({
        'remove':  [
            selectedPiece.indexOfBoardPiece + number
        ],
        'restore': [
            selectedPiece.indexOfBoardPiece,
            selectedPiece.indexOfBoardPiece + number / 2
        ],
        'restoreId': [
            board[selectedPiece.indexOfBoardPiece],
            board[selectedPiece.indexOfBoardPiece + number / 2]
        ],
        'from' : selectedPiece.indexOfBoardPiece,
        'to' : selectedPiece.indexOfBoardPiece + number
    });
    console.log(movesHistory);

    document.getElementById(selectedPiece.pieceId).remove();
    document.getElementById(board[selectedPiece.indexOfBoardPiece + number / 2]).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    cells[selectedPiece.indexOfBoardPiece + number / 2].innerHTML = "";

    cells[selectedPiece.indexOfBoardPiece + number].innerHTML = getPieceCode(selectedPiece.pieceId);
    redsPieces = document.querySelectorAll("p");

    let indexOfPiece = selectedPiece.indexOfBoardPiece;
    changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);

    leftPieces--;
    removedPieces++;
    removeCellonclick();
    givePiecesEventListeners();
}

function resetHistory() {
    moves.innerHTML = "";
}

function addHistoryMove(from, to, first)
{
    if (!first) {
        moves.innerHTML += ", ";
    }

    moves.innerHTML += getCellCoo(from);
    moves.innerHTML += "&gt;";
    moves.innerHTML += getCellCoo(to);
}

function getCellCoo(index) {
    return `${index%boardWidth+1}:${parseInt(index/boardWidth+1)}`;
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[removePiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);

    resetSelectedPieceProperties();
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].className === '') {
            cells[i].removeAttribute("onclick");
        }
    }
}

function getPieceCode(id) {
    return `<p class="red-piece" id="${id}"></p>`;
}

function generateField(board) {
    for (let i=0; i<board.length; i++) {
        if (board[i]) {
            cells[i].innerHTML = getPieceCode(board[i]);
        } else {
            if (cells[i].className!=='noPieceHere') {
                cells[i].innerHTML = '';
            }
        }
    }
    redsPieces = document.querySelectorAll("p");
    movesHistory = [];
}

function reloadBoard() {
    resetState();
    generateField(board);
    givePiecesEventListeners();
}

function doUndo() {
    if (movesHistory.length === 0) return;

    const move = movesHistory.pop();

    drawHistory(movesHistory);

    for (let i=0; i<move.remove.length; i++) {


    }

    generateField(board);
    leftPieces++;
    removedPieces--;
    removeCellonclick();
    givePiecesEventListeners();

}

function drawHistory(historyData) {
    resetHistory();
    for(let i=0; i<historyData.length; i++) {
        addHistoryMove(historyData[i].from, historyData[i].to, i===0);
    }
}


window.onload = function() {
    selectBoard(selectedBoard);
    document.getElementById('restart').setAttribute('onclick', "selectBoard(selectedBoard)");
    document.querySelectorAll("#undo")[0].addEventListener("click", doUndo);
};
