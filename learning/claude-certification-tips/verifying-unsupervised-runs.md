# Claude Code — Trust It: Verifying Unsupervised Runs

> **Claude Academy — Lesson 8 of 9: Trust it: Verifying unsupervised runs**
>
> This page is certification-focused and can be saved directly as `verifying-unsupervised-runs.md`.

---

# 1. Core Idea

When Claude works while you are **not watching every step**, you cannot rely on:

> "Claude says it is done."

You need **independent evidence** that the work is correct.

The fundamental rule from this lesson is:

> **The less you watched, the more you verify.** ([Claude Academy][1])

Think about it like this:

```text
More supervision
      ↓
Less verification required

Less supervision
      ↓
More verification required
```

For example:

```text
Interactive coding
    ↓
You watched Claude
    ↓
Quick review may be enough


Unattended Claude run
    ↓
Nobody watched the execution
    ↓
Diff + tests + review + second opinion
```

---

# 2. What Is an Unsupervised Run?

An unsupervised run is when Claude performs work without you continuously monitoring its actions.

Examples:

* GitHub Actions
* Headless Claude Code
* Scheduled routines
* Overnight coding tasks
* Long-running autonomous tasks
* CI/CD automation

Example:

```text
11:00 PM
   ↓
Claude starts task
   ↓
You go to sleep
   ↓
Claude modifies 15 files
   ↓
Claude runs tests
   ↓
Claude finishes
   ↓
7:00 AM
You inspect result
```

You did not observe the process.

Therefore, you need stronger verification.

---

# 3. The Verification Principle

The lesson gives a simple model:

```text
                     LEVEL OF SUPERVISION

High supervision  ──────────────────────→ Low supervision
       |                                      |
       ↓                                      ↓
Quick check                              Strong verification
```

A useful practical model is:

| Claude execution                | Recommended verification                      |
| ------------------------------- | --------------------------------------------- |
| Interactive and closely watched | Quick review                                  |
| Short autonomous task           | Diff + tests                                  |
| Long autonomous task            | Diff + tests + review                         |
| CI/headless run                 | Diff + machine-readable result + exit code    |
| Important production change     | Full verification + independent second review |

---

# 4. Keep Unattended Runs in Auto Mode

This is one of the most important certification points.

For unattended work:

> **Prefer Auto mode rather than Bypass Permissions.**

In Auto mode, the classifier still reviews actions for potential danger. ([Claude Academy][1])

Conceptually:

```text
Unattended Claude
       ↓
    Auto Mode
       ↓
Action requested
       ↓
Safety classifier
       ↓
Potentially dangerous?
    /          \
  Yes           No
   ↓             ↓
Block/ask       Continue
```

---

# 5. Auto Mode Does NOT Verify Correctness

This is a critical distinction.

Auto mode answers:

> **"Is this action potentially dangerous?"**

It does **not** answer:

> **"Is the code correct?"**

The course explicitly states that the classifier evaluates dangerous actions, not whether the resulting code is correct. ([Claude Academy][1])

Therefore:

```text
Auto Mode
    ↓
Safety
```

is different from:

```text
Tests / Review
    ↓
Correctness
```

### Certification memory

> **Auto checks action safety; verification checks correctness.**

---

# 6. Auto vs Bypass Permissions

|                                    | Auto | Bypass Permissions         |
| ---------------------------------- | ---- | -------------------------- |
| Permission checks                  | Yes  | No                         |
| Safety classifier                  | Yes  | Skipped                    |
| Suitable for unattended work       | Yes  | Only isolated environments |
| Checks code correctness            | No   | No                         |
| Protects against dangerous actions | Yes  | No                         |

Therefore:

```text
Unattended production work
        ↓
Prefer Auto
        ↓
Keep the safety net
```

---

# 7. Start With the Diff, Not the Summary

This is probably the most important practical lesson.

When Claude finishes, it may give you:

```text
Implemented authentication improvements.

- Added token validation
- Updated authentication service
- Added tests
- All tests pass
```

It sounds perfect.

But don't start with the summary.

Start with:

```bash
git diff
```

The course specifically recommends reviewing the actual diff before trusting Claude's summary. ([Claude Academy][1])

---

# 8. Why the Diff Matters

Imagine Claude says:

```text
Updated authentication service.
```

But the actual diff contains:

```text
modified:
src/auth/service.ts

modified:
src/config/production.json

modified:
package.json

modified:
src/admin/admin.service.ts
```

You may not have expected:

```text
src/config/production.json
```

or:

```text
src/admin/admin.service.ts
```

The summary might not make this obvious.

