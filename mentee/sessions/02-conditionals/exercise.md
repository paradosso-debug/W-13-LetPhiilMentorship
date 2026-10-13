# Session 02 — exercise

_Due before the next session._

### 1. Parsons

Goal output: `Grade: B` when `score` is `85`.

```
A   else if (score >= 80) 
B   const score = 85;
C   if (score >= 90) {
D   grade = "B";
E   let grade = "";
F   grade = "A";
G   } else {
H   grade = "C";
I   }
J   console.log(`Grade: ${grade}`);
X   if (score >= 80) 
Y   if (score = 90) 
```

Trap `X` is the important one. A mentee who picks it and only tests `85` gets the right output with wrong code. That's the real-world version of this bug.

### 2. Modify

> Take your shipping calculator. Add a rule: **orders over $500 always ship free, even international.**
>
> Before you write any code, decide where the new check goes in your chain and write one sentence explaining why. Then add it, and test it with an international order of $600.

---

**Submit in `#lvl-2-homework-or-exercise-subm` before the next session.**

Stuck? _"I got stuck at \_\_\_ and here's what I tried"_ is a great question — post it.
