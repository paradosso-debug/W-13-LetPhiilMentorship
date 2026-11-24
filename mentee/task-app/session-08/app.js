// Session 8 — Event Listeners
// change data → render

let tasks = [
  { id: 1, title: "Buy milk", isDone: false, priority: 1 },
  { id: 2, title: "Call bank", isDone: true, priority: 2 }
];

const list = document.querySelector("#task-list");
const summary = document.querySelector("#summary");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const prioritySelect = document.querySelector("#priority-select");

// ---------- data changes ----------

function addTask(title, priority) {
  const newTask = { id: Date.now(), title, isDone: false, priority };
  tasks.push(newTask);
  render();
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.isDone = !task.isDone;
  }
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

// ---------- drawing ----------

function getStatus({ isDone, priority }) {
  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}

function createTaskElement(task) {
  const { id, title, isDone } = task;

  const item = document.createElement("li");
  item.textContent = `${title} — ${getStatus(task)} `;
  if (isDone) {
    item.classList.add("done");
  }

  const toggleButton = document.createElement("button");
  toggleButton.textContent = isDone ? "Undo" : "Done";
  toggleButton.addEventListener("click", () => toggleTask(id));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(id));

  item.append(toggleButton, deleteButton);
  return item;
}

function render() {
  list.textContent = "";

  if (tasks.length === 0) {
    summary.textContent = "Nothing here yet";
    return;
  }

  tasks.forEach((task) => {
    list.append(createTaskElement(task));
  });

  const openCount = tasks.filter((task) => !task.isDone).length;
  summary.textContent = `${openCount} tasks still open`;
}

// ---------- listening ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  const priority = Number(prioritySelect.value);
  addTask(title, priority);

  input.value = "";
});

render();
