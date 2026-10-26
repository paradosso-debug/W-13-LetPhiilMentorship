// Session 03 — what you build in class, and the exercise.

console.log("make.js running");

// > 1. At least **three functions**, each with **one job**
// > 2. **No `console.log` inside any function** — only at the end, outside them all
// > 3. Test it with **three different bills**. Write each result as a comment
// > 4. At least one function written as an **arrow function**

function calculateTip(bill, percentage) {
  return (bill * percentage) / 100;
}

function calculateTotal(bill, tip) {
  return bill + tip;
}

const splitBill = (total, people) => total / people;

function format(amount) {
  return `$${amount}`;
}

const bill = 100;
const tip = calculateTip(bill, 10);
const total = calculateTotal(bill, tip);
const perPerson = splitBill(total, 2);

console.log(
  `Tip: ${format(tip)}, total ${format(total)}, each ${format(perPerson)} `,
);
