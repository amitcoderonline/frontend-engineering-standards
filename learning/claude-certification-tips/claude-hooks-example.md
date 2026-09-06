# Claude Code Hooks — Practical Examples for a Real Project

## Overview

Hooks are useful when I want Claude Code to **automatically perform a check, enforce a rule, or react to an event**.

For a real project, I can use Hooks for things like:

- Automatically formatting code
- Running tests after changes
- Preventing dangerous Git commands
- Blocking modifications to sensitive files
- Checking for secrets
- Verifying work before Claude stops
- Restoring important context after `/compact`
- Logging/auditing Claude's actions

The most important idea is:

> **Use `CLAUDE.md` for guidance and Hooks when I need automation or deterministic enforcement.**

---

# 1. Where Do Hooks Live?

Hooks can be configured in Claude Code settings.

A common project-level location is:

```text
.claude/
├── settings.json
├── skills/
│   └── verify-code/
│       └── skill.md
└── hooks/
    ├── format.sh
    ├── protect-git.sh
    └── verify.sh
````

The exact configuration depends on the Hook event and command you want to execute.

A simple project can start with:

```text
.claude/
└── settings.json
```

and define Hooks there.

---

# 2. Example 1 — Automatically Format Code

## Problem

Suppose my project uses Prettier.

Normally I might tell Claude:

```text
Please format the files after editing them.
```

But that's only guidance.

Instead, I can use a `PostToolUse` Hook.

```text
Claude edits file
       ↓
PostToolUse
       ↓
Prettier
       ↓
Formatted file
```

---

## Example Hook Command

For example:

```bash
npx prettier --write "$FILE"
```

The exact script should obtain the file path from the Hook's input rather than assuming a hard-coded filename.

---

## Why PostToolUse?

Because formatting should happen **after** Claude modifies the file.

```text
PreToolUse
→ Too early

PostToolUse
→ Correct
```

### Certification takeaway

> **Use PostToolUse when you want to react to a successful tool action, such as formatting the resulting file.**

---

# 3. Example 2 — Run Tests After Code Changes

This is especially useful for my Angular/React projects.

Suppose Claude changes:

```text
src/auth/auth.service.ts
```

I want tests to run automatically.

Workflow:

```text
Claude edits code
       ↓
PostToolUse
       ↓
Run tests
       ↓
PASS / FAIL
```

For example:

```bash
npm test -- --runInBand
```

Depending on the project, this could instead be:

```bash
npm run test
```

---

## Why This Is Useful

Without a Hook:

```text
Claude:
"I've completed the change."
```

I have to remember:

```text
Run tests
```

With automation:

```text
Claude changes code
       ↓
Hook runs tests
       ↓
Result available
```

This reduces the chance that verification is forgotten.

---

# 4. Example 3 — Prevent `git push --force`

This is a great example of **hard enforcement**.

Suppose my team doesn't allow:

```bash
git push --force
```

Putting this in `CLAUDE.md`:

```text
Never use git push --force.
```

is only guidance.

A `PreToolUse` Hook can actually prevent the command.

Workflow:

```text
Claude wants to run:

git push --force
        ↓
PreToolUse Hook
        ↓
Detect "push --force"
        ↓
DENY
        ↓
Command doesn't execute
```

---

## Example Script

```bash
#!/bin/bash

COMMAND="$1"

if echo "$COMMAND" | grep -qE 'git[[:space:]]+push.*--force'; then
    echo "Force pushes are not allowed." >&2
    exit 2
fi

exit 0
```

The important part is:

```bash
exit 2
```

because:

```text
exit 2
→ blocking error
```

---

## Certification takeaway

> **PreToolUse is appropriate when I need to prevent a tool action before it executes.**

---

# 5. Example 4 — Protect Production Files

Suppose my repository contains:

```text
config/
├── development.json
├── test.json
└── production.json
```

I don't want Claude modifying:

```text
production.json
```

automatically.

I can use a `PreToolUse` Hook.

```text
Claude wants to edit production.json
              ↓
        PreToolUse
              ↓
       Detect protected file
              ↓
             DENY
