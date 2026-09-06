# Claude Code: Verification Skills

## Overview

As Claude Code projects become larger, you will notice that the same verification work happens repeatedly.

For example, after asking Claude to refactor code, you might normally:

1. Run tests.
2. Review the Git diff.
3. Check that the tests were not weakened.
4. Confirm the result.
5. Report whether everything passed.

The problem is that **you have to remember to ask Claude to do these checks**.

A **verification skill** automates this repeated process.

> **If you repeatedly give Claude the same multi-step instruction, consider turning it into a Skill.**

The Claude Academy specifically recommends starting with a **verification skill** because it makes checking Claude's work consistent and automatic.

---

# 1. What Is a Verification Skill?

A verification skill is a reusable procedure that Claude can trigger when a particular type of work is completed.

For example:

```text
Claude refactors code
        ↓
Verification Skill triggers
        ↓
Run tests
        ↓
Read Git diff
        ↓
Check tests were not weakened
        ↓
Report PASS / FAIL
        ↓
Provide evidence
```

Without a verification skill:

```text
Claude finishes
       ↓
You remember to ask:
"Run the tests and check the diff"
```

With a verification skill:

```text
Claude finishes
       ↓
Skill automatically performs verification
```

This removes the dependency on you remembering the verification step.

---

# 2. Why Verification Is So Important

A common mistake is to assume:

```text
Tests are green
      =
Code is correct
```

That is not always true.

Imagine Claude changes a test:

```text
Expected:
expect(result).toBe(100);
```

and weakens it to:

```text
expect(result).toBeDefined();
```

The test may still pass.

So:

```text
Green tests
≠
Correct implementation
```

A good verification skill therefore does more than run tests.

It should also inspect the changes.

---

# 3. The Verification Process

A typical verification skill can perform four important checks.

## Step 1 — Run the Test Suite

Example:

```bash
npm test
```

or:

```bash
npm run test
```

The skill records whether the tests pass or fail.

---

## Step 2 — Read the Diff

The skill reviews the changes:

```bash
git diff
```

This helps determine whether Claude changed something unexpected.

For example:

```text
Files changed:
- src/auth/login.ts
- src/auth/login.test.ts
```

The verifier can inspect those changes.

---

## Step 3 — Check That Tests Were Not Weakened

This is one of the most important concepts in the lesson.

Don't simply ask:

> "Are the tests passing?"

Ask:

> "Did Claude change the tests so that they pass more easily?"

For example:

### Before

```typescript
expect(response.status).toBe(401);
```

### After

```typescript
expect(response.status).toBeDefined();
```

The second test is weaker.

A verification skill should detect this type of problem.

---

## Step 4 — Report Evidence

The final result should explicitly state:

```text
PASS

Tests: 124 passed
Type checking: passed
Diff review: passed
Test weakening: not detected
```

or:

```text
FAIL

Tests: 121 passed, 3 failed
Diff review: failed
Reason: authentication test was weakened
```

The important principle is:

> **"Done" means the verification gates were actually run and the results were observed and reported.**

Not simply:

> "The code looks good."

---

# 4. A Skill Is More Than skill.md

A Skill is a **folder**, not just one Markdown file.

A typical structure might look like:

```text
.claude/
└── skills/
    └── verify-code/
        ├── skill.md
        ├── reference.md
        └── check.sh
```

Each file has a different purpose.

---

## skill.md

This is the main instruction file.

It should describe:

* What the skill does
* When it should trigger
* What procedure Claude should follow

Keep it **short and focused**.

---

## reference.md

This can contain detailed information.

For example:

```text
Testing standards
Code quality rules
Architecture details
Verification criteria
```

Claude can read it when deeper information is needed.

This keeps the main `skill.md` small.

---

## Scripts

A skill can also contain executable scripts.

Example:

```text
check.sh
```

Claude can execute the script rather than loading the entire script contents into its context.

For example:

```bash
#!/bin/bash

npm test
npm run lint
npm run typecheck
```

This is particularly useful for verification.

---

# 5. Why Keep skill.md Lean?

A common mistake is putting everything into `skill.md`.

For example:

```text
skill.md
 ├── instructions
 ├── 500 lines of documentation
 ├── testing rules
 ├── architecture documentation
 ├── scripts
 └── examples
```

This is unnecessary.

A better design is:

```text
skill.md
     ↓
Short procedure
     |
     +---- reference.md
     |       ↓
     |    Detailed knowledge
     |
     +---- check.sh
             ↓
        Executable checks
```