The diff will.

### Rule

> **A clean summary is not proof of clean code.**

---

# 9. Recommended Diff Workflow

After an unsupervised run:

```bash
git status
```

Then:

```bash
git diff --stat
```

Then:

```bash
git diff
```

Conceptually:

```text
Claude finishes
      ↓
git status
      ↓
What files changed?
      ↓
git diff --stat
      ↓
How much changed?
      ↓
git diff
      ↓
Why did these changes happen?
```

---

# 10. Check Expected vs Unexpected Files

Suppose your task was:

```text
Update authentication token refresh.
```

Expected:

```text
src/auth/
src/interceptors/
tests/auth/
```

But Claude changed:

```text
src/auth/
src/interceptors/
tests/auth/
package.json
docker-compose.yml
README.md
production.env
```

This should immediately trigger investigation.

### Certification principle

> **Verify both what changed and what should not have changed.**

---

# 11. Use `/code-review`

After inspecting the diff yourself, run:

```text
/code-review
```

The course specifically recommends using `/code-review` to walk through the changes and identify issues. ([Claude Academy][1])

The workflow becomes:

```text
Claude finishes
      ↓
/code-review
      ↓
Claude reviews changes
      ↓
git diff
      ↓
Human review
```

---

# 12. Why Use a Second Review?

There is an important psychological problem with autonomous coding.

The same Claude session that created the code may also be asked:

> "Is your code correct?"

It already has context about why it made those decisions.

A fresh reviewer does not.

Therefore:

```text
Original Claude session
        ↓
Creates code
        ↓
Fresh Claude session
        ↓
Reviews code
```

The second reviewer has:

* No attachment to the original approach
* No memory of the reasoning
* No assumption that the implementation is correct

The course calls this a **cold second opinion**. ([Claude Academy][1])

---

# 13. Cold Second Opinion

A cold second opinion means:

> Have a fresh Claude session or sub-agent review the changed code without relying on the original session's reasoning.

Example:

```text
Session A
─────────
"Implement OAuth token refresh."

        ↓

Code created

        ↓

Session B
─────────
"Review these changes independently.
Look for security, correctness,
architecture and regression issues."
```

This is similar to having a second engineer review your work.

---

# 14. Why Fresh Context Matters

Consider:

```text
Claude A:
"I chose approach X because the existing API
requires this workaround."

Claude A reviewing itself:
"Yes, approach X makes sense."

```

A fresh Claude:

```text
Claude B:
"Why are we doing this workaround?
The existing API already supports Y."
```

The second perspective can catch assumptions that the original implementation accepted.

---

# 15. Turn Tests Into a Gate

One of the strongest ideas in this lesson is:

> **Tests should be a gate, not a promise.** ([Claude Academy][1])

Don't rely on Claude saying:

```text
"All tests passed."
```

Instead, configure automation so that the tests **actually execute**.

Bad:

```text
Claude:
"I ran the tests and they passed."
```

Better:

```text
Hook
 ↓
npm test
 ↓
Actual exit code
 ↓
Claude continues or fixes failure
```

---

# 16. Stop Hook as a Verification Gate

A Stop Hook can run tests before Claude is allowed to finish.

Conceptually:

```text
Claude wants to stop
       ↓
Stop Hook
       ↓
Run tests
       ↓
Tests pass?
    /       \
  Yes        No
   ↓          ↓
Allow       exit 2
stop          ↓
          Claude receives
          failure
```

The lesson specifically recommends a Stop Hook that runs tests and refuses to let Claude finish if they fail. ([Claude Academy][1])

---

# 17. Why `exit 2` Matters

From the Hooks lesson:

```text
exit 0
→ success

exit 2
→ blocking failure
```

Therefore:

```bash
npm test
```

can be wrapped in a hook.

If tests fail:

```bash
exit 2
```

Claude receives the failure and can attempt to fix the problem. ([Claude Academy][1])

### Certification memory

> **`exit 2` = block the action/stop and feed the failure back to Claude.**

---

# 18. PostToolUse Verification

A PostToolUse Hook can run checks after Claude edits a file.

For example:

```text
Claude edits TypeScript
       ↓
PostToolUse
       ↓
npm run lint
       ↓
npm run typecheck
```

The lesson specifically recommends using PostToolUse for linting and type checking after edits. ([Claude Academy][1])

This gives you continuous verification during the run.

---

# 19. Stop Hook vs PostToolUse Hook

