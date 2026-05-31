const APP_TITLE = "My App";
const TODOS = [];
const app = document.getElementById("app");
const taskList = app.querySelector("#task-list");
const form = app.querySelector("#task-form");
const input = form.querySelector("#task-input");

app.querySelector(".title").textContent = APP_TITLE;
document.title = APP_TITLE;

function renderTasks() {
  taskList.innerHTML = "";

  const orderedTasks = [...TODOS].sort((a, b) => {
    const aCompleted = Boolean(a.completed);
    const bCompleted = Boolean(b.completed);
    return aCompleted - bCompleted;
  });

  orderedTasks.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
                <input type="checkbox" class="task-checkbox" data-id="${todo.id}" ${todo.completed ? "checked " : ""} />
                <span class="task-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
                <button class="delete-btn" data-id="${todo.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
        `;
    taskList.appendChild(li);
  });
}

function addTask(text) {
  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text: text,
    completed: false,
  };
  TODOS.push(newTask);
  renderTasks();
}

function deleteTask(id) {
  const index = TODOS.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    TODOS.splice(index, 1);
    renderTasks();
  }
}

function toggleTask(id) {
  const task = TODOS.find((todo) => todo.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

taskList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete-btn") ||
    e.target.closest(".delete-btn")
  ) {
    const id = parseInt(
      e.target.dataset.id || e.target.closest(".delete-btn").dataset.id,
    );
    deleteTask(id);
  }
  if (e.target.classList.contains("task-checkbox")) {
    const id = parseInt(e.target.dataset.id);
    toggleTask(id);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    addTask(taskText);
    input.value = "";
  }
});

renderTasks();
