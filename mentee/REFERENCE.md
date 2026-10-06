# JavaScript Reference

**Not a lesson. Don't read this start to finish.**

This is lookup material for the whole course — syntax, tables, lists. When you're mid-build and can't remember what `%` does or which array method returns what, come here. The lesson READMEs explain *why* things exist; this file just tells you *what they are*.

Sections get added as the course moves. Search with `Ctrl+F` / `Cmd+F`.

---

## Contents

- [Variables](#variables)
- [Data types](#data-types)
- [Operators](#operators)
- [Strings](#strings)
- [Conditionals](#conditionals)
- [Functions](#functions)
- [Arrays](#arrays)
- [Objects](#objects)
- [Copies vs references](#copies-vs-references)
- [Loops](#loops)
- [Destructuring](#destructuring)
- [Array methods](#array-methods)
- [Spread](#spread)
- [DOM](#dom)
- [Events](#events)
- [localStorage and JSON](#localstorage-and-json)
- [Async, fetch and axios](#async-fetch-and-axios)
- [Starting a project](#starting-a-project)
- [Debugging](#debugging)
- [Console](#console)
- [Common errors](#common-errors)

---

## Variables

```js
let count = 0;          // can be reassigned
const limit = 10;       // cannot be reassigned
```

| Keyword | Reassign? | Use it |
|---|---|---|
| `const` | No | Default. Everything, unless you know it changes |
| `let` | Yes | Only when the value changes |
| `var` | Yes | Never. Legacy — recognise it, don't write it |

**Naming:** camelCase (`taskName`). Booleans start with `is`/`has` (`isDone`, `hasDueDate`). Names describe contents.

---

## Data types

| Type | Example | `typeof` returns |
|---|---|---|
| string | `"Buy milk"`, `'hi'`, `` `hey` `` | `"string"` |
| number | `42`, `3.5`, `-7` | `"number"` |
| boolean | `true`, `false` | `"boolean"` |
| undefined | `undefined` | `"undefined"` |
| null | `null` | `"object"` ← known JS bug |

JavaScript has no separate integer type. `42` and `3.5` are both `number`.

**Checking a type:**

```js
typeof value
```

**`null` vs `undefined`:**

| | Means | Usually caused by |
|---|---|---|
| `undefined` | Never set | Your own code, or asking for something that doesn't exist |
| `null` | Deliberately empty | Data from an API or database |

---

## Operators

### Arithmetic

| Operator | Does | Example |
|---|---|---|
| `+` | Add (or join strings) | `10 + 3` → `13` |
| `-` | Subtract | `10 - 3` → `7` |
| `*` | Multiply | `10 * 3` → `30` |
| `/` | Divide | `10 / 3` → `3.333...` |
| `%` | Remainder | `10 % 3` → `1` |
| `**` | Power | `2 ** 3` → `8` |

Common `%` patterns:

```js
n % 2 === 0     // is n even?
i % 3 === 0     // every 3rd item
```

### Assignment

| Operator | Same as |
|---|---|
| `x = 5` | — |
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 5` | `x = x * 5` |
| `x /= 5` | `x = x / 5` |

Read right-to-left: evaluate the right side, store the result in the left.

### Comparison

All return `true` or `false`.

| Operator | Means |
|---|---|
| `===` | Equal, same type — **use this** |
| `!==` | Not equal, or different type — **use this** |
| `==` | Equal after coercion — avoid |
| `!=` | Not equal after coercion — avoid |
| `>` `<` | Greater / less than |
| `>=` `<=` | Greater / less than or equal |

Why `==` is avoided:

```js
5 == "5"             // true
0 == ""              // true
0 == "0"             // true
"" == "0"            // false
null == undefined    // true
```

### Logical

| Operator | Means | Example |
|---|---|---|
| `&&` | AND — both true | `isDone && isUrgent` |
| `\|\|` | OR — at least one true | `isDone \|\| isUrgent` |
| `!` | NOT — flips it | `!isDone` |

### Logical operators as shortcuts

`||` and `&&` don't just return `true`/`false` — they return one of their two **values**.

| Expression | Returns | Common use |
|---|---|---|
| `a \|\| b` | `a` if truthy, otherwise `b` | Default value: `title \|\| "Untitled"` |
| `a && b` | `a` if falsy, otherwise `b` | Only do/show `b` if `a`: `isDone && "✓"` |
| `a ?? b` | `a` unless it's `null`/`undefined`, otherwise `b` | Default that keeps `0` and `""`: `count ?? 0` |

Careful: `count || 10` replaces a real `0` with `10` (truthy/falsy trap). Use `??` when `0` or `""` is a valid value.

`&&` is used constantly in React to show something only when a condition is true.

---

## Strings

**Three quote styles:**

```js
"double"
'single'
`backtick`     // template literal
```

**Template literals** — use these. Backticks, `${}` to insert any value:

```js
const name = "Buy milk";
console.log(`Task: ${name}`);
```

They also allow line breaks inside the string, which `"` and `'` don't.

**Concatenation** with `+` — recognise it, don't write it:

```js
"Task: " + name
```

**Type coercion with `+`:** if either side is a string, `+` joins instead of adding.

```js
"Task " + 1      // "Task 1"
```

Other arithmetic operators coerce the other direction:

```js
"5" * 2          // 10
"10" - 1         // 9
```

---

## Conditionals

### `if` / `else if` / `else`

```js
if (condition) {
  // runs if condition is truthy
} else if (otherCondition) {
  // runs if the first was falsy and this is truthy
} else {
  // runs if nothing above matched
}
```

- Checked top to bottom. **First truthy condition wins**; the rest are skipped.
- `else if` and `else` are optional. You can have as many `else if` as you need.
- Put the most specific condition first.

### Truthy and falsy

| Falsy (count as `false`) | Truthy (count as `true`) |
|---|---|
| `false` | `true` |
| `0` | any non-zero number, including negatives |
| `""` (empty string) | any non-empty string — including `"0"` and `"false"` |
| `null` | |
| `undefined` | |
| `NaN` (not-a-number) | |

Use truthy/falsy for *"is there anything here?"* When `0` or `""` is a valid value, compare explicitly:

```js
if (count === 0) { ... }
if (name === "") { ... }
```

### Ternary

```js
const result = condition ? valueIfTrue : valueIfFalse;
```

```js
const label = isDone ? "Done" : "To do";
```

Use it to **pick a value**. Don't nest them. Don't use them to run actions.

### `switch`

You'll see it in other code. We don't use it in this course — `if/else if` covers the same ground.

```js
switch (priority) {
  case 1:
    label = "Urgent";
    break;
  case 2:
    label = "Normal";
    break;
  default:
    label = "Later";
}
```

`switch` compares with `===`. Forgetting `break` makes execution fall through into the next case.

### Block scope

Variables declared with `let` or `const` inside `{ }` only exist inside it.

```js
let message = "";        // declare outside
if (isDone) {
  message = "Nice work"; // assign inside
}
console.log(message);    // available here
```

---

## Functions

### Function declaration

```js
function name(param1, param2) {
  return param1 + param2;
}

name(1, 2);   // call it — returns 3
```

### Arrow function

```js
const name = (param1, param2) => {
  return param1 + param2;
};
```

**Short form** — single expression, braces and `return` dropped, return is implicit:

```js
const double = (n) => n * 2;
```

Parentheses around a single parameter are optional (`n => n * 2`). This course keeps them for consistency.

| | Declaration | Arrow |
|---|---|---|
| Syntax | `function name() {}` | `const name = () => {}` |
| Callable before the line it's written on? | Yes (hoisted) | No — `ReferenceError` |
| Used in this course for | Main named functions | Passing functions into other things (week 3+) |

### Parameters and arguments

- **Parameter** — the variable name in the definition: `function greet(name)`
- **Argument** — the value passed in the call: `greet("Ana")`
- Matched **by position**, not by name
- Missing argument → parameter is `undefined`
- Extra arguments → ignored

**Default parameters** — a fallback if the argument is missing:

```js
function greet(name = "friend") {
  return `Hello, ${name}`;
}

greet();        // "Hello, friend"
greet("Ana");   // "Hello, Ana"
```

### `return`

- Hands a value back to the caller
- **Stops the function immediately** — nothing after it runs
- No `return` (or a path that doesn't reach one) → returns `undefined`

`return` vs `console.log`:

| | `return` | `console.log` |
|---|---|---|
| Who gets the value | The code that called the function | You, in the console |
| Can be stored / compared / passed on | Yes | No |
| Ends the function | Yes | No |

### Early return pattern

```js
function getStatus(isDone, priority) {
  if (isDone) return "Done";
  if (priority === 1) return "Urgent";
  return "To do";
}
```

Special cases first, exit early, normal case last. No `else` needed.

### Scope

Variables declared inside a function exist only inside it. To use a value outside, `return` it and store the result.

### Design check

Before writing a function:

1. **What does it need?** → parameters
2. **What does it give back?** → `return`

If the answer to #2 contains "and", it's probably two functions.

---

## Arrays

```js
const tasks = ["Buy milk", "Call bank", "Pay rent"];
```

### Access

| Expression | Gives |
|---|---|
| `tasks[0]` | First item |
| `tasks[tasks.length - 1]` | Last item |
| `tasks[99]` | `undefined` (no error) |
| `tasks.length` | Number of items |

Indexes start at **0**. Last index is always `length - 1`.

### Change

```js
tasks[1] = "Call mum";   // replace an item by index
```

| Operation | Does | Returns |
|---|---|---|
| `tasks.push(item)` | Add to the end | New length |
| `tasks.pop()` | Remove from the end | The removed item |
| `tasks.unshift(item)` | Add to the start | New length |
| `tasks.shift()` | Remove from the start | The removed item |

All four **change the original array**.

### Check

| Operation | Returns |
|---|---|
| `tasks.includes("Pay rent")` | `true` / `false` |
| `tasks.indexOf("Pay rent")` | Index, or `-1` if not found |
| `Array.isArray(value)` | `true` if it's an array |

`typeof []` returns `"object"` — use `Array.isArray` instead.

---

## Objects

```js
const task = {
  title: "Buy milk",
  isDone: false,
  priority: 1
};
```

### Access

| Expression | Use when |
|---|---|
| `task.title` | You know the property name — default |
| `task["title"]` | Key has spaces/special characters |
| `task[key]` | The property name is stored in a variable |
| `task.missing` | Returns `undefined` (no error) |

### Change

```js
task.isDone = true;        // update existing
task.dueDate = "Friday";   // add new
delete task.dueDate;       // remove
```

### Check

| Expression | Returns |
|---|---|
| `"title" in task` | `true` if the property exists |
| `Object.keys(task)` | Array of property names |
| `Object.values(task)` | Array of values |

### Nested data — reading a path

```js
user.tasks[0].tags[1]
```

- `[ ]` → pick an item from an **array**
- `.` → pick a property from an **object**

Lost? `console.log` each step of the path and look at what you're holding.

### Array vs object

| Array | Object |
|---|---|
| A **list** of similar things | **One thing** with named details |
| Order matters | Each value has a name |
| `tasks[2]` | `task.title` |

---

## Copies vs references

| | Numbers, strings, booleans | Arrays, objects |
|---|---|---|
| Variable holds | The value itself | A reference (directions) to it |
| `b = a` | `b` gets a **copy** | `b` points at the **same** thing |
| Change through `b` | `a` unaffected | `a` sees the change |
| Passed into a function | Function gets a copy | Function can change the original |
| `===` compares | Values | Whether it's the **same** object |

`const` on an array or object stops reassignment, **not** changes to its contents.

---

## Loops

### Which loop

| Loop | Use when |
|---|---|
| `for...of` | Going through every item in an array — **default** |
| `for` | You need the index `i`, or to count / step |
| `while` | You don't know how many times; repeat until a condition changes |
| `for...in` | Going through an object's property names (rare in this course) |

### `for...of`

```js
for (const item of items) {
  // item is the next element each iteration
}
```

### `for`

```js
for (let i = 0; i < items.length; i++) {
  // items[i] is the current element
}
```

Use `<`, not `<=`. Last valid index is `length - 1`.

### `while`

```js
while (condition) {
  // something in here must eventually make condition false
}
```

### `for...in` (objects)

```js
for (const key in task) {
  console.log(key, task[key]);
}
```

Gives property **names**. Don't use it on arrays.

### Control

| Keyword | Does |
|---|---|
| `break` | Exit the loop immediately |
| `continue` | Skip the rest of this iteration, go to the next |
| `return` | Exit the loop **and** the whole function |

### The five patterns

| Pattern | Before loop | Inside loop | Replaced in S6 by |
|---|---|---|---|
| Count | `let count = 0` | `count = count + 1` if match | `filter(...).length` |
| Sum | `let total = 0` | `total = total + x` | `reduce` |
| Find | — | `return item` if match | `find` |
| Filter | `const result = []` | `result.push(item)` if match | `filter` |
| Transform | `const result = []` | `result.push(changed)` | `map` |

Accumulators go **before** the loop, never inside.

---

## Destructuring

### Object destructuring

```js
const task = { title: "Buy milk", isDone: false, priority: 1 };

const { title, isDone } = task;
// title → "Buy milk", isDone → false
```

- Variable names must match property names
- Take only what you need
- Missing property → `undefined`

**Rename:**

```js
const { title: taskTitle } = task;   // taskTitle → "Buy milk"
```

**Default value** if the property is missing:

```js
const { dueDate = "No date" } = task;   // "No date"
```

### Parameter destructuring (the "props" pattern)

```js
function createTaskElement({ title, isDone }) {
  // title and isDone are ready to use
}

createTaskElement(task);   // still pass the whole object
```

Defaults work here too: `function f({ priority = 3 })`.

### Shorthand properties — the reverse

Building an object from variables with matching names:

```js
const title = "Buy milk";
const isDone = false;

const task = { title, isDone };   // { title: title, isDone: isDone }
```

### Array destructuring

Unpack by **position**, with square brackets:

```js
const [first, second] = ["red", "green", "blue"];
// first → "red", second → "green"
```

Names are free — position decides. Skip items with an empty slot: `const [, second] = colours;`

React:

```js
const [tasks, setTasks] = useState([]);
```

---

## Array methods

### Callbacks

A callback is a function passed into another function, to be called later.

```js
tasks.filter(isOpen);       // ✅ pass the function
tasks.filter(isOpen());     // ❌ calls it now, with nothing
tasks.filter((task) => !task.isDone);   // ✅ inline arrow
```

Callback receives `(item, index, array)`. You'll almost always only use `item`.

### Choosing

| Want back | Method | Callback returns | Result |
|---|---|---|---|
| New array, same length, changed | `map` | The new item | Array, same length |
| New array, fewer items | `filter` | `true` / `false` | Array, ≤ length |
| First matching item | `find` | `true` / `false` | Item or `undefined` |
| Index of first match | `findIndex` | `true` / `false` | Index or `-1` |
| Does **any** item match? | `some` | `true` / `false` | `true` / `false` |
| Do **all** items match? | `every` | `true` / `false` | `true` / `false` |
| One combined value | `reduce` | New running value | Anything |
| Nothing — just do something | `forEach` | (ignored) | `undefined` |

### Examples

```js
tasks.map((task) => task.title);
tasks.filter((task) => !task.isDone);
tasks.find((task) => task.priority === 1);
tasks.findIndex((task) => task.title === "Pay rent");
tasks.some((task) => task.isDone);
tasks.every((task) => task.isDone);
tasks.forEach((task) => console.log(task.title));
```

### `reduce`

```js
array.reduce((accumulator, item) => newAccumulator, startingValue);
```

```js
const total = cart.reduce((sum, item) => sum + item.price, 0);
```

Always give a starting value.

### Counting

```js
tasks.filter((task) => !task.isDone).length
```

### Chaining

```js
tasks
  .filter((task) => !task.isDone)
  .map((task) => task.title);
```

Each step receives the previous step's result.

### Mutating vs non-mutating

| Doesn't change the original | **Changes** the original |
|---|---|
| `map`, `filter`, `find`, `findIndex`, `some`, `every`, `reduce`, `forEach`* | `push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, `splice` |

\* `forEach` doesn't change the array itself — but your callback can, if it edits the items.

### `sort` — careful

```js
tasks.sort((a, b) => a.priority - b.priority);   // lowest priority number first
```

- **Mutates** the original array
- Without a callback, sorts as **strings**: `[10, 9, 1].sort()` → `[1, 10, 9]`
- Callback returns negative → `a` first; positive → `b` first

---

## Spread

`...` lays out all items of an array, or all properties of an object.

### Arrays

```js
const more = [...tasks, newTask];      // add to end — new array
const first = [newTask, ...tasks];     // add to start — new array
const copy = [...tasks];               // copy
```

### Objects

```js
const updated = { ...task, isDone: true };   // copy, then override
```

Properties written **after** the spread win.

### Shallow copy

Spread makes a new **outer** array or object. Items inside are the **same** references (Session 4). Changing a nested object through the copy changes it in the original.

### Updating without mutating (React-ready)

| Action | Code |
|---|---|
| Add | `items = [...items, newItem]` |
| Delete | `items = items.filter((i) => i.id !== id)` |
| Update one | `items = items.map((i) => i.id === id ? { ...i, done: true } : i)` |

React re-renders only when state is a **new** object/array (`===` reference check). Mutating in place → no update, no error.

---

## DOM

### Script setup

```html
<script src="app.js" defer></script>
```

`defer` = run after the HTML is built. Without it, selectors can return `null`.

### Selecting

| Method | Returns | Not found |
|---|---|---|
| `document.querySelector("#id")` | First match | `null` |
| `document.querySelector(".class")` | First match | `null` |
| `document.querySelector("li")` | First match | `null` |
| `document.querySelectorAll(".item")` | All matches (a NodeList) | Empty NodeList |
| `document.getElementById("id")` | Element (no `#`) | `null` |

`querySelectorAll` returns a NodeList — it has `forEach` and `length`, but not `map`/`filter`.

You can search inside an element too: `list.querySelector("li")`.

### Reading and changing

| Property / method | Does |
|---|---|
| `el.textContent` | Get/set text. **Safe for user data** |
| `el.innerHTML` | Get/set HTML. **Never with user data** — runs as code |
| `el.classList.add("x")` | Add a class |
| `el.classList.remove("x")` | Remove a class |
| `el.classList.toggle("x")` | Add if missing, remove if present |
| `el.classList.contains("x")` | `true` / `false` |
| `el.className = "a b"` | Replace all classes |
| `el.id = "x"` | Set the id |
| `el.setAttribute("href", url)` | Set any attribute |
| `el.getAttribute("href")` | Read any attribute |
| `el.style.color = "red"` | Inline style — prefer classes |

### Creating and placing

| Method | Does |
|---|---|
| `document.createElement("li")` | Create (in memory, not on the page) |
| `parent.append(child)` | Add as last child — **now visible** |
| `parent.prepend(child)` | Add as first child |
| `el.remove()` | Remove from the page |
| `parent.textContent = ""` | Remove all children |
| `parent.replaceChildren()` | Remove all children (alternative) |

### The render pattern

```js
const list = document.querySelector("#list");

function createItemElement({ title }) {
  const item = document.createElement("li");
  item.textContent = title;
  return item;               // data in, element out
}

function render() {
  list.textContent = "";     // 1. clear
  items.forEach((item) => {  // 2. loop the data
    list.append(createItemElement(item));   // 3. append
  });
}

render();
```

Data is the source of truth. The page is drawn from it.

### DevTools

**F12 → Elements** — see the live DOM, watch your changes happen.

---

## Events

### Listening

```js
element.addEventListener("eventName", callback);
```

```js
button.addEventListener("click", handleClick);     // ✅ pass the function
button.addEventListener("click", handleClick());   // ❌ runs once, now
button.addEventListener("click", () => doThing(id));   // ✅ arrow when you need arguments
```

### Common events

| Event | Fires when | Usually on |
|---|---|---|
| `click` | Element is clicked | Buttons, any element |
| `submit` | Form is submitted (button click **or** Enter) | `<form>` |
| `input` | Value changes, every keystroke | `<input>`, `<textarea>` |
| `change` | Value is committed (dropdown picked, checkbox ticked, input loses focus) | `<select>`, checkboxes |
| `keydown` | A key is pressed | `document`, inputs |

### The event object

The browser passes it as the callback's first argument.

| Property / method | Gives / does |
|---|---|
| `event.preventDefault()` | Stop the default behaviour — **always on form submit** |
| `event.target` | The element the event happened on |
| `event.key` | Which key (`"Enter"`, `"Escape"`, `"a"`) — keyboard events |

### Forms and input

| Code | Gives |
|---|---|
| `input.value` | Current text — **always a string** |
| `input.value = ""` | Clear the input |
| `select.value` | Selected option's `value` — **always a string** |
| `checkbox.checked` | `true` / `false` |
| `Number("5")` | `5` — convert a string to a number (`NaN` if it can't) |
| `"  hi  ".trim()` | `"hi"` — remove spaces from both ends |

### Ids

```js
{ id: Date.now(), title, isDone: false }
```

`Date.now()` — milliseconds since 1970. Unique enough for items created by clicks.

### The interaction loop

```
data ──► render() ──► page ──► user event ──► change data ──► render() ...
```

Every handler: **change the data, then call `render()`.** Never patch the page directly.

### Where listeners go

Inside the function that creates the element. `render` replaces elements, and listeners on old elements are lost with them.

---

## localStorage and JSON

### localStorage

| Method | Does | Returns |
|---|---|---|
| `localStorage.setItem(key, value)` | Save under `key` | — |
| `localStorage.getItem(key)` | Read | The string, or `null` if never saved |
| `localStorage.removeItem(key)` | Delete one key | — |
| `localStorage.clear()` | Delete **everything** for this site | — |

- Stores **strings only**. Anything else is converted — arrays/objects badly
- Per site, per browser, per device. Not synced anywhere
- Survives refresh and browser restart. Cleared if the user clears site data
- ~5 MB per site
- **Not secure** — never store passwords or sensitive data

**DevTools → Application → Local Storage** — view, edit, delete keys.

`sessionStorage` has the same methods but is wiped when the tab closes.

### JSON

| Function | Direction | Use |
|---|---|---|
| `JSON.stringify(data)` | Data → string | Before saving / sending |
| `JSON.parse(text)` | String → data | After reading / receiving |

```js
JSON.stringify({ id: 1, title: "Buy milk" })
// '{"id":1,"title":"Buy milk"}'

JSON.parse('{"id":1,"title":"Buy milk"}')
// { id: 1, title: "Buy milk" }
```

JSON rules (what survives the round trip):

| Survives | Doesn't |
|---|---|
| Strings, numbers, booleans, `null` | `undefined` — property is dropped |
| Arrays, plain objects, nested | Functions — dropped |
| | Object identity — parsed objects are always new |

Keys and strings must use **double quotes** in JSON text.

`JSON.parse` on invalid text **throws** a `SyntaxError`.

### Save / load pattern

```js
function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function loadItems() {
  const saved = localStorage.getItem("items");
  if (saved === null) return [];
  return JSON.parse(saved);
}

let items = loadItems();
```

### The loop, updated

```
change data ──► save ──► render
```

---

## Async, fetch and axios

### async / await

```js
async function load() {
  const value = await somethingThatTakesTime();
}
```

| Keyword | Means |
|---|---|
| `await` | Pause **this function** until the Promise resolves; give me the value |
| `async` | Required on any function that uses `await`. It always returns a Promise |

Missing `await` → you get `Promise { <pending> }` instead of the value.

### Errors: try / catch / throw

```js
try {
  // might fail
} catch (error) {
  // runs only if something in try threw
}
```

```js
throw new Error("Something went wrong");   // raise an error on purpose
```

### fetch — GET

```js
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const data = await response.json();
```

### fetch — POST (sending data)

```js
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Buy milk" })
});
```

### axios

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
<script src="app.js" defer></script>
```

```js
const { data } = await axios.get(url);
const { data } = await axios.post(url, { title: "Buy milk" });
const { data } = await axios.put(url, { title: "Updated" });
await axios.delete(url);
```

### fetch vs axios

| | `fetch` | `axios` |
|---|---|---|
| Source | Built into the browser | Library (CDN / npm) |
| Parse JSON | `await response.json()` | Already done — `response.data` |
| 4xx / 5xx errors | **Not** thrown — check `response.ok` | Thrown automatically |
| Send JSON | `JSON.stringify` + header | Pass the object |
| Status code | `response.status` | `response.status` / `error.response.status` |

### Request methods

| Method | Means | Example |
|---|---|---|
| `GET` | Read | Get all tasks |
| `POST` | Create | Add a task |
| `PUT` / `PATCH` | Update (whole / part) | Edit a task |
| `DELETE` | Delete | Remove a task |

### Status codes

| Range | Means | Common |
|---|---|---|
| 2xx | Success | `200` OK, `201` Created |
| 4xx | **Your** request was wrong | `400` bad request, `401` not logged in, `404` not found |
| 5xx | **The server** broke | `500` server error |

### Loading / error pattern

```js
let statusMessage = "";

async function loadData() {
  statusMessage = "Loading…";
  render();

  try {
    // fetch or axios, then translate + update data
    statusMessage = "";
  } catch (error) {
    console.error(error);
    statusMessage = "Something went wrong.";
  }

  render();
}
```

### Translate API data to your shape

```js
const items = apiData.map((thing) => ({
  id: thing.id,
  label: thing.name
}));
```

Short arrow returning an object: **wrap it in `( )`**. Without them: `SyntaxError` for a multi-property object, or a silent array of `undefined` for a single-property one.

**First time using any API: `console.log` the whole response before writing paths into it.**

### CORS

If the console mentions CORS, the API doesn't accept requests from browser pages. It's a server setting, not a bug in your code. Use a different API.

---

## Starting a project

### The master key — answer in English, in order

| # | Question | Becomes |
|---|---|---|
| 1 | What does the user see and do? | Screen + list of actions (verbs) |
| 2 | What's the data? Write one example item | Your data array |
| 3 | What changes the data? | One function per action |
| 4 | How is the data drawn? | `createItemElement` + `render` |
| 5 | What triggers each change? | Element → event → function |
| 6 | Does it need to survive a refresh? | `save` / `load` |
| 7 | Does it need outside data? | API call + translate to your shape |

For each function: what does it need (parameters)? What does it give back or change? Which array method?

### Build order

1. Hard-coded data
2. `createItemElement` + `render` — see it on the page
3. One action, fully wired (data change + listener) — test it
4. Next action — repeat
5. `save` + `load` — replace the hard-coded data
6. API call

**The app runs after every step.**

### Skeleton

```js
// ---------- data ----------
let items = [];

// ---------- storage ----------
function saveItems() {}
function loadItems() {}

// ---------- data changes ----------
// one per action — each ends: save, render

// ---------- drawing ----------
function createItemElement(item) {}
function render() {}

// ---------- listening ----------

render();
```

---

## Debugging

1. **Read the error** — file and line, error type, `null` (page) vs `undefined` (data)
2. **No error? Log the value** just before where it goes wrong — check value, `typeof`, and shape
3. **Check the loop** — change → save → render. Which link is broken?
4. **Still stuck? Trace** ten lines on paper. Where your trace and the console disagree is the bug

| Symptom | Likely cause |
|---|---|
| Click does nothing | No listener, or `fn()` instead of `fn` |
| Data changes, page doesn't | `render()` not called |
| Refresh undoes changes | `save` missing or before the change |
| Buttons stop after re-render | Listener outside the component |
| Number maths gives strings | Value came from input / storage — `Number()` |

Never change things at random until it works.

---

## Console

| Method | Does |
|---|---|
| `console.log(value)` | Print a value |
| `console.log(a, b)` | Print several, comma-separated |
| `console.error(value)` | Print as an error (red) |
| `console.table(value)` | Print as a table — useful from Arrays onward |

Open it: **F12** or **Cmd+Option+J** (Mac) / **Ctrl+Shift+J** (Windows), then the Console tab.

---

## Common errors

| Error | Cause |
|---|---|
| `ReferenceError: x is not defined` | Variable never declared, or misspelled |
| `TypeError: Assignment to constant variable` | Reassigned a `const` |
| `SyntaxError: Identifier 'x' has already been declared` | Declared the same name twice |
| `SyntaxError: Unexpected token` | Missing bracket, brace, quote or comma |
| `ReferenceError` on a variable you did declare | Declared inside `{ }`, used outside it |
| `if` branch always runs, no error | `=` instead of `===` in the condition |
| `else if` branch never runs, no error | An earlier condition already catches those cases |
| `undefined` where you expected a value | Function has no `return`, or a path through it doesn't reach one |
| Logs `ƒ name(...)` / `[Function]` | Missing `()` — referenced the function instead of calling it |
| `ReferenceError: Cannot access 'x' before initialization` | Used a `const`/`let` (including an arrow function) above the line that creates it |
| Function "does nothing", no error | Defined but never called |
| `TypeError: Cannot read properties of undefined (reading 'x')` | Whatever is *before* `.x` is `undefined`. Check the step before |
| `undefined` from an array or object | Index past the end, or misspelled property name |
| A value changed that you didn't touch | Two variables reference the same array/object |
| Count/total resets or stays tiny | Accumulator declared inside the loop |
| Loop runs only once | `return` inside the loop fired on the first item |
| Browser tab freezes | Infinite `while` loop |
| `map` gives an array of `undefined` | Callback doesn't return — check for `{ }` without `return` |
| Crash inside a callback, or `... is not a function` | Called the callback with `()` instead of passing it |
| `Cannot read properties of undefined` after `find` | Nothing matched — `find` returned `undefined` |
| `Cannot read properties of null` | `querySelector` found nothing — selector typo, missing `#`/`.`, or no `defer` |
| Element created but not visible | Never `append`ed |
| List duplicates on every render | `render` doesn't clear first |
| Page shows `[object Object]` | Put a whole object into `textContent` |
| Handler runs on page load, not on click | `addEventListener("click", fn())` — remove the `()` |
| Page reloads on submit, data vanishes | Missing `event.preventDefault()` |
| Data changes but page doesn't | Handler didn't call `render()` |
| Number comparison fails for user input | `.value` is a string — use `Number()` |
| Buttons stop working after re-render | Listeners attached outside the element-creating function |
| `[object Object]` in localStorage | Saved without `JSON.stringify` |
| `.forEach` / `.map is not a function` after loading | Read without `JSON.parse` |
| `SyntaxError: Unexpected token ... in JSON` | Parsing text that isn't JSON — clear the key in DevTools |
| Crash on first visit after adding storage | `getItem` returned `null` and wasn't handled |
| `Promise { <pending> }` / data properties `undefined` | Missing `await` |
| `await is only valid in async functions` | Function missing `async` |
| 404 with `fetch`, no error | Check `response.ok` |
| `Failed to fetch` / `Network Error` | Offline, wrong URL, server down |
| CORS error | API blocks browsers — choose another API |
| `axios is not defined` | Script tag missing or after `app.js` |
| `.map` building objects returns `undefined` | Arrow returning `{}` needs `({ })` |
| "Loading…" stuck forever | No `try/catch`, or status not reset |
| React screen doesn't update after a change | State was mutated (`push`, `obj.x = ...`) instead of replaced |
| Changing a "copy" changed the original | Spread is shallow — nested objects are shared |
