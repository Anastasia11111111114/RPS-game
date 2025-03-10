let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
    intervalID = setInterval(()=> {
        const player_move = pickComputerMove();
        playGame(player_move);
    }, 1000);
    isAutoPlaying = true;
} else {
    clearInterval(intervalID);
    isAutoPlaying = false;
}
}

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    })

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    })

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    })

 document.body.addEventListener('keydown', (event) => {
    if (event.key == 's' ) {
        playGame('scissors');
    } else if(event.key == 'p') {
        playGame('paper');
    } else if (event.key == 'r') {
        playGame('rock');
    }
    console.log(event.key);
 })

const score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
        
        

function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Loses: ${score.losses} Ties: ${score.ties}`;
}
updateScoreElement();

function pickComputerMove() {
    const computer_random_number = Math.random();
    let computer_choice = "";
    
    if (computer_random_number>=0 && computer_random_number < 1 / 3) {
        computer_choice = "paper";
    } else if (computer_random_number>= 1/3 && computer_random_number < 2 / 3) {
        computer_choice = "scissors";
    } else if (computer_random_number >= 2/3) {
        computer_choice = "rock";
    }
    return computer_choice;
}

function playGame(player_choice) {

computer_choice = pickComputerMove();

    let result = '';
    if (computer_choice == 'paper') {
        if(player_choice == 'paper') {
            result= 'Equal';
        } else if (player_choice == 'scissors') {
            result ='You win!';
        } else if (player_choice == 'rock'){
            result='Lose';
        }
    } else if (computer_choice == 'scissors') {
        if(player_choice == 'paper') {
            result='Lose';
        } else if (player_choice == 'scissors') {
            result='Equal';
        } else if (player_choice == 'rock'){
            result='You win!';
        }
    }else if (computer_choice == 'rock') {
        if(player_choice == 'paper') {
            result = 'Lose';
        } else if (player_choice == 'scissors') {
            result='You win!';
        } else if (player_choice == 'rock'){
            result='Equal';
        }
    }

    if (result == 'You win!') {
        score.wins++;
    } else if (result== 'Lose') {
        score.losses++;
    } else if (result == 'Equal') {
        score.ties++;
    }
    
    localStorage.setItem('score', JSON.stringify(score));


    function updateResult() {
    document.querySelector('.js-result')
    .innerHTML = `${result}`;
}

    function updateMoves() {
        document.querySelector('.js-moves')
        .innerHTML = `
        Computer <img class="images" src="spr-icons/${computer_choice}-emoji.png">
        <img class="images" src="spr-icons/${player_choice}-emoji.png"> You`;
        
    }

    updateMoves();
    updateResult();
    updateScoreElement();
} 