| Hook          | When                         | Good for                   |
| ------------- | ---------------------------- | -------------------------- |
| `PostToolUse` | After a successful tool call | Lint/typecheck after edits |
| `Stop`        | When Claude tries to finish  | Final test gate            |
| `PreToolUse`  | Before tool execution        | Security/enforcement       |

A strong setup uses both:

```text
Edit
 ↓
PostToolUse
 ↓
Lint + TypeScript check
 ↓
More Claude work
 ↓
Claude tries to stop
 ↓
Stop Hook
 ↓
Full tests
 ↓
PASS → finish
FAIL → continue/fix
```

---

# 20. Headless Runs Need Strong Verification

This connects directly to the previous lesson on:

```text
Routines
Headless
--bare
GitHub Actions
```

For headless runs, you aren't watching Claude.

Therefore, verify using:

1. JSON result
2. Exit code
3. Diff
4. Tests
5. Independent review

The course specifically recommends verifying headless runs through their JSON result and exit code. ([Claude Academy][1])

---

# 21. Headless Verification Workflow

Example:

```bash
claude -p "Implement the requested change" \
  --output-format json
```

Conceptually:

```text
claude -p
    ↓
JSON result
    ↓
Check exit code
    ↓
Check structured output
    ↓
Inspect git diff
    ↓
Run tests
    ↓
Review
```

Don't treat:

```text
Claude returned output
```

as equivalent to:

```text
Task succeeded.
```

---

# 22. Exit Code vs Claude Message

This is a common automation mistake.

### Weak approach

```text
if Claude printed:
"Done"
then
SUCCESS
```

This is unreliable.

### Better approach

```text
Claude
 ↓
Process exit code
 ↓
JSON result
 ↓
Diff
 ↓
Tests
```

Machine automation should rely on machine-verifiable signals.

---

# 23. Verification Architecture

For unattended Claude:

```text
                 UNATTENDED RUN
                       |
                       v
                Claude executes
                       |
          +------------+-------------+
          |                          |
          v                          v
    Safety checks               Code changes
    Auto Mode                       |
                                    v
                              PostToolUse
                                    |
                         +----------+----------+
                         |                     |
                       Lint                 Typecheck
                         |                     |
                         +----------+----------+
                                    |
                                    v
                              Claude finishes
                                    |
                                    v
                               Stop Hook
                                    |
                                    v
                                  Tests
                                    |
                           +--------+--------+
                           |                 |
                         PASS              FAIL
                           |                 |
                           v                 v
                        Finish           Fix / retry
```

---

# 24. Complete Verification Workflow

For your Angular/React projects, I recommend:

```text
1. Claude runs autonomously
        ↓
2. Auto mode remains enabled
        ↓
3. Claude completes task
        ↓
4. Inspect git status
        ↓
5. Inspect git diff --stat
        ↓
6. Inspect git diff
        ↓
7. Run /code-review
        ↓
8. Run tests
        ↓
9. Run lint
        ↓
10. Run typecheck/build
        ↓
11. Get independent second review
        ↓
12. Merge only after verification
```

---

# 25. Example for an Angular Project

Suppose Claude was asked:

```text
Implement refresh-token support in the Angular authentication flow.
```

Claude runs overnight.

In the morning:

### Step 1 — Check status

```bash
git status
```

### Step 2 — Check changed files

```bash
git diff --stat
```

### Step 3 — Inspect changes

```bash
git diff
```

### Step 4 — Code review

```text
/code-review
```

### Step 5 — Tests

```bash
npm test
```

### Step 6 — Lint

```bash
npm run lint
```

### Step 7 — Build

```bash
npm run build
```

### Step 8 — Independent review

Start a fresh Claude session:

```text
Review the current changes independently.

Do not assume the existing implementation is correct.
Focus on authentication, security, token lifecycle,
race conditions, error handling and regressions.
```

Only after all of these pass should you consider merging.

---

# 26. Verification Is Not the Same as Permission

This distinction is extremely important for certification.

```text
Permission
    ↓
"Can Claude perform this action?"

Verification
    ↓
"Was the result correct?"
```

Example:

```text
Auto Mode
→ Can Claude execute this command?

Tests
→ Does the implementation work?

Code Review
→ Are there problems in the implementation?
```

---

# 27. Verification Is Not the Same as `CLAUDE.md`

Another important distinction:

```text
CLAUDE.md
→ Instructions

Hook
→ Enforcement

Test
→ Evidence

Code Review
→ Independent analysis
```

For example:

### CLAUDE.md

```markdown
Always run tests before finishing.
```

Claude may follow it.

### Stop Hook

```text
Run tests automatically.
```

The hook enforces it.

### Test result

```text
Tests: 248 passed
```

