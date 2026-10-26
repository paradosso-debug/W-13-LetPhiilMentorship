// Session 03 — the line-ordering puzzle.

console.log("parsons.js running");

// Goal Output: 80

// A   function applyDiscount(price, amount) {
// B   return price - amount;
// C   }
// D   console.log(applyDiscount(100, 20));
// X   console.log(price - amount);
// Y   console.log(applyDiscount(20, 100));

function applyDiscount(price, amount) {
  // A
  return price - amount; // B
} // C
console.log(applyDiscount(100, 20)); // D

// A function that returns `"Free"` for members or orders over $50, and `"$5"` otherwise. Goal: `getShipping(false, 30)` gives `"$5"`, `getShipping(true, 30)` and `getShipping(false, 80)` give `"Free"`.

// No extra lines this time - The trap is the order.

// A   if (isMember) return "Free";
// B   }
// C   return "$5";
// D   function getShipping(isMember, total) {
// E   if (total > 50) return "Free";

// function getShipping(isMember, total) {
//   if (isMember) return "Free";
//   if (total > 50) return "Free";
//   return "$5";
// }

// console.log(getShipping(true, 30));

// function getShipping(isMember, total) {
//   if (isMember) {
//     return "Free";
//   } else if (total > 50) {
//     return "Free";
//   } else {
//     return "$5";
//   }
// }

// console.log(getShipping(true, 30));

const getShipping = (isMember, total) => {
  if (isMember || total > 50) {
    return "Free";
  } else {
    return "$5";
  }
};

console.log(getShipping(true, 30));

const triple = (n) => n * 3;

console.log(triple(4)); // 12

const returnTotal = (price) => {
  const discount = price * 0.1;
  const totalPrice = price - discount;

  return totalPrice;
};

console.log(returnTotal(200));

const greet = (name) => `Hello, ${name}`;
console.log(greet("Ana")); // Hello, Ana

// const isAdult = (age) => {
//   return age >= 18;
// };

// console.log(isAdult(15));

const isAdult = (age) => age >= 18;
console.log(isAdult(15));

// > A **tip calculator**. The user has a bill amount, a tip percentage, and a number of people splitting the bill. The app shows the tip, the total, and what each person pays.

// List the functions you would need. For each one, write:

// Its name
// What it needs (parameters)
//what if gives back

// calculateTip => Bill amount and tip percentage => Tip amount
// calculateTotal => Bill amount and tip amount => the Total bill including the tips
// calculatePerperson => the total amount and the people => the amount each person pays

/*
    One function would be called addTipAmount.
    This function would need the bill amount and the tip percentage.
    This function would give back the amount of the bill with the tip added to that total.

    One function would be called splitBill.
    This function would need an amount representing the total bill with tip and an amount of people to split the total between.
    This function would give back the amount each person owes.
*/

// billTotal
// bill total, tip percentage, people
// bill total times the tip percentage
// bill total plus the tip
// bill total divide it by the amount of people.
// we would return the tip, total, what each person pays.

// formatToal
// amount
// give back the amount .toFixed(2)
