# Session 7 — The DOM (and Props)

**Read before class. ~13 minutes.**
**Two things to do at the bottom — plus M2 starts today.**

> The full list of ways to select, change and create elements is in `REFERENCE.md`. This file is about *what the DOM actually is*, and *one pattern* — the render function — that you'll use for the rest of this course and all of React.

---

## Why this session exists

For six sessions, everything has happened in the console. Your users will never open the console. They see **the page**.

The DOM is how JavaScript reaches the page. Every interactive thing you've ever used on a website — a like counter going up, a cart updating, a list filtering as you type — is JavaScript changing the DOM.

This is also the session where everything you've learned lands in one place. Your data (Session 4), your functions (Session 3), your array methods (Session 6) — today they stop producing console text and start producing **things people can see**.

---

## 1. What the DOM actually is

When the browser loads your HTML, it doesn't just display the text. It reads it and builds a **tree of objects** — one object per element.

```html
<body>
  <h1>My Tasks</h1>
  <ul id="task-list"></ul>
</body>
```

becomes, in the browser's memory, something like:

```
document
 └─ body
     ├─ h1       (textContent: "My Tasks")
     └─ ul       (id: "task-list")
```

That tree is the **DOM** — Document Object Model. The important word is **Object**. Every element is an object, exactly like the ones from Session 4. It has properties you can read and change: `.textContent`, `.className`, `.id`.

**Change the object, and the browser redraws the page to match.** That's the whole mechanism.

`document` is your entry point — a built-in object that represents the whole page.

You can see the live tree any time: open DevTools (F12) → **Elements** tab. When your code changes the page, watch it change there. That's your `console.log` for the DOM.

---

## 2. Connecting your script

```html
<body>
  <h1>My Tasks</h1>
  <ul id="task-list"></ul>

  <script src="app.js" defer></script>
</body>
```

**`defer` matters.** Without it, the browser can run your script *before* it has built the elements below it. Your code looks for `#task-list`, it doesn't exist yet, and you get `null` — see the Errors section. `defer` tells the browser: *build the whole page first, then run the script.*

---

## 3. Selecting — getting hold of an element

```js
const list = document.querySelector("#task-list");
const heading = document.querySelector("h1");
```

`querySelector` takes a **CSS selector** — the same thing you'd write in a stylesheet. `#` for an id, `.` for a class, a plain name for a tag. It returns the **first** matching element.

**Nothing matches → `null`.** Session 1: `null` is *"deliberately nothing"* — here, the browser's way of saying *"I looked, and there's no such element."* The usual causes are a missing `#`, a typo, or a script running before the HTML exists.

Select once, store it in a `const`, reuse the variable. Don't search the page every time you need the same element.

---

## 4. Changing — the two properties you'll use most

```js
heading.textContent = "Today's Tasks";      // change the text
heading.classList.add("highlight");         // add a CSS class
heading.classList.remove("highlight");      // remove it
```

**`textContent`** sets what text is inside the element.

**`classList`** adds and removes CSS classes. This is how you change how something *looks* — write the styles in CSS, and use JavaScript only to switch classes on and off. Real-world: a done task gets a `done` class, and your CSS handles the strikethrough. JavaScript decides *which* state; CSS decides *what that state looks like*.

You'll see `element.style.color = "red"` in tutorials. It works, but it puts design decisions inside your logic. Prefer classes.

---

## 5. Creating — building new elements

```js
const item = document.createElement("li");
item.textContent = "Buy milk";
list.append(item);
```

Three steps, always in this order:

1. **Create** — the element now exists, but only in memory. It's not on the page.
2. **Fill** — set its text, classes, anything else.
3. **Append** — attach it to an element that *is* on the page. **Now** it's visible.

Forgetting step 3 is the most common reason "my element doesn't show up." No error — it just exists nowhere anyone can see.

### Why not just write HTML in a string?

You'll see this everywhere:

```js
list.innerHTML = `<li>${task.title}</li>`;
```

It's shorter. But `innerHTML` tells the browser *"treat this text as code."* If `task.title` came from a user who typed `<img src=x onerror="...">`, that runs as code on your page. This is a real, common attack.

**In this course: `createElement` + `textContent` for anything containing data.** `textContent` always treats text as text, never as code.

---

## 6. The render function — the most important idea today

Here's the pattern. It has two parts.

### Part 1: a function that turns one piece of data into one element

```js
function createTaskElement(task) {
  const item = document.createElement("li");
  item.textContent = task.title;

  if (task.isDone) {
    item.classList.add("done");
  }

  return item;
}
```

Look at the shape: **data in, element out.** It doesn't touch the page. It doesn't know where the element will go. It just builds one and `return`s it — Session 3's rule, *functions return, the edge displays*.

Now compare it to Session 6's `formatTask`: data in, **string** out. This is the same idea. The only difference is what comes back.

### Part 2: a function that draws the whole list from the data

```js
const list = document.querySelector("#task-list");

function render() {
  list.textContent = "";

  tasks.forEach((task) => {
    list.append(createTaskElement(task));
  });
}

render();
```

`render` does three things:

