# Claude for New Next.js Developers

If you're new to Claude and mostly writing Next.js, here's the practical version: what Claude is actually good for on a day-to-day basis, and where you'll get the most leverage early on.

## Where Claude actually helps

**1. Scaffolding without the boilerplate fatigue**
Ask for a new route, component, or API handler and get something that matches how Next.js expects it to look — App Router file conventions, `page.tsx` / `layout.tsx` / `route.ts` naming, correct exports. You still review it, but you skip the "wait, is this a server or client component" setup tax every single time.

**2. Explaining Next.js concepts in context — not textbook definitions**
Instead of googling "server components vs client components," paste your actual component and ask why it's throwing a hydration error, or why a `useState` call is breaking. You get an answer tied to your code, not a generic blog post.

**3. Debugging with the full picture**
Next.js errors (hydration mismatches, `Cannot find module`, RSC boundary violations, `next/image` config issues) are often cryptic on their own but clear once Claude sees the stack trace plus the file that triggered it.

**4. Reviewing before you ship**
Ask Claude to look at a component or API route for obvious issues — missing `"use client"`, unhandled promise rejections, N+1 fetches, unnecessary re-renders — before you open a PR.

**5. Translating between mental models**
Coming from Pages Router, plain React, or another framework? Claude is useful for "here's how I'd do X in [framework] — what's the Next.js App Router equivalent?"

## Two ways to use Claude while building

**claude.ai (chat)** — good for one-off questions, understanding a concept, planning an approach, or reviewing a snippet you paste in. Low friction, no setup.

**Claude Code (terminal / IDE)** — this is where it's worth investing time once you're past the absolute basics. Claude Code works directly in your project: it can read your actual files, run your build, execute tests, and make edits across multiple files in one go. For a Next.js app with more than a couple of routes, this is the meaningful upgrade — Claude isn't guessing at your project structure, it's looking at it.

## A few starter prompts worth trying

Instead of:
> "How do I fetch data in Next.js?"

Try:
> "I'm using the App Router with Next.js 15. I need to fetch a list of posts from `/api/posts` in a server component and pass it to a client component for filtering. Show me the pattern, and explain why the fetch happens where it does."

Instead of:
> "This doesn't work" + a screenshot

Try:
> "I'm getting `Error: Hydration failed because the initial UI does not match what was rendered on the server` in this component. Here's the file: [paste code]. Next.js 15, App Router. What's causing the mismatch?"

The difference isn't politeness — it's that the second version gives Claude enough to actually diagnose instead of guess. The next tutorial in this series goes into that in more depth.

## A habit worth building early

When something works, ask *why* it works — not just "thanks, next question." A one-line follow-up like "why did you put that fetch in a server component instead of a client one?" turns a fix into something you actually retain, and it's the fastest way to stop needing to ask the same category of question twice.
