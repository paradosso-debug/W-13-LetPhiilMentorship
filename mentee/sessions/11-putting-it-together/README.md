# Session 11 — Putting It Together

**Read before class. ~12 minutes.**
**Two things to do at the bottom — M3 is due today, and there's a live check.**

> No new concepts today. Everything in this file uses Sessions 1–10. If something here feels unfamiliar, that's the session to revisit — `REFERENCE.md` will point you there.

---

## Why this session exists

You now know every piece: variables, conditionals, functions, arrays, objects, loops, array methods, the DOM, events, storage, APIs.

And yet, facing a blank `app.js`, most people still think: **"I don't know where to start."**

That's not because a piece is missing. It's because knowing the pieces and knowing **the order to put them in** are two different skills. Nobody teaches the second one explicitly — people are expected to absorb it. This session teaches it explicitly.

You've actually been following it for five sessions. The Task Tracker was built in exactly this order. Today you get the order written down, so you can use it on something you've never seen.

---

## 1. The master key — seven questions, in order

Before you write any code, answer these **in English**, on paper. Don't skip ahead. Each answer makes the next one easy.

### 1. What does the user see, and what can they do?

Describe the screen. List the actions, as verbs.

> *"A list of tasks. Each shows its title and status. They can add a task, mark it done, and delete it."*

Actions are the most important part — they become your functions.

### 2. What's the data?

Session 4's question. What shape? Write one example item.

> *"A list of tasks. Each has an id, a title, a done flag, and a priority."*
> `{ id: 1, title: "Buy milk", isDone: false, priority: 1 }`

If you can't write one example item, stop here. Everything else depends on this.

### 3. What changes the data?

Take every action from question 1. **Each one becomes one function** that changes the data.

> add → `addTask(title, priority)`
> mark done → `toggleTask(id)`
> delete → `deleteTask(id)`

For each one, Session 3's questions: what does it need? *(that's the parameters)* What does it do to the data? And Session 6's: *which array method?* Adding → `push`. Deleting → `filter`. Finding one → `find`.

### 4. How is the data drawn?

Session 7. One function turns **one item** into **one element**. One `render` function clears and draws them all.

> `createTaskElement(task)` → one `<li>`
> `render()` → the whole list, plus the summary line

### 5. What triggers each change?

Session 8. For every function in question 3: which element, which event?

> form `submit` → `addTask`
> "Done" button `click` → `toggleTask(id)`
> "Delete" button `click` → `deleteTask(id)`

Buttons that belong to one item get their listener inside the component (Session 8, section 5).

### 6. Does it need to survive a refresh?

Session 9. If yes: `save` and `load` functions, and every data change becomes *change → save → render*.

### 7. Does it need data from somewhere else?

Session 10. If yes: which API, what shape does it send, and how do you translate it into your shape? Loading and error states go into your data.

---

## 2. The build order — always have something working

Once the questions are answered, build in this order. **After every step, the app runs.** Never write for an hour and test at the end.

| Step | Build | You can check it by |
|---|---|---|
| 1 | The data — **hard-coded**, 2–3 example items | `console.log(items)` |
| 2 | `createItemElement` + `render` | The list appears on the page |
| 3 | **One** action, fully wired — data change + listener | Click it, watch the page change |
| 4 | The next action. Repeat until all are done | Each one, as you go |
| 5 | `save` + `load` — replace the hard-coded array | Refresh. Still there? |
| 6 | The API call, if you need one | Click it, see loading, see data |

Two rules that save hours:

- **Hard-code first.** Don't build the form before the list shows. Don't connect the API before the list shows. Fake data lets you see your render working on day one.
- **One action at a time, all the way through.** Don't write all three data functions, then all three listeners. Write `addTask` *and* its listener, see it work, then move on. If you write six things before testing, and it breaks, you don't know which of the six broke it.

---

## 3. The skeleton — use this for every project

The three sections from Session 8, plus storage, in the order you'll fill them:

