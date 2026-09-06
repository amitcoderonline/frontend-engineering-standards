# Claude Code: Permission Modes

## Overview

Claude Code can perform many actions on your behalf:

* Read files
* Edit files
* Run shell commands
* Install dependencies
* Run tests
* Make Git changes
* Interact with external systems

The question is:

> **How much permission should Claude have?**

Claude Code provides **permission modes** that let you decide how much Claude can do without stopping to ask for approval.

Instead of approving every action individually, you select a mode appropriate for the task.

---

# 1. The Six Permission Modes

Claude Code has six permission modes:

| Mode                   | What it allows                                   | Typical use                    |
| ---------------------- | ------------------------------------------------ | ------------------------------ |
| **Manual**             | Reads freely; everything else asks               | Careful interactive work       |
| **Accept edits**       | Reads, edits, common filesystem Bash commands    | Normal coding iteration        |
| **Plan**               | Reads only; proposes changes                     | Planning before implementation |
| **Auto**               | Actions run automatically with classifier review | Hands-off development          |
| **Don't ask**          | Only pre-approved tools; everything else denied  | CI/unattended execution        |
| **Bypass permissions** | Skips permission checks                          | Isolated containers/VMs only   |

The most important certification task is not memorizing the names—it is understanding **the security/trust boundary of each mode**.

---

# 2. Manual Mode

Manual is the most interactive mode.

Claude can perform:

```text
Reads
```

without asking.

Other actions require your approval.

Conceptually:

```text
Claude wants to read file
        ↓
Allowed

Claude wants to edit file
        ↓
Ask user

Claude wants to run command
        ↓
Ask user
```

### When to use it

Use Manual when you want close control over Claude's actions.

For example:

```text
Exploring an unfamiliar repository
Reviewing sensitive code
Working on risky changes
```

### Certification memory

> **Manual = maximum interactive approval.**

---

# 3. Accept Edits Mode

Accept edits gives Claude more freedom.

It allows:

* Reading files
* Editing files
* Common filesystem Bash commands

without asking each time.

This is useful when you are actively working with Claude and want it to iterate on code without constant approval prompts.

Example:

```text
You:
Implement the login form.

Claude:
Read files
   ↓
Edit files
   ↓
Run common commands
   ↓
Continue implementation
```

You then review the work afterward.

### Certification memory

> **Accept edits = let Claude make normal code changes without asking every time.**

---

# 4. Plan Mode

Plan Mode is read-only.

Claude can:

* Explore the repository
* Read files
* Understand the architecture
* Research the problem
* Propose a solution

But it does not modify the code.

Conceptually:

```text
Plan Mode

Read
 ↓
Understand
 ↓
Analyze
 ↓
Propose plan
 ↓
No code modifications
```

This is useful before a large implementation.

Example:

```text
Analyze how authentication works and create a plan for migrating it to OAuth.
```

Claude investigates first.

### Certification memory

> **Plan = read-only planning.**

---

# 5. Auto Mode

Auto is the important **hands-off mode**.

Claude can run actions without stopping for individual approval.

However, before each action executes, a **separate classifier model reviews the action**.

Conceptually:

```text
Claude decides to perform action
             ↓
     Classifier reviews it
             ↓
       ┌─────┴─────┐
       ↓           ↓
    Allowed      Blocked
       ↓           ↓
    Execute       Stop
```

The classifier is checking **intent and safety**, not whether the code is correct.

---

# 6. What Auto Mode Is Designed to Block

The classifier is designed to stop actions that appear to go beyond the requested intent or create significant risk.

Examples include:

### Production deploys

```text
Deploy directly to production
```

### Production migrations

```text
Run a production database migration
```

### Force pushes

```bash
git push --force
```

### Downloaded code piped directly into a shell

Conceptually:

```text
download
   ↓
pipe directly into shell
```

### Sending sensitive information externally

For example:

```text
Send credentials or sensitive data to an external endpoint.
```

### Destroying files required for the session

These are examples of actions the classifier is designed to guard against.

---

# 7. What Auto Mode Commonly Allows

Normal development activity can be allowed.

Examples include:

```text
Local code edits
Read-only requests
Installing dependencies from the lock file
Pushing to your own branch
```

The key distinction is:

> **Auto is not "Claude can do absolutely anything."**

There is still a classifier acting as a guardrail.

---

# 8. The Most Important Auto Mode Limitation

This is one of the most important certification points.

The classifier checks:

> **Intent**

It does **not** check:

> **Correctness**

