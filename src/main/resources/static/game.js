let gameInfo = {};
let source = null;


const piecesMap = {
    "P": "♟", "R": "&#9820;", "N": "&#9822;", "B": "&#9821;", "Q": "&#9819;", "K": "&#9818;",
    "p": "&#9817;", "r": "&#9814;", "n": "&#9816;", "b": "&#9815;", "q": "&#9813;", "k": "&#9812;"
}
let roomId = "";

window.onload = () => {
    const urls = location.href.split("/");
    roomId = urls[urls.length - 1];
    loadChessGame();
}

function loadChessGame() {
    const pw = prompt("비밀번호를 입력 해 주세요.");
    const body = {
        "id": roomId,
        "pw": pw
    }
    axios.post('/api/room/' + roomId, body)
        .then(function (response) {
            refreshChessBoard(response.data)
        }).catch(function (error) {
        if (error.response.status === 400) {
            alert('비밀번호가 틀렸습니다.');
        } else {
            alert('게임을 로드 할 수 없습니다.');
        }
        location.href = "/";
    });
}


function selectPiece(target) {
    if (gameInfo.end) {
        askExit();
        return;
    }

    if (source == null) {
        if (!target.classList.contains('piece')) {
            alert('빈 공간을 클릭 할 수 없습니다.')
            return;
        }

        const isWhiteTurn = gameInfo.whiteTeam.turn;
        const isWhitePiece = target.getAttribute('color') === 'white';

        if (isWhiteTurn ^ isWhitePiece) {
            alert('상대방 기물을 선택 하셨습니다.')
            return;
        }
        source = target;
        source.classList.add('selected-piece')
    } else {
        if (target.getAttribute('id') === source.getAttribute('id')) {
            source.classList.remove('selected-piece')
            source = null;
            return;
        }

        if (source.getAttribute('color') === target.getAttribute('color')) {
            source.classList.remove('selected-piece')
            source = target;
            source.classList.add('selected-piece')
            return;
        }
        movePiece(target);
    }

}

function movePiece(target) {
    const body = {
        'from': source.getAttribute('id'),
        'to': target.getAttribute('id')
    }
    axios.put('/api/game/' + gameInfo.id, body)
        .then(function (response) {
            source.classList.remove('selected-piece')
            source = null;
            refreshChessBoard(response.data);
        })
        .catch(function (error) {
            alert('움직일 수 없습니다.');
        })
        .then(function () {
            clearSelect();
        })
}

function clearSelect() {
    let selectedPiece = document.getElementsByClassName('selected-piece');
    for (let i = 0; i < selectedPiece.length; i++) {
        selectedPiece[i].classList.remove('selected-piece');
    }
}

function refreshChessBoard(chessGame) {
    console.log(chessGame);
    gameInfo = chessGame;
    let isEnd = chessGame.end;

    clearChessBoard();
    let blackPieces = chessGame.blackTeam.pieces.pieces;
    for (let i = 0; i < blackPieces.length; i++) {
        let piece = blackPieces[i]
        let tile = document.getElementById(piece.position);
        tile.classList.add('piece');
        tile.setAttribute('color', 'black')
        tile.classList.add(piece.piece);
        tile.innerHTML = piecesMap[piece.piece];
    }

    let whitePieces = chessGame.whiteTeam.pieces.pieces;
    for (let i = 0; i < whitePieces.length; i++) {
        let piece = whitePieces[i];
        let tile = document.getElementById(piece.position);
        tile.classList.add('piece');
        tile.setAttribute('color', 'white')
        tile.classList.add(piece.piece);
        tile.innerHTML = piecesMap[piece.piece];
    }

    let blackScore = chessGame.blackTeam.score;
    let whiteScore = chessGame.whiteTeam.score;
    document.getElementById('score-white').innerHTML = whiteScore;
    document.getElementById('score-black').innerHTML = blackScore;


    if (chessGame.blackTeam.turn) {
        document.getElementById('name-black').innerHTML = chessGame.blackTeam.name + "♟";
        document.getElementById('name-white').innerHTML = chessGame.whiteTeam.name;
    } else if (chessGame.whiteTeam.turn) {
        document.getElementById('name-black').innerHTML = chessGame.blackTeam.name;
        document.getElementById('name-white').innerHTML = chessGame.whiteTeam.name + "&#9817;";
    }

    if (isEnd) {
        askExit();
    }
}


function askExit() {
    if (confirm('게임이 끝났습니다. 나가시겠습니까?')) {
        location.href = "/";
    }
}

