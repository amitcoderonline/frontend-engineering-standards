# Claude Code: A CLAUDE.md That Follows

## Overview

`CLAUDE.md` is one of the most important ways to give Claude Code instructions about your project.

But there is a common mistake:

> **Making CLAUDE.md too large.**

Developers often keep adding rules whenever Claude makes a mistake:

```text
Claude makes mistake
       ↓
Add a rule
       ↓
Another mistake
       ↓
Add another rule
       ↓
More mistakes
       ↓
Huge CLAUDE.md
```

The problem is that `CLAUDE.md` is **guidance, not hard enforcement**.

Every instruction competes for Claude's attention. As the file becomes larger, individual rules can become less reliable.

### Core principle

> **Keep CLAUDE.md lean, specific, and useful.**

The goal is not to document everything about the project.

The goal is to provide the instructions Claude needs to consistently work correctly.

---

# 1. CLAUDE.md Is Guidance, Not Enforcement

This is one of the most important certification concepts.

`CLAUDE.md` tells Claude how you want it to behave.

It does **not guarantee** that a dangerous action will never happen.

For example:

```text
Never push directly to main.
```

Putting this in `CLAUDE.md` asks Claude to follow the rule.

But imagine that pushing to `main` would cause a serious production problem.

You should not rely only on an instruction.

### Use a Hook for hard rules

A **hook** can execute code before Claude performs an action and can actually block that action.

Conceptually:

```text
CLAUDE.md
   ↓
Guidance

Hook
   ↓
Enforcement
```

Therefore:

```text
"Use named exports."
```

is a good CLAUDE.md instruction.

But:

```text
"Never push to main."
```

may be better implemented as a hook if it is a hard safety requirement.

### Certification takeaway

Remember:

> **CLAUDE.md = guidance**
>
> **Hooks = enforcement**

This distinction is highly important.

---

# 2. Four Locations for CLAUDE.md

Claude Code can load instructions from four locations.

They serve different purposes.

| Location           | Purpose                                   |
| ------------------ | ----------------------------------------- |
| **Managed policy** | Organization-wide instructions            |
| **User**           | Your personal preferences across projects |
| **Project**        | Shared instructions for the repository    |
| **Local**          | Personal instructions for one repository  |

Claude loads these together when the session starts.

---

## Managed Policy

This is controlled by the organization/platform team.

It is useful for organization-level policies.

Example:

```text
Company security requirements
Approved tools
Organization coding standards
```

The important point:

> You cannot simply exclude managed policy instructions.

---

## User

User-level instructions represent your personal preferences.

They can apply across projects on your machine.

Example:

```text
Prefer TypeScript.
Use concise comments.
Prefer functional React components.
```

These are personal preferences rather than repository-specific requirements.

---

## Project

The project-level `CLAUDE.md` is normally shared with the team and checked into Git.

Example:

```text
CLAUDE.md
```

It can contain:

```text
Project architecture
Coding conventions
Testing commands
Build instructions
Repository-specific rules
```

This is generally the most important shared project configuration.

---

## Local

Local instructions are ignored by Git.

They are useful for instructions that apply only to **you and this repository**.

For example:

```text
I'm currently refactoring the authentication module.
Keep the new architecture in mind during this session.
```

You don't necessarily want this instruction committed to the team's repository.

Therefore, local is appropriate.

### Certification memory trick

Remember:

```text
Managed → Organization
User    → Me
Project → Team
Local   → Me + This Repo
```

---

# 3. Imports

A large `CLAUDE.md` can be split into smaller files.

For example:

```text
@.claude/conventions/code-style.md
@.claude/conventions/testing.md
@.claude/conventions/workflow.md
```

This makes the configuration easier to organize.

You might structure your project like this:

```text
project/
│
├── CLAUDE.md
│
└── .claude/
    └── conventions/
        ├── code-style.md
        ├── testing.md
        └── workflow.md
```

Your main `CLAUDE.md` can then reference these files.

---

