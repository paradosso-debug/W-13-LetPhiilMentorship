# Start Here

**JavaScript Fundamentals — 12 sessions, 6 weeks.**
At the end of it you'll have built a real app, and you'll be ready for React.

Read this once, before session 1. Ten minutes.

---

## How this course works

You won't be watching someone code. Most sessions, **you'll be the one typing**.

Every session follows the same rhythm:

**Before class** — read that session's README (about ten minutes) and submit one **prediction**: a short piece of code, and what you think it does. Don't run it. Just decide, and say why.

**In class** — we start from your predictions. We run the code, find out who was right, and dig into why. Then you write code: small puzzles first, then something of your own.

**After class** — a short exercise, and work on your own app.

---

## Why predictions

Because **committing to an answer and being wrong teaches you more than reading the right answer.**

That's not a motivational line — it's why the course is built this way. When you predict `15` and the answer is `105`, you remember it. When you read that `+` behaves differently with strings, you forget it by Thursday.

So: **being wrong is expected and useful.** Nobody sees your prediction but your mentor. Nobody is scored on them. What matters is that you decide before you find out.

**The form closes when class starts.** If you haven't submitted, you sit out the first part of the session — there's nothing for you to do in it, because it's built around answers you didn't give.

### What the form asks

Four things: your name, your prediction, **why**, and **how sure you are** on a scale of 1 to 5.

The last two matter as much as the answer.

- **The "why" is the real question.** A right answer with no reasoning tells your mentor nothing. A wrong answer with clear reasoning tells them exactly what to explain
- **Answer the confidence question honestly** — really honestly. If you're guessing, put 1. Nobody thinks less of a 1, and there's no advantage to inflating it

Why that second one matters: **confident and wrong** means you've got a rule in your head that isn't right, and it'll keep producing wrong answers until someone finds it. **Unsure and right** usually means a lucky guess. Those two need completely different help, and the only way your mentor can tell them apart is if you're straight about it.

---

## What you need

**A code editor** — VS Code is the usual choice, and it's free.

**A browser with DevTools** — Chrome, Edge or Firefox. Press **F12** to open them. You'll live in the Console tab.

**Nothing else.** No installs, no frameworks, no build tools. Plain JavaScript in a folder.

**One workflow for the whole course:** a folder with your JavaScript files and one `index.html` that loads whichever one you're working on. Save the file, open `index.html` in a browser, read the Console. To switch files, change one line in the HTML and reload.

For sessions 1–6 the page itself stays blank — everything happens in the console. From session 7 the page is the point, and you'll add `style.css` alongside. Your mentor will set the folder up with you in session 1.

**Don't paste code into the console to run it.** Run the same snippet twice and you'll get `Identifier 'x' has already been declared` — your code is fine, the page just hasn't reloaded. Edit, save, reload instead.

---

## The two apps

**The Task Tracker** — we build this together in class, one piece per session. You'll see it grow from three variables into an app that saves your tasks and talks to the internet.

**The Expense Tracker** — you build this one, alone. It's the same shape with different data, and it comes in three milestones:

| | Due | What it does by then |
|---|---|---|
| **M1** | Session 6 | Runs in the console: your data, and functions that understand it |
| **M2** | Session 9 | Has a screen. You can add, mark paid and delete |
| **M3** | Session 11 | Remembers everything after a refresh, and fetches live data |

Each brief arrives when you have the tools for it. Don't start early — you'll be missing the pieces.

**Each milestone gives you less help than the last.** M1 comes with a full worked example. M2 comes with a skeleton to fill in. M3 comes with a description and nothing else. That's on purpose: by the end you should be able to start from a blank folder, because that's what React will expect.

---

## Homework — what's due, and when

Two kinds, and they're different sizes.

### After every class: a short exercise (20–30 minutes)

Posted in **#lvl-2-homework-or-exercise-subm** after each session, and due before the next one. Always two small things:

- **A line-ordering puzzle.** You get the right lines, scrambled, usually with a wrong line mixed in. Put them in order and run it
- **One change to what you built in class.** Predict what it'll do *before* you run it, then run it

They're short on purpose. The point is to touch the ideas again a day later, not to spend an evening on them.

### Across the course: your Expense Tracker

Not every week — it's staged, with three deadlines:

| Due | What | Mostly worked on |
|---|---|---|
| Session 6 | Part 1 — console only | Weeks 2–3 |
| Session 9 | Part 2 — on screen, working | Week 4 |
| Session 11 | Part 3 — saves, and fetches live data | Weeks 5–6 |

Week 1 is almost entirely short exercises. Part 1 only starts after session 4, once you've got the pieces for it.

### Where everything goes

| What | Where |
|---|---|
| Prediction | That session's Google Form — link in the **wave-13** chat |
| Short exercise | **#lvl-2-homework-or-exercise-subm** |
| Expense Tracker | Push to your GitHub repo, post the link in **#lvl-2-homework-or-exercise-subm** |
| Final project | **#lvl-2-final-projects** |

### These deadlines are real

Each session is built on the one before it. Falling behind on part 1 makes part 2 harder than it needs to be, and the short exercises are what make the next class make sense.

**Stuck or behind? Say so early.** A missed deadline is a conversation. A silent one becomes a problem.

---

## The files you have

| File | What it's for |
|---|---|
| `lessons/01` … `lessons/12` | One per session. Read before class |
| `REFERENCE.md` | Syntax lookup for the whole course. **Not for reading start to finish** |
| `milestones/` | Your app briefs, handed out as you reach them |

**`REFERENCE.md` is meant to be looked up, never memorised.** When you can't remember what `%` does or which method returns what, search it. Professional developers look things up constantly — the skill is knowing what to look for, not holding it all in your head.

One warning: the reference covers the **whole** course. Something being in there doesn't mean it's ready to use yet. If it isn't in a README you've already read, leave it.

---

## Two things you'll be asked to do

**Session 6: a checkpoint.** Ten minutes, closed notes, code you haven't seen. Predict what it does and explain why. It isn't graded and nobody else sees it — it tells your mentor where to spend the second half of the course.

**Session 11: a live check.** Ten minutes, your own app, one small feature, your mentor watching while you add it.

Neither is a test of speed or memory. Both check the same thing: **can you read code and find your way around it?**

Which brings us to the one piece of advice worth more than everything else in this page.

---

## About getting help

You'll get stuck. Everyone does. Getting help is normal and you should do it.

But there's a difference between help that teaches you and help that finishes your task. If an AI writes your milestone, you'll have a working app and no idea how it works — and in session 11 you'll be asked to change it while someone watches. That's an uncomfortable ten minutes, and the real cost comes later: React assumes you can read your own code, every single day.

**A simple rule:** if you can't explain a line you're about to submit, don't submit it yet. Ask what it does first — of your mentor, of the wave-13 chat, or of the AI itself.

*"I got stuck at ___ and here's what I tried"* is a great question and always worth asking.

---

## Before session 1

1. Install VS Code, or have an editor ready
2. Open your browser's DevTools (**F12**) and find the **Console** tab
3. Type `2 + 2` in it and press Enter. That's your first line of JavaScript — the console is for quick one-liners like this; your actual work goes in files
4. Read `lessons/01-variables-data-types-operators.md`
5. Submit the prediction at the bottom of it, through the form link your mentor sent

See you in class.
