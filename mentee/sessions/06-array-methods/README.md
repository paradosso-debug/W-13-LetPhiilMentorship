# Session 6 — Array Methods

**Read before class. ~12 minutes.**
**Two things to do at the bottom — plus a note about today's checkpoint.**

> `some`, `every`, `findIndex`, `sort` and the full `reduce` signature are in `REFERENCE.md`. This file is about *the one new idea* — passing a function into a function — and *choosing the right method*.

---

## Why this session exists

Last session you wrote five loop patterns by hand. Look at two of them side by side:

```js
const openTasks = [];
for (const task of tasks) {
  if (!task.isDone) {
    openTasks.push(task);
  }
}
```

```js
const labels = [];
for (const task of tasks) {
  labels.push(`#${task.priority} ${task.title}`);
}
```

Most of each one is **the same scaffolding**: make an empty array, loop, push. The only part that's actually *about your problem* is one line — `!task.isDone`, or the template literal.

Array methods keep that one line and throw away the scaffolding:

```js
const openTasks = tasks.filter((task) => !task.isDone);
const labels = tasks.map((task) => `#${task.priority} ${task.title}`);
```

Same result. But the bigger win isn't fewer lines — it's that **the name tells you the intent**. A reader sees `filter` and knows immediately: *this makes a shorter list*. A reader sees a `for` loop and has to read every line to find out.

Real-world:

- **In React, every list on the screen is rendered with `map`.** Every feed, every table, every dropdown.
- Every search box and filter button is a `filter`.
- "Go to this product's page" starts with a `find`.

---

## 1. The new idea — passing a function into a function

This is the only genuinely new concept today. Everything else is applying it.

In Session 3 you passed **values** into functions: `greet("Ana")`. But a function is also a value. You can store it in a variable, and you can **pass it into another function**.

```js
function isOpen(task) {
  return !task.isDone;
}

const openTasks = tasks.filter(isOpen);
```

Read that carefully: `filter(isOpen)` — **no `()` after `isOpen`**. You're not calling it. You're handing it over, and saying *"you call this, once per item."*

`filter` then does the loop you used to write:

- takes the first task, calls `isOpen(task)`, looks at what comes back
- takes the second task, calls `isOpen(task)`, looks at what comes back
- …and so on

A function you pass in to be called later is called a **callback**. **You write what to do with one item. The method handles the looping.**

Most of the time you won't bother naming the callback — you'll write it inline as an arrow function, which is why Session 3 introduced them:

```js
const openTasks = tasks.filter((task) => !task.isDone);
```

`(task) => !task.isDone` is a whole function: takes a task, returns true or false. Same as `isOpen`, just without a name.

### The mistake to avoid

```js
tasks.filter(isOpen());   // wrong
```

With `()`, you call `isOpen` **right now** — with no task. Inside it, `task` is `undefined`, so `task.isDone` crashes before `filter` even starts. Session 3's rule applies: `()` is the "go" button. Here, you don't want to press it. You want to hand over the button.

---

## 2. `map` — transform every item

```js
const titles = tasks.map((task) => task.title);
// ["Buy milk", "Call bank", "Pay rent"]
```

- Callback runs once per item
- **Whatever the callback returns** goes into the new array
- New array is **always the same length** as the original

Your Session 5 **transform** pattern, named.

`map` builds its new array from return values, so **the callback must return something**. If it doesn't, `map` still does its job — it fills the new array with whatever came back. You already know what a function with no `return` gives back.

---

## 3. `filter` — keep only some items

```js
const urgent = tasks.filter((task) => task.priority === 1);
```

- Callback returns `true` or `false` (truthy/falsy works too — Session 2)
- `true` → the item is kept. `false` → it's dropped
- New array is **the same length or shorter**
- The items themselves aren't changed — just selected

Your **filter** pattern, named. And your **count** pattern becomes:

```js
const openCount = tasks.filter((task) => !task.isDone).length;
```

---

## 4. `find` — get the first match

```js
const firstUrgent = tasks.find((task) => task.priority === 1);
// { title: "Buy milk", isDone: false, priority: 1 }
```

- Returns **one item**, not an array
- Stops as soon as it finds a match
- **Nothing matches → `undefined`**

Your **find** pattern, named — with one difference: your hand-written version returned `null` for "not found." `find` returns `undefined`. Which means the next line, `firstUrgent.title`, gives you Session 4's most common error. **Always handle the "not found" case** before reading from what `find` gives you:

```js
const task = tasks.find((task) => task.title === "Walk dog");

