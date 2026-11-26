# Session 10 — APIs: fetch and axios

**Read before class. ~18 minutes.** This is the heaviest reading in the course. Take it in two sittings if you need to.
**Two things to do at the bottom — plus the M3 API brief.**

> Request methods, status codes, sending data with POST, and the full fetch/axios comparison are in `REFERENCE.md` — so are telling axios errors apart, CDN vs `npm`, and how to read older `.then()` code. This file is about _time_ — the one genuinely new idea — and _the pattern for getting data from somewhere else_.

---

## Why this session exists

Everything your app knows, so far, you typed in or the user typed in. Real apps get most of their data from **somewhere else**:

- A weather app doesn't know the weather. It asks a weather service.
- A feed doesn't store every post on your phone. It asks a server for the latest ones.
- A map asks for map tiles. A shop asks for products and prices. A login form asks a server "is this password right?"

That _asking_ is done through an **API** — a URL that, instead of returning a web page for humans, returns **data** for code. Almost always as JSON.

Try it now. Paste this into your browser's address bar:

```
https://jsonplaceholder.typicode.com/todos/1
```

That's not a web page. It's JSON — the exact format from Session 9. That's what an API gives you. Your code will ask for that URL, get that text, and `parse` it into an object.

The backend half of your course is about **building** APIs like this one. Today you learn to **use** them.

---

## 1. The new idea — time

Every line of code you've written so far finishes instantly. Line 1 finishes, line 2 starts.

Asking a server is different. The request goes across the internet, the server does some work, the answer comes back. That takes time — 50 milliseconds, 2 seconds, sometimes it never comes back at all.

JavaScript **does not stop and wait.** If it did, the whole page would freeze — no clicks, no scrolling, no typing — every time you asked for data.

Instead, you get a **Promise**: an object that means _"I don't have the answer yet, but I promise to have it later."_ Think of it as a receipt at a café counter — not the coffee, but a guarantee the coffee's coming.

You've already met "code that runs later": in Session 8, a listener's callback ran whenever the user clicked. Same idea here — except what you're waiting for isn't the user, it's the network.

---

## 2. `async` and `await` — waiting for the answer

```js
async function loadTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = await response.json();
  console.log(todo.title);
}

loadTodo();
```

Two new keywords:

- **`await`** — _"pause **this function** here until the Promise has its answer, then give me the answer."_
- **`async`** — goes in front of any function that uses `await`. Without it, `await` is a syntax error.

The key word in that definition is **this function**. `await` pauses the function it's inside. **The rest of your program keeps running.** Clicks still work. Other code still runs. When the answer arrives, the function picks up where it paused.

### Forget `await`, and you get the receipt instead of the coffee

```js
const response = fetch(url); // no await
console.log(response); // Promise { <pending> }
```

You're holding the Promise, not the answer. When you see `Promise { <pending> }` in your console, or a property of what should be your data is `undefined`, **your first question is: "did I forget an `await`?"**

### An `async` function returns a Promise too

```js
const result = loadTodo(); // a Promise, not the data
```

Whatever an `async` function returns is wrapped in a Promise. To get the actual value out, the caller has to `await` it too — which means the caller has to be `async`. That's normal: waiting spreads upward to whoever needs the result.

---

## 3. `fetch` — two steps, two awaits

`fetch` is built into the browser. Getting JSON out of it takes two steps:

```js
const response = await fetch(url);
const data = await response.json();
```

**Step 1 — `fetch(url)`** gives you a **response** object as soon as the server _starts_ replying. It tells you _about_ the reply — did it work, what status code — but the body might still be downloading.

**Step 2 — `response.json()`** waits for the full body and then does exactly what `JSON.parse` did in Session 9: **text → data**. It needs its own `await` because the rest of the body may still be on its way.

Two steps, two `await`s. Missing the second one is extremely common.

---

## 4. Reading an API URL

Every URL in this session has the same parts:

```
https://jsonplaceholder.typicode.com/todos/1
└────────────── base ──────────────┘└ path ┘

https://jsonplaceholder.typicode.com/todos?_limit=5
└────────────── base ──────────────┘└path┘└ query ┘
```

