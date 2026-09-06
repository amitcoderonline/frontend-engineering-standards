# Claude Code — Hooks

## Overview

Hooks are one of the most important Claude Code concepts for certification.

The basic problem is:

> **Instructions in `CLAUDE.md` are guidance. Hooks provide deterministic enforcement or automation.**

For example, you might put this in `CLAUDE.md`:

```text
Always run the formatter after editing a file.
````

Claude will usually follow it.

But "usually" is not a guarantee.

A Hook can make the behavior deterministic:

```text
Claude edits file
      ↓
PostToolUse Hook
      ↓
Run formatter
```

So the key distinction is:

```text
CLAUDE.md
→ "Please do this."

Hook
→ "This will happen automatically."
```

Claude Code has around 30 hook events, but for certification you should focus on the most important ones. ([Claude Academy][1])

---
<img width="343" height="885" alt="image" src="https://github.com/user-attachments/assets/834cc7d2-21fe-41a9-9d68-718eb27daac9" />


# 1. What Is a Hook?

A Hook is code that Claude Code executes at a specific point in the agentic loop.

Conceptually:

```text
User prompt
    ↓
Claude thinks
    ↓
Claude calls a tool
    ↓
Hook can run
    ↓
Tool executes
    ↓
Hook can run again
    ↓
Claude continues
    ↓
Claude stops
```

Hooks allow you to intervene at predictable points.

They can be used for:

* Enforcement
* Security
* Formatting
* Linting
* Verification
* Context preservation
* Auditing
* Preventing dangerous commands
* Modifying tool input

### Certification takeaway

> **A Hook is deterministic code that runs at a defined point in Claude Code's execution loop.**

---

# 2. Why Use Hooks?

Suppose you put this in `CLAUDE.md`:

```text
Never use `git push --force`.
```

Claude is being instructed not to do it.

But `CLAUDE.md` is guidance.

If this is a **hard safety requirement**, guidance isn't enough.

Instead:

```text
Claude wants to run:
git push --force
        ↓
PreToolUse Hook
        ↓
DENY
        ↓
Command never executes
```

Now the rule is enforced by code.

### Important distinction

```text
CLAUDE.md
    ↓
Guidance

Hook
    ↓
Enforcement / automation
```

This connects directly to the previous **CLAUDE.md** lesson.

---

# 3. The Most Important Hook Events

Claude Code has many hook events.

You don't need to memorize all of them for certification.

Focus on these:

| Hook                   | When it runs                 | Typical use                 |
| ---------------------- | ---------------------------- | --------------------------- |
| **PreToolUse**         | Before a tool executes       | Block/allow/modify actions  |
| **PostToolUse**        | After a successful tool call | Format/lint/inspect changes |
| **Stop**               | When Claude wants to stop    | Verify completion           |
| **SubagentStop**       | When a subagent stops        | Verify subagent completion  |
| **PreCompact**         | Before compaction            | Prepare/preserve state      |
| **PostCompact**        | After compaction             | Post-compaction processing  |
| **SessionStart**       | At session start             | Initialize/preserve context |
| **InstructionsLoaded** | When instructions load       | Audit loaded instructions   |

The most important ones to remember are:

```text
PreToolUse
PostToolUse
Stop
SessionStart
```

([Claude Academy][1])

---

# 4. PreToolUse

## What is it?

`PreToolUse` runs **before Claude executes a tool call**.

This makes it the main enforcement mechanism.

Conceptually:

```text
Claude wants to call tool
          ↓
     PreToolUse
          ↓
    ┌─────┼─────┐
    ↓     ↓     ↓
  Allow  Deny   Ask
    ↓     ↓     ↓
 Execute Stop  User decides
```

([Claude Academy][1])

---

# 5. PreToolUse Decisions

A PreToolUse Hook can return a decision.

The important values are:

```text
allow
deny
ask
```

There is also:

```text
defer
```

but it is mainly relevant to non-interactive `-p` runs and is less commonly used. ([Claude Academy][1])

---

## `allow`

The tool call is allowed to proceed.

```text
Claude
  ↓
