# Session 8 — Event Listeners

**Read before class. ~13 minutes.**
**Two things to do at the bottom.**

> The full list of event types and the event object's properties are in `REFERENCE.md`. This file is about *how code waits for the user*, and *the one loop* that every interactive app — and all of React — runs on.

---

## Why this session exists

Your page from Session 7 draws the task list. But it's a poster. Nobody can add a task, tick one off, or delete one.

And if you did the Session 7 prediction, you found out something important: **changing the data doesn't change the page.** `render` builds the page from the data *at the moment it runs*. Change the data afterwards and the page just sits there, out of date.

Today solves both problems at once. An event listener lets your code **wait for the user to do something** — and when they do, you change the data and call `render` again.

Real-world, this is every interaction you've ever had with a website:

- Click "Add to cart" → the cart updates
- Type in a search box → results filter as you type
- Press Enter in a chat → your message appears
- Click the heart → the like count goes up

---

## 1. Listening — code that runs later

```js
const button = document.querySelector("#add-button");

button.addEventListener("click", () => {
  console.log("Clicked");
});
```

Read it as English: *"button, when a click happens, run this function."*

Two arguments:

1. **Which event** — a string: `"click"`, `"submit"`, `"input"`…
2. **What to run** — a function. A **callback**, exactly like Session 6.

**Nothing happens when this line runs.** It doesn't log anything. It **registers** the function — hands it to the browser and says *"hold onto this, call it when a click happens."* The function runs later, once per click, whenever the user decides. Could be never.

That's Session 3's *defining vs calling* again. Here, the browser does the calling.

### Same trap as Session 6

```js
button.addEventListener("click", handleClick);     // ✅ hand it over
button.addEventListener("click", handleClick());   // ❌ runs it right now, once
```

With `()`, `handleClick` runs immediately when the page loads, and whatever it returns gets registered instead of the function. Clicking does nothing.

---

## 2. The loop that runs every interactive app

This is the most important idea today:

```
   data ──► render() ──► page
     ▲                     │
     │                     ▼
     └──── change data ◄── user does something
```

1. The page is drawn from the data (Session 7)
2. The user does something — clicks, types, submits
3. Your listener **changes the data**
4. Your listener **calls `render()`**
5. Back to 1

**Every handler you write today follows steps 3 and 4.** Change the data. Re-render. Never reach into the page and patch it by hand.

Why so strict? Because if a handler edits the page directly, the page and the data stop agreeing. The page says "done", the data says "not done", and the next `render` quietly undoes what the user clicked. With one rule — *data first, then render* — they can never disagree.

**This is exactly how React works.** In React, you change data (called *state*), and React calls your render for you. The loop is identical. You're building it by hand first so it's not magic later.

---

## 3. Forms — getting input from the user

```html
<form id="task-form">
  <input id="task-input" placeholder="New task" />
  <button>Add</button>
</form>
```

```js
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  console.log(title);
});
```

Four new things here:

### Listen to the form's `submit`, not the button's `click`

`submit` fires when the button is clicked **and** when the user presses Enter in the input. Listening to the button's click misses the Enter key — and everyone presses Enter.

### `event` — the details of what happened

The browser passes your callback an object describing the event. You can name it anything; `event` is the convention. For now you need one thing from it:

### `event.preventDefault()` — stop the page reloading

Forms are older than JavaScript. By default, submitting one **reloads the page** to send data to a server. That reload wipes out everything in memory — including your tasks array. `preventDefault()` says: *"don't do the default thing; I'll handle it."*

Forget it and your task appears for a split second, then vanishes as the page reloads.

### `input.value` — always a string

`.value` gives you what's in the input. **It is always a string** — even if the user typed a number, even if it came from a dropdown of numbers.

This is the bug Session 1 warned you about, and it arrives today. The user picks priority `1` from a dropdown, you get `"1"`, and `"1" === 1` is `false`. If you need a number, convert it deliberately:

```js
const priority = Number(prioritySelect.value);   // "1" → 1
```

`.trim()` removes spaces from both ends of a string, so `"   "` becomes `""` — which is falsy (Session 2). That's how you stop someone adding a blank task.

---

## 4. Identifying items — every task needs an id

To delete *this* task or tick off *that* one, you need a way to point at one specific item. Titles won't do — two tasks can have the same title.

Real data solves this with an **id**: a value that's unique to each item. Every API response you'll handle in week 5 has one. So does every row in every database.

```js
const tasks = [
  { id: 1, title: "Buy milk", isDone: false, priority: 1 },
  { id: 2, title: "Call bank", isDone: true, priority: 2 }
];
```

For new tasks, a simple way to get a unique number is `Date.now()` — the number of milliseconds since 1970. It's different every time you call it (unless you call it twice in the same millisecond, which a human clicking a button won't).

```js
const newTask = { id: Date.now(), title, isDone: false, priority };
```

Notice `title` and `priority` — Session 7's shorthand properties.

In React, ids become essential: every item in a list needs one, called a **key**.

---

## 5. Listeners inside the component

Where does the delete button's listener go? **Inside the function that creates the element:**

```js
function createTaskElement(task) {
  const { id, title } = task;

  const item = document.createElement("li");
  item.textContent = title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    deleteTask(id);
  });

  item.append(deleteButton);
  return item;
}
```

