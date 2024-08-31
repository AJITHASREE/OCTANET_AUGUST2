document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const taskPriority = document.getElementById('task-priority');
    const taskCategory = document.getElementById('task-category');
    const todoList = document.getElementById('todo-list');
    const progressBar = document.querySelector('.progress');

    let tasks = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const priority = taskPriority.value;
        const category = taskCategory.value;

        if (taskText !== '') {
            const task = {
                text: taskText,
                priority: priority,
                category: category,
                completed: false
            };

            tasks.push(task);
            renderTasks();
            updateProgressBar();

            taskInput.value = '';
        }
    });

    function renderTasks() {
        todoList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');

            listItem.textContent = `${task.text} (${task.category})`;

            const priorityLabel = document.createElement('span');
            priorityLabel.className = `priority-label ${task.priority}`;
            priorityLabel.textContent = task.priority.charAt(0).toUpperCase();

            listItem.appendChild(priorityLabel);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            listItem.appendChild(removeButton);

            todoList.appendChild(listItem);

            listItem.addEventListener('click', () => {
                task.completed = !task.completed;
                listItem.classList.toggle('completed');
                updateProgressBar();
            });

            removeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                tasks.splice(index, 1);
                renderTasks();
                updateProgressBar();
            });
        });
    }

    function updateProgressBar() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

        progressBar.style.width = `${progressPercentage}%`;
    }
});
