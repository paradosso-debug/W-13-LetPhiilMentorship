# Session 4 — Arrays and Objects

**Read before class. ~13 minutes.**
**Two things to do at the bottom.**

> Full lists of array operations and object syntax are in `REFERENCE.md`. This file is about *why* data has shape, and *how to read it*.

---

## Why this session exists

Here's the Task Tracker so far:

```js
const taskName = "Buy milk";
const isDone = false;
let priority = 1;
```

Three variables for one task. A second task needs `taskName2`, `isDone2`, `priority2`. Forty tasks is a hundred and twenty variables, with nothing connecting `taskName17` to `isDone17` except your hope that you numbered them right.

Real data doesn't look like loose variables. It looks like **lists of things**, where **each thing has named details**. Every app works this way:

- A shopping cart is a list of products. Each product has a name, a price, a quantity.
- A chat is a list of messages. Each message has a sender, text, a time.
- A weather app receives a list of days. Each day has a temperature, a condition, a date.

Two structures cover all of it:

- **Array** — an ordered list
- **Object** — one thing, described by named properties

And the combination — **an array of objects** — is the shape of almost every piece of data you'll touch for the rest of this course: API responses, `localStorage`, React state. **If this session clicks, the second half of the course has something to stand on. If it doesn't, nothing after week 3 will make sense.** That's not exaggeration — it's the most common reason people stall.

---

## 1. Arrays — ordered lists

```js
const tasks = ["Buy milk", "Call bank", "Pay rent"];
```

Each item has a position called an **index**. **Counting starts at 0.**

```js
tasks[0]   // "Buy milk"
tasks[1]   // "Call bank"
tasks[2]   // "Pay rent"
tasks[3]   // undefined — there's nothing there
```

Why 0? The index means *"how many steps from the start."* The first item is zero steps away. Annoying for a week, then automatic.

`.length` tells you how many items there are:

```js
tasks.length                   // 3
tasks[tasks.length - 1]        // "Pay rent" — always the last item
```

Notice the gap: length is `3`, but the last index is `2`. That off-by-one is behind a lot of bugs.

### Adding and removing

```js
tasks.push("Walk dog");   // adds to the end
tasks.pop();              // removes the last item
```

More operations in `REFERENCE.md`. These two are enough for now.

### Asking for an index that doesn't exist

```js
tasks[10]   // undefined
```

No error. You just get `undefined` — Session 1's *"your own code asked for something that isn't there."* Hold onto that; it matters a lot in the Errors section below.

---

## 2. Objects — one thing, with named details

```js
const task = {
  title: "Buy milk",
  isDone: false,
  priority: 1
};
```

Each line is a **property**: a name (the **key**) and a **value**. The three loose variables from the top of this file are now one thing that holds together.

Read a property with a dot:

```js
task.title      // "Buy milk"
task.priority   // 1
task.dueDate    // undefined — no such property
```

Change or add one the same way:

```js
task.isDone = true;        // change
task.dueDate = "Friday";   // add — didn't exist before, now it does
```

### Bracket notation — when the key is in a variable

```js
task["title"]              // same as task.title

const field = "priority";
task[field]                // 1
task.field                 // undefined — looks for a property literally called "field"
```

You won't need this often yet. It becomes important when your code decides *which* property to read — sorting by a column the user picked, for instance.

---

## 3. Array or object — how to choose

| Use an array when... | Use an object when... |
|---|---|
| It's a **list** of similar things | It's **one thing** with different details |
| Order matters | Each value needs a name |
| You'd describe it as "the tasks", "the messages" | You'd describe it as "a task", "the user" |
| You'll ask "what's at position 3?" | You'll ask "what's its title?" |

When you're not sure, say it in English. *"A list of tasks"* → array. *"A task has a title and a priority"* → object. *"A list of tasks, each with a title and priority"* → array of objects.

---

## 4. Arrays of objects — the real shape of data

```js
const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 2 },
  { title: "Pay rent", isDone: false, priority: 1 }
];
```

This is what you'll get from APIs in week 5. This is what you'll store in `localStorage`. This is React state. **Get comfortable looking at it.**

### Reading a path — one step at a time

To reach a value inside nested data, move one step at a time and say what you're holding after each step:

```js
tasks[1].title
```

- `tasks` → the whole array
- `tasks[1]` → the second object in it
- `tasks[1].title` → that object's title: `"Call bank"`

**Every step either picks an item from an array with `[ ]` or picks a property from an object with `.`** That's the whole skill. Deep paths are just more steps:

```js
const user = {
  name: "Ana",
  tasks: [
    { title: "Buy milk", tags: ["shopping", "urgent"] }
  ]
};

user.tasks[0].tags[1]   // "urgent"
```

`user` → object → `.tasks` → array → `[0]` → object → `.tags` → array → `[1]` → `"urgent"`.

When you get lost in a path, **`console.log` each step** and look at what you're actually holding. Don't guess.

Real-world: this is what an API response actually looks like, and reading it is the first thing you'll do with every API:

```js
const weather = {
  city: "Lisbon",
  days: [
    { date: "Mon", temp: 22, condition: "Sunny" },
    { date: "Tue", temp: 19, condition: "Cloudy" }
  ]
};

weather.days[1].condition   // "Cloudy"
```

