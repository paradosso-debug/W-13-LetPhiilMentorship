# Session 9 — localStorage

**Read before class. ~11 minutes.**
**Two things to do at the bottom — plus M2 is due today, and M3 starts.**

> Storage limits, `sessionStorage`, and the exact JSON rules are in `REFERENCE.md`. This file is about *why* your data vanishes, and *the one conversion* you need to stop it.

---

## Why this session exists

Your Task Tracker works. Add a task, tick it off, delete it. Now **refresh the page.**

Everything's gone — back to whatever was hard-coded at the top of `app.js`.

That's because your `tasks` array lives in **memory**, and memory belongs to the page while it's open. Refresh, close the tab, restart the browser — the page starts over and memory starts empty.

`localStorage` is a small storage space the browser keeps for your site, **on the user's computer**, that survives all of that.

Real-world, you've used it without noticing:

- A site remembers you picked dark mode
- A shopping cart is still full when you come back tomorrow
- A half-written form is still there after an accidental refresh
- A game remembers your high score

---

## 1. Saving and reading

`localStorage` is a built-in object — like `document`, it's just there. It stores **key–value pairs**: a name, and a value under that name.

```js
localStorage.setItem("theme", "dark");     // save
localStorage.getItem("theme");             // "dark"
localStorage.removeItem("theme");          // delete
```

Refresh the page, close the browser, come back next week — `getItem("theme")` still gives you `"dark"`.

Ask for a key that was never saved:

```js
localStorage.getItem("nothing-here");      // null
```

`null` — Session 1's *"deliberately nothing."* Here it means **"nothing has been saved under that name."** Every app hits this on its very first run, before the user has saved anything. Your code has to handle it.

### See it for yourself

DevTools (F12) → **Application** tab → **Local Storage** → your site. You'll see every key and value. You can edit them and delete them there too — useful when your stored data gets into a bad state while you're building.

---

## 2. The catch — it only stores strings

**localStorage can only store strings.** Session 1 warned you that several places hand you strings no matter what you give them. This is one of them.

Give it a number and you get a string back:

```js
localStorage.setItem("count", 5);
localStorage.getItem("count");    // "5" — a string
```

Give it an array or an object and it converts that to a string **by itself** — and for arrays and objects, the automatic conversion is useless. The structure is destroyed. Your data is gone, replaced with text that means nothing.

Your tasks are an **array of objects**. So you need a better way to turn them into a string — and back.

---

## 3. JSON — data as text

**JSON** (JavaScript Object Notation) is a way of writing data as a string that keeps its full structure.

```js
const tasks = [
  { id: 1, title: "Buy milk", isDone: false }
];

const text = JSON.stringify(tasks);
// '[{"id":1,"title":"Buy milk","isDone":false}]'
```

`JSON.stringify` — **data → string**. The result looks almost exactly like the JavaScript you wrote. But it's a string now: one long piece of text you can store anywhere.

```js
const back = JSON.parse(text);
// [{ id: 1, title: "Buy milk", isDone: false }] — a real array again
```

`JSON.parse` — **string → data**. You get a real array of real objects back. `back[0].title` works.

The two always go in pairs:

| Direction | Function | When |
|---|---|---|
| Data → string | `JSON.stringify` | Before you **save** |
| String → data | `JSON.parse` | After you **read** |

### Why this matters beyond storage

**JSON is how data travels on the web.** Next session, when you fetch data from an API, it arrives as a JSON string, and you'll parse it back into objects. Every API, every server, every app talking to another app — JSON. You're learning the format of the internet today; localStorage is just the first place you need it.

### One thing to know

Parsed objects are **new objects**. After a refresh, your tasks are rebuilt from text — they're not the same objects you had before (Session 4: `===` on objects asks *"same object?"*, and the answer is now always no). That's another reason Session 8 gave every task an **id**: ids survive the trip through JSON. Object identity doesn't.

---

## 4. Where saving fits in the loop

