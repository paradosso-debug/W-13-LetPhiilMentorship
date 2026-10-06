# Session 5 — Loops (and Destructuring)

**Read before class. ~12 minutes.**
**Two things to do at the bottom.**

> `for...in`, `continue`, destructuring defaults and renaming are in `REFERENCE.md`. This file is about *why* loops exist and *the handful of patterns you'll actually write*.

---

## Why this session exists

Session 4 ended like this:

```js
console.log(formatTask(tasks[0]));
console.log(formatTask(tasks[1]));
console.log(formatTask(tasks[2]));
```

Three tasks, three lines. Forty tasks, forty lines. And you don't even know how many tasks there'll be — the user decides that by adding and deleting them.

A loop says: **"do this for every item, however many there are."** Write the work once, and it runs for three tasks or three thousand.

Real-world, almost every screen you've used is a loop:

- A feed rendering every post
- A cart adding up every item's price
- A search checking every result against what you typed
- An inbox counting unread messages

---

## 1. `for...of` — do this for each item

This is the loop you'll use most:

```js
const tasks = ["Buy milk", "Call bank", "Pay rent"];

for (const task of tasks) {
  console.log(task);
}
```

Read it as English: *"for each task of tasks, log it."*

The block runs **once per item**. Each time round — each **iteration** — `task` holds the next item. First run: `"Buy milk"`. Second: `"Call bank"`. Third: `"Pay rent"`. Then the array runs out and the loop ends.

`task` is a fresh variable every iteration, which is why `const` works here even though its value is different each time.

---

## 2. Tracing a loop — the skill that matters

Loops are where tracing gets hard, because the same lines run several times with different values. The method: **one row per iteration.**

```js
const prices = [5, 10, 20];
let total = 0;

for (const price of prices) {
  total = total + price;
}
```

| Iteration | `price` | `total` after |
|---|---|---|
| before loop | — | 0 |
| 1 | 5 | 5 |
| 2 | 10 | 15 |
| 3 | 20 | 35 |

Final `total`: `35`.

If you can fill in a table like that for any loop you read, you understand loops. If you can't, no amount of loop syntax will help. **When a loop does something unexpected, draw the table.**

---

## 3. The five patterns

Almost every loop you'll write in this course is one of five patterns. Learn to recognise them.

### Count — how many match?

```js
let doneCount = 0;

for (const task of tasks) {
  if (task.isDone) {
    doneCount = doneCount + 1;
  }
}
```

### Sum — add them up

```js
let total = 0;

for (const item of cart) {
  total = total + item.price;
}
```

### Find — get the first one that matches

```js
function findUrgent(tasks) {
  for (const task of tasks) {
    if (task.priority === 1) {
      return task;
    }
  }
  return null;
}
```

`return` inside the loop stops the whole function immediately — Session 3. You don't need to check the rest once you've found it. If the loop finishes without finding anything, the function falls through to `return null` — *"nothing here, on purpose"* from Session 1.

### Filter — build a new list of only some items

```js
const openTasks = [];

for (const task of tasks) {
  if (!task.isDone) {
    openTasks.push(task);
  }
}
```

### Transform — build a new list where every item is changed

```js
const labels = [];

for (const task of tasks) {
  labels.push(`#${task.priority} ${task.title}`);
}
```

### What they share

Count, sum, filter and transform all follow the same shape:

1. **Before** the loop: create the thing you're building (`0`, `[]`)
2. **Inside** the loop: update it
3. **After** the loop: use it

That "before" part is critical. **Declare it inside the loop and it resets to zero every iteration** — one of the most common loop bugs there is. It's Session 2's block scope again: the loop body is a `{ }` box.

**Keep these five in your head. Next session gives four of them names, and you'll stop writing them by hand.**

---

## 4. The classic `for` loop — when you need the number

Sometimes you need the index, not just the item — to number a list, or to know if you're on the last one:

```js
for (let i = 0; i < tasks.length; i++) {
  console.log(`${i + 1}. ${tasks[i]}`);
}
```

Three parts inside the brackets, separated by `;`:

| Part | Code | Means |
|---|---|---|
| Start | `let i = 0` | Start counting at 0 |
| Keep going while | `i < tasks.length` | Stop when `i` reaches the length |
| After each run | `i++` | Add 1 to `i` (same as `i = i + 1`) |

`i` isn't an item — it's a position. Use it to reach the item: `tasks[i]`.

**The classic bug:** writing `i <= tasks.length`. With three tasks, `i` goes 0, 1, 2, **3** — and `tasks[3]` is `undefined`. If you then read `.title` from it, you get Session 4's error: `Cannot read properties of undefined`.

**Default to `for...of`.** Use the classic `for` only when you actually need `i`.

---

## 5. `while` — when you don't know how many times

`for...of` runs once per item. Sometimes there's no list — you just need to keep going until something is true:

```js
let attempts = 0;
let connected = false;

