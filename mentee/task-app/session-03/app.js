// Session 3 — Functions
// Status logic becomes a function. Functions return; the edge displays.

function getStatus(isDone, priority) {
  if (isDone) {
    return "Done";
  }
  if (priority === 1) {
    return "Urgent";
  }
  return "To do";
}

function formatTask(taskName, status) {
  return `${taskName}: ${status}`;
}

const status = getStatus(false, 1);
console.log(formatTask("Buy milk", status));