function clearChessBoard() {
    const board = document.querySelector('.chessboard');
    board.innerHTML = ' <!-- 1st -->\n' +
        '        <div id="a8" class="tile white"></div>\n' +
        '        <div id="b8" class="tile black"></div>\n' +
        '        <div id="c8" class="tile white"></div>\n' +
        '        <div id="d8" class="tile black"></div>\n' +
        '        <div id="e8" class="tile white"></div>\n' +
        '        <div id="f8" class="tile black"></div>\n' +
        '        <div id="g8" class="tile white"></div>\n' +
        '        <div id="h8" class="tile black"></div>\n' +
        '        <!-- 2nd -->\n' +
        '        <div id="a7" class="tile black"></div>\n' +
        '        <div id="b7" class="tile white"></div>\n' +
        '        <div id="c7" class="tile black"></div>\n' +
        '        <div id="d7" class="tile white"></div>\n' +
        '        <div id="e7" class="tile black"></div>\n' +
        '        <div id="f7" class="tile white"></div>\n' +
        '        <div id="g7" class="tile black"></div>\n' +
        '        <div id="h7" class="tile white"></div>\n' +
        '        <!-- 3th -->\n' +
        '        <div id="a6" class="tile white"></div>\n' +
        '        <div id="b6" class="tile black"></div>\n' +
        '        <div id="c6" class="tile white"></div>\n' +
        '        <div id="d6" class="tile black"></div>\n' +
        '        <div id="e6" class="tile white"></div>\n' +
        '        <div id="f6" class="tile black"></div>\n' +
        '        <div id="g6" class="tile white"></div>\n' +
        '        <div id="h6" class="tile black"></div>\n' +
        '        <!-- 4st -->\n' +
        '        <div id="a5" class="tile black"></div>\n' +
        '        <div id="b5" class="tile white"></div>\n' +
        '        <div id="c5" class="tile black"></div>\n' +
        '        <div id="d5" class="tile white"></div>\n' +
        '        <div id="e5" class="tile black"></div>\n' +
        '        <div id="f5" class="tile white"></div>\n' +
        '        <div id="g5" class="tile black"></div>\n' +
        '        <div id="h5" class="tile white"></div>\n' +
        '        <!-- 5th -->\n' +
        '        <div id="a4" class="tile white"></div>\n' +
        '        <div id="b4" class="tile black"></div>\n' +
        '        <div id="c4" class="tile white"></div>\n' +
        '        <div id="d4" class="tile black"></div>\n' +
        '        <div id="e4" class="tile white"></div>\n' +
        '        <div id="f4" class="tile black"></div>\n' +
        '        <div id="g4" class="tile white"></div>\n' +
        '        <div id="h4" class="tile black"></div>\n' +
        '        <!-- 6th -->\n' +
        '        <div id="a3" class="tile black"></div>\n' +
        '        <div id="b3" class="tile white"></div>\n' +
        '        <div id="c3" class="tile black"></div>\n' +
        '        <div id="d3" class="tile white"></div>\n' +
        '        <div id="e3" class="tile black"></div>\n' +
        '        <div id="f3" class="tile white"></div>\n' +
        '        <div id="g3" class="tile black"></div>\n' +
        '        <div id="h3" class="tile white"></div>\n' +
        '        <!-- 7th -->\n' +
        '        <div id="a2" class="tile white"></div>\n' +
        '        <div id="b2" class="tile black"></div>\n' +
        '        <div id="c2" class="tile white"></div>\n' +
        '        <div id="d2" class="tile black"></div>\n' +
        '        <div id="e2" class="tile white"></div>\n' +
        '        <div id="f2" class="tile black"></div>\n' +
        '        <div id="g2" class="tile white"></div>\n' +
        '        <div id="h2" class="tile black"></div>\n' +
        '        <!-- 8th -->\n' +
        '        <div id="a1" class="tile black"></div>\n' +
        '        <div id="b1" class="tile white"></div>\n' +
        '        <div id="c1" class="tile black"></div>\n' +
        '        <div id="d1" class="tile white"></div>\n' +
        '        <div id="e1" class="tile black"></div>\n' +
        '        <div id="f1" class="tile white"></div>\n' +
        '        <div id="g1" class="tile black"></div>\n' +
        '        <div id="h1" class="tile white"></div>';

    const tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++) {
        tiles.item(i).addEventListener('click', function (e) {
            selectPiece(e.target);
        })
    }
}