### Certification takeaway

Remember:

> **skill.md describes what to do.**

> **Reference files contain detailed information.**

> **Scripts provide executable tooling.**

---

# 6. Skills Are Loaded Efficiently

An important concept for certification is that Claude does not need to load the complete contents of every Skill into context immediately.

The **descriptions** of Skills are available so Claude can determine when a Skill is relevant.

The full Skill is loaded when it is actually needed.

Conceptually:

```text
Many Skills
    ↓
Descriptions available
    ↓
Claude identifies relevant Skill
    ↓
Skill needed
    ↓
Full Skill loaded
```

This means you can have many reusable procedures without unnecessarily putting all their detailed content into the active context.

---

# 7. Where Should Instructions Go?

This lesson connects directly to the previous `CLAUDE.md` lesson.

There are three important instruction surfaces:

```text
CLAUDE.md
Skills
Hooks
```

The key is knowing **which one owns which rule**.

---

# 8. CLAUDE.md — Permanent Project Conventions

Use `CLAUDE.md` for conventions that apply broadly and continuously.

Examples:

```text
Use TypeScript for new source files.

React components should use PascalCase.

API handlers belong in src/api/handlers.

Run npm test before completing a feature.
```

Think:

```text
CLAUDE.md
    ↓
How we generally work in this project
```

---

# 9. Skills — Task-Specific Procedures

Use a Skill for a procedure associated with a particular kind of task.

Examples:

```text
Verification
Release checklist
Database migration
PR preparation
Security review
Performance analysis
```

Think:

```text
Skill
   ↓
How to perform this particular procedure
```

For example:

```text
verify-code/
```

could contain the complete process for verifying a code change.

---

# 10. Hooks — Hard Enforcement

Hooks are different.

A `CLAUDE.md` instruction says:

```text
Please follow this rule.
```

A Skill says:

```text
Follow this procedure when this task occurs.
```

A Hook actually **runs code**.

Therefore, if Claude must not be able to skip a rule, don't rely only on a prompt or Skill.

Use a Hook.

Think:

```text
CLAUDE.md
    ↓
Guidance

Skill
    ↓
Reusable procedure

Hook
    ↓
Enforcement
```

### Certification shortcut

This is one of the most important tables to memorize:

| Requirement                      | Use         |
| -------------------------------- | ----------- |
| Project-wide convention          | `CLAUDE.md` |
| Reusable task procedure          | Skill       |
| Hard rule that cannot be skipped | Hook        |

---

# 11. Example: Building a Verification Skill

Imagine you have a React + TypeScript project.

You repeatedly tell Claude:

```text
After making changes:

1. Run tests.
2. Run TypeScript checks.
3. Run lint.
4. Review the Git diff.
5. Make sure tests weren't weakened.
6. Report the results.
```

You have now repeated the same procedure multiple times.

That's a good candidate for a Skill.

Possible structure:

```text
.claude/
└── skills/
    └── verify-code/
        ├── skill.md
        └── check.sh
```

The `skill.md` could describe:

```text
Verify completed code changes.

1. Run the test suite.
2. Run the type checker.
3. Run lint.
4. Inspect the Git diff.
5. Check that tests were not weakened.
6. Report PASS or FAIL with evidence.
```

And `check.sh` could execute the automated checks.

The exact implementation can vary, but the architectural idea is:

```text
Skill
  |
  +-- Instructions
  |
  +-- References
  |
  +-- Scripts
```

---

# 12. The "Repeated Instruction" Rule

A very useful rule from this lesson is:

> **If you've typed the same multi-step instruction twice, consider making it a Skill.**

For example:

### First time

You tell Claude:

```text
Run tests, check the diff and verify the migration.
```

### Second time

You give the same instructions again.

### Third time

You should consider:

```text
Create a Skill for this.
```

Instead of repeatedly typing:

```text
Do A
Do B
Do C
Do D
```

you can create:

```text
migration-verification
```

and reuse it.

---

# 13. Verification Skill vs CLAUDE.md

This distinction is particularly important.

### CLAUDE.md

Good for:

```text
Always use named exports.

Use the service layer for business logic.

API files go under src/api.
```

These are **ongoing conventions**.

### Skill

Good for:

```text
When verifying a completed feature:

1. Run tests.
2. Run lint.
3. Review diff.
4. Check test quality.
5. Report evidence.
```