Suppose you ask Claude:

```text
Refactor the authentication system.
```

Claude performs the refactor.

But it accidentally creates broken authentication code.

The classifier may still allow the action.

Why?

Because:

```text
Broken code
```

is a correctness problem, not necessarily a dangerous-intent problem.

Therefore:

```text
Auto classifier
       ↓
Checks intent/safety

NOT

Checks whether code works
```

---

# 9. Auto + Stop Hook

This is an extremely important connection to the previous **Verification Skills / Hooks** lesson.

Auto mode protects against problematic **actions**.

A stop hook can verify whether the resulting **code actually works**.

Think:

```text
             AUTO MODE
                 ↓
       Before each action
                 ↓
       Classifier checks
             INTENT
                 ↓
            Execute
                 ↓
          Claude finishes
                 ↓
            STOP HOOK
                 ↓
        Run tests / checks
                 ↓
          Verify CORRECTNESS
```

So:

> **Auto protects intent before actions.**

> **Stop hooks verify correctness after the work.**

This is a very useful certification distinction.

---

# 10. Don't Ask Mode

Don't Ask is designed for situations where **no human is available to approve prompts**.

Examples:

```text
CI pipeline
Scheduled job
Overnight batch
Automated workflow
```

It allows only **pre-approved tools**.

Anything outside the approved list is automatically denied.

There is no prompt waiting for a human.

Conceptually:

```text
Claude requests tool
       ↓
Is tool pre-approved?
   /           \
 Yes            No
  ↓              ↓
Run          Auto-deny
```

This is important because a CI pipeline cannot stop and wait for you to click:

```text
Approve
```

at 2 AM.

### Certification memory

> **Don't Ask = unattended execution with a pre-approved tool list.**

---

# 11. Auto vs Don't Ask

This distinction is likely to be useful in certification questions.

|                   | Auto                         | Don't Ask               |
| ----------------- | ---------------------------- | ----------------------- |
| Human interaction | Not normally needed          | None                    |
| Safety classifier | Yes                          | No                      |
| Tool policy       | Classifier evaluates actions | Only pre-approved tools |
| Unapproved action | May be blocked by classifier | Automatically denied    |
| Typical use       | Hands-off development        | CI/unattended jobs      |

Think:

```text
AUTO
"I want Claude to work independently, but keep a safety guard."

DON'T ASK
"No human will be available, so only allow explicitly approved tools."
```

---

# 12. Bypass Permissions

Bypass permissions skips permission checks.

It is equivalent to using the dangerous:

```text
--dangerously-skip-permissions
```

behavior.

This means Claude can perform actions without the normal permission checks.

### Very important

This mode should only be used inside an:

```text
Isolated container
```

or:

```text
Virtual machine
```

Why?

Because you are removing the safety boundary.

Think:

```text
Normal environment
      +
Bypass permissions
      =
High risk
```

But:

```text
Isolated VM/container
      +
Bypass permissions
      =
Controlled environment
```

### Certification memory

> **Bypass permissions = isolated environments only.**

---

# 13. Cycling Through Modes

You don't need to memorize a separate command for each everyday mode.

Press:

```text
Shift + Tab
```

to cycle through the modes.

The status bar shows the currently selected permission mode.

The everyday modes available through this cycling include:

```text
Manual
   ↓
Accept edits
   ↓
Plan
   ↓
Auto
```

---

# 14. Choosing the Right Mode

The easiest way to remember permission modes is to start with the task.

## Carefully reviewing code?

Use:

```text
Manual
```

---

## Normal coding with Claude?

Use:

```text
Accept edits
```

---

## Need Claude to investigate before changing anything?

Use:

```text
Plan
```

---

## Want hands-off development with a safety classifier?

Use:

```text
Auto
```

---

## Running without a human present?

Use:

```text
Don't ask
```

---

## Running in an isolated VM/container and intentionally skipping permission checks?

Use:

```text
Bypass permissions
```

---

# 15. Permission Modes + Previous Lessons

This lesson connects strongly with the lessons you have already studied.

You now have:

```text
CLAUDE.md
    ↓
Project conventions

Skills
    ↓
Reusable procedures

Permission Modes
    ↓
How much Claude can do

Hooks
    ↓
Enforcement + verification
```

Together:

```text
                  CLAUDE.md
                      ↓
               Project guidance
                      ↓
                   Skills
                      ↓
              Repeatable procedures
                      ↓
             Permission Mode
                      ↓
             Allowed actions
                      ↓
                   Hooks
                      ↓
           Enforce / Verify results
```

