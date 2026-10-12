// Session 01 — the line-ordering puzzle.

console.log("parsons.js running");

// Goal output: `Buy milk - 3 left`

// use four  of these lines. Two are traps.

// A   console.log(`${name} — ${count} left`);
// B   let count = 5;
// C   const name = "Buy milk";
// D   count = count - 2;
// X   const count = 5;
// Y   console.log("${name} — ${count} left");

const name = "Buy milk";
let count = 5;
count = count - 2;
// count -= 2;
console.log(`${name} - ${count} left`);

// Goal output:

//true
//false

// A   const age = 18;
// B   console.log(typed === "18");
// C   const typed = "18";
// D   console.log(age === typed);
// X   console.log(age == typed);

// C   const typed = "18";
// B   console.log(typed === "18");
// A   const age = 18;
// D   console.log(age === typed);

// A   const age = 18;
// C   const typed = "18";
// B   console.log(typed === "18");
// D   console.log(age === typed);

// C   const typed = "18";
// A   const age = 18;
// X   console.log(age == typed);
// D   console.log(age === typed);

// const typed = "18";
// console.log(typed === "18");
// const age = 18;
// console.log(age === typed);

// const age = 18;
// const typed = "18";
// console.log(typed === "18");
// console.log(age === typed);

const typed = "18";
const age = 18;
console.log(age == typed); // checking the value not the type
console.log(age === typed); // checking for data type and value

// Fill in the blanks so it logs `Total: 55`

// const price = 20;
// const quantity = 3;
// let total = ____ * ____;
// total ____ 5;              // take $5 off
// console.log(`Total: ${____}`);

// const price = 20;
// const quantity = 3;
// let total = price * quantity; // 60
// total -= 5; // 55
// console.log(`Total: ${total}`); // 55

const price = 20;
const quantity = 3;
let total = price * quantity - 5;
// total = total - 5;
console.log(`Total: ${total}`);
