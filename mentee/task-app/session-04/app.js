// Session 4 — Arrays and Objects
// Loose variables become an array of task objects.

const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 2 },
  { title: "Pay rent", isDone: false, priority: 3 }
];

function getStatus(task) {
  if (task.isDone) {
    return "Done";
  }
  if (task.priority === 1) {
    return "Urgent";
  }
  return "To do";
}

function formatTask(task) {
  return `${task.title}: ${getStatus(task)}`;
}

// Written by hand — Session 5 fixes this.
console.log(formatTask(tasks[0]));
console.log(formatTask(tasks[1]));
console.log(formatTask(tasks[2]));
