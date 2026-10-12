# Session 01 — exercise

_Due before the next session._

### 1. Parsons

Goal output: `Cart: 2 items, total 30`

```
A   const cartTotal = itemCount * itemPrice;
B   const itemPrice = 15;
C   console.log(`Cart: ${itemCount} items, total ${cartTotal}`);
D   const itemCount = 2;
X   const cartTotal = itemCount + itemPrice;
Y   console.log(`Cart: ${itemCount} items, total ${itemCount * itemPrice}`);
```

`X` gives the wrong total. `Y` actually works — it produces the right output — but leaves `A` unused and skips the variable. If a mentee picks `Y` and explains why, that's a good answer. If they pick it without noticing `A` is left over, ask what `cartTotal` is for.

### 2. Modify

> Take your Make task. Change the price so it's stored as a **string** — `"4"` instead of `4` — as if it had come from a form. Run your code. Then add these two lines and predict each before running:
>
> ```js
> console.log(price * 2);
> console.log(price + 2);
> ```
>
> Post both results in #lvl-2-homework-or-exercise-subm, with one sentence on why they're different.

---

**Submit in `#lvl-2-homework-or-exercise-subm` before the next session.**

Stuck? _"I got stuck at \_\_\_ and here's what I tried"_ is a great question — post it.