```

The Hook can inspect the tool input and reject the operation.

---

## Why Is This Better Than CLAUDE.md?

CLAUDE.md:

```text
Do not modify production.json.
```

is a guideline.

Hook:

```text
If target == production.json
    ↓
deny
```

is deterministic enforcement.

---

# 6. Example 5 — Prevent Changes to `.env`

This is one of the first Hooks I would consider adding to a real project.

Suppose I have:

```text
.env
.env.production
.env.local
```

I don't want Claude modifying them.

I can create a `PreToolUse` Hook that checks file paths.

Conceptually:

```text
Claude wants to edit .env
       ↓
PreToolUse
       ↓
Is file protected?
       ↓
YES
       ↓
DENY
```

This is particularly useful because `.env` files may contain secrets.

---

# 7. Example 6 — Detect Secrets in Bash Commands

Suppose Claude tries to execute:

```bash
curl https://api.example.com?token=secret123
```

I don't want secrets accidentally sent externally.

A `PreToolUse` Hook can inspect the command.

```text
Claude creates Bash command
        ↓
PreToolUse
        ↓
Search for secret patterns
        ↓
Secret detected
        ↓
DENY
```

Alternatively, in some cases I could transform the input using:

```text
updatedInput
```

For example:

```text
secret123
    ↓
[REDACTED]
```

This demonstrates that a Hook doesn't always have to simply allow or deny an action.

---

# 8. Example 7 — Verify Before Claude Stops

This is one of the most powerful examples.

Suppose my project has three required checks:

```bash
npm test
npm run lint
npm run typecheck
```

I want Claude to be unable to say:

```text
Implementation complete.
```

until these checks pass.

Use a:

```text
Stop Hook
```

Workflow:

```text
Claude implements feature
        ↓
Claude wants to stop
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
   /          \
 YES           NO
  ↓             ↓
STOP       Block stop
            + feedback
```

---

# 9. Example Stop Hook Script

A simple verification script could look like:

```bash
#!/bin/bash

echo "Running verification..."

npm test
if [ $? -ne 0 ]; then
    echo "Tests failed." >&2
    exit 2
fi

npm run lint
if [ $? -ne 0 ]; then
    echo "Lint failed." >&2
    exit 2
fi

npm run typecheck
if [ $? -ne 0 ]; then
    echo "Type checking failed." >&2
    exit 2
fi

echo "All verification checks passed."

exit 0
```

The important concept is:

```text
exit 0
→ Claude can stop

exit 2
→ Claude is told it isn't finished
```

---

# 10. Why Stop Hook Is Different from PostToolUse

This is important for certification.

Suppose Claude edits a file.

### PostToolUse

```text
Edit
 ↓
PostToolUse
 ↓
Run formatter
```

The edit has already happened.

### Stop

```text
Claude finishes
 ↓
Stop
 ↓
Run tests
 ↓
Tests fail
 ↓
Don't allow completion
```

Therefore:

```text
PostToolUse
→ React after an action

Stop
→ Verify before Claude finishes
```

---

# 11. Example 8 — Automatically Run TypeScript Checks

For a TypeScript project:

```bash
npx tsc --noEmit
```

could be run by a Hook.

Workflow:

```text
Claude modifies TypeScript
       ↓
Hook
       ↓
tsc --noEmit
       ↓
Type errors?
```

If the check is part of final verification, a Stop Hook is particularly appropriate.

---

# 12. Example 9 — Angular Project Verification

For my Angular projects, I could define a verification workflow such as:

```bash
npm run lint
npm test
npm run build
```

Workflow:

```text
Claude changes Angular code
       ↓
Claude completes task
       ↓
Stop Hook
       ↓
Lint
       ↓
Unit tests
       ↓
Production build
       ↓
PASS / FAIL
```

This is a very practical use of Hooks.

---

# 13. Example 10 — React Project Verification

For a React + TypeScript project:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The Stop Hook can make these checks part of the definition of "done."

```text
Claude says:
"Feature complete."

        ↓

Stop Hook

        ↓

Lint
Typecheck
Tests
Build

        ↓

Everything passes?

        ↓