This is a useful mental model for the certification.

---

# 16. Permission Mode vs Hook

Don't confuse these.

### Permission Mode

Answers:

> **"What is Claude allowed to do automatically?"**

### Hook

Answers:

> **"What should happen before/after a particular action?"**

For example:

```text
Auto Mode
    ↓
Claude can work hands-off
    ↓
Stop Hook
    ↓
Run tests
    ↓
Verify correctness
```

Permission modes control the **trust level**.

Hooks provide **specific automation/enforcement**.

---

# 17. Permission Mode vs CLAUDE.md

Also remember:

### CLAUDE.md

```text
Use named exports.
Keep business logic in services.
Run tests before completing a feature.
```

These are instructions about **how Claude should work**.

### Permission Mode

```text
Auto
```

controls **how much Claude can do without asking**.

So:

```text
CLAUDE.md → What Claude should do
Permission Mode → What Claude can do automatically
```

---

# 18. Certification Cheat Sheet

| Mode                   | Key phrase                              |
| ---------------------- | --------------------------------------- |
| **Manual**             | Reads allowed; other actions ask        |
| **Accept edits**       | Normal coding without constant approval |
| **Plan**               | Read-only planning                      |
| **Auto**               | Hands-off + classifier checks intent    |
| **Don't ask**          | Unattended; only pre-approved tools     |
| **Bypass permissions** | Skip checks; isolated VM/container only |

---

# 19. Certification Questions

### Q1. What does Manual mode do?

Reads happen without prompting; other actions require approval.

---

### Q2. What is Accept Edits mode?

It allows reads, file edits, and common filesystem Bash commands without asking for approval each time.

---

### Q3. What does Plan mode allow?

Read-only exploration and planning.

It does not modify files.

---

### Q4. What makes Auto mode different?

Claude works hands-off, while a separate classifier reviews actions before they execute.

---

### Q5. What does the Auto classifier check?

**Intent**, particularly whether an action escalates beyond what was requested.

---

### Q6. Does the Auto classifier verify that the code works?

**No.**

It checks intent, not correctness.

---

### Q7. How can you verify correctness when using Auto?

Use a **stop hook** to run tests or other verification checks after Claude finishes.

---

### Q8. What is Don't Ask designed for?

Unattended environments such as:

```text
CI
Scheduled jobs
Overnight batches
```

Only pre-approved tools are allowed.

---

### Q9. What happens when Don't Ask encounters a tool that isn't approved?

It is automatically denied without prompting the user.

---

### Q10. When should Bypass Permissions be used?

Only inside an **isolated container or virtual machine**.

---

### Q11. How do you cycle through everyday permission modes?

Press:

```text
Shift + Tab
```

---

### Q12. Which mode should you use when no human will be available to approve prompts?

**Don't Ask.**

---

# 20. Easy Memory Trick

Remember the six modes like this:

```text
MANUAL
↓
Ask me

ACCEPT EDITS
↓
Let me code

PLAN
↓
Only investigate

AUTO
↓
Work independently + classifier

DON'T ASK
↓
No human → approved tools only

BYPASS
↓
Skip checks → isolated environment
```

---

# 21. The Most Important Certification Distinctions

### Auto vs Don't Ask

```text
AUTO
Classifier decides whether an action is acceptable.

DON'T ASK
Only explicitly pre-approved tools are allowed.
```

### Auto vs Bypass

```text
AUTO
Safety checks remain.

BYPASS
Permission checks are skipped.
```

### Plan vs Accept Edits

```text
PLAN
Read-only.

ACCEPT EDITS
Can modify files.
```

### Auto vs Correctness

```text
AUTO
Checks intent.

STOP HOOK
Checks correctness.
```

---

# Final Certification Summary

If you remember only this, you should be able to answer most permission-mode questions:

```text
Manual
→ Ask before actions.

Accept edits
→ Let Claude edit and perform common filesystem commands.

Plan
→ Read and plan; don't modify.

Auto
→ Hands-off execution with a classifier checking intent.

Don't ask
→ Unattended execution using only pre-approved tools.

Bypass
→ Skip permission checks; isolated container/VM only.
```

And the most important conceptual model is:

> **Permission modes control how much autonomy Claude has. Auto protects against risky intent before an action; verification hooks protect against incorrect results afterward.**

For certification, memorize this sentence:

> **Auto checks intent, a stop hook checks correctness, Don't Ask is for unattended pre-approved execution, and Bypass permissions belongs only in isolated environments.**