PreToolUse
  ↓
allow
  ↓
Tool executes
```

---

## `deny`

The tool call is blocked.

```text
Claude
  ↓
PreToolUse
  ↓
deny
  ↓
Tool does NOT execute
```

Example:

```text
Claude:
git push --force
```

Hook:

```text
deny
```

Result:

```text
Command blocked.
```

---

## `ask`

The action is handed back to the user.

```text
Claude
  ↓
PreToolUse
  ↓
ask
  ↓
User decides
```

This is useful when you want the Hook to identify potentially risky operations but still give the developer the final decision.

---

# 6. PreToolUse JSON

PreToolUse communicates decisions using JSON.

A simplified example:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Force pushes are not allowed."
  }
}
```

The important field for certification is:

```text
permissionDecision
```

It can be:

```text
allow
deny
ask
```

([Claude Academy][1])

---

# 7. PreToolUse Can Modify the Tool Input

This is a particularly interesting Hook capability.

A Hook doesn't always have to:

```text
ALLOW
```

or:

```text
DENY
```

It can also modify the input using:

```text
updatedInput
```

Conceptually:

```text
Claude creates command
       ↓
PreToolUse
       ↓
Inspect command
       ↓
Modify command
       ↓
Execute modified command
```

---

# 8. Example: Secret Redaction

Suppose Claude tries to execute:

```bash
curl https://example.com?key=sk_live_ABC123
```

You don't necessarily want to block the entire command.

Instead, the Hook can replace the secret:

```text
sk_live_ABC123
       ↓
[REDACTED]
```

The command becomes:

```bash
curl https://example.com?key=[REDACTED]
```

Then the command can continue.

Conceptually:

```text
Original command
      ↓
PreToolUse Hook
      ↓
Detect secret
      ↓
Rewrite input
      ↓
Execute safe version
```

This demonstrates an important distinction:

> **A Hook can sometimes safely transform an action instead of simply blocking it.**

([Claude Academy][1])

---

# 9. Important `updatedInput` Detail

When using:

```text
updatedInput
```

the updated input replaces the **whole input object**.

Therefore, if you only modify one field, you need to preserve the other fields you still need.

Conceptually:

```text
Original input:
{
  command: "...",
  otherField: "...",
  anotherField: "..."
}
```

If you return:

```text
{
  command: "modified..."
}
```

you may lose the other fields.

### Certification takeaway

> **`updatedInput` replaces the complete input object, so preserve fields you are not changing.**

([Claude Academy][1])

---

# 10. PostToolUse

`PostToolUse` runs **after a successful tool call**.

This makes it useful for things like:

* Formatting
* Linting
* Additional checks
* Inspecting the result

For example:

```text
Claude edits TypeScript file
        ↓
PostToolUse
        ↓
Run formatter
```

Or:

```text
Claude modifies code
        ↓
PostToolUse
        ↓
Run ESLint
```

([Claude Academy][1])

---

# 11. Important Difference: PreToolUse vs PostToolUse

This is a likely certification question.

### PreToolUse

Runs:

```text
BEFORE
```

the tool.

Therefore it can prevent the action.

```text
Claude
 ↓
PreToolUse
 ↓
DENY
 ↓
Tool never runs
```

### PostToolUse

Runs:

```text
AFTER
```

the tool has already executed.

Therefore, it is too late to prevent that tool call.

```text
Claude
 ↓
Tool executes
 ↓
PostToolUse
 ↓
Check / format / provide feedback
```

### Certification memory

> **PreToolUse can prevent an action. PostToolUse cannot undo the fact that the tool already ran.**

([Claude Academy][1])

---

# 12. Stop Hook

The `Stop` Hook runs when Claude wants to finish its turn.

This is extremely useful for verification.

Imagine Claude says:

```text
Implementation complete.
```

But your project requires:

```text
npm test
npm run lint
npm run typecheck
```

A Stop Hook can check those conditions.

