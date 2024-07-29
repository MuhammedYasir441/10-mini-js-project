// script.js

// Function to clear the display
// This function sets the value of the display input field to an empty string
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to append a character to the display
// This function adds the given value to the end of the current content of the display input field
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to perform the calculation
// This function evaluates the mathematical expression in the display and shows the result
// If there is an error in the expression, it displays 'Error'
function calculateResult() {
    try {
        const display = document.getElementById('display');
        // Evaluate the expression in the display field and update the field with the result
        display.value = eval(display.value);
    } catch {
        // If there is an error during evaluation, set the display field to 'Error'
        document.getElementById('display').value = 'Error';
    }
}