Each task gets its own button, and each button's callback **remembers the `id` of the task it was made for.** Click the button on "Call bank", and the callback runs with `id` still set to `2` — even though `createTaskElement` finished running long ago.

That "remembering" is called a **closure**. You don't need the theory now. What you need: *a callback can use variables from the function it was created inside.*

Why here and not somewhere else? Because `render` throws away every element and builds new ones. A listener attached to an old element is thrown away with it. **Attach listeners where elements are created, and every render gives every new element its own fresh listener.**

This is also how React does it — `onClick` goes on the element, inside the component.

---

## 6. `let` for the array — when the data gets replaced

To delete, you'll use Session 6's `filter` — keep everything *except* the one with that id:

```js
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}
```

`filter` returns a **new** array. You're pointing `tasks` at it. That's a reassignment — so `tasks` must now be declared with `let`, not `const`.

This is Session 1's decision made for real: `const` by default, `let` when you know it changes. Now it changes.

---

## Where this lands in the project

`index.html`:

```html
<body>
  <h1>My Tasks</h1>

  <form id="task-form">
    <input id="task-input" placeholder="New task" />
    <select id="priority-select">
      <option value="1">Urgent</option>
      <option value="2">Normal</option>
      <option value="3" selected>Later</option>
    </select>
    <button>Add</button>
  </form>

  <p id="summary"></p>
  <ul id="task-list"></ul>

  <script src="app.js" defer></script>
</body>
```

`app.js`:

```js
let tasks = [
  { id: 1, title: "Buy milk", isDone: false, priority: 1 },
  { id: 2, title: "Call bank", isDone: true, priority: 2 }
];

const list = document.querySelector("#task-list");
const summary = document.querySelector("#summary");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const prioritySelect = document.querySelector("#priority-select");

// ---------- data changes ----------

function addTask(title, priority) {
  const newTask = { id: Date.now(), title, isDone: false, priority };
  tasks.push(newTask);
  render();
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.isDone = !task.isDone;
  }
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

// ---------- drawing ----------

function getStatus({ isDone, priority }) {
  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}

function createTaskElement(task) {
  const { id, title, isDone } = task;

  const item = document.createElement("li");
  item.textContent = `${title} — ${getStatus(task)} `;
  if (isDone) {
    item.classList.add("done");
  }

  const toggleButton = document.createElement("button");
  toggleButton.textContent = isDone ? "Undo" : "Done";
  toggleButton.addEventListener("click", () => toggleTask(id));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(id));

  item.append(toggleButton, deleteButton);
  return item;
}

function render() {
  list.textContent = "";

  if (tasks.length === 0) {
    summary.textContent = "Nothing here yet";
    return;
  }

  tasks.forEach((task) => {
    list.append(createTaskElement(task));
  });

  const openCount = tasks.filter((task) => !task.isDone).length;
  summary.textContent = `${openCount} tasks still open`;
}

// ---------- listening ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  const priority = Number(prioritySelect.value);
  addTask(title, priority);

  input.value = "";
});

render();
```

Read the three sections:

- **Data changes** — `addTask`, `toggleTask`, `deleteTask`. Each one changes the data, then calls `render`. Nothing else.
- **Drawing** — builds the page from the data. Never changes the data.
- **Listening** — connects user actions to data changes.

Every handler is steps 3 and 4 of the loop in section 2. **None of them touches the page directly.** That separation is the whole architecture, and it's the one you'll use in React.

`item.append(toggleButton, deleteButton)` — `append` accepts several elements at once.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| Handler runs once when the page loads, then never again | `addEventListener("click", handler())` — the `()` called it immediately |
| Item appears for a split second, then the page resets | Missing `event.preventDefault()` on a form submit |
| Data changes (you can `console.log` it) but the page doesn't | Handler changed the data but didn't call `render()` |
| Priority / number comparisons never match for new items | `.value` is a string — `"1" === 1` is `false`. Use `Number()` |
| Blank tasks get added | No check that the trimmed input is non-empty |
| `TypeError: Assignment to constant variable` on delete | `tasks` is still `const`, but `filter` reassigns it |
| Buttons work until the first re-render, then stop | Listeners were attached outside `createTaskElement` — `render` threw those elements away |
| Deleting one task deletes the wrong one, or several | Matching on something that isn't unique (like the title) instead of the `id` |

---

## Before class — do both

### 1. Trace the console on paper

Here's some code, and then what the user does. Write the console output **in order**, including anything that happens before the user does anything.

```js
const button = document.querySelector("#btn");
let count = 0;

console.log("Setup starting");

button.addEventListener("click", () => {
  count = count + 1;
  console.log(`Clicked ${count}`);
});

console.log(`Setup done, count is ${count}`);
```

The page loads. Then the user clicks the button **twice**.

What's the full console output? How many times does the callback run?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

A user types **"Pay rent"**, picks **Urgent** from the dropdown (`value="1"`), and presses Enter. Don't run this — decide what appears on the page:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  const priority = prioritySelect.value;

  tasks.push({ id: Date.now(), title, isDone: false, priority });
  render();
});
```

`render` and `getStatus` are exactly as in *Where this lands in the project* above.

In the form, write:

> I think the new item says ___, because ___

Compare this handler, line by line, with the one in the project code.
