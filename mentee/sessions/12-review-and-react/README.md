# Session 12 — Review and the Road to React

**Read before class. ~13 minutes.**
**Two things to do at the bottom — plus bring a bug.**

> Two small new pieces of syntax today, both because you'll see them on your first day of React. Everything else is review. Spread syntax details are in `REFERENCE.md`.

---

## Why this session exists

Last session. Two jobs:

1. **Lock in the foundations.** React doesn't replace anything you've learned — it's built on top of it. Every weak spot in Sessions 1–6 becomes a confusing React bug that *looks* like a React problem but isn't.
2. **Show you the bridge.** You've been building React's shapes for six weeks without the name. Today you see them side by side, so the first week of React feels like recognition, not a new language.

---

## 1. You already know most of React

Here's what you built, and what React calls it:

| You built | Session | React calls it |
|---|---|---|
| A function that takes an object, destructures it, returns an element | 7 | A **component**, with **props** |
| `render()` — draws the page from data | 7 | React does this for you, automatically |
| The data array your page is drawn from | 8 | **State** |
| Change data → render | 8 | Change state → React re-renders |
| `addEventListener("click", ...)` inside the component | 8 | `onClick={...}` on the element |
| Ids on every item | 8 | **Keys** on every list item |
| `tasks.map(...)` to draw a list | 6, 7 | Exactly the same — `map` renders every list in React |
| `isDone ? "Undo" : "Done"` | 2 | Exactly the same — how React shows conditional content |
| `statusMessage` for loading and errors | 10 | Loading and error **state** |
| `const { data } = await axios.get(...)` | 10 | Exactly the same |

React's big idea — *the screen is drawn from data, and you change the data, never the screen* — is Session 8's loop. You've been writing React's architecture by hand.

---

## 2. Array destructuring — the first line of React you'll write

Session 5 unpacked **objects** by property name:

```js
const { title, isDone } = task;
```

You can unpack **arrays** too — by **position**, with square brackets:

```js
const colours = ["red", "green", "blue"];
const [first, second] = colours;
// first → "red", second → "green"
```

Names don't have to match anything — it's position, not name. First variable gets the first item, second gets the second.

Why it matters: in React, this is how you create state.

```js
const [tasks, setTasks] = useState([]);
```

`useState` returns an array of two things: the current value, and a function to change it. Array destructuring names them in one line. You'll write this on day one, and dozens of times a week after that. Now you'll know it's not new syntax — it's this.

---

## 3. Why React refuses to let you mutate — and spread

In Sessions 8 and 9, `addTask` did `tasks.push(...)` and `toggleTask` did `task.isDone = !task.isDone`. Both change data **in place**. In vanilla JavaScript, that was fine — you called `render()` yourself afterwards.

**In React, it breaks.** Here's why, and it's Session 4:

React decides whether to redraw by checking if your state is **a different object** than last time. Session 4: `===` on objects asks *"same object?"*, not *"same contents?"*. If you `push` onto the same array, it's still the same array — same reference. React compares, sees the same object, and concludes *nothing changed*. **The screen doesn't update**, and there's no error.

So in React, every change makes **a new** array or object. Session 6 already gave you two tools that do this: `map` and `filter` always return new arrays. For adding, you need one more: **spread**.

### Spread — `...`

Three dots in front of an array means *"all the items of this array, laid out here."*

```js
const tasks = [taskA, taskB];
const moreTasks = [...tasks, taskC];
// a NEW array: [taskA, taskB, taskC]
// tasks is unchanged
```

Works for objects too — *"all the properties of this object, laid out here"*:

```js
const task = { id: 1, title: "Buy milk", isDone: false };
const updated = { ...task, isDone: true };
// a NEW object: { id: 1, title: "Buy milk", isDone: true }
// task is unchanged
```

Properties written **after** the spread override the ones copied in. That's how you change one property and keep the rest.

### The three data changes, rewritten

| Action | Mutating (Sessions 8–9) | New data every time (React-ready) |
|---|---|---|
| Add | `tasks.push(newTask)` | `tasks = [...tasks, newTask]` |
| Delete | *(already used `filter`)* | `tasks = tasks.filter((t) => t.id !== id)` |
| Toggle | `task.isDone = !task.isDone` | `tasks = tasks.map((t) => t.id === id ? { ...t, isDone: !t.isDone } : t)` |

Read the toggle slowly — it's the most common line in React code:

- `map` through every task, building a new array
- For the one whose `id` matches: a **new object**, copying everything with `...t`, then overriding `isDone`
- For every other task: return it as it is

Every piece is something you already know — `map` (Session 6), a ternary (Session 2), spread (today). Delete was already React-ready: that's the `filter` from Session 8.

---

## 4. A first look at React

**You don't need to understand this yet.** Just look for the pieces you recognise.