## Important Certification Point

Imports improve **organization**.

They do **not reduce context**.

When Claude launches, the imported content is expanded inline.

So:

```text
CLAUDE.md
   ↓
imports
   ↓
expanded content
   ↓
Claude loads it
```

Therefore:

> **Imports organize instructions; they don't reduce the amount of context Claude has to read.**

This is an easy certification question.

---

# 4. Write Specific Rules

One of the biggest reasons CLAUDE.md instructions fail is vague wording.

### Bad

```text
Follow best practices for API routes.
```

What exactly does "best practices" mean?

Claude cannot reliably verify it.

### Better

```text
Put new API routes in src/api/handlers, one route per file.
```

Now the rule is:

* Specific
* Observable
* Checkable

You can inspect the resulting code and determine whether Claude followed it.

### Rule of thumb

Ask:

> **Can I check whether Claude followed this rule?**

If the answer is no, make the rule more specific.

---

# 5. Say What Claude Should Do Instead

Another important principle:

> Don't only tell Claude what **not** to do.

Tell it what to do instead.

### Weak

```text
Don't use default exports.
```

Claude knows what not to do, but the alternative is unspecified.

### Better

```text
Use named exports, not default exports.
```

Now the desired behavior is explicit.

Think:

```text
DON'T DO X
```

versus:

```text
DO Y INSTEAD OF X
```

The second is much clearer.

---

# 6. Don't Overuse IMPORTANT and MUST

You might be tempted to write:

```text
IMPORTANT:
YOU MUST:
ALWAYS:
CRITICAL:
NEVER:
```

for every rule.

That reduces the value of emphasis.

Claude Academy describes emphasis as a **budget**.

If everything is emphasized:

```text
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
IMPORTANT
```

then nothing really stands out.

Instead, reserve strong language for the few rules that genuinely matter.

### Good

```text
IMPORTANT: Never expose API keys in source code.
```

while ordinary conventions can simply be written normally.

### Certification takeaway

> **Use emphasis selectively.**

Don't make every instruction sound critical.

---

# 7. CLAUDE.md Should Be a Living Document

Your `CLAUDE.md` should not be considered finished forever.

Think of it like code.

When Claude repeatedly makes the same mistake:

```text
Claude makes mistake
       ↓
Identify why
       ↓
Improve CLAUDE.md
       ↓
Claude learns the project convention
```

For example, if Claude repeatedly creates API routes in the wrong directory, add a specific rule:

```text
Put new API routes in src/api/handlers, one route per file.
```

You can also tell Claude:

```text
Add that rule to CLAUDE.md.
```

Claude can update the file for you.

### Important principle

Treat repeated Claude mistakes as potential **CLAUDE.md bugs**.

---

# 8. What Should Go Into CLAUDE.md?

Good candidates include:

### Project conventions

```text
Use TypeScript for new source files.
```

### Architecture

```text
API handlers belong in src/api/handlers.
```

### Testing

```text
Run npm test before considering a feature complete.
```

### Naming conventions

```text
Use PascalCase for React component names.
```

### Workflow

```text
Run the type checker after modifying shared types.
```

These are guidance that Claude can follow while working on the project.

---

# 9. What Should NOT Depend Only on CLAUDE.md?

Hard safety requirements should not depend solely on Claude remembering an instruction.

For example:

```text
Never push to main.
```

If this is a true safety requirement, use a mechanism that can **block** the operation.

That's where hooks come in.

Think:

```text
Guideline
    ↓
CLAUDE.md

Hard restriction
    ↓
Hook
```

---

# 10. Good vs Bad CLAUDE.md

## Bad

```text
# CLAUDE.md

Follow best practices.

Write clean code.

Always be careful.

Use good architecture.

IMPORTANT!!!

YOU MUST FOLLOW ALL RULES!!!

Don't make mistakes.

Don't use bad patterns.

Use best practices everywhere.
```

Problems:

* Too vague
* Difficult to verify
* Excessive emphasis
* Doesn't tell Claude exactly what to do