This gives evidence.

---

# 28. Verification Is Not the Same as Auto Mode

Remember:

```text
Auto Mode
→ Safety

Verification
→ Correctness
```

A run can be:

```text
Safe
+
Incorrect
```

For example:

```text
Claude modifies only allowed files
        ↓
Auto classifier approves
        ↓
Code has a bug
```

Auto mode doesn't necessarily detect the bug.

Therefore:

```text
Auto ≠ Verified
```

---

# 29. Verification Skills

You learned about Verification Skills earlier.

They are useful because they turn a repeated verification process into a reusable procedure.

For example:

```text
.claude/
└── skills/
    └── verify-code/
        └── skill.md
```

The Skill can define:

```text
1. Check git diff
2. Run tests
3. Run lint
4. Run typecheck
5. Check test modifications
6. Report failures
```

Then your workflow becomes:

```text
Claude
 ↓
Implementation
 ↓
Verification Skill
 ↓
Evidence
```

---

# 30. Strongest Verification Model

The strongest approach combines everything you've learned:

```text
             CLAUDE.md
                 ↓
              Guidance
                 ↓
            Permission Mode
                 ↓
               Auto
                 ↓
              Claude
                 ↓
          PostToolUse Hook
          /              \
       Lint            Typecheck
          \              /
           \            /
            Claude continues
                 ↓
             Stop Hook
                 ↓
               Tests
                 ↓
            /code-review
                 ↓
          Human diff review
                 ↓
       Fresh second opinion
                 ↓
               MERGE
```

This is the architecture to remember.

---

# 31. Certification Questions

## Q1. What is the main principle of verifying unsupervised runs?

**Answer:**

> **The less you watched the run, the more you should verify it.**

---

## Q2. Which permission mode should generally be preferred for unattended work?

**Answer:**

```text
Auto
```

rather than bypassing permissions. ([Claude Academy][1])

---

## Q3. Does Auto Mode verify whether the code is correct?

**Answer:**

**No.**

Auto Mode's classifier checks actions for potential danger. It does not determine whether the resulting code is correct. ([Claude Academy][1])

---

## Q4. What should you inspect first after an unsupervised run?

**Answer:**

The actual:

```bash
git diff
```

rather than Claude's summary. ([Claude Academy][1])

---

## Q5. Why should you inspect the diff?

**Answer:**

Because the diff shows exactly what changed, including unexpected files or modifications that Claude's summary may not mention.

---

## Q6. Which command can perform a code review of the changes?

**Answer:**

```text
/code-review
```

---

## Q7. What should tests become in an unattended workflow?

**Answer:**

A **gate**, not merely a promise.

Tests should actually execute and determine whether Claude can finish. ([Claude Academy][1])

---

## Q8. Which hook can prevent Claude from finishing when tests fail?

**Answer:**

```text
Stop Hook
```

---

## Q9. Which hook can run lint and type checking after an edit?

**Answer:**

```text
PostToolUse
```

---

## Q10. What exit code should a blocking hook use?

**Answer:**

```text
exit 2
```

This feeds the failure back to Claude and blocks the operation/stop. ([Claude Academy][1])

---

## Q11. Why use a cold second opinion?

**Answer:**

A fresh session or sub-agent has no attachment to the original implementation and can identify problems the original run overlooked.

---

## Q12. How should headless runs be verified?

**Answer:**

Use:

```text
JSON result
+
exit code
+
git diff
+
tests
+
independent review
```

The lesson specifically highlights the JSON result and exit code for headless runs. ([Claude Academy][1])

---

# 32. Scenario-Based Certification Questions

### Scenario 1

Claude ran overnight and modified 20 files.

Claude says:

```text
"Everything is complete and tests pass."
```

What should you do first?

**Answer:**

Inspect:

```bash
git diff
```

Do not rely on Claude's summary.

---

### Scenario 2

You need Claude to work unattended overnight.

Should you use Bypass Permissions?

**Answer:**

**No.**

Prefer:

```text
Auto Mode
```

so the safety classifier remains active.

---

### Scenario 3

Claude modifies a TypeScript file.

You want lint and type checking to happen automatically after the edit.

Which hook?

**Answer:**

```text
PostToolUse
```

---

### Scenario 4

Claude wants to finish, but the test suite has failed.

Which mechanism should prevent Claude from stopping?

**Answer:**

```text
Stop Hook
```

with a blocking failure such as:

```bash
exit 2
```

---

### Scenario 5

Claude completed a complex authentication implementation. You want another perspective before merging.

What should you do?

**Answer:**