if (task) {
  console.log(task.priority);
} else {
  console.log("No such task");
}
```

---

## 5. `forEach` — just do something with each item

```js
tasks.forEach((task) => {
  console.log(formatTask(task));
});
```

Same as `for...of`. It **returns nothing** (`undefined`) — it's for *doing*, not *building*.

**Don't use `forEach` to build an array.** If you catch yourself writing an empty array, then `forEach`, then `push` — that's `map` or `filter` wearing a disguise. Use the real one.

---

## 6. `reduce` — combine everything into one value

The **sum** pattern, named:

```js
const total = cart.reduce((sum, item) => sum + item.price, 0);
```

- `0` at the end is the starting value — the `let total = 0` from your loop
- `sum` is the running total so far
- Whatever the callback returns becomes the new running total

`reduce` is the hardest of the six to read. **A `for...of` sum is completely fine for this course.** You need to *recognise* `reduce` in other people's code; you don't need to reach for it.

---

## 7. Choosing — ask what you want back

This is Session 3's second design question — *"what does it give back?"* — applied to arrays:

| I want back... | Method |
|---|---|
| A new array, **same length**, every item changed | `map` |
| A new array, **fewer items**, unchanged | `filter` |
| **One item** | `find` |
| **One value** (a total, a count) | `reduce` — or `filter().length` for counting |
| **Nothing** — I just want to do something | `forEach` |

If you can answer that question, you've picked your method.

---

## 8. Chaining — one step at a time

Because `filter` and `map` return arrays, you can call another method straight on the result:

```js
const openTitles = tasks
  .filter((task) => !task.isDone)
  .map((task) => task.title);
```

Read it top to bottom as steps — like Session 4's path reading:

- `tasks` → all tasks
- `.filter(...)` → only the open ones
- `.map(...)` → just their titles

Real-world, this is exactly how a UI shows *"the names of the unread messages"* or *"prices of items in stock."* Lost in a chain? Same fix as always: **`console.log` after each step** and look at what you're holding.

---

## 9. The original array is untouched

`map`, `filter`, `find` and `reduce` **never change the original array**. They give you something new.

```js
const openTasks = tasks.filter((task) => !task.isDone);
// tasks still has all 3
```

Compare `push` and `pop` from Session 4 — those change the original. This difference matters enormously in React, where changing data in place causes the screen not to update. **React developers reach for `map` and `filter` precisely because they don't mutate.** You're building that habit now.

---

## Where this lands in the project

Every hand-written loop from Session 5 collapses:

```js
function getStatus(task) {
  const { isDone, priority } = task;

  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}

function formatTask(task) {
  return `${task.title}: ${getStatus(task)}`;
}

const lines = tasks.map(formatTask);
const openCount = tasks.filter((task) => !task.isDone).length;
const firstUrgent = tasks.find((task) => task.priority === 1);

lines.forEach((line) => console.log(line));
console.log(`${openCount} tasks still open`);

if (firstUrgent) {
  console.log(`Start with: ${firstUrgent.title}`);
}
```

Notice `tasks.map(formatTask)` — the function you wrote in Session 3 is passed in directly, no arrow needed. It already takes one task and returns a string. That's all `map` asks for.

`lines` is an array of strings, built from data. **In Session 7, `formatTask` returns a piece of the web page instead of a string** — and this same `map` renders your whole task list on screen.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| New array full of `undefined` | The `map` callback doesn't return anything |
| `TypeError: ... is not a function` **or** `Cannot read properties of undefined` pointing inside your callback | You wrote `filter(isOpen())` instead of `filter(isOpen)`. The `()` ran the function immediately, with no item passed in |
| `Cannot read properties of undefined` after `find` | `find` didn't match and returned `undefined` — handle the not-found case |
| `undefined` stored from `forEach` | `forEach` returns nothing. You wanted `map` |
| Original array changed unexpectedly | Used `push`/`pop`/`sort` — those mutate. `map`/`filter` don't |
| `filter` returns everything, or nothing | The callback's condition is always truthy or always falsy — log what it returns |

---

## Today in class — checkpoint

Two things happen today:

- **M1 Stages 1 and 2 are due.** Bring your console app running. Stage 3 uses today's session — push it before next time.
- **Checkpoint.** You'll get short pieces of code you haven't seen, using Sessions 1–6. For each one: predict the output and explain why.

You won't be asked to write syntax from memory. You'll be asked to **read and trace**. The best preparation is exactly what you've been doing: the trace tables and predictions. Redo the traces from Sessions 1–5 without looking at your old answers.

This isn't graded against anyone else. It tells us both whether the foundations are solid enough to build the web page on top of — and if not, where to repair before we do.

---

## Before class — do both

### 1. Trace this on paper

For each step of the chain, write down the array you're holding:

```js
const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 1 },
  { title: "Pay rent", isDone: false, priority: 2 },
  { title: "Walk dog", isDone: false, priority: 1 }
];

const result = tasks
  .filter((task) => task.priority === 1)
  .filter((task) => !task.isDone)
  .map((task) => task.title);
```

After the first `filter`: ___
After the second `filter`: ___
After `map`: ___

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this:

```js
const tasks = [
  { title: "Buy milk", isDone: false },
  { title: "Call bank", isDone: true },
  { title: "Pay rent", isDone: false }
];

const titles = tasks.map((task) => {
  task.title;
});

const open = tasks.filter((task) => !task.isDone);

console.log(titles);
console.log(open.length);
console.log(tasks.length);
```

In the form, write:

> I think it logs ___, then ___, then ___, because ___

Look closely at every character of the `map`. Session 3, section 6 matters.
