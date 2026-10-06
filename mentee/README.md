# LetPhil — Level 2

Everything for Level 2 lives here. New material appears as the course runs, so **pull before every class**.

---

## First time

```bash
git clone <this repo>
cd W-13-LetPhiilMentorship
```

Then read **`START-HERE.md`**. It explains how a week works, what's due when, and what to install.

## Every session

```bash
git pull
```

New things appear: that session's folder before class, and its `exercise.md` after class.

---

## One rule: don't work inside this repo

**Copy the session folder into your own repo, and work there.**

```
your-repo/
  session-03/        ← copied from here
  expense-tracker/   ← your app
```

If you edit files inside this clone, the next `git pull` will fight you for them. Keep this folder read-only and your work somewhere that's yours.

---

## The twelve sessions

| Folder                              | Session                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `01-variables-data-types-operators` | Variables, data types, operators                     |
| `02-conditionals`                   | Conditionals                                         |
| `03-functions`                      | Functions                                            |
| `04-arrays-objects`                 | Arrays and objects — _your app starts_               |
| `05-loops-destructuring`            | Loops and destructuring                              |
| `06-array-methods`                  | Array methods — _checkpoint · app part 1 due_        |
| `07-dom`                            | The DOM and props — _app part 2 starts_              |
| `08-event-listeners`                | Event listeners                                      |
| `09-localstorage`                   | localStorage and JSON — _part 2 due · part 3 starts_ |
| `10-fetch-axios`                    | APIs: fetch and axios                                |
| `11-putting-it-together`            | Putting it together — _part 3 due · live check_      |
| `12-review-and-react`               | Review and the road to React                         |

---

## What's in a session folder

| File          | What                                                   |
| ------------- | ------------------------------------------------------ |
| `README.md`   | The lesson page. **Read it before class**              |
| `index.html`  | Open this in a browser, then press F12 for the Console |
| `predict.js`  | Your before-class prediction snippet                   |
| `parsons.js`  | The line-ordering puzzle                               |
| `make.js`     | What you build in class, and the exercise              |
| `exercise.md` | Your homework. **Appears after class**                 |

`index.html` loads one file at a time. To switch, change this line and reload:

```html
<script src="make.js" defer></script>
```

**Don't paste code into the console to run it.** The same snippet twice gives `Identifier 'x' has already been declared` — your code is fine, the page just hasn't reloaded. Edit, save, reload instead.

From session 7 the page stops being blank and becomes the thing you're building.

---

## Also here

- **`REFERENCE.md`** — syntax lookup for the whole course. For looking things up, never for memorising. It covers all twelve sessions, so something being in there doesn't mean it's ready to use yet
- **`milestones/`** — the briefs for your Expense Tracker, due at sessions 6, 9 and 11

---

## Where things go

| What            | Where                                                              |
| --------------- | ------------------------------------------------------------------ |
| Prediction      | That session's Google Form — link in the **wave-13** chat          |
| Exercise        | **#lvl-2-homework-or-exercise-subm**                               |
| Expense Tracker | Your own repo, link posted in **#lvl-2-homework-or-exercise-subm** |
| Final project   | **#lvl-2-final-projects**                                          |