YES → Done
NO  → Continue fixing
```

---

# 14. Example 11 — Prevent Dangerous Commands

I can create a general `PreToolUse` Hook that blocks commands such as:

```bash
rm -rf /
```

or dangerous Git commands such as:

```bash
git reset --hard
git push --force
git clean -fd
```

The Hook could inspect the command before execution.

```text
Claude wants Bash command
        ↓
PreToolUse
        ↓
Is command dangerous?
     /        \
   YES         NO
    ↓           ↓
 DENY         ALLOW
```

### Important

Don't create an overly aggressive blocklist that prevents legitimate development.

Hooks should be designed carefully and tested.

---

# 15. Example 12 — Allow Some Commands but Block Others

Suppose I want Claude to run:

```bash
npm test
npm run lint
npm run build
```

but never:

```bash
npm run deploy:prod
```

A PreToolUse Hook can enforce that.

```text
npm test
   ↓
ALLOW

npm run lint
   ↓
ALLOW

npm run build
   ↓
ALLOW

npm run deploy:prod
   ↓
DENY
```

This is a very good example of combining **automation with security boundaries**.

---

# 16. Example 13 — Protect the Main Branch

Suppose I never want Claude to commit directly to `main`.

A Hook can inspect Git commands.

For example:

```text
Claude:
git checkout main
        ↓
PreToolUse
        ↓
DENY
```

Or:

```text
Claude:
git push origin main
        ↓
PreToolUse
        ↓
DENY
```

This is stronger than putting:

```text
Never push to main.
```

in CLAUDE.md.

---

# 17. Example 14 — Preserve Context After `/compact`

Suppose I am working on a large authentication migration.

Before compaction:

```text
Current task:
OAuth migration

Files:
src/auth/auth.service.ts
src/auth/auth.interceptor.ts

Current problem:
Token refresh returns 401.

Next step:
Investigate refresh request.
```

Then:

```text
/compact
```

A `SessionStart` Hook using the `compact` matcher can re-inject important state.

```text
Long conversation
       ↓
/compact
       ↓
Context compressed
       ↓
SessionStart(compact)
       ↓
Restore important project state
       ↓
Continue work
```

This is particularly useful for long Claude Code sessions.

---

# 18. Example 15 — Audit Loaded Instructions

Suppose my repository has:

```text
CLAUDE.md
.claude/rules/security.md
.claude/rules/testing.md
```

I want to understand which instructions Claude actually loads.

An:

```text
InstructionsLoaded
```

Hook can be used for logging/auditing.

Conceptually:

```text
Instructions loaded
       ↓
InstructionsLoaded
       ↓
Record / inspect
       ↓
Audit information
```

This can be useful in larger enterprise repositories.

---

# 19. A Practical Hook Setup for My Project

If I were setting up Hooks for a real Angular/React project, I would start small.

I would not create 20 Hooks immediately.

I'd start with these four:

```text
1. PreToolUse
   ↓
   Protect dangerous Git commands

2. PostToolUse
   ↓
   Format modified files

3. Stop
   ↓
   Run tests + lint + typecheck

4. SessionStart
   ↓
   Restore useful context after compact
```

The workflow becomes:

```text
                    Claude Code
                        |
              ┌─────────┴─────────┐
              ↓                   ↓
         PreToolUse          SessionStart
              ↓                   ↓
       Protect actions       Restore context
              |
              ↓
          Tool executes
              |
              ↓
        PostToolUse
              ↓
       Format / check
              |
              ↓
       Claude continues
              |
              ↓
            Stop
              ↓
       Run verification
              |
        ┌─────┴─────┐
        ↓           ↓
      PASS          FAIL
        ↓           ↓
       Done       Continue
```

---

# 20. Recommended Project Structure

A clean structure could be:

```text
my-project/
│
├── CLAUDE.md
│
├── .claude/
│   ├── settings.json
│   │
│   ├── hooks/
│   │   ├── protect-git.sh
│   │   ├── format.sh
│   │   └── verify.sh
│   │
│   └── skills/
│       └── verify-code/
│           └── skill.md
│
├── src/
└── package.json
```

This gives each concept a clear responsibility.

```text
CLAUDE.md
→ Project instructions

