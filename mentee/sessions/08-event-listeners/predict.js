// Session 08 — your before-class prediction snippet.

console.log("predict.js running");

const button = document.getElementById("btn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "Hello World";
});

// Warm up:
// 1. What does `document.querySelector("#nope")` return when there's no such element?
// 2. `const x = ["a","b"].forEach((letter) => letter);` — what's in `x`?
// 3. What's the difference between `greet` and `greet()`?
// 4. Your `createTaskElement` has no `return`. What appears on the page?

// Prediction:
// The goal is to allow a user to add a new task through a form, store it in an array of objects, and update the page dynamically.
// A user types **"Pay rent"**, picks **Urgent** (`value="1"`), presses Enter:

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const title = input.value.trim();
//   const priority = Number(prioritySelect.value);

//   tasks.push({ id: Date.now(), title, isDone: false, priority });
//   render();
// });
