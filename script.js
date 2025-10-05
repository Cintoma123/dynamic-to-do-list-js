// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select the necessary elements from the DOM
  loadTasks();
  const addButton = document.getElementById('add-task-btn');
  const taskInput =  document.getElementById('task-input');
  const taskList =  document.getElementById('task-list');

  // Function to add a new task
  function addTask(){
    const taskText = taskInput.value.trim();

    // Only add the task if the input is not empty
    if (taskText === '') {
      alert("Please enter a task.");
      return; // Stop the function if the input is empty
    }

      // Create a new list item
      const li = document.createElement('li');
      li.textContent = taskText;
      taskList.appendChild(li);

      // Create a remove button for the task
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn'; // Assign a class for styling
      li.appendChild(removeButton);

      // Add event listener to the remove button
      removeButton.addEventListener('click', function () {
        taskList.removeChild(li);
      });

      // Clear the input field after adding the task
      taskInput.value = '';
  }

  // Attach event listener for the "Add Task" button
  addButton.addEventListener('click', addTask);

  // Attach event listener for the "Enter" key in the input field
  taskInput.addEventListener('keypress', function (event) {
    // Check if the key pressed was "Enter"
    if (event.key === 'Enter') {
      addTask();
    }
  });
});

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addTask(taskText, save = true) {
    // Task creation logic remains the same

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}
