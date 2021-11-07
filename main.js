// TODO: Refactor
// TODO: Create HTML elements with JS in order to resemble more to a game
const NUMBER_OF_VICTORIES = 5;

const playerSelectionInfo = document.querySelector("#player-selection");
const computerSelectionInfo = document.querySelector("#computer-selection");

const roundMessageInfo = document.querySelector("#round-message");

const playerVictoriesInfo = document.querySelector("#player-victories");
const computerVictoriesInfo = document.querySelector("#computer-victories");

const gameMessageInfo = document.querySelector("#game-message");
const restartMessageInfo = document.querySelector("#restart-message");

let playerVictories = 0;
let computerVictories = 0;

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const playerSelection = event.currentTarget.textContent.toLowerCase();
    const computerSelection = computerPlay();

    playerSelectionInfo.textContent = playerSelection.toUpperCase();
    computerSelectionInfo.textContent = computerSelection.toUpperCase();

    const roundMessage = playRound(playerSelection, computerSelection);
    roundMessageInfo.textContent = roundMessage;

    checkRoundWinner(roundMessage);
    playerVictoriesInfo.textContent = playerVictories.toString();
    computerVictoriesInfo.textContent = computerVictories.toString();

    const maxVictories = Math.max(playerVictories, computerVictories);
    if (maxVictories === NUMBER_OF_VICTORIES) {
      const gameWinner = checkGameWinner();
      gameMessageInfo.textContent = gameWinner;

      buttons.forEach((button) => button.setAttribute("disabled", "disabled"));
      setTimeout(restartGame, 5000);
      restartMessageInfo.textContent = "Restarting...";
    }
  });
});

function computerPlay() {
  // Return 0-2
  const randomNumber = Math.floor(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      throw new Error("Unreachable computer option");
  }
}

function playRound(playerSelection, computerSelection) {
  if (computerSelection === "rock") {
    if (playerSelection === "rock") {
      return "Tie! Rock and Rock";
    } else if (playerSelection === "paper") {
      return "You Win! Paper beats Rock";
    } else {
      return "You Lose! Rock beats Scissors";
    }
  } else if (computerSelection === "paper") {
    if (playerSelection === "rock") {
      return "You Lose! Paper beats Rock";
    } else if (playerSelection === "paper") {
      return "Tie! Paper and Paper";
    } else {
      return "You Win! Scissors beats Paper";
    }
  } else {
    if (playerSelection === "rock") {
      return "You Win! Rock beats Scissors";
    } else if (playerSelection === "paper") {
      return "You Lose! Scissors beats Paper";
    } else {
      return "Tie! Scissors and Scissors";
    }
  }
}

// TODO: a more robust way to check the round winner
function checkRoundWinner(roundMessage) {
  if (roundMessage.includes("Win")) {
    playerVictories++;
  } else if (roundMessage.includes("Lose")) {
    computerVictories++;
  }
}

function checkGameWinner() {
  if (playerVictories > computerVictories) {
    return "PLAYER WINS";
  } else if (computerVictories > playerVictories) {
    return "COMPUTER WINS";
  } else {
    return "TIE";
  }
}

function restartGame() {
  playerVictories = 0;
  computerVictories = 0;

  playerSelectionInfo.textContent = "";
  computerSelectionInfo.textContent = "";
  roundMessageInfo.textContent = "";
  playerVictoriesInfo.textContent = playerVictories.toString();
  computerVictoriesInfo.textContent = computerVictories.toString();
  gameMessageInfo.textContent = "";
  restartMessageInfo.textContent = "";

  buttons.forEach((button) => button.removeAttribute("disabled"));
}
