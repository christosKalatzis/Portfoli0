window.addEventListener("DOMContentLoaded", function() {
    // Store references to necessary DOM elements
    let addButton = document.getElementById("addButton"); // Reference to the ADD button
    let taskInput = document.getElementById("taskInput"); // Reference to the task input field
    let taskList = document.getElementById("taskList"); // Reference to the task list container
    let charCount = document.querySelector(".chars"); // Reference to the remaining characters count

    // Event listener for the ADD button click
    addButton.addEventListener("click", function() {
        // Check if the trimmed task input exceeds 50 characters
        if (taskInput.value.trim().length > 50) {
            alert("The task text must not exceed 50 characters.");
            return;
        }

        // Check if the task input is empty
        if (taskInput.value.trim() === "") {
            alert("You must type something");
            return;
        }

        // Create a new task container div
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        // Create a label for the task checkbox
        let label = document.createElement("label");
        label.classList.add("checkbox-label");

        // Create a checkbox input element
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Toggle the 'deleted' class on the task text when checkbox changes
        checkbox.addEventListener("change", function() {
            span.classList.toggle("deleted");
        });

        // Create a span element for the task text content
        let span = document.createElement("span");
        span.textContent = taskInput.value.trim(); // Set the text content from the input
        span.classList.add("tasksOutput"); // Add a class for styling purposes

        // Create a button for deleting the task
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete");
        deleteButton.textContent = "X";

        // Event listener to remove the task when delete button is clicked
        deleteButton.addEventListener("click", function() {
            taskDiv.remove();
        });

        // Append elements to the task container div
        taskDiv.appendChild(label);
        label.appendChild(checkbox);
        label.appendChild(span);
        taskDiv.appendChild(deleteButton);

        // Append the task container div to the task list
        taskList.appendChild(taskDiv);

        // Clear the task input field after adding the task
        taskInput.value = "";
    });

    // Function to update the character count and handle input validation
    function updateCharCount() {
        let inputText = taskInput.value.trim();
        let remainingChars = 50 - inputText.length;

        // Update the remaining characters count display
        charCount.textContent = remainingChars;

        // Check if the input exceeds the maximum character limit
        if (remainingChars < 0) {
            alert("You have exceeded the max characters.");
            taskInput.value = inputText.substring(0, 50); // Truncate input to max length
            remainingChars = 0;
            charCount.textContent = remainingChars;
        }
    }

    // Event listener to trigger character count update on input change
    taskInput.addEventListener("input", updateCharCount);
});
