function game() {

    const NUMBER_OF_GAMES = 5;
    // If you reach this amount of victories you have already won
    const necessaryVictories = Math.ceil(NUMBER_OF_GAMES / 2);

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

    function validatePlayerSelection(playerSelection) {
        return playerSelection === "rock" || playerSelection === "paper" ||
            playerSelection === "scissors";
    }

    let playerVictories = 0;
    let computerVictories = 0;

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

    // TODO: while instead of for in order to avoid break keyword?
    for (let i = 0; i < NUMBER_OF_GAMES; i++) {

        let playerSelection;
        let validPlayerSelection;

        // Keeps asking until the player selection is valid
        do {
            playerSelection = prompt("Choose Rock, Paper or Scissors: ").toLowerCase();

            validPlayerSelection = validatePlayerSelection(playerSelection);

        } while (!validPlayerSelection);

        const computerSelection = computerPlay();

        console.log({playerSelection});
        console.log({computerSelection});

        const roundMessage = playRound(playerSelection, computerSelection);
        console.log(roundMessage);

        checkRoundWinner(roundMessage);
        console.log({playerVictories});
        console.log({computerVictories});

        if (playerVictories === necessaryVictories || computerVictories === necessaryVictories) {
            break;
        }
    }

    console.log(checkGameWinner());
}

game();