Conceptually:

```text
Claude finishes
      ↓
Stop Hook
      ↓
Run tests
      ↓
Tests fail
      ↓
Tell Claude:
"You are not done."
      ↓
Claude continues
```

The Stop Hook can therefore prevent Claude from considering the task complete until required conditions are met. ([Claude Academy][1])

---

# 13. Stop Hook + Verification

This connects directly to the previous **Verification Skills** lesson.

You can build a verification workflow:

```text
Claude implements feature
        ↓
Claude tries to stop
        ↓
Stop Hook
        ↓
Run tests
        ↓
Run typecheck
        ↓
Run lint
        ↓
All pass?
   /          \
 YES           NO
  ↓             ↓
Stop        Tell Claude
            to continue
```

This is much stronger than simply putting:

```text
Run tests before finishing.
```

in `CLAUDE.md`.

### Certification takeaway

> **Stop Hooks are useful for enforcing completion criteria.**

---

# 14. Stop vs PostToolUse

Another important distinction:

| Hook            | Timing                  | Can stop original tool?       | Typical purpose     |
| --------------- | ----------------------- | ----------------------------- | ------------------- |
| **PreToolUse**  | Before tool             | Yes                           | Enforcement         |
| **PostToolUse** | After tool              | No                            | Formatting/checking |
| **Stop**        | Before Claude ends turn | Yes, can require continuation | Verification        |

Think:

```text
PreToolUse
"Don't do that."

PostToolUse
"You already did it; now check/fix."

Stop
"You're not finished yet."
```

---

# 15. SubagentStop

Claude Code can use subagents.

When a subagent finishes, a corresponding:

```text
SubagentStop
```

event can be used.

This is conceptually similar to `Stop`, but applies to a subagent finishing its work.

Think:

```text
Main Claude
    ↓
Subagent
    ↓
Work
    ↓
SubagentStop
    ↓
Verify subagent result
```

The important certification association is:

```text
Stop
→ Claude turn ends

SubagentStop
→ Subagent finishes
```

---

# 16. PreCompact

`PreCompact` runs before Claude compacts the conversation.

Recall the previous lesson:

```text
/compact
```

reduces conversation context.

Before compaction:

```text
Long conversation
      ↓
PreCompact
      ↓
Compact
```

A Hook can use this moment to prepare or preserve important state.

---

# 17. PostCompact

`PostCompact` runs after compaction.

However, there is an important certification detail:

> **Don't use PostCompact when you want to re-inject context into the conversation.**

The Academy specifically explains that `SessionStart` with the `compact` matcher is the appropriate mechanism for re-injecting context after compaction. ([Claude Academy][1])

This is a subtle but important distinction.

---

# 18. SessionStart

`SessionStart` runs when a session starts.

It can be used to:

* Initialize the environment
* Load useful state
* Provide context
* Restore information after compaction

A particularly important use is:

```text
SessionStart
+
compact matcher
```

This can re-inject context after a compaction.

Conceptually:

```text
Long session
    ↓
/compact
    ↓
Context summarized
    ↓
SessionStart(compact)
    ↓
Important state added back
    ↓
Claude continues with useful context
```

([Claude Academy][1])

---

# 19. Why SessionStart Is Important After Compact

Imagine you are working on:

```text
src/auth/auth.service.ts
src/auth/auth.interceptor.ts
src/auth/auth.guard.ts
```

You've spent 2 hours debugging them.

Then:

```text
/compact
```

happens.

Some detailed conversation context is lost.

A SessionStart Hook can reintroduce information such as:

```text
Files currently being modified:
- auth.service.ts
- auth.interceptor.ts
- auth.guard.ts

Current task:
OAuth token refresh migration

Last known issue:
Interceptor is returning 401 after token refresh.
```

Claude now has useful context again.

### Certification takeaway

> **SessionStart with the `compact` matcher is the mechanism to re-inject useful context after compaction.**

---

# 20. InstructionsLoaded

`InstructionsLoaded` fires when a `CLAUDE.md` or rule file is loaded.