- **Base** — which server.
- **Path** — which thing. `/todos` is all the todos. `/todos/1` is the todo with id 1.
- **Query** — everything after the `?`. It doesn't change _which_ thing you asked for, only _how the answer comes back_: fewer of them, filtered, searched. It's `name=value` pairs, joined with `&`:

```
https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR
                                      └─ one ┘ └── two ──┘
```

The names — `_limit`, `base`, `symbols` — aren't yours to choose. They come from the API's documentation. Misspell one and you usually **don't** get an error: the API ignores it, or answers something you didn't ask for. If a response looks wrong, check the URL before the code.

When part of the URL comes from your data, build it with a template literal:

```js
const from = "USD";
const to = "EUR";
const url = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;
```

---

## 5. When it goes wrong

Networks fail. Servers break. URLs have typos. Your code has to expect it.

### Three kinds of failure

| What happens                 | Example                                                   | What `fetch` does                                               |
| ---------------------------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| **No answer at all**         | User is offline, server doesn't exist, typo in the domain | **Throws an error**                                             |
| **An answer that says "no"** | 404 not found, 500 server broke                           | **Doesn't throw.** Gives you a response as if everything's fine |
| **An answer with nothing in it** | A search with no results: `/todos?userId=999` gives `[]` | **Nothing.** Status `200`, `response.ok` is `true` — it worked |

The second row surprises everyone. A 404 still "succeeds" as far as `fetch` is concerned — a server _did_ answer; it just answered "not found." You have to check yourself:

```js
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

`response.ok` is `true` for successful status codes (200–299), `false` otherwise.

`throw` is new: it **raises an error on purpose**. Execution stops right there and jumps to the nearest `catch` — which is the next thing.

### `try` / `catch` — plan B

```js
try {
  // code that might fail
} catch (error) {
  // runs ONLY if something inside try threw
}
```

If everything in `try` works, `catch` is skipped. If _anything_ inside `try` throws — `fetch` failing, your own `throw`, a bad `JSON.parse` — execution jumps straight to `catch`, and `error` holds what went wrong.

Without `try/catch`, a failed request crashes your function and the user sees… nothing. A frozen "Loading…" forever. With it, you decide what the user sees instead.

This also fixes a Session 9 gap: `JSON.parse` on bad text throws. Now you know how to catch that.

### The third row — nothing failed, and there's nothing there

`catch` never runs for an empty answer, because nothing went wrong. The request worked; there just wasn't anything to send. axios behaves the same — no throw.

So you check the **data itself**, and show a **message**, not an error:

```js
statusMessage = newTasks.length === 0 ? "No suggestions right now." : "";
```

That one line can replace `statusMessage = "";` in the project code below. Without it, the user clicks, "Loading…" disappears, and… nothing. They can't tell "nothing to show" from "the button's broken."

The same goes for a **field that isn't there**. If the response has no `EUR`, then `data.rates.EUR` is `undefined` — no error — and `undefined * 20` puts `NaN` on your screen. Neither `fetch` nor axios can catch this one for you. Log the response, and check the values you rely on.

---

## 6. Loading and error states are data

While you're waiting, the user needs to see _something_. When it fails, they need to be told. Both are just more **state** — and state goes through Session 8's loop:

```js
let statusMessage = "";

