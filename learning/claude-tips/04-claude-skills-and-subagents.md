# Adding Skills and Subagents in Claude Code

Once you're past basic prompting, these two features are the next real jump in productivity: **Skills** package a procedure Claude can reuse, and **subagents** hand off a whole task to a focused AI worker with its own context. They solve different problems — here's when to reach for each, with Next.js examples.

## Skills: reusable playbooks

**What they are:** a `SKILL.md` file that teaches Claude a procedure — a checklist, a house style, a multi-step workflow — so you stop re-explaining it every session. Claude loads a skill automatically when it's relevant, or you invoke it directly with `/skill-name`.

**When to reach for one:** the moment you notice you're pasting the same instructions into chat for the third time. A code-review checklist, a "how we write API routes here" convention, a component-generation template — anything repetitive and well-specified.

**Where they live:**
- `~/.claude/skills/skill-name/SKILL.md` — personal, available in every project
- `.claude/skills/skill-name/SKILL.md` — project-scoped, committed to the repo so your whole team gets it

### Example: a Next.js API route skill

```
mkdir -p .claude/skills/api-route
```

`.claude/skills/api-route/SKILL.md`:
```markdown
---
name: api-route
description: Scaffolds a Next.js App Router API route following our conventions. Use when creating a new route under app/api/.
---

# API Route Skill

When creating a new API route:

1. Use the App Router convention: `app/api/<name>/route.ts`
2. Export named functions for each HTTP method (`GET`, `POST`, etc.) — never a default export
3. Validate the request body with Zod before touching the database
4. Wrap the handler body in try/catch and return a typed error shape:
   `{ error: string, code: string }`
5. Use the shared Prisma client from `lib/db.ts` — never instantiate a new client
6. Add a corresponding test file in `__tests__/api/<name>.test.ts`

## Example

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bodySchema = z.object({ title: z.string().min(1) });

export async function POST(req: NextRequest) {
  try {
    const body = bodySchema.parse(await req.json());
    const post = await db.post.create({ data: body });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request", code: "BAD_REQUEST" }, { status: 400 });
  }
}
\`\`\`
```

Now "create an API route for deleting a comment" pulls in your actual conventions automatically, instead of Claude guessing at a generic pattern — and instead of you retyping the checklist.

## Subagents: delegate the whole task

**What they are:** a subagent is a preconfigured AI worker with its own isolated context window, its own system prompt, and (optionally) a restricted set of tools. Claude Code hands it a narrow, well-defined job, it does the work in its own context, and only the result comes back — the exploration noise doesn't pollute your main conversation.

**When to reach for one:** tasks that are token-heavy, repetitive, or risky enough that you want them isolated — running the full test suite and fixing failures, a security-focused review pass, a big search-and-summarize job across a large codebase. If a skill is "here's how to do X," a subagent is "go do X and come back with an answer."

**Where they live:**
- `.claude/agents/agent-name.md` — project-scoped
- `~/.claude/agents/agent-name.md` — personal, across all projects

### Example: a Next.js test-runner subagent

```
mkdir -p .claude/agents
```

`.claude/agents/test-runner.md`:
```markdown
---
name: test-runner
description: Use proactively after code changes to run the test suite and fix failures without changing test intent.
tools: Read, Edit, Bash
---

You are a test automation specialist for a Next.js + Vitest project.

When invoked:
1. Run `npm run test` and capture the output
2. For each failure, read the relevant component/test file
3. Fix the underlying code, not the test — unless the test itself is
   clearly wrong (assert on the exact behavior described in the test name)
4. Re-run the suite to confirm the fix
5. Report a short summary: what failed, what you changed, what still fails

Never modify test assertions to make a failing test pass without a clear
reason documented in your summary.
```

### Example: a component-review subagent

`.claude/agents/component-reviewer.md`:
```markdown
---
name: component-reviewer
description: Reviews React/Next.js components for unnecessary re-renders, missing "use client", and accessibility issues. Use PROACTIVELY after any component is written or edited.
tools: Read, Grep
---

You are a senior Next.js reviewer focused only on: render performance,
correct server/client component boundaries, and basic accessibility
(labels, alt text, keyboard navigation).

Do not comment on naming, formatting, or style — that's handled elsewhere.
Flag issues with a one-line explanation and a suggested fix. If nothing
is wrong, say so briefly instead of inventing nitpicks.
```

**Using them:**
- Automatically — Claude delegates on its own when a task matches a subagent's `description`. Phrases like "use PROACTIVELY" or "MUST BE USED" in the description make Claude reach for it more readily.
- Explicitly — just say so: *"Use the test-runner subagent to fix the failing tests"* or *"Have the component-reviewer subagent look at the Checkout component."*

## Skill vs. subagent — the quick distinction

| | Skill | Subagent |
|---|---|---|
| What it packages | A procedure or convention | A worker with its own context |
| Runs in | The main conversation | Its own isolated context window |
| Best for | Style guides, scaffolding templates, checklists | Big/noisy tasks — test runs, audits, large searches |
| Restrict tools? | No | Yes — can be limited to `Read`, `Bash`, etc. |

A practical rule of thumb: if it's mostly *instructions* Claude should follow inline, make it a skill. If it's a *job* you want run and reported back on — separately from what you're currently doing — make it a subagent.

## Getting started

Run `/agents` in a Claude Code session to manage subagents interactively (create, edit, see which ones are active), or `/skills` to list and manage skills — both work without hand-editing files if you'd rather not start there. Either way, start small: pick the one prompt you keep retyping, or the one review pass you keep asking for by hand, and turn just that into a skill or subagent first.