while (!connected && attempts < 3) {
  attempts = attempts + 1;
  connected = tryToConnect();   // imagine a function that returns true or false
}
```

Real-world: retrying a failed request, loading pages of results until there are no more.

**The danger:** if the condition never becomes false, the loop never ends. The browser tab freezes and you have to close it. **Every `while` loop needs something inside it that moves it toward stopping.** You'll use `while` rarely in this course — but you need to recognise it.

---

## 6. Destructuring — unpacking an object into variables

Look at how much `task.` there is in a real loop body:

```js
for (const task of tasks) {
  if (task.isDone) {
    console.log(`${task.title} (done, priority ${task.priority})`);
  }
}
```

Destructuring pulls properties out into variables in one line:

```js
for (const task of tasks) {
  const { title, isDone, priority } = task;

  if (isDone) {
    console.log(`${title} (done, priority ${priority})`);
  }
}
```

`const { title, isDone, priority } = task;` means: *"make a variable called `title` holding `task.title`, one called `isDone` holding `task.isDone`…"* and so on.

Two rules:

- **The names must match the property names.** `const { name } = task` gives you `undefined`, because tasks don't have a `name` property.
- **You only take what you need.** Leaving properties out is fine.

This is purely a convenience right now. It becomes essential in Session 7 — and after that, in every React component you write.

---

## Where this lands in the project

The hand-written lines are gone. Three tasks or three thousand, same code:

```js
const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 2 },
  { title: "Pay rent", isDone: false, priority: 3 }
];

function getStatus(task) {
  const { isDone, priority } = task;

  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}

function formatTask(task) {
  return `${task.title}: ${getStatus(task)}`;
}

function countOpen(tasks) {
  let count = 0;
  for (const task of tasks) {
    if (!task.isDone) {
      count = count + 1;
    }
  }
  return count;
}

for (const task of tasks) {
  console.log(formatTask(task));
}

console.log(`${countOpen(tasks)} tasks still open`);
```

`countOpen` is the **count** pattern, wrapped in a function — Session 3's rule: functions return, the edge displays.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| Count or total is always tiny / resets | Accumulator declared **inside** the loop — it resets every iteration |
| `Cannot read properties of undefined` on the last iteration | Classic `for` with `i <= length` instead of `i < length` |
| Loop only runs once | `return` inside the loop fired on the first item |
| Browser tab freezes | Infinite `while` loop — nothing inside it moves the condition toward false |
| Destructured variable is `undefined` | The name doesn't match a property on the object — check spelling |
| `ReferenceError` on the accumulator after the loop | Declared inside the loop body, used outside it |

---

## Before class — do both

### 1. Trace this on paper

One row per iteration, like the table in section 2:

```js
const tasks = [
  { title: "A", isDone: true },
  { title: "B", isDone: false },
  { title: "C", isDone: false }
];

let count = 0;
let last = "";

for (const task of tasks) {
  if (!task.isDone) {
    count = count + 1;
    last = task.title;
  }
}
```

Columns: iteration, `task.title`, `count` after, `last` after. What are `count` and `last` at the end?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Someone wrote this to count urgent tasks. It has bugs. Don't run it:

```js
function countUrgent(tasks) {
  for (const task of tasks) {
    let count = 0;
    if (task.priority === 1) {
      count = count + 1;
    }
    return count;
  }
}

const tasks = [
  { title: "A", priority: 2 },
  { title: "B", priority: 1 },
  { title: "C", priority: 1 }
];

console.log(countUrgent(tasks));
```

In the form, answer all three:

> 1. It logs ___
> 2. The loop body runs ___ time(s)
> 3. The author wanted ___, and the fix is ___

There's more than one bug. Finding one isn't enough to get the output right.