hooks/
→ Automated enforcement/checks

skills/
→ Reusable procedures
```

---

# 21. CLAUDE.md + Skill + Hook Example

Imagine I want Claude to follow this workflow:

```text
Implement feature
    ↓
Run tests
    ↓
Review diff
    ↓
Check code quality
    ↓
Finish
```

I could divide the responsibility.

## CLAUDE.md

```text
Use TypeScript for new source files.

Business logic belongs in services.

Use named exports.

Tests are required for new functionality.
```

## Verification Skill

```text
Verify completed changes:

1. Run tests.
2. Run type checking.
3. Review Git diff.
4. Check test quality.
5. Report evidence.
```

## Stop Hook

```text
Before Claude stops:

Run:
npm test
npm run lint
npm run typecheck
```

Now:

```text
CLAUDE.md
→ Rules

Skill
→ Verification procedure

Stop Hook
→ Automatic verification
```

---

# 22. Don't Make Hooks Too Complicated

A common mistake is:

```text
Every possible rule
        ↓
Huge Hook system
        ↓
Complexity
        ↓
False positives
        ↓
Developer frustration
```

Start with high-value automation.

Good first Hooks:

```text
Protect secrets
Protect dangerous Git operations
Format code
Run verification
```

Then add more only when there is a real problem.

---

# 23. Hooks Should Be Deterministic

A major reason to use Hooks is predictability.

Instead of:

```text
"Claude, please remember to run tests."
```

use:

```text
Stop Hook
    ↓
Run tests
```

Instead of:

```text
"Claude, please don't force push."
```

use:

```text
PreToolUse
    ↓
Detect force push
    ↓
Deny
```

The difference is:

```text
Instruction
→ Claude should remember

Hook
→ System performs the check
```

---

# 24. Important Security Principle

Hooks themselves are code.

Therefore, Hooks should be treated as part of the project's security-sensitive configuration.

Don't blindly copy a Hook from the internet.

Review:

```text
What command does it execute?
What permissions does it have?
What files can it modify?
Can it expose secrets?
Can it run arbitrary shell commands?
```

A malicious Hook could be just as dangerous as malicious application code.

---

# 25. Certification Cheat Sheet

| Requirement                    | Best Hook                     |
| ------------------------------ | ----------------------------- |
| Block command before execution | **PreToolUse**                |
| Ask user about risky action    | **PreToolUse + ask**          |
| Automatically allow action     | **PreToolUse + allow**        |
| Modify tool input              | **PreToolUse + updatedInput** |
| Format after edit              | **PostToolUse**               |
| Run follow-up checks           | **PostToolUse**               |
| Verify before Claude finishes  | **Stop**                      |
| Verify subagent completion     | **SubagentStop**              |
| Prepare before compact         | **PreCompact**                |
| Restore context after compact  | **SessionStart + compact**    |
| Initialize session             | **SessionStart**              |
| Audit loaded instructions      | **InstructionsLoaded**        |

---

# 26. Certification Questions

## Q1. Which Hook should you use to prevent a dangerous command?

**Answer:**

`PreToolUse`

Because it executes before the tool call and can deny the operation.

---

## Q2. Which Hook is appropriate for formatting a file after Claude edits it?

**Answer:**

`PostToolUse`

Because the tool has already completed successfully.

---

## Q3. Which Hook is appropriate for ensuring tests pass before Claude finishes?

**Answer:**

`Stop`

Because it runs when Claude wants to stop and can prevent completion if verification fails.

---

## Q4. Can PostToolUse prevent the tool that triggered it?

**Answer:**

**No.**

The original tool has already executed.

---

## Q5. How can a PreToolUse Hook block an action?

**Answer:**

It can return a `deny` decision or use a blocking error such as exit code `2`.

---

## Q6. What does exit code `2` mean?

**Answer:**

A blocking Hook error.

---

## Q7. What does exit code `1` mean?

**Answer:**

A non-blocking error.

This is an important certification trap.

```text
exit 1
→ Does NOT mean "block"

