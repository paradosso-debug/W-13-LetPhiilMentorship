# Session 1 — Variables, Data Types, Operators

**Read before class. ~12 minutes.**
**Two things to do at the bottom. Both matter.**

> Syntax tables, full type lists and operator lists live in `REFERENCE.md`. Don't memorise them — look them up. This file is about *why* each thing exists and *what breaks without it*.

---

## Why this session exists

Every program is the same thing underneath: **values sitting in boxes, and those boxes changing over time.**

The syntax below is easy. The skill that's actually hard is being able to stop at any line and say *what is in each box right now*. Professional debugging is almost entirely this. When you hit week 5 and your API data renders as `undefined`, the fix won't come from knowing more syntax — it'll come from tracing where the value changed.

Everything in this file exists to serve that one skill.

---

## `console.log` — your only window

A running program is invisible. `console.log` is how you look inside it.

```js
let count = 3;
console.log(count);   // 3
```

You'll use this in every session for the next six weeks. When something behaves strangely, the first move is always the same: log the value and look at it. Not re-read the code — *look at the value*.

---

## 1. Variables — so a value has one home

```js
let taskName = "Buy milk";
const maxTasks = 10;
```

Without variables you'd repeat the same value everywhere and have to change it in twelve places. With them, the value lives in one place and everything else points at it.

**`let` vs `const`:** `let` can be reassigned, `const` can't.

```js
let count = 0;
count = 1;        // fine

const limit = 5;
limit = 6;        // TypeError
```

**Why `const` by default:** it's a safety net. The nastiest bug class in any codebase is *something changed and I don't know what changed it*. `const` makes that impossible for values that shouldn't move — the error fires the moment you try, instead of surfacing three hours later as wrong output. Reach for `let` only when you know the value changes.

You'll see `var` in older tutorials. Don't write it.

---

## 2. Naming — you're writing for week 5

```js
const d = true;              // meaningless in two days
const isDone = true;         // clear forever
```

- **camelCase:** `taskName`, `isCompleted`, `totalCount`
- **Booleans start with `is` or `has`:** `isDone`, `hasDueDate`. Reading `if (isDone)` tells you it's a yes/no without checking anything.
- **Say what it holds.** `x` and `data` and `temp` are how you lose an hour.

This sounds like a style nag. It isn't — in week 6 you'll debug code you wrote in week 2, and names are the only thing carrying your intent across that gap.

---

## 3. Data types — because type decides what an operation *means*

Every value has a type, and JavaScript uses that type to decide what your code does.

The five you need now: **string** (`"Buy milk"`), **number** (`42`), **boolean** (`true`), **undefined**, **null**. Full table in `REFERENCE.md`.

**The real-world reason this matters:** three sources feed almost every app you'll build —

- a form input
- `localStorage`
- an API response

**All three hand you strings.** Type a number into an input box and you get `"5"`, not `5`. Save `10` to `localStorage`, read it back, you get `"10"`. This is the single most common bug in week 4 and week 5, and it starts here.

### `typeof` — a debugging instrument, not trivia

```js
console.log(typeof "Buy milk");  // "string"
console.log(typeof 42);          // "number"
```

You won't sprinkle `typeof` through working code. You reach for it at one specific moment: **a value is behaving strangely and you want to know what it actually is.** Your number won't add up? `typeof` tells you it's a string. That's the whole job.

One landmine to know now, because it looks like a bug:

```js
console.log(typeof null);   // "object"  ← wrong, and never getting fixed
```

It's a mistake from 1995 that can't be corrected without breaking the web. Recognise it, move on.

### `null` vs `undefined` — different causes

```js
let assignedTo;          // undefined — never given a value
let dueDate = null;      // null — deliberately empty
```

Real-world: an API sends `null` for a field the user left blank — that's *the server saying "nothing here."* You get `undefined` when **your own code** never set the value, or you asked for something that doesn't exist. Same symptom on screen, completely different fix. `undefined` means look at your code; `null` means look at your data.

---

## 4. Type coercion — the thing that will bite you

Most languages stop you when you mix types. **JavaScript converts instead, silently, and keeps going.** This is called **type coercion**, and it's the source of a large share of confusing JS bugs.

```js
"5" * 2     // 10   ← the string became a number
"10" - 1    // 9    ← same
```

