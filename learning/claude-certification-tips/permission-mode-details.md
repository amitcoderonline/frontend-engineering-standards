# Claude Code — Permission Modes: Detailed Explanation

## Overview

Permission modes let you decide **what Claude is allowed to do without stopping to ask for approval**.

Instead of approving every individual action, you choose a permission mode that matches the task and the level of trust you are comfortable giving Claude. ([Claude Academy][1])

For certification, don't just memorize the six names. Understand these three questions:

1. **What can Claude do automatically?**
2. **When does Claude ask me?**
3. **What safety mechanism is involved?**

---

# 1. The Six Permission Modes

Claude Code has six permission modes:

| Mode                   | Simple meaning                  | Main use                |
| ---------------------- | ------------------------------- | ----------------------- |
| **Manual**             | Ask before actions              | Maximum control         |
| **Accept Edits**       | Allow normal coding actions     | Everyday development    |
| **Plan**               | Read and analyze only           | Planning                |
| **Auto**               | Work independently + classifier | Hands-off development   |
| **Don't Ask**          | Only pre-approved tools         | CI/unattended execution |
| **Bypass Permissions** | Skip permission checks          | Isolated container/VM   |

The most important distinction is:

```text
Manual
    ↓
More human approval

Accept Edits
    ↓
More coding autonomy

Auto
    ↓
Hands-off + safety classifier

Don't Ask
    ↓
Unattended + allowlist

Bypass
    ↓
No permission checks
```

---

# 2. Manual Mode

## What does it mean?

Manual is the most interactive mode.

Claude can read files without asking, but other actions require approval. ([Claude Academy][1])

Think of it as:

> "Claude, investigate whatever you need, but ask me before taking action."

### Example

You ask:

```text
Find the authentication bug and fix it.
```

Claude might do:

```text
Read auth.service.ts
        ↓
Allowed

Read login.component.ts
        ↓
Allowed

Edit auth.service.ts
        ↓
ASK ME

Run npm test
        ↓
ASK ME
```

### When should you use Manual?

Use it when:

* You're working on unfamiliar code.
* The repository is sensitive.
* You want to see every important action.
* You're learning how Claude works.
* You don't completely trust the task yet.

### Certification memory

> **Manual = Claude asks before actions.**

---

# 3. Accept Edits Mode

This is the mode that is closest to **normal day-to-day development**.

Claude can perform:

* Reads
* File edits
* Common filesystem Bash commands

without asking for approval each time. ([Claude Academy][1])

### Example

You say:

```text
Create a reusable Angular table component and add unit tests.
```

Claude can:

```text
Read existing components
        ↓
Create table.component.ts
        ↓
Create table.component.html
        ↓
Create test file
        ↓
Modify related files
        ↓
Run appropriate commands
```

You don't have to approve every edit.

You then review the result afterward.

### Why is this useful?

Imagine Claude needs to change 15 files.

Manual mode could result in many approval prompts.

Accept Edits lets Claude iterate much more smoothly.

### Certification memory

> **Accept Edits = normal coding with fewer approval interruptions.**

---

# 4. Plan Mode

Plan mode is **read-only**.

Claude can investigate the repository and propose changes, but it does not edit your code. ([Claude Academy][1])

### Example

Suppose you want to migrate authentication:

```text
Session authentication
        ↓
OAuth / PingFederate
```

Instead of saying:

```text
Implement the migration.
```

start with:

```text
Analyze the authentication architecture and
create a migration plan. Do not modify files.
```

Claude can investigate:

```text
Auth service
     ↓
HTTP interceptor
     ↓
Login component
     ↓
Backend API
     ↓
Session handling
     ↓
Tests
```

Then produce:

```text
Migration Plan

1. Update authentication service.
2. Modify interceptor.
3. Add token refresh.
4. Update login flow.
5. Update backend integration.
6. Add tests.
```

You review the plan before implementation.

### When should you use Plan?

Especially for:

* Large refactoring
* Architecture changes
* Authentication changes
* Database migrations
* Framework upgrades
* Large multi-file changes

### Certification memory

> **Plan = investigate and propose; don't modify.**

---

# 5. Auto Mode

This is the most important mode to understand for certification.

Auto is the **hands-off mode**.

Claude can work independently, but before each action executes, a **separate classifier model reviews the action**. ([Claude Academy][1])

Think:

```text
Claude wants to perform action
            ↓
     Safety classifier
            ↓
     Is this consistent
       with the intent?
        /          \
      YES           NO
       ↓             ↓
    Execute        Block
```

---

# 6. What Does the Auto Classifier Actually Check?

This is critical.

The classifier checks **intent**, not correctness. ([Claude Academy][1])

Suppose you say:

```text
Refactor the authentication module.
```

Claude changes 20 files.

The classifier asks approximately:

> "Are these actions consistent with the requested task?"

It does **not** ask:

> "Is Claude's authentication implementation technically correct?"

That distinction is extremely important.

### Example

Claude writes:

```typescript
function authenticate(user: User) {
    return true;
}
```

That's obviously bad code.

But the classifier might still allow the change because Claude is genuinely trying to perform the requested authentication refactor.

Therefore:

```text
Auto classifier
        ↓
Checks intent/safety
```

not:

```text
Auto classifier
        ↓
Checks correctness
```

### Certification takeaway

> **Auto protects against inappropriate actions, not incorrect code.**

---

# 7. What Auto Is Designed to Block

The Academy lesson gives examples of actions Auto is designed to guard against, including:

* Production deployments
* Production migrations
* Force pushes
* Piping downloaded code directly into a shell
* Sending sensitive data to external endpoints
* Destroying files needed for the session ([Claude Academy][1])

For example, you ask:

```text
Fix the failing tests.
```

Claude suddenly tries:

```bash
git push --force
```

That's a very different level of action from the request.

The classifier is designed to identify this kind of escalation.

---

# 8. What Auto Normally Allows

The Academy lesson gives examples of ordinary actions that can be allowed, such as:

```text
Local code edits
Installing dependencies from the lock file
Read-only requests
Pushing to your own branch
```

These are normal development activities that fit within the requested intent. ([Claude Academy][1])

So don't think:

> "Auto means Claude can do literally anything."

Instead think:

> **"Claude can work autonomously, while a classifier provides a safety boundary."**

---

# 9. Auto Does NOT Replace Testing

This is probably the **most important certification concept** in this lesson.

Suppose:

```text
User:
Refactor authentication.
```

Claude makes a change.

The classifier allows it.

But:

```text
npm test
```

returns:

```text
23 failed
```

Auto doesn't magically know that the implementation is incorrect.

That's why the Academy recommends pairing Auto with a **Stop Hook** that runs tests. ([Claude Academy][1])

The architecture becomes:

```text
             USER REQUEST
                  ↓
                Claude
                  ↓
        ┌──────────────────┐
        │   AUTO MODE      │
        │                  │
        │ Classifier checks│
        │     INTENT       │
        └────────┬─────────┘
                 ↓
             Code changes
                 ↓
             Claude stops
                 ↓
        ┌──────────────────┐
        │    STOP HOOK     │
        │                  │
        │ Run tests        │
        │ Run lint         │
        │ Run typecheck    │
        └────────┬─────────┘
                 ↓
          PASS / FAIL
```

This gives you two different safety mechanisms:

```text
AUTO
↓
"Should Claude perform this action?"

STOP HOOK
↓
"Did the resulting code actually work?"
```

### Certification memory

> **Auto checks intent before an action; verification checks correctness after the work.**

---

# 10. Don't Ask Mode

Don't Ask is designed for **unattended execution**. ([Claude Academy][1])

Imagine Claude is running in:

```text
CI
```

or:

```text
Scheduled job
```

or:

```text
Overnight automation
```

Nobody is available to answer:

```text
Allow this command?
```

So Don't Ask works differently.

Only **pre-approved tools** can run.

Everything else is automatically denied.

### Example

Suppose you've approved:

```text
Read
Edit
Test
Lint
```

Claude requests:

```text
Read file
```

→ Allowed.

Claude requests:

```text
npm test
```

→ Allowed if pre-approved.

Claude requests:

```text
Deploy to production
```

→ Denied.

No human is prompted.

### Certification memory

> **Don't Ask = no human available, so only explicitly approved tools can run.**

---

# 11. Auto vs Don't Ask

This is one of the most important comparisons.

|                    | Auto                               | Don't Ask              |
| ------------------ | ---------------------------------- | ---------------------- |
| Human approval     | Not normally needed                | None                   |
| Classifier         | Yes                                | No                     |
| Decision mechanism | Classifier evaluates actions       | Pre-approved tool list |
| Unapproved action  | Can be blocked based on classifier | Automatically denied   |
| Typical use        | Hands-off development              | CI / scheduled jobs    |

### Easy memory trick

```text
AUTO
"Classifier decides."

DON'T ASK
"Allowlist decides."
```

---

# 12. Bypass Permissions

This is the highest-risk mode.

Bypass skips permission checks entirely. The Academy describes it as equivalent to the `--dangerously-skip-permissions` behavior. ([Claude Academy][1])

Normally:

```text
Claude
   ↓
Permission system
   ↓
Action
```

Bypass:

```text
Claude
   ↓
Action
```

There is no normal permission gate.

---

# 13. Why Bypass Is Dangerous

Imagine your machine contains:

```text
Source code
SSH keys
Cloud credentials
.env files
Personal files
Production configuration
```