1. **Clears** the list — setting `textContent` to `""` removes everything inside
2. **Loops** through the data, building one element per task
3. **Appends** each one to the page

**The page is built from the data.** The data is the source of truth. The page is a picture of it.

Why clear first? Without it, every call to `render` adds another full copy of the list underneath the last one.

---

## 7. Destructuring in parameters — this is what React calls props

`createTaskElement` reads `task.title`, `task.isDone`… Session 5 showed you how to unpack that. You can do it **right in the parameter list**:

```js
function createTaskElement({ title, isDone }) {
  const item = document.createElement("li");
  item.textContent = title;

  if (isDone) {
    item.classList.add("done");
  }

  return item;
}
```

It still receives one task object. The `{ title, isDone }` in the brackets unpacks it on the way in. Same rules as Session 5: names must match the properties, and you only take what you need.

Why bother? Because now the **first line tells you exactly what data this function uses.** You don't have to read the body to find out.

**This is a component.** A function that receives an object of data, destructures it, and returns a piece of UI. In React, you'll write:

```js
function TaskItem({ title, isDone }) {
  // returns a piece of UI
}
```

and the object it receives is called **props**. You're writing the same shape today, without the framework. When you meet it in React, you won't be learning something new — you'll be recognising something you already built.

### The mirror image — shorthand properties

Destructuring pulls properties *out* into variables. The reverse — building an object *from* variables with the same names — has a shortcut too:

```js
const title = "Buy milk";
const isDone = false;

const task = { title, isDone };
// same as { title: title, isDone: isDone }
```

You'll use this in Session 8 when creating new tasks. React code is full of it.

---

## Where this lands in the project

`index.html`:

```html
<body>
  <h1>My Tasks</h1>
  <p id="summary"></p>
  <ul id="task-list"></ul>

  <script src="app.js" defer></script>
</body>
```

`app.js`:

```js
const tasks = [
  { title: "Buy milk", isDone: false, priority: 1 },
  { title: "Call bank", isDone: true, priority: 2 },
  { title: "Pay rent", isDone: false, priority: 3 }
];

const list = document.querySelector("#task-list");
const summary = document.querySelector("#summary");

function getStatus({ isDone, priority }) {
  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}

function createTaskElement(task) {
  const { title, isDone } = task;

  const item = document.createElement("li");
  item.textContent = `${title} — ${getStatus(task)}`;

  if (isDone) {
    item.classList.add("done");
  }

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

render();
```

Everything from Sessions 1–6 is in there. `getStatus` now destructures its parameter too. `render` has an early return for the empty case — Session 2's *"No tasks yet? Show 'Nothing here yet'"*, from the very first real-world example in that session.

`createTaskElement` destructures inside the body instead of the parameter list, because it needs the whole `task` too — to pass on to `getStatus`. Both are fine. Pick whichever makes the function easiest to read.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| **`TypeError: Cannot read properties of null (reading 'append')`** | `querySelector` found nothing. Check: missing `#` or `.`, typo in the selector, or no `defer` on the script |
| Element created but not on the page | Forgot to `append` it |
| List appears twice, three times, more | `render` doesn't clear the list first |
| Page shows `[object Object]` | You put a whole object into `textContent` — use a property, like `task.title` |
| Nothing happens at all, no error | Script isn't linked, or the file path in `src` is wrong. Check the Console for a 404 |
| A destructured value shows `undefined` | Name in `{ }` doesn't match the property name |

**Notice the first row says `null`, not `undefined`.** Session 4's error said `undefined` — something in your data was missing. This one says `null` — something on the **page** was missing. The word tells you where to look.

---

## M2 starts today

Your Expense Tracker gets a screen. Due Session 9.

**Required:** your list must be drawn by a `render` function that clears and rebuilds from your data array, using a separate function that takes one expense object — **destructured in its parameters** — and returns one element.

Details in class.

---

## Before class — do both

### 1. Build the page on paper

Starting HTML:

```html
<h1>Tasks</h1>
<ul id="list"></ul>
```

Don't run this. Write out the HTML the page ends up with after all of it has run:

```js
const heading = document.querySelector("h1");
const list = document.querySelector("#list");

heading.textContent = "Today";

const a = document.createElement("li");
a.textContent = "Buy milk";
a.classList.add("done");

const b = document.createElement("li");
b.textContent = "Call bank";

list.append(b);
list.append(a);

const c = document.createElement("li");
c.textContent = "Pay rent";
```

How many `<li>` elements are on the page? In what order? Which one has a class?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this. Describe what the page shows once everything has finished:

```js
const tasks = [
  { title: "Buy milk", isDone: false }
];

const list = document.querySelector("#task-list");

function createTaskElement({ title, isDone }) {
  const item = document.createElement("li");
  item.textContent = isDone ? `✓ ${title}` : title;
  return item;
}

function render() {
  list.textContent = "";
  tasks.forEach((task) => {
    list.append(createTaskElement(task));
  });
}

render();

tasks.push({ title: "Call bank", isDone: false });
tasks[0].isDone = true;
```

In the form, write:

> I think the page shows ___, because ___

Think about what `render` actually does, and when.