This can be useful for auditing:

```text
Which instructions actually loaded?
```

Conceptually:

```text
Claude starts
     ↓
CLAUDE.md loaded
     ↓
InstructionsLoaded
     ↓
Audit / logging
```

This is particularly useful in large repositories with multiple instruction sources.

([Claude Academy][1])

---

# 21. Hook Exit Codes

Hooks don't always need to return JSON.

They can also use exit codes.

The three important behaviors are:

| Exit code         | Meaning            |
| ----------------- | ------------------ |
| **0**             | Success            |
| **2**             | Blocking error     |
| **Anything else** | Non-blocking error |

([Claude Academy][1])

---

# 22. Exit Code 0

Exit code:

```text
0
```

means success.

The Hook completed successfully.

If the Hook outputs JSON in the appropriate format, Claude Code can parse it.

For certain events, plain stdout can also be added to Claude's context.

---

# 23. Exit Code 2

This is extremely important.

Exit code:

```text
2
```

means:

> **Block this operation.**

For example:

```bash
#!/bin/bash

echo "Force push is not allowed" >&2
exit 2
```

Claude receives the blocking error.

### Certification memory

> **Exit 2 = blocking Hook error.**

---

# 24. Exit Code 1 — The Common Trap

This is a very important certification detail.

You might naturally assume:

```text
exit 1
```

means:

> "Stop Claude."

But according to the lesson, it **does not block** the action.

Instead:

```text
exit 1
```

is treated as a non-blocking error.

Claude continues.

Therefore:

```text
exit 1
```

does NOT mean:

```text
BLOCK
```

If you need to block:

```text
exit 2
```

### Certification memory

> **Exit 2 blocks. Exit 1 does not.**

([Claude Academy][1])

---

# 25. Stop Hook Can Be Blocked with Exit 2

Exit code 2 is also useful with `Stop`.

For example:

```text
Claude wants to stop
       ↓
Stop Hook
       ↓
Tests fail
       ↓
exit 2
       ↓
Claude is told:
"You're not done."
       ↓
Claude continues
```

This creates an automated completion gate.

([Claude Academy][1])

---

# 26. Some Hook Events Cannot Be Blocked

Not every Hook event supports blocking behavior.

For example, the Academy notes that events such as:

```text
Notification
SessionStart
```

ignore blocking and continue, although their error output can still be shown/logged. ([Claude Academy][1])

### Certification takeaway

> **Don't assume every Hook event can block execution.**

---

# 27. Practical Example — Prevent Force Push

Suppose your team doesn't allow:

```bash
git push --force
```

You can create a:

```text
PreToolUse
```

Hook for Bash commands.

Conceptually:

```text
Claude
  ↓
git push --force
  ↓
PreToolUse
  ↓
Detect "push --force"
  ↓
deny / exit 2
  ↓
Command blocked
```

This is a good example of **hard enforcement**.

---

# 28. Practical Example — Auto Format

Suppose your project uses Prettier.

You want every edited TypeScript file formatted.

Use:

```text
PostToolUse
```

Conceptually:

```text
Claude edits file
      ↓
PostToolUse
      ↓
Prettier
      ↓
Formatted file
```

This is a classic PostToolUse use case.

---

# 29. Practical Example — Prevent Secrets

Suppose Claude tries:

```bash
curl https://api.example.com?token=sk_live_ABC123
```

A PreToolUse Hook can:

```text
Inspect command
      ↓
Detect secret
      ↓
Replace secret
      ↓
Execute sanitized command
```

Instead of:

```text
DENY
```

you can use:

```text
updatedInput
```

to redact the sensitive value.

This demonstrates that Hooks can be used for **transformation**, not only blocking.

---

# 30. Practical Example — Verify Tests Before Stopping

Suppose your project requires:

```text
npm test
npm run lint
npm run typecheck
```

You can create a Stop Hook.

```text
Claude says:
"Implementation complete."
       ↓
Stop Hook
       ↓
npm test
       ↓
npm run lint
       ↓
npm run typecheck
       ↓
All pass?
```

