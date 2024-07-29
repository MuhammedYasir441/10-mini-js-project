// Wait until the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements for adding tasks and displaying the task list
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add an event listener to the "Add" button to call the addTask function when clicked
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add an event listener to the task input field to call the addTask function when the Enter key is pressed
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task to the list
    function addTask() {
        // Get the trimmed value of the task input field
        const taskText = taskInput.value.trim();

        // If the input is empty, show an alert message and return
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a click event listener to the list item to toggle the "completed" class
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'; // Add a trash icon to the button
        deleteButton.className = 'task-delete-button'; // Set the button's class for styling
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the list item
            li.remove(); // Remove the task from the list
        });

        // Add the delete button to the list item
        li.appendChild(deleteButton);

        // Add the new list item to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';
    }
});
