/* Game functions:
- Player must guess a number between a min and max
- Player get a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandom(1, 10),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
// Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Game event listener for play again
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();   
    }
});

// Listen for Guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    // Validate
    if(isNaN(guess) || guess<min || guess>max){
        setMessage(`Plseas enter a number between ${min} and ${max}`,'red');
        // Stop running code
        return false;
    }
    
    // Check if won
    if(guess == winningNum){
        gameOver(true,`${guess} is correct! YOU WIN`, 'green');
    } else {
        // wrong number
        guessesLeft -= 1;

        if (guessesLeft===0){
             // Clear input
            guessInput.value = '';
            gameOver(false, `YOU LOST, the winning number was ${winningNum}`, 'red');    
        } else{
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';
            // Set message
            setMessage(`${guess} is wrong! PICK OTHER NUMBER, you have ${guessesLeft} attempts`, 'red');  
        }
    }
    
});

function gameOver(won, msg){
let color;
won === true ? color = 'green' : color = 'red';
 // Change border color
 guessInput.style.borderColor = color;
// Set message color
message.style.color = color;
// Set message
 setMessage(msg);
// Play again btn
guessBtn.value = 'Play Again';
guessBtn.className += 'play-again';   
}
// Get random number
function getRandom(min, max){
   return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
} 