```jsx
function TaskItem({ title, isDone, onToggle }) {
  return (
    <li className={isDone ? "done" : ""}>
      {title}
      <button onClick={onToggle}>{isDone ? "Undo" : "Done"}</button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          isDone={task.isDone}
          onToggle={() => toggleTask(task.id)}
        />
      ))}
    </ul>
  );
}
```

What you should recognise:

- `TaskItem({ title, isDone, onToggle })` — parameter destructuring. It's `createTaskElement`.
- `const [tasks, setTasks] = useState([])` — array destructuring. `tasks` is your data array.
- `toggleTask` — the React-ready toggle from section 3, word for word.
- `tasks.map(...)` — draws the list, one component per task.
- `key={task.id}` — your ids.
- `onClick={onToggle}` — your listener, sitting on the element, passed as a function with no `()`.
- `() => toggleTask(task.id)` — an arrow function that remembers the id. That's Session 8's closure.

What's genuinely new is the HTML-looking syntax inside JavaScript — that's **JSX**, and it's the first thing React will teach you. There's no `render()` call anywhere: `setTasks` changes the data, and React redraws for you.

---

## 5. And the backend

You've spent two sessions **calling** APIs. The backend half of the course is **building** them — with the same JavaScript, running on a server instead of in a browser (that's Node).

What carries straight over:

- **JSON** (Session 9) — what your server will send
- **Request methods and status codes** (Session 10 reference) — what your server will respond to and return. Your 404s will be ones *you* decided to send
- **Ids** (Session 8) — every record in a database has one
- **Arrays of objects** (Session 4) — what your server stores and returns
- **`async`/`await` and `try`/`catch`** (Session 10) — servers wait for databases the way your page waited for the network

---

## 6. Review — what must be automatic before React

React adds a lot at once: JSX, components, state, effects, a build tool. You can't afford to also be unsure what `return` does.

Go through this list honestly. For each one, could you explain it out loud to someone, with an example, **without looking anything up**?

- [ ] `const` vs `let`, and why `const` is the default *(S1)*
- [ ] What `"5" + 1` gives, and why *(S1)*
- [ ] Why `===` and never `==` *(S1)*
- [ ] Which values are falsy, and why `0` is a trap *(S2)*
- [ ] Ternaries — picking a value *(S2)*
- [ ] `return` vs `console.log`, and what a function returns without `return` *(S3)*
- [ ] Arrow functions, including the one-line form *(S3)*
- [ ] Reading a path like `user.tasks[0].title` one step at a time *(S4)*
- [ ] Why changing an object through one variable changes it through another *(S4)*
- [ ] `map`, `filter`, `find` — what each gives back *(S6)*
- [ ] Passing a function vs calling it: `fn` vs `fn()` *(S6)*
- [ ] Object destructuring, including in parameters *(S5, S7)*

**Anything you can't tick is your homework before React starts.** Go back to that session's README, redo its trace, and redo its prediction without looking at your old answer.

### Between now and React

Don't stop writing JavaScript. The best single exercise: **rebuild the Task Tracker from a blank file**, using the master key from Session 11, without looking at the old code. When you get stuck, check `REFERENCE.md` — not the old project. If you can do that, you're ready.

---

## Today in class — bring a bug

Bring **one bug** from your Expense Tracker — one you couldn't fix, or one you fixed without understanding why the fix worked. We'll debug them together, live, using Session 11's method.

"I got it working but I don't know why" counts. Those are the most useful ones.

---

## Before class — do both

### 1. Trace this on paper — mixed review

No new concepts. Every line uses Sessions 1–6. Write the final value of every variable:

```js
const items = [
  { name: "Pen", price: "2", inStock: true },
  { name: "Book", price: "10", inStock: false },
  { name: "Bag", price: "25", inStock: true }
];

function getPrice(item) {
  return Number(item.price);
}

const available = items.filter((item) => item.inStock);
const names = available.map((item) => item.name);
const first = available[0];

first.inStock = false;

let total = 0;
for (const item of available) {
  total = total + getPrice(item);
}

const label = total > 20 ? `Total: ${total}` : "Small order";
const wrong = items[0].price + 1;
```

Values of `available`, `names`, `total`, `label`, `wrong` — and what's `items[0].inStock` at the end? Why?

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this:

```js
const tasks = [
  { id: 1, title: "Buy milk", isDone: false }
];

const copy = [...tasks];

copy.push({ id: 2, title: "Call bank", isDone: false });
copy[0].isDone = true;

console.log(tasks.length);
console.log(tasks[0].isDone);
console.log(copy === tasks);
```

In the form, write:

> I think it logs ___, ___ and ___, because ___

Section 3 tells you what spread makes new. Session 4 tells you what it doesn't.