Use a fresh Claude session or sub-agent as a **cold second reviewer**.

---

### Scenario 6

Your headless Claude process returns:

```text
"Task completed successfully."
```

Can your CI pipeline automatically assume success?

**Answer:**

**No.**

Check the process exit code and structured/JSON result, then verify the actual code changes and tests.

---

# 33. Common Certification Traps

### Trap 1

> "Auto Mode guarantees correct code."

**Wrong.**

Auto Mode is about action safety, not correctness.

---

### Trap 2

> "Claude's summary is enough to verify an unattended run."

**Wrong.**

Inspect the actual diff.

---

### Trap 3

> "Claude said tests passed, so tests passed."

**Wrong.**

Make tests an automated gate.

---

### Trap 4

> "PostToolUse can prevent the original tool call."

**Wrong.**

PostToolUse happens after the tool call.

---

### Trap 5

> "A fresh second reviewer is unnecessary because Claude already reviewed its own work."

**Wrong.**

A fresh context provides an independent perspective.

---

### Trap 6

> "Bypass Permissions is the best mode for unattended jobs."

**Wrong.**

For normal unattended work, keep the safety layer with Auto mode.

---

# 34. Easy Memory Trick

Remember:

```text
UNSUPERVISED
     ↓
AUTO
     ↓
DIFF
     ↓
TEST
     ↓
REVIEW
     ↓
SECOND OPINION
```

Or:

> **AUTO → DIFF → TEST → REVIEW → SECOND OPINION**

---

# 35. One-Minute Certification Cheat Sheet

```text
CORE PRINCIPLE
→ The less you watched, the more you verify.

UNATTENDED
→ Prefer Auto mode
→ Don't bypass permissions unnecessarily

AUTO
→ Checks dangerous actions
→ Does NOT verify correctness

FIRST CHECK
→ git diff
→ Don't trust summary first

CODE REVIEW
→ /code-review

TESTS
→ Make them a gate
→ Don't rely on Claude's claim

POSTTOOLUSE
→ Lint
→ Typecheck
→ After edits

STOP HOOK
→ Final verification
→ Run tests
→ exit 2 if failure
→ Prevent Claude from stopping

HEADLESS
→ Verify JSON result
→ Verify exit code
→ Inspect diff
→ Run tests

SECOND OPINION
→ Fresh Claude session/sub-agent
→ No memory of original implementation
→ Independent review

FINAL RULE
→ Safe execution ≠ Correct code
→ Permissions ≠ Verification
```

---

# 36. Connection With Everything You've Learned

At this point, the Claude Code architecture becomes:

```text
CLAUDE.md
     ↓
"How should Claude work?"
     ↓
Skills
     ↓
"How should this procedure be performed?"
     ↓
Permission Mode
     ↓
"What is Claude allowed to do?"
     ↓
Hooks
     ↓
"What must always happen?"
     ↓
Routines / Headless / GitHub Actions
     ↓
"How do we automate the work?"
     ↓
Verification
     ↓
"How do we know the work is correct?"
```

### The most important distinction

```text
GUIDANCE
→ CLAUDE.md

PROCEDURE
→ Skill

PERMISSION
→ Permission Mode

ENFORCEMENT
→ Hook

AUTOMATION
→ Routine / Headless / GitHub Actions

VERIFICATION
→ Diff + Tests + Review + Evidence
```

---

# 37. Final Certification Takeaway

The core message of this lesson is:

> **Don't trust an unsupervised Claude run because Claude says it succeeded. Trust it because you have independent evidence that it succeeded.** ([Claude Academy][1])

The ideal workflow is:

```text
Unsupervised Claude
       ↓
Keep Auto Mode
       ↓
Inspect git diff
       ↓
Run /code-review
       ↓
Run automated tests
       ↓
Use hooks as gates
       ↓
Check headless JSON + exit code
       ↓
Get a cold second opinion
       ↓
Human approves
       ↓
Merge
```

### The certification sentence to remember

> **Auto Mode provides a safety net for unattended execution, but it does not prove correctness. For unsupervised runs, inspect the diff, make tests enforceable through hooks, verify headless results through JSON and exit codes, and use an independent second review for important changes.** ([Claude Academy][1])

---

## Official Source

[Claude Academy — Trust it: Verifying unsupervised runs](https://academy.claude.com/courses/claude-code-in-action/trust-it-verifying-unsupervised-runs)

[1]: https://academy.claude.com/courses/claude-code-in-action/trust-it-verifying-unsupervised-runs "Trust it: Verifying unsupervised runs · Claude Code in Action · Claude Academy"