No error, no warning. JS decided what you meant.

Sometimes that saves you. Often it hands you a wrong value that travels three functions before it causes a visible problem — and by then the line that actually broke is long gone.

**`+` is the one to watch.** It has two different jobs: adding numbers, and joining strings.

```js
5 + 3            // 8    — adding
"Task: " + "Buy milk"   // "Task: Buy milk" — joining
```

So when `+` gets one of each, it has to pick a job. **Which one it picks is your prediction question at the bottom of this file.** Decide before you run it.

Coercion is also the entire reason the next section exists.

---

## 5. Operators — what each group is actually for

### Arithmetic

Standard, except `%` (remainder):

```js
10 % 3   // 1
```

Real-world uses: "is this even?" (`n % 2 === 0`), striping every other table row, "every 3rd item", pagination. It looks pointless now and you'll use it constantly later.

### Assignment — read it right-to-left

```js
count = count + 1;
```

This is not a claim that both sides are equal — that reading makes it look like nonsense. It's an instruction: **work out the right side, then put the result in the box on the left.** Getting this reading right is most of tracing.

`count += 1` is the same thing, shorter.

### Comparison — and why `===` exists

Comparisons produce `true` or `false`. There are two equality operators, and the difference is coercion:

```js
5 === "5"    // false — different types, so not equal
5 == "5"     // true  — == coerces the string first, then compares
```

`==` runs coercion before comparing. That sounds convenient — a form gives you `"18"`, and `age == 18` passes without extra work.

The problem is that its rules aren't consistent:

```js
0 == ""              // true
0 == "0"             // true
"" == "0"            // false   ← so "" equals 0, and "0" equals 0, but "" doesn't equal "0"
null == undefined    // true
```

Three values that should relate sensibly, and don't. Nobody memorises this table, which means nobody can reliably predict `==`. **Use `===` always.** When you genuinely need to compare a string to a number, convert it yourself, deliberately, so the conversion is visible in the code.

The rule isn't arbitrary caution — it's that `===` can't surprise you and `==` can.

### Logical

```js
isDone && isUrgent    // AND — both true
isDone || isUrgent    // OR  — at least one true
!isDone               // NOT — flips it
```

These are how you'll build real conditions next session: "show it if it's not done **and** it's due today."

---

## 6. Template literals — readability

Joining with `+` falls apart fast:

```js
"Task: " + name + " (" + count + " left)"
```

Backticks with `${}` do the same job readably:

```js
const name = "Buy milk";
const count = 3;

console.log(`Task: ${name} (${count} left)`);
```

Use these from now on. You'll still see `+` in other people's code, so you need to recognise both.

---

## Where this lands in the project

The Task Tracker starts here — one task, described entirely by variables:

```js
const taskName = "Buy milk";
const isDone = false;
let priority = 2;
```

No structure around it yet. Every session adds one layer to exactly this.

---

## Errors you will hit this week

| Error | What it means |
|---|---|
| `Uncaught ReferenceError: x is not defined` | Used a variable you never declared, or misspelled it |
| `Uncaught TypeError: Assignment to constant variable` | Tried to reassign a `const` |
| `Uncaught SyntaxError: Identifier 'x' has already been declared` | Declared the same variable twice with `let`/`const` |
| No error, but the value is wrong | Almost always coercion. Run `typeof` on it |

That last row is the dangerous one. **An error message is a good day** — it tells you where to look. Silent wrong values are the ones that cost hours.

---

## Before class — do both

### 1. Trace this on paper

Don't run it. Write down the value of `a` and `b` after **each** line:

```js
let a = 5;
let b = a;

a = 10;
b = b + 1;
a = a + b;
```

Line 5 is where people go wrong. Bring what you wrote — we'll compare in class.

### 2. Submit your prediction

Submit it using **this session's form link** from your mentor. Nobody else sees your answer — and once class starts, the form closes and you can't change it. So commit to what you actually think.

Don't run this either. Decide what it prints and submit your answer **with your reasoning**:

```js
let total = 10;
let added = "5";

total = total + added;

console.log(total);
console.log(typeof total);
```

Two lines is enough:

> I think it logs ___ and ___, because ___

Being wrong is expected and useful — a wrong prediction you committed to is worth more than a right answer you looked up. Not submitting means you sit out the first part of class.
