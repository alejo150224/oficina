const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const taskCountElement = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

addTaskButton.addEventListener('click', addTask);
filterButtons.forEach(button => button.addEventListener('click', filterTasks));

function loadTasks() {
  const tasksFromStorage = localStorage.getItem('tasks');
  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage);
  }
  renderTasks(tasks, 'all');
}

function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();

  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };
    tasks.push(task);
    renderTasks(tasks, 'all');
    newTaskInput.value = '';
    saveTasksToStorage();
  }
}

function renderTasks(tasksToRender, filter) {
  taskList.innerHTML = '';
  const incompleteTasks = tasksToRender.filter(task => !task.completed);
  taskCountElement.textContent = incompleteTasks.length;

  tasksToRender.forEach(task => {
    const taskItem = createTaskItem(task);
    if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)) {
      taskList.appendChild(taskItem);
    }
  });
}

function createTaskItem(task) {
  const li = document.createElement('li');

  if (task.completed) {
    li.classList.add('completed');
  }

  const taskText = document.createElement('span');
  taskText.textContent = task.text;

  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add('complete-btn'); // Agregar clase para el botón de completar
  completeButton.addEventListener('click', () => markTaskAsCompleted(task));

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('delete-btn'); // Agregar clase para el botón de eliminar
  deleteButton.addEventListener('click', () => deleteTask(task));

  li.appendChild(taskText);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  return li;
}

function markTaskAsCompleted(task) {
  task.completed = !task.completed;
  renderTasks(tasks, document.querySelector('.filter-btn.active').dataset.filter);
  saveTasksToStorage();
}

function deleteTask(task) {
  tasks = tasks.filter(t => t !== task);
  renderTasks(tasks, document.querySelector('.filter-btn.active').dataset.filter);
  saveTasksToStorage();
}

function filterTasks(event) {
  const filter = event.target.dataset.filter;
  filterButtons.forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');

  renderTasks(tasks, filter);
}

loadTasks();

if (!loggedIn) {
    window.location.href = 'login.html';
  }

  // Detectar actividad del usuario
  document.addEventListener('mousemove', resetInactivityTimer);
  document.addEventListener('keydown', resetInactivityTimer);