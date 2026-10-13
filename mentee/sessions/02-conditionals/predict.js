// Session 02 — your before-class prediction snippet.

console.log("predict.js running");

// const x = 5;

// x = 6;

// console.log(x); //

// const colors = ["Purple", "Blue"];

// colors.push("Yellow");
// colors[0] = "Red";

// console.log(colors);

// colors = ["Orange"];

// const example1 = "3" + 4;
// const example2 = "3" * 4;
// console.log(typeof example1); // "34"
// console.log(typeof example2); // 12

// let a = 2;
// let b = a;
// a = 7;

// console.log(b);

// console.log(typeof null);

// let count;
// console.log(typeof count);

// {
// name: "John",
// age: 33,
// isStudent: true
// }

const quantity = " "; // what the input field gives you
const stock = -1;

// if (quantity) {
//   console.log("A: has quantity");
// } else {
//   console.log("A: no quantity");
// }

// if (stock) {
//   console.log("B: in stock");
// } else {
//   console.log("B: sold out");
// }

// if (stock === 0) {
//   console.log("B: sold out");
// } else {
//   console.log("B: in sotck");
// }

// "0" - truthy
// 0 - Falsy
// "" - Falsy

let priority = 1;
let isDone = false;
let label = "";

if (isDone) {
  label = "Done";
} else if (priority === 1) {
  label = "Urgent";
} else if (priority <= 2) {
  label = "Normal";
} else {
  label = "Later";
}

console.log(label); // Normal
