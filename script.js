// Map choices to their emoji
const choiceMap = {
    rock: '✊',
    paper: '🖐',
    scissors: '✌️'
};

// --- Get all HTML elements ---
const playerScoreEl = document.querySelector('#player-score p');
const computerScoreEl = document.querySelector('#computer-score p');
const playerChoiceBox = document.getElementById('player-choice-box');
const computerChoiceBox = document.getElementById('computer-choice-box');
const resultText = document.getElementById('result-text');
const choiceButtons = document.querySelectorAll('.choice-btn');

// --- Game variables ---
let playerScore = 0;
let computerScore = 0;

// --- Add event listeners to buttons ---
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.getAttribute('data-choice');
        playGame(userChoice);
    });
});

function playGame(userChoice) {
    // --- 1. Reset previous round's visuals ---
    clearGlows();
    resultText.textContent = "Thinking...";
    playerChoiceBox.textContent = choiceMap[userChoice];
    computerChoiceBox.textContent = "?";

    // --- 2. Get computer's choice ---
    const computerChoice = getComputerChoice();

    // --- 3. Determine winner ---
    const result = determineWinner(userChoice, computerChoice);

    // --- 4. Show results (with suspense) ---
    // Use setTimeout to create a "thinking" delay
    setTimeout(() => {
        // Show computer's choice
        computerChoiceBox.textContent = choiceMap[computerChoice];

        // Update score and text
        if (result === 'win') {
            resultText.textContent = "You win! 🎉";
            playerScore++;
            playerScoreEl.textContent = playerScore;
            playerChoiceBox.classList.add('winner'); // Add green glow
            computerChoiceBox.classList.add('loser'); // Add red glow
        } else if (result === 'lose') {
            resultText.textContent = "You lose! 😭";
            computerScore++;
            computerScoreEl.textContent = computerScore;
            playerChoiceBox.classList.add('loser'); // Add red glow
            computerChoiceBox.classList.add('winner'); // Add green glow
        } else {
            resultText.textContent = "It's a draw!";
            playerChoiceBox.classList.add('draw'); // Add gray glow
            computerChoiceBox.classList.add('draw'); // Add gray glow
        }
    }, 750); // 750ms delay
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function determineWinner(user, computer) {
    if (user === computer) {
        return 'draw';
    }
    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    // If not a draw and not a win, it's a loss
    return 'lose';
}

// Helper function to remove glow classes before a new round
function clearGlows() {
    playerChoiceBox.classList.remove('winner', 'loser', 'draw');
    computerChoiceBox.classList.remove('winner', 'loser', 'draw');
}