Session 8's loop was: *change the data, then render.* It gets one more step:

```
change data ──► save ──► render
```

Every function that changes the data saves it straight after. And when the page loads, you **load** instead of hard-coding:

```js
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

let tasks = loadTasks();
```

`loadTasks` handles the first-ever visit: nothing saved yet → `null` → start with an empty array. Without that check, `JSON.parse(null)` gives you `null`, and the first time `render` tries to loop over it, the app crashes.

**Order matters: change, *then* save.** Save first and you store the old data — the user's last action is lost on refresh.

---

## 5. What localStorage is not

- **Not shared.** It lives in one browser on one computer. Open your app on your phone — empty. Clear your browsing data — gone. Real apps that sync across devices store data on a server, which is where the backend half of your course comes in.
- **Not secure.** Any JavaScript running on the page can read it. Never store passwords or anything sensitive.
- **Not big.** Around 5 MB per site. Plenty for tasks and settings. Not for images or files.

It's the right tool for *"remember this for this user, on this device."*

---

## Where this lands in the project

The hard-coded array is gone. The data functions save before rendering:

```js
// ---------- storage ----------

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

let tasks = loadTasks();

// ---------- data changes ----------

function addTask(title, priority) {
  const newTask = { id: Date.now(), title, isDone: false, priority };
  tasks.push(newTask);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.isDone = !task.isDone;
  }
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

// ---------- drawing ----------
// getStatus, createTaskElement, render — unchanged from Session 8

// ---------- listening ----------
// form submit handler — unchanged from Session 8

render();
```

Notice how little changed. Two new functions, one line replaced at the top, and `saveTasks()` added in three places. **Drawing and listening didn't change at all.** That's what the three-section structure from Session 8 buys you: a new feature touches one section, not everything.

Add some tasks. Refresh. They're still there.

---

## Errors you will hit this week

| What you see | What happened |
|---|---|
| Data disappears on refresh | Not saving after changes — or still using a hard-coded array instead of `loadTasks()` |
| Stored value in DevTools shows `[object Object]` | Saved without `JSON.stringify` |
| `x.forEach is not a function` / `x.map is not a function` after loading | Read without `JSON.parse` — you have a string, not an array |
| `SyntaxError: Unexpected token ... in JSON` | `JSON.parse` got text that isn't valid JSON — often something saved earlier without `stringify`. Delete the key in DevTools → Application and try again |
| `Cannot read properties of null (reading 'forEach')` on first visit | `loadTasks` doesn't handle the "nothing saved" case |
| The last change is lost on refresh | `saveTasks()` runs **before** the data change instead of after |
| Numbers come back as strings | Saved a single value without `JSON.stringify` — `JSON` keeps numbers as numbers |

---

## M2 is due today. M3 starts today.

**M2:** bring your Expense Tracker with the `render` + component pattern working.

**M3** — due Session 11. Your Expense Tracker must:

- **Persist** — refresh the page and every expense is still there
- **Use one API** — details next session

---

## Before class — do both

### 1. Trace the types on paper

For each line that produces a value, write **the value** and **its type**:

```js
const count = 5;

localStorage.setItem("a", count);
const a = localStorage.getItem("a");
const sumA = a + 1;

localStorage.setItem("b", JSON.stringify(count));
const b = JSON.parse(localStorage.getItem("b"));
const sumB = b + 1;

const c = localStorage.getItem("never-saved");
```

What are `sumA` and `sumB`? Why are they different?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Someone tried to save their tasks. Don't run this:

```js
const tasks = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Call bank" }
];

localStorage.setItem("tasks", tasks);

const saved = localStorage.getItem("tasks");

console.log(saved);
console.log(typeof saved);

saved.forEach((task) => {
  console.log(task.title);
});
```

In the form, write:

> Line 1 logs ___. Line 2 logs ___. The `forEach` ___, because ___

For the first line, think about what you've seen on a page when an object ended up somewhere that only takes text.