```js
// ---------- data ----------
let items = [
  // step 1: hard-coded examples. step 5: replace with loadItems()
];

// ---------- storage ----------
function saveItems() {}
function loadItems() {}

// ---------- data changes ----------
// one function per user action. each ends: save, render.

// ---------- drawing ----------
function createItemElement(item) {}
function render() {}

// ---------- listening ----------
// connect elements to data-change functions

render();
```

Every app you build in this course fits this shape. So does a surprising amount of React — it just splits the sections across files.

---

## 4. When it breaks — a method, not a guess

You'll spend more time debugging than writing. The difference between an hour and five minutes is having a method.

### Step 1: Read the error

Don't skim it. It tells you three things:

- **Which file and line** — click it in the console, it takes you there
- **What kind of thing** — `TypeError`, `ReferenceError`, `SyntaxError`
- **The word `null` or `undefined`** — `null` usually means something on the **page** wasn't found (Session 7). `undefined` usually means something in your **data** isn't what you think (Session 4)

### Step 2: No error? Log the value

If the page is wrong but nothing is red, the bug is a wrong value somewhere. Pick the line where you *think* it goes wrong, and `console.log` the value **just before** it. Then:

- Is it the **value** you expected? If not, go further back.
- Is it the **type** you expected? `typeof` it. (A string where you wanted a number is the most common silent bug in this whole course.)
- Is it the **shape** you expected? Log the whole object, not the property.

### Step 3: Check the loop

Most bugs in an interactive app are a broken link in *change → save → render*:

| Symptom | Broken link |
|---|---|
| Click does nothing, no error | Listener missing, or `fn()` instead of `fn` |
| Data changes, page doesn't | `render()` not called |
| Page changes, refresh undoes it | `save` not called, or called in the wrong order |
| Works once, then buttons stop | Listener attached outside the component |

### Step 4: Still stuck? Trace it

Take a small piece — ten lines, not a hundred — and trace it on paper, line by line, like every pre-class exercise you've done. If your trace and the console disagree, the line where they split is your bug.

**What not to do:** change things at random until it works. If you don't know why it broke, you don't know why it's fixed — and it'll break again.

---

## Today in class

**M3 is due.** Bring your Expense Tracker running, persisting, and using its API.

**Live check.** You'll get a small feature to add to **your own** app — something like *"add a button that clears all paid expenses"* or *"show the most expensive item at the top."* About ten minutes, with me watching, talking through what you're doing.

This isn't a test of speed. It's a check that you can find your way around code you wrote. The fastest way through: **master key questions 3, 4 and 5**. Which data changes? What gets drawn? What triggers it? Then find the right section of your skeleton.

If you understand your own code, this will feel easy. If parts of your app were written by something other than you, this is where it shows — and it's much better to find that out now than on the first day of React.

---

## Before class — do both

### 1. Run the master key on a new app

No code. Paper only. Here's an app you haven't built:

> **Reading List.** The user sees a list of books. Each shows the title, the author, and whether they've read it. They can add a book, mark it as read, and remove it. The list should still be there tomorrow. There's a button to fill in a book's author automatically by searching its title online.

Answer all seven questions from section 1. For question 2, write one example book. For question 3, write each function's name and parameters. For question 5, list element → event → function.

Bring it to class. We'll compare answers — there's more than one right one.

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Someone wrote this `deleteTask`. Everything else in their app is exactly like our Task Tracker.

```js
function deleteTask(id) {
  saveTasks();
  tasks = tasks.filter((task) => task.id !== id);
  render();
}
```

They have three tasks: **Buy milk**, **Call bank**, **Pay rent**.

**Scenario A:** They delete *Call bank*, then refresh the page.
**Scenario B:** Starting over with the same three tasks, they delete *Call bank*, then add a new task *Walk dog* (their `addTask` is correct), then refresh.

In the form, write:

> After A's refresh, the list shows ___.
> After B's refresh, the list shows ___.
> The difference is because ___

This is why some bugs only happen *sometimes*.
