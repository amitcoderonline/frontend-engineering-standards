# Better Prompts, Better Context: Getting Useful Answers Out of Claude

Most disappointing answers from Claude trace back to one thing: not enough context, not a weak model. Here's how to fix that, with Next.js examples.

## The core idea

Claude can't see your project, your intentions, or your constraints unless you say them. A vague prompt gets a generic, technically-correct-but-useless answer. A specific one gets something you can actually paste into your editor.

## Before / after

**Vague:**
> "Make this component better"

**Specific:**
> "Refactor this client component to reduce re-renders. It's a filter list of ~200 items re-rendering on every keystroke. Keep the same props interface — this is used in three other places. Next.js 15, TypeScript, Tailwind."

**Vague:**
> "Why is my API route slow?"

**Specific:**
> "This API route (`app/api/orders/route.ts`, pasted below) takes 3-4s to respond. It queries Postgres via Prisma, no caching. Expected load is ~50 req/min. What's the likely bottleneck, and what's the lowest-effort fix?"

The second version in each pair answers three questions Claude would otherwise have to guess at: *what does "better" mean here, what can't change, and what's the actual constraint (performance, load, compatibility)?*

## What to include, as a checklist

- **Router + version** — App Router or Pages Router, and roughly which Next.js version. The two routers behave differently enough that this changes the answer.
- **Language** — TypeScript or JavaScript.
- **The actual file(s)**, not a paraphrase of them. Paste the component, the error, the relevant type definitions.
- **What can't change** — a prop interface used elsewhere, a library you're locked into, a style you're already following.
- **The real goal**, not just the symptom. "Fix this bug" is weaker than "fix this bug without breaking the existing tests in `orders.test.ts`."
- **Full error text**, not a summary. Stack traces carry information you might not think is relevant but Claude can use.

## Techniques that consistently help

**Ask for a plan before code, on anything non-trivial.**
> "Before writing code: what's your plan for adding optimistic updates to this cart component?"
This catches wrong assumptions before they're baked into 80 lines of code. If you're using Claude Code, this is what Plan Mode is for.

**Give a role when the angle matters.**
> "Review this as a senior Next.js engineer focused on performance, not style."
This isn't magic, it's just a fast way to say which axis you care about — performance vs. readability vs. security vs. "will this scale."

**Show a good and a bad example when style is subjective.**
> "Here's a component I like the structure of: [example]. Write the new `ProductCard` component in the same style."
This works better than describing a style in prose.

**Break big asks into steps.**
Asking for a whole feature ("add auth") in one prompt gets a shallow pass at everything. Asking for it in stages — schema, then API route, then UI, then wiring — gets depth at each stage and lets you correct course early.

**Iterate instead of restarting.**
If the first answer is 80% right, say what's wrong with the 20% rather than re-explaining the whole task from scratch. Claude keeps the context; use that.

## The `context/` folder idea

For anything beyond a single session, it's worth keeping a small `context/` folder (or a `CLAUDE.md` file if you're using Claude Code) in your repo with the things you'd otherwise re-explain every time: your stack, conventions, folder structure, things you've decided against and why. This turns "explain your whole project again" into "here's what changed since last time," which is a much better use of a prompt.

## The short version

Claude answers the question you *asked*, not the one you meant. Specificity isn't extra effort you're being polite about — it's the actual lever that determines whether you get a copy-pasteable answer or a starting point you still have to fix.