If Claude has unrestricted permissions, a mistake could have a much larger impact.

Therefore:

```text
Normal laptop
+
Bypass
=
High risk
```

---

# 14. Why Containers and VMs Change the Risk

The Academy specifically says Bypass should only be used inside an **isolated container or virtual machine**. ([Claude Academy][1])

For example:

```text
Your computer
     |
     +----------------------+
     | Docker Container     |
     |                      |
     | Claude Code          |
     | Test repository      |
     | Temporary files      |
     +----------------------+
```

Claude can have much more freedom inside the container because the environment provides an isolation boundary.

If something goes badly:

```text
Destroy container
```

instead of potentially damaging your primary environment.

### Certification memory

> **Bypass Permissions = isolated environment only.**

---

# 15. Shift + Tab

You don't need to remember a separate command for every everyday permission mode.

Press:

```text
Shift + Tab
```

to cycle through the everyday modes:

```text
Manual
   ↓
Accept Edits
   ↓
Plan
   ↓
Auto
```

The status bar shows the currently active mode. ([Claude Academy][1])

### Certification takeaway

Remember:

```text
Shift + Tab
```

is the shortcut for cycling through the everyday permission modes.

---

# 16. Real Example — Small Bug Fix

Suppose:

```text
The login button doesn't work.
```

You could use:

```text
Accept Edits
```

and ask:

```text
Find why the login button doesn't work,
fix it and add a regression test.
```

Claude can:

```text
Find component
      ↓
Find event handler
      ↓
Identify bug
      ↓
Edit code
      ↓
Add test
      ↓
Run test
```

For a small local task, this is usually more appropriate than using a highly controlled workflow.

---

# 17. Real Example — Large Angular Upgrade

Suppose:

```text
Angular 12
    ↓
Angular 20/21
```

This could affect:

* `package.json`
* Angular configuration
* Build tooling
* Components
* Services
* RxJS
* Angular Material
* Tests
* Third-party libraries

### Step 1 — Plan

Use:

```text
Plan
```

Ask Claude to analyze the repository.

```text
Analyze the application and create an Angular upgrade plan.
Do not modify files.
```

### Step 2 — Review

You review the plan.

### Step 3 — Implement

Switch to:

```text
Accept Edits
```

or potentially:

```text
Auto
```

for a larger autonomous workflow.

### Step 4 — Verify

Run:

```text
npm test
npm run lint
npm run build
```

A Stop Hook or verification Skill can automate these checks.

---

# 18. Real Example — Production Deployment

Suppose you say:

```text
Fix the authentication tests.
```

Claude should not suddenly decide:

```text
Deploy to production.
```

This is an **intent escalation**.

Auto's classifier is specifically designed to guard against examples such as production deployments and migrations. ([Claude Academy][1])

This demonstrates why Auto is different from simply saying:

```text
Claude can do everything.
```

---

# 19. Real Example — CI Pipeline

Imagine:

```text
GitHub Actions
      ↓
Claude Code
      ↓
Analyze PR
      ↓
Fix approved issues
      ↓
Run tests
```

There is no developer sitting there waiting for:

```text
Approve?
```

Therefore:

```text
Don't Ask
```

is the relevant permission mode, with an explicitly approved tool set.

---

# 20. Real Example — Dangerous Automated Environment

Suppose you're building an isolated benchmark environment:

```text
Docker
   ↓
Temporary filesystem
   ↓
No production credentials
   ↓
Claude Code
```

You intentionally want Claude to operate without permission prompts.

This is a potential use case for:

```text
Bypass Permissions
```

because the environment itself provides the isolation boundary.

---

# 21. Permission Mode vs CLAUDE.md

Don't confuse these concepts.

## CLAUDE.md

Defines project-level guidance.

Example:

```text
Use named exports.

Keep business logic in services.

Put API handlers under src/api.

Run tests before completing a feature.
```

This answers:

> **How should Claude work?**

---

## Permission Mode

Controls Claude's autonomy.

Example:

```text
Auto
```

This answers:

> **How much can Claude do without asking me?**

### Certification memory

```text
CLAUDE.md
→ Instructions

Permission Mode
→ Autonomy
```

---

# 22. Permission Mode vs Skill

A Skill defines a **repeatable procedure**.

For example:

```text
Verification Skill
```

might say:

```text
1. Run tests.
2. Run lint.
3. Run typecheck.
4. Review Git diff.
5. Report results.
```

Permission mode determines whether Claude can execute the required actions automatically.

So:

```text
Skill
↓
"What procedure should I follow?"

Permission Mode
↓
"How much autonomy do I have while doing it?"
```

---

# 23. Permission Mode vs Hook

A Hook is an automation/enforcement mechanism.

For example:

