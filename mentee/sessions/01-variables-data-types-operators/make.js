// Session 01 — what you build in class, and the exercise.

console.log("make.js running");

// 1. Stores its **name**, **price**, **how many are in stock**, and **whether it's on sale**
//  2. Chooses `const` or `let` for each one — **with a one-line comment saying why**
// 3. Sells 2 of them — update the stock
//  4. Logs a sentence using a template literal, like `Notebook: only 9 left`
// 5. Logs the `typeof` of all four variables

const name = "Notebook"; // this wont change
let price = 10; // will change later
let stock = 12; // will change later
const isOnSale = false;

stock = stock - 2; // 10

console.log(`NoteBook: Only ${stock} left`);
console.log(typeof name, typeof price, typeof stock, typeof isOnSale);

// Notebook: Only 9 left
// string boolean etc
// stock is even: false
