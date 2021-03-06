const totalWinsNeeded = 5;
const winMsg = " has won the game!";
const main = document.querySelector("#main");
const elPlayerWins = document.querySelector(".playerWins");
const elComputerWins = document.querySelector(".computerWins");
const elTies = document.querySelector(".ties");
const elGame = document.querySelector(".game");
const elGameWinner = document.querySelector(".game-winner");
const btnGameWinner = elGameWinner.querySelector("button");
const elRoundWinner = document.querySelector(".round-winner");

const elRock = document.querySelector(".rock");
const elPaper = document.querySelector(".paper");
const elScissors = document.querySelector(".scissors");

let numOfTieGames = 0;
let numOfPlayerWins = 0;
let numOfComputerWins = 0;

const p = document.createElement("p");
const playerChoice = document.createElement("p");
const computerChoice = document.createElement("p");
main.appendChild(playerChoice);
main.appendChild(computerChoice);
main.appendChild(p);

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

function initializeGame() {
  numOfTieGames = 0;
  numOfPlayerWins = 0;
  numOfComputerWins = 0;
  elTies.innerText = numOfTieGames;
  elPlayerWins.innerText = numOfPlayerWins;
  elComputerWins.innerText = numOfComputerWins;
  playerChoice.textContent = "";
  computerChoice.textContent = "";
  elGameWinner.querySelector(".message").textContent = "";
  p.textContent = "";
  elRoundWinner.textContent = "";
}

function handleGameRestart() {
  elGameWinner.classList.add("me-hide");
  elGame.classList.remove("me-hide");
  initializeGame();
}

function displayGameWinner(winnerMessage) {
  toggleEventListener("on", "handleGameRestart");
  elGame.classList.add("me-hide");
  elGameWinner.querySelector(".message").textContent = winnerMessage;
  elGameWinner.classList.remove("me-hide");
}

function displayRoundWinner(theWinner, playerSelection, computerSelection) {
  playerChoice.textContent = "You chose " + playerSelection;
  computerChoice.textContent = "The computer chose " + computerSelection;
  let myPlayerSelection =
    playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
  let myComputerSelection =
    computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);
  switch (theWinner) {
    case "Tie":
      p.textContent = "This round is a Tie!";
      console.log("Tie: " + numOfTieGames);
      elTies.innerText = numOfTieGames;
      break;
    case "Player":
      p.textContent =
        "You Win! " + myPlayerSelection + " beats " + myComputerSelection;
      elPlayerWins.innerText = numOfPlayerWins;
      break;
    case "Computer":
      p.textContent =
        "Computer Wins! " + myComputerSelection + " beats " + myPlayerSelection;
      elComputerWins.innerText = numOfComputerWins;
      break;
    default:
      console.log("Error: Display Winner did not get proper parameters");
  }
}

function getWinner(playerSelection, computerSelection) {
  let myWinner;
  if (playerSelection == computerSelection) {
    myWinner = "Tie";
    numOfTieGames++;
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "rock")
  ) {
    myWinner = "Player";
    numOfPlayerWins++;
  } else {
    myWinner = "Computer";
    numOfComputerWins++;
  }
  return myWinner;
}

function computerPlay() {
  const randomSelection = Math.floor(Math.random() * 3);
  arrayChoices = ["rock", "paper", "scissors"];
  let computerSelection = arrayChoices[randomSelection];
  return computerSelection;
}

async function displayFeedback(theWinner, playerSelection, computerSelection) {
  if (theWinner === "Tie") {
    document
      .querySelector("button." + playerSelection)
      .classList.remove("playerSelection");
    document
      .querySelector("button." + playerSelection)
      .classList.remove("computerSelection");
    document
      .querySelector("button." + playerSelection)
      .classList.add("tieSelection");
  }
  displayRoundWinner(theWinner, playerSelection, computerSelection);
  await wait(2000);
  toggleBorder(playerSelection, "player", "off");
  toggleBorder(computerSelection, "computer", "off");
  document
    .querySelector("button." + playerSelection)
    .classList.remove("tieSelection");
  toggleEventListener("on", "handleClick");
  return;
}

function toggleEventListener(status, theCallback) {
  console.log("begin toggleEventListener ", status, theCallback);
  if (theCallback === "handleClick") {
    if (status === "off") {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    } else {
      buttons.forEach((button) => {
        button.addEventListener("click", handleClick);
      });
    }
  } else if (theCallback === "handleGameRestart") {
    if (status === "off") {
      btnGameWinner.removeEventListener("click", handleGameRestart);
    } else {
      btnGameWinner.addEventListener("click", handleGameRestart);
    }
  }
}

function toggleBorder(selection, who, status) {
  if (status === "on") {
    switch (selection) {
      case "rock":
        elRock.classList.add(who + "Selection");
        break;
      case "paper":
        elPaper.classList.add(who + "Selection");
        break;
      case "scissors":
        elScissors.classList.add(who + "Selection");
        break;
    }
  } else {
    switch (selection) {
      case "rock":
        elRock.classList.remove(who + "Selection");
        break;
      case "paper":
        elPaper.classList.remove(who + "Selection");
        break;
      case "scissors":
        elScissors.classList.remove(who + "Selection");
        break;
      default:
        console.log("Unexpected selection " + selection);
    }
  }
}

function handleClick(e) {
  let playerSelection = e.target.parentElement.className;
  toggleEventListener("off", "handleClick");
  toggleBorder(playerSelection, "player", "on");
  computerSelection = computerPlay();
  toggleBorder(computerSelection, "computer", "on");
  let winner = getWinner(playerSelection, computerSelection);
  displayFeedback(winner, playerSelection, computerSelection);
  if (
    numOfPlayerWins === totalWinsNeeded ||
    numOfComputerWins === totalWinsNeeded
  ) {
    const winnerMessage = (elRoundWinner.textContent = winner + winMsg);
    displayGameWinner(winnerMessage);
    return;
  }
}

const buttons = document.querySelectorAll(".game button");
console.log(buttons);
toggleEventListener("on", "handleClick");

// Plays rock, paper, scissors against the computer.
// Modify the existing code to incorporate the below options.
// -Play a match of 5 rounds.
// -Keep and display score.
