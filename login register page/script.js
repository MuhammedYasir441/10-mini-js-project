// Function to handle the login process
function login() {
    // Get the value of the email input field
    let email = document.getElementById("email").value;

    // Get the value of the username input field
    let username = document.getElementById("username").value;

    // Get the value of the password input field
    let password = document.getElementById("password").value;

    // Check if the provided email, username, and password match the predefined credentials
    if (email === "example@gmail.com" && username === "example" && password === "example") {
        // Redirect the user to the main page if the credentials are correct
        window.location.href = 'main_page.html';
    }
}
