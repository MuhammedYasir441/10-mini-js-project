// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false; // Track whether the user is currently drawing

// Set the initial brush thickness and color
ctx.lineWidth = 5; // Default line width
ctx.strokeStyle = '#000000'; // Default stroke color

// Add event listeners for mouse actions on the canvas
canvas.addEventListener('mousedown', startDrawing); // Start drawing when the mouse is pressed
canvas.addEventListener('mouseup', stopDrawing); // Stop drawing when the mouse is released
canvas.addEventListener('mousemove', draw); // Continue drawing as the mouse moves
canvas.addEventListener('mouseleave', stopDrawing); // Stop drawing when the mouse leaves the canvas

// Function to begin drawing
function startDrawing(event) {
    isDrawing = true; // Set the drawing flag to true
    ctx.beginPath(); // Start a new path for the drawing
    // Move the drawing cursor to the current mouse position
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false; // Set the drawing flag to false
    ctx.beginPath(); // Begin a new path to avoid connecting lines between segments
}

// Function to handle drawing on the canvas
function draw(event) {
    if (!isDrawing) return; // Do nothing if not in drawing mode
    // Draw a line to the current mouse position
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke(); // Render the line on the canvas
    ctx.beginPath(); // Start a new path to avoid connecting lines between segments
    // Move the drawing cursor to the current mouse position
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Add event listener to change the stroke color based on the color picker
const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('change', (event) => {
    ctx.strokeStyle = event.target.value; // Update stroke color with the selected color
});

// Add event listener to adjust the brush thickness based on the range input
const brushSizePicker = document.getElementById('brush-size-picker');
const brushSizeValue = document.getElementById('brush-size-value');

// Update the brush thickness and display the current value
brushSizePicker.addEventListener('input', (event) => {
    ctx.lineWidth = event.target.value; // Update line width with the selected value
    brushSizeValue.textContent = event.target.value; // Update the displayed brush thickness value
});

// Set the initial displayed brush thickness value
brushSizeValue.textContent = brushSizePicker.value;