---

## Better

```text
# CLAUDE.md

## TypeScript

Use TypeScript for all new source files.

## API

Put new API routes in src/api/handlers, one route per file.

## Exports

Use named exports instead of default exports.

## Testing

Run npm test after modifying API behavior.

## Architecture

Keep business logic out of route handlers. Put it in the service layer.
```

These rules are:

* Specific
* Actionable
* Checkable
* Easy to understand

---

# 11. Certification Cheat Sheet

| Concept                     | Remember                              |
| --------------------------- | ------------------------------------- |
| **CLAUDE.md**               | Guidance for Claude                   |
| **Hooks**                   | Enforce/block actions                 |
| **Managed**                 | Organization-level policy             |
| **User**                    | Personal instructions across projects |
| **Project**                 | Shared repository instructions        |
| **Local**                   | Personal instructions for one repo    |
| **Imports**                 | Organize a large CLAUDE.md            |
| **Imports reduce context?** | **No**                                |
| **Specific rules**          | Easier for Claude to follow           |
| **Checkable rules**         | Easier to verify                      |
| **Negative instruction**    | Say what to do instead                |
| **IMPORTANT/MUST**          | Use sparingly                         |
| **CLAUDE.md maintenance**   | Treat it like living code             |

---

# 12. Certification Questions

### Q1. Is CLAUDE.md an enforcement mechanism?

**No.**

It provides guidance to Claude.

For hard requirements that must be enforced, use mechanisms such as hooks.

---

### Q2. Where should an organization-wide policy live?

**Managed policy.**

---

### Q3. Where should personal preferences that apply across projects live?

**User-level instructions.**

---

### Q4. Where should shared project conventions live?

**Project-level CLAUDE.md.**

---

### Q5. Where should personal instructions for a single repository go?

**Local instructions.**

---

### Q6. Do CLAUDE.md imports reduce context usage?

**No.**

Imports help organize the instructions, but Claude expands the imported content when it loads the configuration.

---

### Q7. Which is better?

```text
Follow API best practices.
```

or

```text
Put new API routes in src/api/handlers, one per file.
```

**The second.**

It is specific and checkable.

---

### Q8. How should you write a negative rule?

Instead of:

```text
Don't use default exports.
```

Prefer:

```text
Use named exports, not default exports.
```

---

### Q9. Why shouldn't every rule be marked IMPORTANT?

Because excessive emphasis reduces the distinction between truly critical rules and ordinary conventions.

---

### Q10. What should you do when Claude repeatedly violates a project convention?

Consider it feedback that your `CLAUDE.md` needs improvement and add a clear, specific rule.

---

# 13. The Big Picture

The lesson can be reduced to this model:

```text
                 CLAUDE.md
                     |
        +------------+------------+
        |            |            |
     Guidance     Context      Conventions
        |
        ↓
  Keep it concise
        |
        ↓
 Make rules specific
        |
        ↓
 Make rules checkable
        |
        ↓
 Say what to do
        |
        ↓
 Revise when Claude fails
```

And for enforcement:

```text
Soft guidance
     ↓
 CLAUDE.md

Hard enforcement
     ↓
 Hooks
```

---

# Final Certification Memory

If you remember only **five things** from this lesson, remember these:

### 1. CLAUDE.md is guidance, not enforcement.

Use hooks for rules that must actually be blocked.

### 2. Keep CLAUDE.md lean.

A huge file makes individual instructions compete for attention.

### 3. Make instructions specific and checkable.

Replace:

```text
Follow best practices.
```

with something Claude can actually follow and you can verify.

### 4. Imports organize but don't reduce context.

They split a large file into manageable pieces, but the imported content is still loaded.

### 5. Treat CLAUDE.md as living code.

When Claude repeatedly gets something wrong, improve the instructions.

> **The goal isn't to write everything you know about the project. The goal is to write the small set of instructions Claude needs to consistently do the right thing.**