This is a **procedure**.

---

# 14. Verification Skill vs Hook

Suppose you want to ensure:

```text
No secrets can ever be committed.
```

A Skill could tell Claude:

```text
Check for secrets before committing.
```

But Claude could potentially skip the Skill.

If the requirement is truly mandatory, use a Hook or another enforcement mechanism.

Think:

```text
"Please check"
     ↓
Skill

"Must be blocked"
     ↓
Hook
```

---

# 15. Certification Cheat Sheet

| Concept                   | Key Point                                     |
| ------------------------- | --------------------------------------------- |
| **Skill**                 | Reusable procedure                            |
| **Verification Skill**    | Automatically checks Claude's work            |
| **skill.md**              | Describes the Skill and procedure             |
| **reference.md**          | Detailed supporting information               |
| **Scripts**               | Executable tools used by the Skill            |
| **Lean skill.md**         | Keep main instructions short                  |
| **Test suite**            | Verify functionality                          |
| **Git diff**              | Verify what actually changed                  |
| **Test weakening check**  | Ensure tests weren't made easier just to pass |
| **Evidence**              | Report actual verification results            |
| **CLAUDE.md**             | General project conventions                   |
| **Skill**                 | Task-specific procedure                       |
| **Hook**                  | Hard enforcement                              |
| **Repeated instructions** | Candidate for a Skill                         |

---

# 16. Certification Questions

### Q1. Why is a verification Skill a good first Skill to build?

Because it removes the dependency on the developer remembering to ask Claude to verify its own work.

---

### Q2. What should a verification Skill check?

At minimum, think about:

```text
Tests
Diff
Test quality
Results/evidence
```

---

### Q3. Why isn't "all tests pass" enough?

Because tests can be weakened so that they pass without properly verifying the intended behavior.

---

### Q4. What is the purpose of `reference.md`?

To hold detailed supporting information that Claude can read when needed, keeping the main `skill.md` lean.

---

### Q5. Why put scripts inside a Skill?

Claude can execute them directly, allowing the Skill to carry reusable tooling without putting all of the script contents into the context.

---

### Q6. What belongs in CLAUDE.md?

General project conventions that apply continuously.

Example:

```text
Use TypeScript.
Use named exports.
Put API handlers in src/api.
```

---

### Q7. What belongs in a Skill?

A reusable procedure associated with a particular type of task.

Example:

```text
Verify a completed feature.
```

---

### Q8. What belongs in a Hook?

A rule that must actually be enforced and cannot safely be skipped.

---

### Q9. Does having many Skills mean all their full contents are loaded into context?

**No.**

Their descriptions are available for determining relevance; the full Skill is loaded when it is needed.

---

### Q10. What is the rule for deciding when to create a Skill?

If you have typed the same multi-step instruction more than once, consider turning it into a Skill.

---

# 17. Easy Memory Trick

Remember:

```text
CLAUDE.md → CONVENTIONS
Skill     → PROCEDURES
Hook      → ENFORCEMENT
```

For verification:

```text
VERIFY
  ↓
TEST
  ↓
DIFF
  ↓
CHECK TEST QUALITY
  ↓
REPORT EVIDENCE
```

And for Skill structure:

```text
skill.md
   ↓
What to do

reference.md
   ↓
Detailed knowledge

scripts/
   ↓
Executable tools
```

---

# Final Certification Summary

The central idea of this lesson is:

> **Don't rely on yourself to remember verification steps. Turn repeated verification procedures into Skills.**

A strong verification Skill should:

1. Run the tests.
2. Inspect the diff.
3. Check that tests were not weakened.
4. Report PASS or FAIL.
5. Provide evidence.

And remember the three instruction surfaces:

```text
             Claude Code Instructions

             ┌──────────────────┐
             │    CLAUDE.md     │
             │  General rules   │
             └────────┬─────────┘
                      │
             ┌────────▼─────────┐
             │      Skill       │
             │ Task procedures  │
             └────────┬─────────┘
                      │
             ┌────────▼─────────┐
             │      Hook        │
             │   Enforcement    │
             └──────────────────┘
```

### The certification sentence to remember

> **CLAUDE.md defines conventions, Skills automate repeatable procedures, and Hooks enforce rules that Claude must not be able to skip.**

This is the key connection between the **CLAUDE.md**, **Verification Skills**, and upcoming **Hooks** lessons in the Claude Code in Action course.
