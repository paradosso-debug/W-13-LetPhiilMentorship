# Session 2 — Conditionals

**Read before class. ~10 minutes.**
**Two things to do at the bottom.**

> Full syntax for `if`, ternaries, `switch` and the truthy/falsy list is in `REFERENCE.md`. This file is about *why* and *what goes wrong*.

---

## Why this session exists

So far, your code does the same thing every time it runs. Line 1, line 2, line 3, done. That's a calculator, not an app.

Every app you've ever used is making decisions constantly:

- Logged in? Show the dashboard. Not logged in? Show the login page.
- Form field empty? Disable the submit button.
- No tasks yet? Show "Nothing here yet" instead of an empty list.
- Task overdue? Colour it red.

A conditional is how code chooses. **It's the moment a program stops being a list of instructions and starts reacting to data.**

---

## 1. `if` / `else` — one question, two paths

```js
const isDone = false;

if (isDone) {
  console.log("Task complete");
} else {
  console.log("Still to do");
}
```

Read it as a question: *is `isDone` true?* Yes → run the first block. No → run the `else` block. **Exactly one of them runs. Never both, never neither.**

The part in `( )` is the **condition**. Whatever you put there, JavaScript reduces it to `true` or `false` before choosing. That's where every operator from Session 1 comes back:

```js
if (priority === 1) { ... }             // comparison
if (priority <= 2 && !isDone) { ... }   // logical
```

---

## 2. `else if` — more than two paths, and order matters

```js
if (priority === 1) {
  console.log("Urgent");
} else if (priority === 2) {
  console.log("Normal");
} else {
  console.log("Later");
}
```

JavaScript checks each condition **top to bottom** and **stops at the first one that's true**. Everything below it is skipped — even if it would also be true.

That makes order a design decision, not a formatting choice. Real-world example: a shop gives 10% off orders over $50 and 20% off orders over $100.

```js
if (total > 50) {
  discount = 10;
} else if (total > 100) {
  discount = 20;       // ← can never run
}
```

A $150 order gets 10%. The `> 100` branch is unreachable, because anything over 100 is also over 50 and gets caught first. No error — just a customer who got the wrong price.

**Rule of thumb: most specific condition first.**

---

## 3. Truthy and falsy — the condition doesn't have to be a boolean

You'll often see this:

```js
if (taskName) { ... }
```

`taskName` is a string, not `true` or `false`. JavaScript coerces it — the same coercion from Session 1, now deciding which branch runs.

Values that count as `false` are called **falsy**. There are very few:

```js
false
0
""          // empty string
null
undefined
```

**Everything else is truthy** — every non-empty string, every non-zero number.

### Why this is useful

Real-world: checking whether a user typed anything into a field.

```js
if (inputValue) {
  // they typed something
} else {
  // field is empty
}
```

Shorter than `inputValue !== ""`, and it also catches `null` and `undefined`.

### Why this is dangerous

`0` is falsy. So is `""`. Both of those are often **real, valid values**.

```js
const itemsLeft = 0;

if (itemsLeft) {
  console.log(`${itemsLeft} items left`);
}
// logs nothing — "0 items left" is valid information, and it vanished
```

The code didn't error. It just silently treated a legitimate zero as "nothing there."

**The rule:** use truthy/falsy when you mean *"is there anything here at all?"*. When `0` or `""` is a value you care about, compare explicitly — `itemsLeft === 0`.

---

## 4. The ternary — choosing between two *values*

When all you're doing is picking one value or another, a full `if/else` is a lot of lines:

```js
let label;
if (isDone) {
  label = "Done";
} else {
  label = "To do";
}
```

The ternary does it in one:

```js
const label = isDone ? "Done" : "To do";
```

Read it as: *condition `?` value if true `:` value if false.*

**Why it's worth learning now:** in React, you can't write `if` inside your page markup — but you can write a ternary. You'll use this pattern constantly from the first week of React.

**When not to use it:** when you're *doing* things rather than *picking a value*, or when you'd need to nest one ternary inside another. At that point it's unreadable — go back to `if/else`.

You'll also see `switch` statements in other people's code. They're in `REFERENCE.md`. We won't be using them.

---

## 5. Curly braces make a box — scope

Variables declared **inside** a `{ }` block only exist inside it.

```js
if (isDone) {
  const message = "Nice work";
}

console.log(message);   // ReferenceError: message is not defined
```

This catches everyone the first time. The fix: declare the variable **before** the block, then assign it inside.

```js
let message = "";

if (isDone) {
  message = "Nice work";
}

console.log(message);   // works
```

That's also why `let` exists — this is the "value changes" case it's for.

---

## Where this lands in the project

The Task Tracker's single task now gets a status label based on its data:

```js
const taskName = "Buy milk";
const isDone = false;
let priority = 1;

let status = "";

if (isDone) {
  status = "Done";
} else if (priority === 1) {
  status = "Urgent";
} else {
  status = "To do";
}

console.log(`${taskName}: ${status}`);
```

Notice `isDone` is checked **first**. A finished urgent task shouldn't show as urgent — so "done" beats everything. That ordering is the design decision.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| Branch always runs, no matter what | You wrote `=` instead of `===`. `if (priority = 1)` doesn't compare — it *assigns* 1, which is truthy |
| `ReferenceError` on a variable you definitely declared | You declared it inside a `{ }` block and used it outside |
| A branch never runs | An earlier condition catches the same cases. Check your order |
| A value of `0` or `""` gets ignored | Truthy/falsy check where you needed an explicit comparison |

The first row is the nastiest. No error, and the condition *looks* right when you read it quickly.

---

## Before class — do both

### 1. Trace this on paper

Don't run it. Work out the final value of `label` — then answer the second question.

```js
let priority = 1;
let isDone = false;
let label = "";

if (isDone) {
  label = "Done";
} else if (priority <= 2) {
  label = "Normal";
} else if (priority === 1) {
  label = "Urgent";
} else {
  label = "Later";
}
```

1. What is `label` at the end?
2. **Which branch can never run, no matter what values you use?** Why?

Bring both answers to class.

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

A user types `0` into a quantity box on a shopping page. Don't run this — decide what it prints:

```js
const quantity = "0";   // what the input field gives you
const stock = 0;

if (quantity) {
  console.log("A: has quantity");
} else {
  console.log("A: no quantity");
}

if (stock) {
  console.log("B: in stock");
} else {
  console.log("B: sold out");
}
```

In the form, write:

> I think it logs ___ and ___, because ___

Session 1 has a clue that matters here.
