document.getElementById('start-button').addEventListener('click', () => {
    const minNumber = parseInt(document.getElementById('min-number').value, 10);
    const maxNumber = parseInt(document.getElementById('max-number').value, 10);

    // Check if the minimum number is greater than or equal to the maximum number
    if (minNumber >= maxNumber) {
        alert('The minimum number must be less than the maximum number.');
        return;
    }

    // Generate a random number between minNumber and maxNumber (inclusive)
    const secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    // Enable the guess button and update the message
    document.getElementById('guess-button').disabled = false;
    document.getElementById('message').textContent = `Make your guess (Number between ${minNumber} and ${maxNumber}).`;
    
    // Event listener for the guess button
    document.getElementById('guess-button').addEventListener('click', () => {
        const userGuess = parseInt(document.getElementById('guess').value, 10);

        // Check if the user's guess is correct
        if (userGuess === secretNumber) {
            document.getElementById('message').textContent = `Congratulations! ${secretNumber} was the correct number!`;
        } else if (userGuess < secretNumber) {
            document.getElementById('message').textContent = 'Your guess is too low, try again.';
        } else if (userGuess > secretNumber) {
            document.getElementById('message').textContent = 'Your guess is too high, try again.';
        }
    });
});
