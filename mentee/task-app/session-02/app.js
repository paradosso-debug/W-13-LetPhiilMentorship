// Session 2 — Conditionals
// The task gets a status label. "Done" is checked first on purpose.

const taskName = "Buy milk";
const isDone = true;
let priority = 1;

let status = "";

if (isDone) {
  status = "Done";
} else if (priority === 1) {
  status = "Urgent";
} else {
  status = "To do";
}

console.log(`${taskName}: ${status}`);

// const taskName = "Buy milk";
// const isDone = false;
// let priority = 2;

// console.log(`${taskName} — done: ${isDone}, priority ${priority}`);
