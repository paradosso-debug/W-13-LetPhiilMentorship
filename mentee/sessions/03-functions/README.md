# Session 3 — Functions

**Read before class. ~12 minutes.**
**Two things to do at the bottom.**

> Syntax variations, default parameters and hoisting rules are in `REFERENCE.md`. This file is about *why* functions exist and *the one mistake everyone makes*.

---

## Why this session exists

Look at the Task Tracker code from last session. The status logic works — for **one** task. Now imagine forty tasks. You'd copy that `if/else if/else` block forty times. Then someone decides "done" tasks should say "Complete" instead, and you're editing forty places, and you miss two.

A function fixes that. **It's a named piece of logic you write once and run as many times as you need.** Fix it in one place, it's fixed everywhere.

But the bigger reason is this: functions are how you break a problem into pieces small enough to think about. When you look at a project and think *"I don't know where to start"*, the answer is almost always *"name the smaller jobs, and make each one a function."* That's the skill this session starts building.

Real-world, you'll meet functions everywhere from here:

- Every button click in weeks 4–6 runs a function
- Every array method in week 3 takes a function
- **Every React component is a function.** Not "like" a function — literally one

---

## 1. Defining vs calling — two separate things

```js
function greet() {
  console.log("Hello");
}
```

This **defines** the function. It does not run it. Nothing is printed. You've written a recipe; you haven't cooked anything.

To run it, you **call** it — name plus `()`:

```js
greet();   // "Hello"
greet();   // "Hello"
```

The `()` is the "go" button. Forget it and nothing happens — no error, just silence. This is the most common reason a beginner's function "doesn't work."

---

## 2. Parameters — the inputs

A function that does the exact same thing every time isn't that useful. Parameters let you hand it different data each call.

```js
function greet(name) {
  console.log(`Hello, ${name}`);
}

greet("Ana");     // "Hello, Ana"
greet("Luis");    // "Hello, Luis"
```

`name` is a **parameter** — a variable that only exists inside the function, and gets filled in each time you call it. `"Ana"` is the **argument** — the actual value you pass in.

Multiple parameters are matched **by position**, not by name:

```js
function describe(taskName, priority) {
  console.log(`${taskName} is priority ${priority}`);
}

describe("Buy milk", 1);   // "Buy milk is priority 1"
describe(1, "Buy milk");   // "1 is priority Buy milk"  ← wrong order, no error
```

JavaScript doesn't check. Get the order wrong and you get nonsense, silently.

---

## 3. `return` vs `console.log` — the mistake everyone makes

**Read this section twice.** It's the single biggest source of confusion in this session, and it will follow you into React if it doesn't click now.

```js
function double(n) {
  console.log(n * 2);
}
```

```js
function double(n) {
  return n * 2;
}
```

Call either one and you'll see `10` for `double(5)`... in the first case. The second prints nothing. So the first one looks like it works better. **It doesn't.**

- `console.log` **shows** a value to *you*, the human, in the console. Then the value is gone. The rest of your program never gets it.
- `return` **hands the value back** to whatever line called the function. The program can store it, compare it, pass it on.

```js
function double(n) {
  return n * 2;
}

const result = double(5);           // result is 10
const bigger = double(5) + 1;       // 11
if (double(5) > 8) { ... }          // works
```

None of that is possible with `console.log`. A function that only logs is a dead end — **it's for people, not for code.**

Real-world analogy: `console.log` is a cashier announcing your total out loud. `return` is the cashier handing you the receipt. Only one of them lets you do anything with it afterwards.

### A function with no `return` returns `undefined`

```js
function double(n) {
  console.log(n * 2);
}

const result = double(5);
console.log(result);   // undefined
```

That's Session 1's `undefined` — *"your own code never set this."* When you see `undefined` where you expected a value, **"did I forget `return`?"** should be your first question.

---

## 4. `return` also stops the function

The moment `return` runs, the function is finished. Nothing after it executes.

```js
function getStatus(isDone, priority) {
  if (isDone) {
    return "Done";
  }
  if (priority === 1) {
    return "Urgent";
  }
  return "To do";
}
```

No `else` needed — if `isDone` is true, the function has already left. This is called an **early return**, and it's usually easier to read than a stack of `else if`. Handle the special cases first, get out, and let the normal case sit at the bottom.

---

## 5. Scope — the function body is a box

Same rule as Session 2's `{ }` blocks. Variables made inside a function stay inside it.

```js
function calculate() {
  const total = 100;
  return total;
}

calculate();
console.log(total);   // ReferenceError
```

This is a **feature**. It means two functions can each have a variable called `total` without interfering with each other. Without it, every variable name in a large program would have to be unique.

If you want the value outside, `return` it and store the result:

```js
const total = calculate();
```

---

## 6. Arrow functions — the second way to write one

You'll see this constantly:

```js
const double = (n) => {
  return n * 2;
};
```

Same job, different syntax. When the body is a single expression, you can drop the braces **and** the `return`:

```js
const double = (n) => n * 2;
```

**The return is still happening** — it's just implied. That short form is what you'll write inside array methods in week 3 and in React components.

**When to use which, in this course:**

- `function name() {}` — for your main named functions
- Arrow functions — when passing a function into something else (week 3 onward)

One difference that will bite you: a `function` declaration can be called *above* where it's written. An arrow function stored in a `const` cannot. Details in `REFERENCE.md`.

---

## 7. How to design a function — two questions

Before you write any function, answer these out loud:

1. **What does it need?** → those are your parameters
2. **What does it give back?** → that's your `return`

> *"`getStatus` needs whether the task is done and its priority. It gives back a label string."*

If you can't finish that sentence, you're not ready to write code yet — you're ready to think more. And if the sentence needs the word **"and"** in the second half (*"gives back a label and prints it and…"*), it's probably two functions.

This is the first step toward "I don't know where to start." You start by naming the jobs.

---

## Where this lands in the project

The status logic from Session 2 becomes a function, and gets a partner:

```js
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
console.log(formatTask("Buy milk", status));   // "Buy milk: Urgent"
```

Two functions, one job each. `getStatus` decides. `formatTask` formats. Neither logs anything — the only `console.log` is at the very end, where a human needs to see the result.

That's the pattern for the rest of the course: **functions return, the edge of the program displays.**

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| Nothing happens, no error | You defined the function but never called it — or forgot the `()` |
| `undefined` where you expected a value | No `return`, or you `console.log`ged instead of returning |
| Logs `ƒ getStatus(...)` or `[Function]` | You wrote `getStatus` instead of `getStatus()` |
| Output makes no sense, no error | Arguments passed in the wrong order |
| `ReferenceError: x is not defined` | Used a variable from inside a function, outside it |
| `ReferenceError: Cannot access 'x' before initialization` | Called an arrow function above the line that creates it |
| Code inside the function never runs | It's below a `return` that already fired |

---

## Before class — do both

### 1. Trace this on paper

Don't run it. Write the value of `a` and `b` after **each** line that changes them.

```js
function double(n) {
  return n * 2;
}

let a = 3;
let b = double(a);
a = double(b) + a;
```

Then answer: **after line 6, did calling `double(a)` change `a`?** Why or why not?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this. Decide what it prints:

```js
function getLabel(priority) {
  if (priority === 1) {
    return "Urgent";
  }
  if (priority === 2) {
    console.log("Normal");
  }
}

console.log(getLabel(1));
console.log(getLabel(2));
console.log(getLabel(3));
```

There are more lines of output than you might expect. Write **all** of them in the form, in order:

> I think it logs ___, then ___, then ___ … because ___

Every piece you need is in this file. None of it is walked through for this exact case.
