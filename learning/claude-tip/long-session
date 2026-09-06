# Claude Code: Steering Long Sessions

## Overview

Short Claude Code tasks are usually easy:

1. Give Claude a task.
2. Claude makes the change.
3. Review the result.

Long-running tasks are different.

Examples include:

* Refactoring many files
* Implementing a large feature
* Debugging complex problems
* Running tests and fixing failures
* Working across multiple parts of a repository

For long sessions, the important principle is:

> **Scope the work before Claude starts, then steer Claude while it works.**

For Claude certification preparation, remember that long-running Claude Code sessions are not simply about giving Claude a bigger prompt. They involve **planning, context management, checkpoints, completion criteria, automation, and isolation of parallel work**.

---

# 1. Plan Mode

Before Claude starts modifying code, use **Plan Mode**.

In Plan Mode, Claude operates in a **read-only research mode**.

Claude can:

* Explore the repository
* Read relevant files
* Understand dependencies
* Determine what needs to change
* Produce an implementation plan

It does **not immediately start editing files**.

Example:

```text
We need to add role-based permission checking to the application.

First analyze the existing authentication and authorization implementation and create a plan.
```

Claude might return something like:

```text
Plan

1. Review authentication service.
2. Identify current role handling.
3. Introduce a permission model.
4. Update backend API authorization.
5. Update frontend permission checks.
6. Add tests.
```

Review the plan before allowing implementation.

### Why Plan Mode matters

Changing a plan is inexpensive.

Fixing dozens of incorrect code changes later can be expensive.

Therefore:

```text
Plan → Review → Correct → Implement
```

is usually better than:

```text
Prompt → Large implementation → Discover mistakes → Undo everything
```

### Certification takeaway

**Plan Mode helps scope complex work before code modifications begin.**

---

# 2. Compact

Long conversations consume the Claude context window.

Claude Code provides:

```text
/compact
```

Compact summarizes the conversation and uses that summary as the new context.

Conceptually:

```text
Large conversation
       ↓
    /compact
       ↓
Important information summarized
       ↓
More context space available
```

However, automatic summarization can lose information that matters.

Instead of simply running:

```text
/compact
```

you can steer the summary.

Example:

```text
/compact Focus on the --version flag implementation
```

This tells Claude what information should remain important in the compressed context.

### Practical example

Suppose you spent a long session doing:

```text
Authentication debugging
        ↓
Database debugging
        ↓
API implementation
        ↓
Permission implementation
```

You may no longer need all of the earlier debugging details.

You could use:

```text
/compact Focus on the permission implementation and remaining API work.
```

Claude can then preserve the context most relevant to the next part of the task.

### Certification takeaway

**Compact manages the context window by summarizing previous conversation history.**

More importantly:

> Compact can be **steered with additional instructions**.

---

# 3. Rewind

Sometimes Claude starts moving in the wrong direction.

Instead of continuously prompting Claude to undo its mistakes, you can use **Rewind**.

Claude Code creates a checkpoint at each user prompt.

You can access the Rewind menu by:

```text
Double-tapping Escape on an empty prompt
```

The Rewind menu provides several options.

### Restore Code and Conversation

Restores both:

```text
Conversation
+
Code changes
```

Useful when the whole approach was wrong.

---

### Restore Conversation

Restores only the conversation.

Code remains unchanged.

Useful when you want to change the discussion or reasoning without reverting files.

---

### Restore Code

Restores files while keeping the conversation.

Useful when:

```text
Claude's reasoning was useful
but
the implementation was wrong.
```

---

### Summarize From Here

Summarizes everything after a checkpoint.

Useful when you had a long side discussion that is no longer important.

---

### Summarize Up To Here

Summarizes everything before a checkpoint.

Useful when the early analysis was long but you want to preserve the recent implementation discussion in full.

### Certification takeaway

Understand that **Rewind is more flexible than a simple Git rollback**.

It can affect:

```text
Code
Conversation
or
Both
```

depending on what you choose.

---

# 4. Goal

Sometimes it is easier to describe **what success looks like** rather than tell Claude every individual step.

Claude Code provides:

```text
/goal
```

Example:

```text
/goal all tests in src/billing pass, and the type checker reports zero errors
```

Claude can continue working across turns until the completion condition is satisfied.

Think of Goal as:

```text
Task
 ↓
Claude works
 ↓
Check completion criteria
 ↓
Not satisfied?
 ↓
Continue working
 ↓
Satisfied
 ↓
Stop
```

This is different from simply saying:

```text
Fix the billing module.
```

The second instruction is vague.

A better completion condition is measurable:

```text
All billing tests pass
AND
TypeScript reports zero errors.
```

### Important limitation

The Goal evaluator checks information available in the **conversation transcript**.

Therefore, the success condition should be something Claude can demonstrate through output.

Good example:

```text
All tests pass.
```

because Claude can run tests and show the result.

Weak example:

```text
Make customers happy.
```

because it cannot reliably be verified from the transcript.

To clear the goal:

```text
/goal clear
```

### Certification takeaway

Use **Goal when "done" can be defined more clearly than the exact implementation steps**.

---

# 5. Loop

Claude Code also supports **Loop**.

Loop executes a prompt repeatedly at intervals between turns.

It is useful when Claude needs to check an external process.

For example:

```text
Deploy application
       ↓
Check deployment
       ↓
Still running
       ↓
Check again
       ↓
Deployment complete
       ↓
Run validation
```