```text
Auto
  ↓
Claude completes task
  ↓
Stop Hook
  ↓
npm test
  ↓
PASS / FAIL
```

The roles are different:

```text
Permission Mode
→ Controls autonomy

Hook
→ Runs/enforces specific behavior
```

---

# 24. The Most Important Certification Comparison

Memorize this:

| Concept             | Question it answers                                |
| ------------------- | -------------------------------------------------- |
| **CLAUDE.md**       | How should Claude work?                            |
| **Skill**           | What reusable procedure should Claude follow?      |
| **Permission Mode** | How much autonomy does Claude have?                |
| **Hook**            | What should be automatically enforced or executed? |
| **Verification**    | Did the resulting work actually pass?              |

This is a very useful mental model for connecting the lessons you've already studied.

---

# 25. Certification Scenario Questions

## Question 1

You want Claude to inspect a large repository and create an implementation plan without modifying files.

**Which mode?**

### Answer

**Plan**

```text
Read
 ↓
Analyze
 ↓
Plan
 ↓
No modification
```

---

## Question 2

You are implementing a normal feature and want Claude to edit files without asking you about every edit.

**Which mode?**

### Answer

**Accept Edits**

---

## Question 3

You want Claude to work hands-off while a safety mechanism evaluates each action.

**Which mode?**

### Answer

**Auto**

---

## Question 4

You are running Claude in CI and nobody will be available to approve prompts.

**Which mode?**

### Answer

**Don't Ask**

Because only pre-approved tools are allowed and everything else is automatically denied. ([Claude Academy][1])

---

## Question 5

You want to skip all permission checks.

**Which mode?**

### Answer

**Bypass Permissions**

But it should only be used in an isolated container or VM. ([Claude Academy][1])

---

## Question 6

Claude writes broken code while using Auto mode. Why wasn't the classifier necessarily able to prevent it?

### Answer

Because the classifier checks **intent**, not **correctness**. ([Claude Academy][1])

---

## Question 7

How do you verify that the code produced by Auto actually works?

### Answer

Use a **Stop Hook** to run tests and other verification checks after Claude finishes. ([Claude Academy][1])

---

# 26. Easy Memory Trick

Remember the six modes like this:

```text
MANUAL
"Ask me."

ACCEPT EDITS
"Let me code."

PLAN
"Understand first."

AUTO
"Work independently + safety classifier."

DON'T ASK
"No human + approved tools only."

BYPASS
"Skip permission checks + isolate the environment."
```

---

# 27. The Certification Mental Model

When you get a certification question, ask:

### Is Claude only investigating?

```text
PLAN
```

### Is Claude doing normal coding?

```text
ACCEPT EDITS
```

### Do I want maximum human control?

```text
MANUAL
```

### Do I want hands-off development with a safety classifier?

```text
AUTO
```

### Is this an unattended environment?

```text
DON'T ASK
```

### Am I deliberately removing permission checks inside an isolated environment?

```text
BYPASS
```

---

# 28. Final Certification Cheat Sheet

```text
┌────────────────────┬─────────────────────────────────────────┐
│ Mode               │ Remember                                │
├────────────────────┼─────────────────────────────────────────┤
│ Manual             │ Ask before important actions             │
│ Accept Edits       │ Normal coding with fewer prompts         │
│ Plan               │ Read-only investigation                  │
│ Auto               │ Hands-off + classifier checks intent     │
│ Don't Ask          │ Unattended + pre-approved tools          │
│ Bypass Permissions │ Skip checks + isolated environment only  │
└────────────────────┴─────────────────────────────────────────┘
```

## Four Critical Distinctions

```text
PLAN
= Read + Analyze + Plan

ACCEPT EDITS
= Normal code modification

AUTO
= Classifier checks intent

DON'T ASK
= Pre-approved tools only
```

And:

```text
AUTO
→ "Is Claude doing something inappropriate?"

STOP HOOK
→ "Did Claude's work actually pass?"
```

---

# Final Takeaway

The easiest way to remember Claude Code permission modes is:

> **Permission modes define Claude's level of autonomy. They are not a replacement for verification.**

The most important certification sentence is:

> **Plan is read-only, Accept Edits is for normal coding, Auto provides hands-off execution with classifier-based intent checks, Don't Ask is for unattended execution with pre-approved tools, and Bypass Permissions skips permission checks and should only be used in isolated environments.** ([Claude Academy][1])

### One final mental model

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
Automation / enforcement

VERIFICATION
    ↓
Proof that the work is correct
```

**For your certification, pay particular attention to `Auto vs Don't Ask`, `Auto vs Bypass`, and `Auto vs Stop Hook`. These are the distinctions most worth understanding rather than simply memorizing.**

[1]: https://academy.claude.com/courses/claude-code-in-action/permission-modes "Permission modes · Claude Code in Action · Claude Academy"