async function loadSuggestions() {
  statusMessage = "Loading…";
  render();

  try {
    // fetch...
    statusMessage = "";
  } catch (error) {
    statusMessage = "Couldn't load suggestions. Try again.";
  }

  render();
}
```

The loading message isn't poked into the page directly. It's a variable, `render` displays it. **Change the data, then render** — even for "Loading…".

In React, you'll write this exact pattern: a `loading` state, an `error` state, and the screen drawn from both. Count the screens a user can see — loading, error, empty, and the data itself. All four are just data.

---

## 7. API data is never in your shape

Here's what JSONPlaceholder sends for a todo:

```json
{ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
```

Here's what your app uses:

```js
{ id: 1, title: "Buy milk", isDone: false, priority: 1 }
```

Different property names (`completed` vs `isDone`), extra ones you don't care about (`userId`), missing ones you need (`priority`).

**This is always the case with real APIs.** You don't control their shape. So you **translate at the edge**: the moment data arrives, `map` it into your shape (Session 6's _transform_), and the rest of your app never knows the API exists.

```js
const newTasks = todos.map((todo) => ({
  id: Date.now() + todo.id,
  title: todo.title,
  isDone: todo.completed,
  priority: 3,
}));
```

Two details:

- **`({ ... })`** — when an arrow function's short form returns an object, wrap it in parentheses. Without them, JavaScript reads `{` as the start of a function body, not an object. With several properties that's a `SyntaxError: Unexpected token ':'`; with exactly one property it's worse — no error at all, and every item comes back `undefined`.
- **The id** — once imported, these are _your_ tasks, so they get ids from _your_ system. Keeping the API's `id` would mean clicking "import" twice gives you two tasks with id `1`, and deleting one deletes both (Session 8).

And the first time you use any API: **`console.log` the whole response before you write a single path to it.** Session 4's rule. Don't guess the shape — look at it.

---

## 8. axios — the same job, less ceremony

axios is a **library**: code someone else wrote that you add to your project. It does what `fetch` does, with a few annoyances removed.

Add it with a script tag **before** your own script:

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
<script src="app.js" defer></script>
```

Now `axios` exists in your code:

```js
const response = await axios.get(url);
const todos = response.data;
```

Or, with Session 5's destructuring — this is the form you'll see everywhere:

```js
const { data } = await axios.get(url);
```

### What's actually different

| -------------------- | `fetch`                                 | `axios`                           |
| -------------------- | --------------------------------------- | --------------------------------- |
| Comes from           | Built into the browser                  | Library — must be added           |
| Getting JSON         | Two steps: `fetch`, then `.json()`      | One step: already in `.data`      |
| 404 / 500            | **Doesn't** throw — check `response.ok` | **Throws** automatically          |
| Sending JSON (POST)  | You `JSON.stringify` and set a header   | You pass an object; it handles it |
| Where the data is    | Whatever `.json()` returns              | Always `response.data`            |

**The core is identical:** `async`/`await`, `try`/`catch`, loading and error states, translating the shape. axios just removes two footguns — the second `await`, and the silent 404.

One side effect: because axios throws on a 404 too, your `catch` can now receive two different things — _"the server said no"_ and _"no answer at all"_. One message for both is fine. If you ever want a different message for each, `REFERENCE.md` shows how to tell them apart safely.

**Why learn both?** Because you'll meet both. `fetch` is everywhere because it's built in. axios is common in React and Node codebases. Knowing what each one does _for_ you means neither is magic.

---

## Where this lands in the project

A **"Get suggestions"** button imports five todos from JSONPlaceholder as new tasks.

Add to `index.html`, above the list:

```html
<button id="suggest-button">Get suggestions</button>
<p id="status"></p>
```

Add to `app.js`:

```js
const suggestButton = document.querySelector("#suggest-button");
const statusEl = document.querySelector("#status");

let statusMessage = "";

// ---------- data changes ----------

async function loadSuggestions() {
  statusMessage = "Loading…";
  render();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const todos = await response.json();

    const newTasks = todos.map((todo) => ({
      id: Date.now() + todo.id,
      title: todo.title,
      isDone: todo.completed,
      priority: 3,
    }));

    newTasks.forEach((task) => tasks.push(task));
    saveTasks();
    statusMessage = "";
  } catch (error) {
    console.error(error);
    statusMessage = "Couldn't load suggestions. Try again.";
  }

  render();
}

// ---------- drawing ----------
// inside render(), add one line near the top:
//   statusEl.textContent = statusMessage;

// ---------- listening ----------

suggestButton.addEventListener("click", loadSuggestions);
```

The same function with axios — compare them line by line:

```js
async function loadSuggestions() {
  statusMessage = "Loading…";
  render();

  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
    );

    const newTasks = data.map((todo) => ({
      id: Date.now() + todo.id,
      title: todo.title,
      isDone: todo.completed,
      priority: 3,
    }));

    newTasks.forEach((task) => tasks.push(task));
    saveTasks();
    statusMessage = "";
  } catch (error) {
    console.error(error);
    statusMessage = "Couldn't load suggestions. Try again.";
  }

  render();
}
```

The `response.ok` check is gone, and so is `.json()`. Everything else is the same.

Look at where `loadSuggestions` sits: in **data changes**, next to `addTask` and `deleteTask`. It's a data change that happens to take time. It still ends in _change → save → render_.

---

## Errors you will hit this week

| What you see                                                  | What happened                                                                      |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Promise { <pending> }`                                       | Missing `await`                                                                    |
| Your data's properties are `undefined`, no error              | Missing `await` on `.json()` — you're reading properties off a Promise             |
| `SyntaxError: await is only valid in async functions`         | Used `await` in a function without `async`                                         |
| `Cannot read properties of undefined` on API data             | The data isn't the shape you assumed. `console.log` the whole thing first          |
| Page shows nothing on a 404, no error                         | `fetch` doesn't throw on 404 — check `response.ok`                                 |
| `TypeError: Failed to fetch` / axios `Network Error`          | Offline, wrong URL, or the server's down                                           |
| Console error mentioning **CORS**                             | The API doesn't allow requests from browsers. Not your code — pick a different API |
| `ReferenceError: axios is not defined`                        | axios script tag missing, or placed _after_ `app.js`                               |
| `response.json is not a function` (axios)                     | axios already parsed it — use `response.data`                                      |
| `SyntaxError: Unexpected token ':'` inside a `map`            | Short arrow returning an object without `( )` around it                            |
| `.map` gives `undefined`s when building a one-property object | Same cause — with one property there's no error to warn you                        |
| "Loading…" never goes away                                    | No `try/catch` — an error stopped the function before it reset the message         |
| "Loading…" goes away, nothing appears, no error              | The API answered `200` with nothing (`[]`). Check the data, show a message         |
| `NaN` on screen, no error                                     | A field you used isn't in the response — it's `undefined` in your maths            |
| Worked, then fails after lots of clicks — status `429`        | Rate limit: the API caps requests. Wait, and only call it when the user asks       |
| `Cannot read properties of undefined (reading 'status')` in a `catch` | axios network failure — there's no `error.response`. See `REFERENCE.md`  |

---

## M3 — your API

Your Expense Tracker must use **one API call**, handled with loading and error states, and translated into your app's shape.

Suggested: show the total of all expenses converted into a second currency, using **Frankfurter** — free, no key, no sign-up:

```
https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR
```

Paste it in your browser first and look at the shape. Your job is to find the rate in the response and use it.

If the rate isn't where you think it is, you won't get an error — you'll get `NaN` on screen (Section 5).

You can use a different API if you prefer — it must be free, require no key, and work from the browser (no CORS error). Check with me before committing to it. Use `fetch` or `axios` — your choice, but be ready to explain how the other one would differ.

**Why "no key"?** Many APIs want a **key** — a password that identifies your app. Anything in your frontend JavaScript can be read by anyone who opens DevTools, so a key in `app.js` is a key you've published. Keys belong on a server — the backend half of the course. Until then: no-key APIs only.

**Free APIs have limits.** Most cap how many requests you can make per minute, hour or day. Go over and you get `429 Too Many Requests`. Shared wifi can count as one user, so a class clicking together can hit it. Call the API when the user asks — never from inside `render()`, which runs on every change.

Due Session 11.

---

## Before class — do both

### 1. Translate on paper

An API sends this:

```json
[
  {
    "id": 7,
    "name": "Coffee",
    "cost": 3.5,
    "paid": true,
    "createdBy": "u_204"
  },
  { "id": 8, "name": "Lunch", "cost": 12, "paid": false, "createdBy": "u_204" }
]
```

Your app's expenses look like `{ id, label, amount, isPaid }`.

1. Write the `map` that translates one shape into the other.
2. Write out the array your `map` produces.
3. Which property of the API data did you **not** need?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this. Write the console output **in order**:

```js
console.log("1: start");

async function loadTodo() {
  console.log("2: fetching");
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = response.json();
  console.log("3:", todo.title);
}

loadTodo();

console.log("4: end");
```

In the form, write:

> I think it logs **_, then _**, then **_, then _**, because \_\_\_

There are two separate things going on. Sections 2 and 3 cover them both.