If:

```text
YES
```

Claude can stop.

If:

```text
NO
```

the Hook can block the stop and send the failure information back to Claude.

---

# 31. Practical Example — Preserve Context After Compact

Suppose you're working on a large migration.

Before compact:

```text
Current files:
- src/auth/service.ts
- src/auth/interceptor.ts

Current problem:
Token refresh returns 401.

Next step:
Investigate refresh-token request.
```

After:

```text
/compact
```

a:

```text
SessionStart
```

Hook using the:

```text
compact
```

matcher can reintroduce this information.

This prevents Claude from feeling like it is starting from scratch.

---

# 32. Hook vs CLAUDE.md

This distinction is critical.

## CLAUDE.md

```text
Always format files after editing.
```

This is a request.

## Hook

```text
PostToolUse
    ↓
Run formatter
```

This is automation.

### Certification rule

> **Use CLAUDE.md for guidance; use Hooks when behavior needs to be deterministic.**

---

# 33. Hook vs Skill

This is another important distinction from the previous lesson.

## Skill

A Skill describes a reusable procedure.

Example:

```text
Verification Skill

1. Run tests.
2. Run lint.
3. Review diff.
4. Report results.
```

## Hook

A Hook runs automatically at a defined event.

Example:

```text
Stop
 ↓
Run verification
```

So:

```text
Skill
→ Reusable procedure

Hook
→ Event-driven automation/enforcement
```

They can also work together.

---

# 34. Hook vs Permission Mode

Permission modes answer:

> **How much autonomy does Claude have?**

Hooks answer:

> **What should happen at a particular point in the execution loop?**

Example:

```text
Auto Mode
    ↓
Claude works independently
    ↓
PreToolUse
    ↓
Block dangerous command
```

Or:

```text
Auto Mode
    ↓
Claude finishes
    ↓
Stop Hook
    ↓
Run tests
```

### Certification memory

```text
Permission Mode
→ Autonomy

Hook
→ Enforcement / automation
```

---

# 35. The Complete Claude Code Mental Model

The lessons you've studied so far connect like this:

```text
CLAUDE.md
    ↓
Project guidance

Skills
    ↓
Reusable procedures

Permission Modes
    ↓
Level of autonomy

Hooks
    ↓
Deterministic automation/enforcement

Verification
    ↓
Evidence that the work is correct
```

For example:

```text
User asks Claude to implement feature
             ↓
        Permission Mode
             ↓
          Auto
             ↓
       Claude edits code
             ↓
      PostToolUse Hook
             ↓
       Run formatter
             ↓
       Claude continues
             ↓
         Stop Hook
             ↓
        Run verification
             ↓
      Tests pass / fail
```

This is the bigger picture you should understand for certification.

---

# 36. Certification Cheat Sheet

| Hook / Concept             | Remember                                     |
| -------------------------- | -------------------------------------------- |
| **PreToolUse**             | Before a tool executes                       |
| **PostToolUse**            | After a successful tool call                 |
| **Stop**                   | When Claude wants to end its turn            |
| **SubagentStop**           | When a subagent finishes                     |
| **PreCompact**             | Before compaction                            |
| **PostCompact**            | After compaction                             |
| **SessionStart**           | Session initialization / context restoration |
| **InstructionsLoaded**     | Audit loaded instructions                    |
| **allow**                  | Let action proceed                           |
| **deny**                   | Block action                                 |
| **ask**                    | Ask user                                     |
| **updatedInput**           | Modify tool input                            |
| **exit 0**                 | Success                                      |
| **exit 2**                 | Blocking error                               |
| **exit 1**                 | Non-blocking error                           |
| **Stop + exit 2**          | Prevent Claude from stopping                 |
| **PostToolUse**            | Too late to prevent original tool call       |
| **SessionStart + compact** | Re-inject context after compaction           |

---

# 37. Certification Questions

## Q1. What is the main purpose of Hooks?

