// Session 02 — what you build in class, and the exercise.

console.log("make.js running");

const inputValue = "";

if (inputValue) {
  console.log("Thank you!");
} else {
  console.log("Please Type Something!");
} // Please Type Something

const itemsLeft = 0;

if (itemsLeft === 0) {
  console.log("Sold Out");
}

// A cinema charges: children under 12 pay **$5**. People 65 or older pay **$6**. On Tuesdays, everyone pays **$4**. Everyone else pays **$10**.

//  Write the checks **in the order you'd make them**, in plain English. Mark which one is the "otherwise."

//1. Is it Tuesday?
// 2. If age is below 12, price is $5
// 3. If age is greater than or equal to 65, retrun $6
// 4. otherwise return $10

// const day = "Wed";
// let price = 12;
// const age = 12;

// // ===
// // =

// if (day === "Tuesday") {
//   price = 4;
// } else if (age <= 12) {
//   price = 5;
// } else if (age >= 65) {
//   price = 6;
// } else {
//   price = 10;
// }

// console.log(`price: $${price}`);
// //

//  Build a **shipping calculator** in `make.js`. Start with three variables: an order total, a country (`"local"` or `"international"`), and whether the customer is a member.

// > Rules:
// >
// > - Members always ship free
// > - Local orders over $50 ship free
// > - Other local orders cost $5
// > - International orders cost $15
// >
// > Your code must:
// >
// > 1. Use `if` / `else if` / `else`, with a **comment explaining why your checks are in that order**
// > 2. Use `&&` at least once
// > 3. Use a ternary to build a label: `"Free shipping"` or `"Shipping: $5"`
// > 4. Log the label
// >
// > Then test it: change the three starting variables to try **at least four different cases**. Write each case and its output as a comment.

let orderTotal = 333;
let country = "international";
let isMember = false;

let shippingCost;

if (isMember) {
  shippingCost = 0;
} else if (country === "local" && orderTotal > 50) {
  shippingCost = 0;
} else if (country === "local") {
  shippingCost = 5;
} else {
  shippingCost = 15;
}

let label = shippingCost === 0 ? "Free shipping" : `Shipping: $${shippingCost}`;

console.log(label);
