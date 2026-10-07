# LetPhil — Level 2

Everything for Level 2 lives here. New material appears as the course runs — a session's exercise after each class, and your app briefs along the way — so **get the latest copy before every class**.

---

## Getting the files

Two ways. **Same files either way** — pick whichever you're comfortable with.

### 🟢 Easiest — download the ZIP

Green **Code** button → **Download ZIP** → extract it. That's your Level 2 folder for the whole course.

When new material appears, download the ZIP again, open it, and **drag across only the new material** — don't re-extract the whole thing over your folder.

What's actually new each time:

| When | What to copy across |
|---|---|
| After every class | That session's `exercise.md` |
| After sessions 4, 7 and 9 | The new files in `milestones/` |

**If your computer asks whether to replace an existing file, say no.** Nothing already in your folder changes — only new files get added. A "replace?" prompt means you're about to overwrite something, and if you've typed in that file, it's gone.

### 🔵 If you know git — clone it

```bash
git clone <this repo>
cd letphil-level-2
```

Then before each class:

```bash
git pull
```

New material appears; your edits to the working files survive, because those files never change after they're published.

**If git is new to you, start with the ZIP.** We'll move everyone over around session 3, once you've made and pushed your own repo.

---

## Where your work actually belongs

**Not in here.** Copy the session folder into your own project folder and work there.

```
your-repo/
  session-03/          ← copied from here
  expense-tracker/     ← your app
```

Typing directly into these files is fine for a quick try, but it isn't safe:

| | What happens to your work |
|---|---|
| **ZIP** | Safe if you only drag across new files — gone if you re-extract over the folder |
| **Git** | Survives — but `git pull` will fight you if a file ever does change |

The copy-out habit avoids both. It's one drag of a folder.

---

## The twelve sessions

| Folder | Session |
|---|---|
| `01-variables-data-types-operators` | Variables, data types, operators |
| `02-conditionals` | Conditionals |
| `03-functions` | Functions |
| `04-arrays-objects` | Arrays and objects — *your app starts* |
| `05-loops-destructuring` | Loops and destructuring |
| `06-array-methods` | Array methods — *checkpoint · app part 1 due* |
| `07-dom` | The DOM and props — *app part 2 starts* |
| `08-event-listeners` | Event listeners |
| `09-localstorage` | localStorage and JSON — *part 2 due · part 3 starts* |
| `10-fetch-axios` | APIs: fetch and axios |
| `11-putting-it-together` | Putting it together — *part 3 due · live check* |
| `12-review-and-react` | Review and the road to React |

---

## What's in a session folder

| File | What |
|---|---|
| `README.md` | The lesson page. **Read it before class** |
| `index.html` | Open this in a browser, then press F12 for the Console |
| `predict.js` | Your before-class prediction snippet |
| `parsons.js` | The line-ordering puzzle |
| `make.js` | What you build in class, and the exercise |
| `exercise.md` | Your homework. **Appears after class** |

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

| What | Where |
|---|---|
| Prediction | That session's Google Form — link in the **wave-13** chat |
| Exercise | **#lvl-2-homework-or-exercise-subm** |
| Expense Tracker | Your own repo, link posted in **#lvl-2-homework-or-exercise-subm** |
| Final project | **#lvl-2-final-projects** |