exit 2
→ Block
```

---

## Q8. What is `updatedInput`?

**Answer:**

A PreToolUse Hook response that replaces the tool's input with a modified input.

It can be used, for example, to sanitize a command before execution.

---

## Q9. Which Hook can restore context after `/compact`?

**Answer:**

`SessionStart` with the `compact` matcher.

---

## Q10. Which Hook runs before compaction?

**Answer:**

`PreCompact`.

---

## Q11. What is the difference between a Skill and a Hook?

**Answer:**

```text
Skill
→ Reusable procedure

Hook
→ Event-driven automation/enforcement
```

---

## Q12. What is the difference between CLAUDE.md and a Hook?

**Answer:**

```text
CLAUDE.md
→ Guidance

Hook
→ Deterministic automation/enforcement
```

---

# 27. Certification Scenario Questions

## Scenario 1 — Block Force Push

### Question

Claude tries to execute:

```bash
git push --force
```

You want to prevent it before it happens.

### Answer

Use:

```text
PreToolUse
```

and return:

```text
deny
```

or a blocking exit code:

```text
exit 2
```

---

## Scenario 2 — Format Code

### Question

Claude modifies a TypeScript file. You want Prettier to run afterward.

### Answer

Use:

```text
PostToolUse
```

---

## Scenario 3 — Verify Completion

### Question

Claude says:

```text
"Implementation complete."
```

But your requirement is:

```text
Tests pass
AND
Lint passes
AND
Typecheck passes
```

### Answer

Use:

```text
Stop Hook
```

Run the checks and block the stop if they fail.

---

## Scenario 4 — Sanitize a Command

### Question

Claude generates a Bash command containing a secret. You want to remove the secret instead of blocking the entire command.

### Answer

Use:

```text
PreToolUse
+
updatedInput
```

---

## Scenario 5 — Restore Context

### Question

Your long Claude Code session gets compacted and you want important task information restored.

### Answer

Use:

```text
SessionStart
+
compact matcher
```

---

# 28. Easy Memory Trick

Remember:

```text
PRE
→ Before action
→ Protect / Allow / Deny / Modify

POST
→ After action
→ Format / Check

STOP
→ Before Claude finishes
→ Verify

COMPACT
→ Context compression

SESSION
→ Start / Restore context
```

And:

```text
exit 0
→ Success

exit 2
→ BLOCK

exit 1
→ Non-blocking error
```

---

# 29. My Recommended Starting Point

For a real project, don't begin with complicated automation.

Start with:

### Hook #1 — Protect Git

```text
PreToolUse
→ Block force push / dangerous commands
```

### Hook #2 — Format

```text
PostToolUse
→ Run formatter
```

### Hook #3 — Verify

```text
Stop
→ Run tests + lint + typecheck
```

### Hook #4 — Restore Context

```text
SessionStart(compact)
→ Restore important task context
```

This gives you a strong foundation without making the Claude Code setup difficult to maintain.

---

# Final Certification Summary

Hooks are **event-driven automation and enforcement mechanisms** inside Claude Code.

The most important events are:

```text
PreToolUse
→ Before a tool runs

PostToolUse
→ After a tool runs

Stop
→ When Claude wants to finish

SessionStart
→ Session initialization / context restoration

PreCompact
→ Before compaction
```

The most important decisions are:

```text
allow
→ Proceed

deny
→ Block

ask
→ Ask user

updatedInput
→ Modify the tool input
```

The most important exit codes are:

```text
0
→ Success

2
→ Blocking error

1
→ Non-blocking error
```

## The Certification Sentence to Memorize

> **PreToolUse controls actions before they execute, PostToolUse reacts after successful tool calls, Stop can enforce completion checks, and SessionStart can restore context after compaction.**

## The Bigger Claude Code Picture

```text
CLAUDE.md
    ↓
Project guidance

SKILL
    ↓
Reusable procedure

PERMISSION MODE
    ↓
Level of autonomy

HOOK
    ↓
Event-driven automation / enforcement

VERIFICATION
    ↓
Evidence that the result is correct
```

### One-line memory trick

> **CLAUDE.md tells Claude what to do, Skills tell Claude how to perform reusable procedures, Permission Modes control how much Claude can do, and Hooks make important actions/checks happen automatically.**

```
```
