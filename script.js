let heading = document.querySelector('#heading');
let playerSelection = document.getElementById('player-selection');
let computerSelection = document.getElementById('computer-selection');
let playerScore = document.getElementById('player-score');
let computerScore = document.getElementById('computer-score');
let playerMoves = document.getElementsByClassName('player-move');
let playerMovesArr = Array.from(playerMoves);
let mainTag = document.getElementById('main');
let message = document.getElementById('message');
let startBtn = document.getElementById('start-btn');
let restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', () => {
    startGame()
});

restartBtn.addEventListener('click', () => {
    playerMovesArr.forEach(playerMove => playerMove.removeEventListener('click', (e) => {
        selectMoves(e)
    }));
    let h1 = document.getElementById('result-msg');
    h1.remove();
    startGame();
})

playerMovesArr.forEach(playerMove => playerMove.addEventListener('click', (e) => playRound(e)));

function playRound(e) {
    selectMoves(e);
    let result = getResult();
    updateResults(getResult());
    if (endGame()) {
        EndGameInterface();
    }
}
function selectMoves(e) {
    playerSelection.innerHTML = e.target.innerHTML;
    let moves = ["✊", "✋", "✌"];
    let randNum = Math.floor(Math.random() * 3);
    computerSelection.innerHTML = moves[randNum];
}

function getResult() {
    if (playerSelection.innerHTML === computerSelection.innerHTML) return "TIE";

    if ((playerSelection.innerHTML === "✊" && computerSelection.innerHTML === "✋") ||
        (playerSelection.innerHTML === "✋" && computerSelection.innerHTML === "✌") ||
        (playerSelection.innerHTML === "✌" && computerSelection.innerHTML === "✊")) return "LOSE";
    else return "WIN";
}

function updateResults(result) {
    if (result === "TIE") {
        message.innerHTML = "IT'S A TIE";
    }
    else if (result === "WIN") {
        let existingScore = parseInt(playerScore.innerHTML);
        playerScore.innerHTML = existingScore + 1;
        message.innerHTML = "YOU WON";
    }
    else if (result === "LOSE") {
        let existingScore = parseInt(computerScore.innerHTML);
        computerScore.innerHTML = existingScore + 1;
        message.innerHTML = "COMPUTER WIN";
    }
}

function endGame() {
    return (computerScore.innerHTML == 5 || playerScore.innerHTML == 5);
}

function EndGameInterface() {
    restartBtn.classList.remove('hide');
    heading.classList.add('hide');
    playerMovesArr.forEach(playerMove => playerMove.removeEventListener('click', (e) => playRound(e)));
    let h1 = document.createElement('h1');
    h1.setAttribute('id', 'result-msg');
    let body = document.querySelector('body');
    if (computerScore.innerHTML == 5) {
        h1.innerHTML = "YOU LOSE!";
    }
    else {
        h1.innerHTML = "YOU WIN!";
    }
    body.append(h1);
    playerMovesArr.forEach(playerMove => playerMove.removeEventListener('click', (e) => {
        playRound(e);
    }));
}

function startGame() {
    heading.classList.remove('hide');
    playerScore.innerHTML = "0";
    computerScore.innerHTML = "0";
    message.innerHTML = "";
    playerSelection.innerHTML = "?";
    computerSelection.innerHTML = "?";
    restartBtn.classList.add('hide');
    startBtn.classList.add('hide');
    mainTag.classList.remove('hide');


}