Possible use cases include:

* Waiting for CI
* Checking deployments
* Monitoring build results
* Checking external job status

To stop a loop:

```text
Escape
```

### Goal vs Loop

This distinction is useful for certification.

| Feature | Purpose                                                |
| ------- | ------------------------------------------------------ |
| Goal    | Keep working until a completion condition is satisfied |
| Loop    | Repeatedly execute/check something over time           |

Example:

```text
Goal:
"All tests must pass."

Loop:
"Check the CI pipeline periodically."
```

They solve different problems.

---

# 6. Worktrees

Imagine running two Claude Code sessions simultaneously.

Claude A is changing:

```text
src/auth/
```

Claude B is also changing:

```text
src/auth/
```

Both agents working on the same files can create conflicts.

Claude Code can use **Git worktrees** to isolate parallel sessions.

Conceptually:

```text
Repository
   |
   +---- Worktree A
   |       Claude Session A
   |
   +---- Worktree B
           Claude Session B
```

Each agent receives its own independent working tree.

This prevents sessions from overwriting each other's changes.

### Why worktrees matter

Without isolation:

```text
Claude A edits file
        ↓
Claude B edits same file
        ↓
Conflict / overwritten work
```

With worktrees:

```text
Claude A → Worktree A

Claude B → Worktree B
```

Each session works independently.

---

# 7. `.worktreeinclude`

There is another useful file:

```text
.worktreeinclude
```

It lives at the repository root.

It specifies **Git-ignored files that should still be copied into Claude worktrees**.

For example:

```text
.env.local
config/local.json
```

These files might be required for running the project but intentionally excluded from Git.

Example `.worktreeinclude`:

```text
.env.local
config/development.json
```

This allows each worktree to receive required local configuration without committing those files to the repository.

### Certification takeaway

Remember the relationship:

```text
Worktree
    ↓
Isolated parallel Claude session

.worktreeinclude
    ↓
Copy required Git-ignored files into worktrees
```

---

# Putting Everything Together

A well-managed long Claude Code session might look like this:

```text
1. PLAN
   ↓
Understand repository and implementation

2. REVIEW PLAN
   ↓
Correct assumptions before coding

3. IMPLEMENT
   ↓
Claude starts modifying code

4. STEER
   ↓
Provide corrections when needed

5. COMPACT
   ↓
Reduce unnecessary conversation context

6. REWIND
   ↓
Return to a checkpoint if Claude goes in the wrong direction

7. GOAL
   ↓
Define measurable completion criteria

8. LOOP
   ↓
Check external processes when necessary

9. WORKTREES
   ↓
Isolate parallel Claude sessions
```

---

# Certification Cheat Sheet

Remember these associations:

| Concept                  | Remember                                     |
| ------------------------ | -------------------------------------------- |
| **Plan Mode**            | Research and plan before modifying code      |
| **Compact**              | Compress conversation context                |
| **Steered Compact**      | Tell Claude what the summary should preserve |
| **Rewind**               | Return to previous checkpoints               |
| **Restore Code**         | Revert files                                 |
| **Restore Conversation** | Revert conversation                          |
| **Goal**                 | Define measurable completion conditions      |
| **Loop**                 | Repeatedly check/run something               |
| **Worktree**             | Isolate parallel Claude sessions             |
| **`.worktreeinclude`**   | Copy needed Git-ignored files into worktrees |

---

# Certification Questions to Remember

### Q1. Why should you use Plan Mode before a large refactoring?

Because Claude can first inspect the repository and develop a proposed implementation in read-only mode, allowing you to correct the approach before files are modified.

---

### Q2. What does `/compact` do?

It summarizes previous conversation context and uses that summary as the new context, freeing space in Claude's context window.

---

### Q3. Why might you provide instructions with `/compact`?

To tell Claude which information is most important to preserve.

Example:

```text
/compact Focus on the authentication migration.
```

---

### Q4. What is Rewind used for?

To return to earlier checkpoints when Claude has taken the task in an undesirable direction.

Depending on the option selected, you can restore:

```text
Code
Conversation
or
Both
```

---

### Q5. When should `/goal` be used?

When you can clearly define a measurable completion condition.

Example:

```text
/goal all unit tests pass and npm run lint reports zero errors
```

---

### Q6. What is an important limitation of Goal?

Its evaluator works from the conversation transcript, so completion criteria should be demonstrable through Claude's output.

---

### Q7. What problem do worktrees solve?

They prevent multiple Claude sessions working on the same repository from modifying the same working tree and interfering with each other.

---

### Q8. What is `.worktreeinclude`?

A repository-root file used to specify Git-ignored files that should be copied into Claude worktrees.

---

# Easy Memory Trick

Remember:

```text
PLAN → COMPACT → REWIND → GOAL → LOOP → WORKTREE
```

Think of it as:

```text
PLAN
Know what Claude should do.

COMPACT
Keep the important context.

REWIND
Recover when Claude goes wrong.

GOAL
Tell Claude what "done" means.

LOOP
Repeat checks when waiting on something.

WORKTREE
Keep parallel agents separated.
```

---

## Key Principle

The main idea of steering long Claude Code sessions is:

> **Give Claude enough autonomy to complete large tasks, while maintaining control over its plan, context, direction, success criteria, and workspace.**

That principle is more important for certification than memorizing individual commands.
