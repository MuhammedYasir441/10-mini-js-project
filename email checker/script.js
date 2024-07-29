function validateEmail() {
    // Get the email input value
    const email = document.getElementById('email').value;

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Get the result div
    const resultDiv = document.getElementById('result');

    // Validate the email
    if (emailRegex.test(email)) {
        resultDiv.textContent = 'The email address is valid.';
        resultDiv.className = 'valid';
    } else {
        resultDiv.textContent = 'The email address is invalid.';
        resultDiv.className = 'invalid';
    }
}