---

## 5. `const` doesn't freeze the contents

This surprises everyone:

```js
const task = { title: "Buy milk", isDone: false };

task.isDone = true;         // works
task = { title: "New" };    // TypeError
```

`const` means **the variable can't be pointed at a different thing**. It says nothing about whether the thing itself can change. You can push to a `const` array and edit a `const` object all day.

Why? Because of the next section.

---

## 6. Copies vs references — the big one

In Session 1 you traced this:

```js
let a = 5;
let b = a;
a = 10;
// b is still 5
```

`b` got a **copy** of the value. Changing `a` later didn't touch it.

Arrays and objects don't work that way:

```js
const taskA = { title: "Buy milk", isDone: false };
const taskB = taskA;

taskB.isDone = true;

console.log(taskA.isDone);   // true
```

`taskB = taskA` did not copy the object. There is **only one object**. Both variables point at it.

The way to picture it:

- A **number, string or boolean** variable holds *the value itself*. Assigning it makes a copy.
- An **array or object** variable holds *directions to where the thing lives*. Assigning it copies the directions — so now two variables lead to the same place.

This is called a **reference**. It's not a quirk; it's deliberate. Objects can be large, and copying them every time you assign one would be slow. Directions are cheap.

The consequence to remember: **if two variables point at the same object, changing it through one changes it for both.** This is behind a whole class of bugs where "I didn't touch that variable, but it changed." In React, this exact behaviour is why you'll be told never to edit state directly.

Same reason this is `false`:

```js
{ title: "Buy milk" } === { title: "Buy milk" }   // false — two separate objects
```

`===` on objects asks *"same object?"*, not *"same contents?"*.

One more `typeof` landmine: `typeof []` is `"object"`. Arrays are a kind of object. Use `Array.isArray(value)` when you need to tell them apart.

---

## Where this lands in the project

Loose variables become a proper data structure, and `getStatus` now takes a whole task:

```js
const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 2 },
  { title: "Pay rent", isDone: false, priority: 3 }
];

function getStatus(task) {
  if (task.isDone) {
    return "Done";
  }
  if (task.priority === 1) {
    return "Urgent";
  }
  return "To do";
}

function formatTask(task) {
  return `${task.title}: ${getStatus(task)}`;
}

console.log(formatTask(tasks[0]));   // "Buy milk: Urgent"
console.log(formatTask(tasks[1]));   // "Call bank: Done"
console.log(formatTask(tasks[2]));   // "Pay rent: To do"
```

Two things to notice:

- The functions take **one task object** instead of separate pieces. Add a new property to tasks later, and you don't have to change every function's parameters.
- We wrote `tasks[0]`, `tasks[1]`, `tasks[2]` by hand. With forty tasks, that's forty lines. **That's the exact problem Session 5 solves.**

### Design check — a third question

Session 3 gave you two questions for designing a function. Add one before them:

1. **What shape is the data?** → describe it in English first: *"a list of tasks, each with a title, done flag, and priority"*
2. What does the function need?
3. What does it give back?

Most "I don't know where to start" moments are actually *"I don't know what shape my data is."* Answer that first and the functions usually become obvious.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| **`TypeError: Cannot read properties of undefined (reading 'title')`** | Whatever is *before* `.title` is `undefined`. Wrong index, typo in the property name, or the data isn't what you think it is |
| `undefined` instead of a value | Index past the end, or a property name that doesn't exist — often a typo (`task.tittle`) |
| Last item missing or `undefined` | Used `tasks[tasks.length]` instead of `tasks[tasks.length - 1]` |
| A value changed and you didn't touch it | Two variables point at the same object |
| `TypeError: Assignment to constant variable` | Tried to reassign a `const` — but editing its contents is fine |

**The first row is the most common error in JavaScript.** You'll see it constantly in weeks 4–6, especially with API data. The error names the property it tried to read — the bug is always one step *before* that. Log the step before and see what you actually have.

---

## M1 starts today

Your own app starts here: an **Expense Tracker**. It runs alongside the Task Tracker all course — same shape, different data — and grows in three milestones.

**M1 — first two stages due Session 6**, the last by Session 7. Console only. Your expenses as an array of objects, and functions that work out useful things about them. You'll get the brief at the end of class.

Today's design check is the place to start: *what shape is an expense?*

---

## Before class — do both

### 1. Read the paths — on paper

Don't run anything. Using this data:

```js
const user = {
  name: "Ana",
  tasks: [
    { title: "Buy milk", isDone: false },
    { title: "Call bank", isDone: true }
  ]
};
```

Write the expression that gives you:

1. The user's name
2. How many tasks she has
3. The title of her second task
4. Whether her first task is done

Then answer:

5. What does `user.tasks[2]` give you?
6. What happens with `user.tasks[2].title`? Why is that different from question 5?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this. Decide what it prints:

```js
function complete(task, count) {
  task.isDone = true;
  count = count + 1;
}

const task = { title: "Buy milk", isDone: false };
let doneCount = 0;

complete(task, doneCount);

console.log(task.isDone);
console.log(doneCount);
```

In the form, write:

> I think it logs ___ and ___, because ___

Your Session 3 trace is part of the answer. So is section 6.