**Answer:**

Hooks provide deterministic, event-driven automation and enforcement at defined points in Claude Code's execution loop.

---

## Q2. Why isn't CLAUDE.md enough for a hard rule?

**Answer:**

`CLAUDE.md` provides guidance. Claude may follow it, but it isn't a deterministic enforcement mechanism.

---

## Q3. Which Hook should you use to prevent a dangerous Bash command?

**Answer:**

**PreToolUse**, because it runs before the tool executes and can block the call.

---

## Q4. Which Hook is commonly used for automatic formatting?

**Answer:**

**PostToolUse**, because it runs after a successful tool call.

---

## Q5. Can PostToolUse prevent the tool call from happening?

**Answer:**

**No.**

The tool has already executed. PostToolUse is useful for follow-up actions such as formatting, linting, or feedback.

---

## Q6. Which Hook can prevent Claude from ending its turn?

**Answer:**

**Stop.**

A Stop Hook can determine that required conditions haven't been met and tell Claude it isn't finished.

---

## Q7. Which Hook can be used when a subagent finishes?

**Answer:**

**SubagentStop.**

---

## Q8. What are the three important PreToolUse decisions?

**Answer:**

```text
allow
deny
ask
```

There is also `defer` for certain non-interactive `-p` use cases.

---

## Q9. What does `deny` do?

**Answer:**

It prevents the tool call from executing.

---

## Q10. What does `ask` do?

**Answer:**

It sends the decision back to the user for approval.

---

## Q11. What is `updatedInput` used for?

**Answer:**

It allows the Hook to rewrite the tool's input before execution.

A common example is redacting a secret from a Bash command rather than blocking the entire command.

---

## Q12. What happens with exit code 0?

**Answer:**

The Hook succeeds.

---

## Q13. What happens with exit code 2?

**Answer:**

It is a blocking error and can prevent the operation from continuing.

---

## Q14. Does exit code 1 block the operation?

**Answer:**

**No.**

This is a common trap.

```text
exit 1 → non-blocking
exit 2 → blocking
```

---

## Q15. How can a Stop Hook verify that Claude's work is complete?

**Answer:**

It can run tests, linting, type checking, or other completion checks. If the checks fail, the Hook can block the stop and send the failure information back to Claude.

---

## Q16. How can you preserve context after `/compact`?

**Answer:**

Use a **SessionStart Hook with the `compact` matcher** to re-inject useful context after compaction.

Do not rely on PostCompact for this purpose.

---

## Q17. What is the difference between PreCompact and PostCompact?

**Answer:**

```text
PreCompact
→ Runs before compaction.

PostCompact
→ Runs after compaction.
```

But for re-injecting context into the conversation after compaction, use:

```text
SessionStart + compact
```

---

## Q18. What is the difference between a Skill and a Hook?

**Answer:**

A Skill defines a reusable procedure.

A Hook runs automatically at a specific event in Claude's execution loop.

```text
Skill
→ Procedure

Hook
→ Event-driven automation/enforcement
```

---

## Q19. What is the difference between Permission Mode and Hook?

**Answer:**

Permission Mode controls Claude's general level of autonomy.

Hooks provide specific event-driven automation or enforcement.

```text
Permission Mode
→ How much Claude can do

Hook
→ What should happen at a specific event
```

---

# 38. Certification Scenario Questions

## Scenario 1

### Question

You want to prevent Claude from running:

```bash
git push --force
```

What should you use?

### Answer

**PreToolUse Hook**

Why?

Because it runs before the Bash command executes and can return:

```text
deny
```

or a blocking exit code.

---

## Scenario 2

### Question

You want every edited TypeScript file to be automatically formatted.

What should you use?

### Answer

**PostToolUse Hook**

Why?

The formatting should happen after the editing tool successfully runs.

---

## Scenario 3

### Question

Claude says:

```text
Implementation complete.
```

But you require all tests to pass before it can finish.

What should you use?

### Answer

**Stop Hook**

Why?

