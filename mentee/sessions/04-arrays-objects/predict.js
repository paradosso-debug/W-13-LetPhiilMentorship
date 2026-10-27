// Session 04 — your before-class prediction snippet.

console.log("predict.js running");

// What is x at the end?
// function f(n) {
//   n = n + 1; // 5 + 1 = 6
//   return n; // 6
// }

// let x = 5;

// console.log(f(x));

// What prints?
// function add(a, b) {
//   //   return a + b;
//   console.log(a + b); // 5
// }

// console.log(add(2, 3)); // undefined

// What does  greet("Ana") return?

// const greet = (name) => {
//  `Hi ${name}`;
// };

// console.log(greet("Ana"));

// Ternary Operator
// "" ? "a" : "b"

// if ("") {
//   console.log("a");
// } else {
//   console.log("b");
// }

//

// Prediction

// function complete(task, count) {
//   task.isDone = true;
//   count = count + 1;
// }

// const task = {
//   title: "Buy milk",
//   isDone: false,
// };

// let doneCount = 0;

// complete(task, doneCount);

// console.log(task.isDone); // true // false // true // true // true
// console.log(doneCount); // 1 // 0 // 0 // 1 // 0

// const person = {
//   height: "5ft",
//   name: "Bob",
//   favColor: "Blue",
//   isStudent: false,
//   age: 33,
// };

// console.log(person.age);

// Global
// local aka function
// block scope

// if (" ") {
//   let age = 5;
//   const gender = "Female";
//   console.log(age);
//   console.log(gender);
// }

// console.log(age);

const user = {
  name: "John",
  tasks: [
    { title: "Buy Milk", isDone: false },
    { title: "Call Bank", isDone: true },
  ],
};

console.log(user.name);
console.log(user.tasks.length); // 2
console.log(user.tasks[1].title); // Call Bank
console.log(user.tasks[0].isDone);
console.log(user.tasks[2]); // undefined
console.log(user.tasks[2].title); // undefined

// const color1 = "Red"
// const color2 = "Yellow"
// const color3 = "Orange"
// const color4 = "Blue"
// const color5 = "Gold"

// const colors = ["Red", "Yellow", "Orange", "Blue"];

// Index of the array.

// console.log(colors[3]);
