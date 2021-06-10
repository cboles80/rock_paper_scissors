const main = document.querySelector('#main');
const p = document.createElement('p');
const playerChoice = document.createElement('p');
const computerChoice = document.createElement('p');
let numOfTieGames = 0;
let numOfPlayerWins = 0;
let numOfComputerWins = 0;
const elPlayerWins = document.querySelector('.playerWins');
const elComputerWins = document.querySelector('.computerWins');
const elTies = document.querySelector('.ties');
const gameWinner = document.querySelector('.gamewinner');
const winMsg = ' has won the game!'
const elRock = document.querySelector('.rock');
const elPaper = document.querySelector('.paper');
const elScissors = document.querySelector('.scissors');

main.appendChild(playerChoice);
main.appendChild(computerChoice);
main.appendChild(p);

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

function displayGameWinner(theWinner, playerSelection, computerSelection) {
    playerChoice.textContent = 'You chose ' + playerSelection;
    computerChoice.textContent = 'The computer chose ' + computerSelection;
    let myPlayerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    let myComputerSelection = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);
    switch (theWinner) {
        case 'Tie':
            p.textContent = 'This round is a Tie!';
            console.log('Tie: ' +  numOfTieGames);
            elTies.innerText = numOfTieGames;
        break;

        case 'Player':
            p.textContent = 'You Win! ' + myPlayerSelection  + " beats " + myComputerSelection;
            console.log('Player Wins: ' + numOfPlayerWins);
            elPlayerWins.innerText = numOfPlayerWins;
        break;

        case 'Computer':
            p.textContent ='Computer Wins! ' + myComputerSelection + " beats " + myPlayerSelection;
            console.log('Computer Wins: ' + numOfComputerWins);
            elComputerWins.innerText = numOfComputerWins;
        break;

        default:
        console.log('Error: Display Winner did not get proper parameters');
        }
        
}

function getWinner(playerSelection, computerSelection) {
    let myWinner;
    console.log('begin GetWinner');
    if (playerSelection == computerSelection) {        
        myWinner = 'Tie';        
        numOfTieGames++;
    } else if ((playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "scissors" && computerSelection == "paper") ||
        (playerSelection == "paper" && computerSelection == "rock")) {
        myWinner = 'Player';
        numOfPlayerWins++;
    } else {
        myWinner = 'Computer';        
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
    console.log('displayFeedback');
    if (theWinner === 'Tie') {
        document.querySelector('button.' + playerSelection).classList.remove('playerSelection');
        document.querySelector('button.' + playerSelection).classList.remove('computerSelection');
        document.querySelector('button.' + playerSelection).classList.add('tieSelection');
    }
    displayGameWinner(theWinner, playerSelection, computerSelection);
    await wait(2000);
    console.log('WAITING...');
    // document.querySelector('button.' + playerSelection).classList.remove('playerSelection');
    toggleBorder(playerSelection, 'player', 'off');
    // document.querySelector('button.' + computerSelection).classList.remove('computerSelection');
    toggleBorder(computerSelection, 'computer', 'off');
    document.querySelector('button.' + playerSelection).classList.remove('tieSelection');
    console.log('turning Event Listener On');
    toggleEventListener('on');
    return;
}

function toggleEventListener(status) {
    console.log('begin toggleEventListener ', status);
    if (status === 'off') {
        buttons.forEach((button) => {
            button.removeEventListener('click', handleClick);
        });
    } else {
        buttons.forEach((button) => {
            button.addEventListener('click', handleClick);
        });
    }
}

function toggleBorder(selection, who, status) {
    if (status === 'on') {
        switch(selection){
            case 'rock':
                elRock.classList.add(who + 'Selection');
            case 'paper':
                elPaper.classList.add(who + 'Selection');
            case 'scissors':
                elScissors.classList.add(who + 'Selection');
        }
    } else {
        switch(selection){
            case 'rock':
                elRock.classList.remove(who + 'Selection');
            case 'paper':
                elPaper.classList.remove(who + 'Selection');
            case 'scissors':
                elScissors.classList.remove(who + 'Selection');
        }
    }
}


function handleClick(e){
    let playerSelection = e.target.parentElement.className;
    toggleEventListener('off');
    // document.querySelector('button.' + playerSelection).classList.add('playerSelection');
    toggleBorder(playerSelection,'player', 'on');
    computerSelection = computerPlay();
    // document.querySelector('button.' + computerSelection).classList.add('computerSelection');
    toggleBorder(computerSelection, 'computer', 'on')
    let winner = getWinner(playerSelection, computerSelection);
    displayFeedback(winner, playerSelection, computerSelection);
    // console.log('toggleEventListener back ON here');
    if ((numOfPlayerWins === 5) || (numOfComputerWins === 5)) {
        gameWinner.textContent = winner + winMsg;
        return;
    //Trying to figure out how to add a reload button after a winner is determined to start a new game.
    } 
    // toggleEventListener('on');
}

const buttons = document.querySelectorAll('button');
toggleEventListener('on');
    
// Plays rock, paper, scissors against the computer.
// Modify the existing code to incorporate the below options.
// -Play a match of 5 rounds.
// -Keep and display score.


    // console.log('Ready...');
    // const numGames = 1;
    // let numOfTieGames = 0;
    // let numOfPlayerWins = 0;
    // let numOfComputerWins = 0;


//     function getPlayerThrow(myGameNumber) {
//         let playerSelection = window.prompt("GAME " + myGameNumber + "    Please choose rock, paper, or scissors:");
//         playerSelection = playerSelection.toLowerCase();
//         if (playerSelection != "rock" && playerSelection != "scissors" && playerSelection != "paper") {
//             alert('That is not one of the choices.');
//             getPlayerThrow();
//         } else { 
//             return playerSelection;
//         }
//     }


    

    // function game(matchGames) {

    //     for (let i = 1; i <= matchGames; i++) {
    //         //Passing "i" because we used the game number in the prompt
    //         let myPlayerThrow = getPlayerThrow();
    //         console.log(myPlayerThrow);
    //         console.log("You chose " + myPlayerThrow);
    //         let myComputerThrow = computerPlay();
    //         console.log("The computer chose " + myComputerThrow.toUpperCase());
    //         let myWinner = getWinner(myPlayerThrow, myComputerThrow);
    //     }
    //     console.log('Tie Games: ' + numOfTieGames);
    //     console.log('Computer Games Won: ' + numOfComputerWins);
    //     console.log('Player Games Won: ' + numOfPlayerWins);
    // }

    // game(numGames);