Stop fires when Claude wants to end its turn and can prevent the stop if the completion criteria aren't satisfied.

---

## Scenario 4

### Question

Claude is asked to execute a command containing an API secret. You don't want to block the command; you want to remove the secret first.

What should you use?

### Answer

**PreToolUse + `updatedInput`**

Why?

The Hook can intercept the command, replace the secret, and allow the sanitized command to execute.

---

## Scenario 5

### Question

A long session is compacted and you want Claude to remember the files and task it was working on.

What should you use?

### Answer

**SessionStart with the `compact` matcher**

Why?

Its output can be re-injected into the conversation after compaction.

---

# 39. Easy Memory Trick

Remember the most important Hook events as:

```text
PRE
→ Before the action

POST
→ After the action

STOP
→ Before Claude finishes

COMPACT
→ Around context compression

SESSION
→ Start / restore context
```

Then remember:

```text
PreToolUse
→ BLOCK

PostToolUse
→ FORMAT / CHECK

Stop
→ VERIFY

SessionStart
→ RESTORE CONTEXT
```

---

# 40. The "Before / After / Stop" Model

This is probably the easiest way to remember Hooks for the certification.

```text
             Claude wants to act
                     ↓
              PreToolUse
                     ↓
             Allow / Deny / Ask
                     ↓
                Tool runs
                     ↓
              PostToolUse
                     ↓
            Format / Lint / Check
                     ↓
               Claude works
                     ↓
              Claude wants to stop
                     ↓
                  Stop
                     ↓
            Verify completion
```

This model covers a large part of the lesson.

---

# 41. Final Certification Summary

Hooks turn instructions that Claude **usually follows** into behavior that can be **automatically enforced or performed**.

The most important concepts are:

```text
PreToolUse
→ Control the action BEFORE it happens.

PostToolUse
→ React AFTER the action happens.

Stop
→ Verify before Claude finishes.

SessionStart
→ Initialize or restore context.

PreCompact
→ Prepare before compaction.

PostCompact
→ React after compaction.
```

For PreToolUse:

```text
allow
→ Let it happen

deny
→ Block it

ask
→ Ask the user

updatedInput
→ Modify the input
```

For exit codes:

```text
0
→ Success

2
→ BLOCK

1
→ Non-blocking
```

## The Certification Sentences to Memorize

> **PreToolUse is the main enforcement primitive because it runs before a tool call and can block it.**

> **PostToolUse runs after a successful tool call, so it is useful for formatting and follow-up checks but is too late to prevent the original action.**

> **Stop can prevent Claude from ending its turn when required verification has not passed.**

> **SessionStart with the `compact` matcher can re-inject context after compaction.**

> **Exit code 2 blocks; exit code 1 does not.**

> **`updatedInput` allows a Hook to transform a tool call instead of simply allowing or denying it.**

---

# 42. Final Claude Code Mental Model

```text
CLAUDE.md
    ↓
General project guidance

SKILLS
    ↓
Reusable procedures

PERMISSION MODES
    ↓
Level of Claude's autonomy

HOOKS
    ↓
Deterministic automation / enforcement

VERIFICATION
    ↓
Evidence that the work is correct
```

A powerful Claude Code workflow therefore looks like:

```text
Plan
  ↓
Review
  ↓
Accept Edits / Auto
  ↓
Claude implements
  ↓
PreToolUse
  ↓
Protect dangerous actions
  ↓
PostToolUse
  ↓
Format / lint
  ↓
Stop
  ↓
Run verification
  ↓
Tests pass
  ↓
Done
```

### One-line certification memory

> **CLAUDE.md guides, Skills provide procedures, Permission Modes control autonomy, PreToolUse protects actions, PostToolUse reacts to actions, Stop verifies completion, and verification proves the result.**

```

Source: :contentReference[oaicite:17]{index=17} :contentReference[oaicite:18]{index=18}
```

[1]: https://academy.claude.com/courses/claude-code-in-action/hooks "Hooks · Claude Code in Action · Claude Academy"
