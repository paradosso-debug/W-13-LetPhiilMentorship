// Session 03 — your before-class prediction snippet.

console.log("predict.js running");

let count = "10" - 2;
console.log(count); // 8, 8 and data type is a number.

// Which of these are falsy: 0, "0", "", " ", null
// 0, "", null
// "", null

// What is x at the end

let x = 10;
if (x > 11) {
  x = x * 2;
} else if (x > 5) {
  x = 0;
}
console.log(x);

const label = 0 ? "Yes" : "no";

console.log(label); //

// condition1; output1 : condition2 ? output2 : fallback

console.log(getLabel()); // Later

function getLabel(priority) {
  if (priority === 1) {
    return "Urgent";
  }

  if (priority === 2) {
    return "Normal";
  }
  return "Later";
}

function double(n) {
  return n * 2;
}

let a = 3;
let b = double(a);
a = double(b) + a;

console.log(a);
console.log(b);

// 3 -
// 3 6
// 9 6

// 3 -
// 3 6
// 15 6

// 3 -
// 3 6
// 18 12

const triple = (i) => i * 3;
console.log(triple(2));
