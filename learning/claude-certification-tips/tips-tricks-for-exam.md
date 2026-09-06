# Claude Code in Action — Exam Tips & Tricks

> **Purpose:** Final revision guide for the Claude Code in Action certification.
>
> This page consolidates the major concepts from the tutorials you covered: **steering long sessions, CLAUDE.md, Skills, verification, permission modes, hooks, routines/headless, GitHub Actions/code review, unsupervised runs, and plugins.**

---

# 1. The Biggest Exam Trick

Most certification questions are not asking:

> "What does Claude Code do?"

They are asking:

> **"Which Claude Code feature should you use for this situation?"**

So learn the **decision tree**, not just definitions.

```text
Need to tell Claude project rules?
        ↓
    CLAUDE.md

Need a reusable procedure?
        ↓
      Skill

Need deterministic enforcement?
        ↓
      Hook

Need to control autonomy?
        ↓
 Permission Mode

Need recurring cloud automation?
        ↓
     Routine

Need script / CI automation?
        ↓
    Headless (-p)

Need GitHub automation?
        ↓
 GitHub Action

Need automatic PR review?
        ↓
 Managed Code Review

Need to verify autonomous work?
        ↓
 Diff + Tests + Review

Need to share Skills/Hooks/Agents?
        ↓
      Plugin
```

**Memorize this first.**

---

# 2. CLAUDE.md — Remember "GUIDANCE"

## What is it?

`CLAUDE.md` provides instructions and project context to Claude.

Typical contents:

```text
Coding standards
Architecture decisions
Build commands
Testing instructions
Project conventions
Review checklist
```

Claude Code reads `CLAUDE.md` at the beginning of a session. ([Claude][1])

### Exam keyword

If the question says:

> "Tell Claude how the project should work."

Answer:

```text
CLAUDE.md
```

---

# 3. CLAUDE.md Is NOT Enforcement

This is a common trap.

Suppose you write:

```markdown
Never push directly to main.
```

This is **guidance**.

If you need a rule Claude cannot simply choose to ignore:

```text
Use a Hook.
```

### Remember

```text
CLAUDE.md
→ "Please follow this."

Hook
→ "This must happen."
```

### Exam question

**Which is best for enforcing a rule deterministically?**

Answer:

> **Hook**

Hooks are specifically designed to enforce rules and automate lifecycle behavior. ([Claude][2])

---

# 4. Skills — Remember "PROCEDURE"

A Skill is a reusable procedure.

Example:

```text
/review-pr
/verify-code
/deploy-staging
/upgrade-angular
```

Use a Skill when you repeatedly tell Claude:

```text
Do A
Then B
Then C
Then D
```

### Exam keyword

> "Reusable workflow/procedure"

Answer:

```text
Skill
```

Claude's documentation describes Skills as reusable workflows that package instructions and executable commands. ([Claude][1])

---

# 5. Skill vs CLAUDE.md

This is frequently confusing.

| Requirement                | Answer      |
| -------------------------- | ----------- |
| Project coding conventions | `CLAUDE.md` |
| Architecture rules         | `CLAUDE.md` |
| Reusable procedure         | Skill       |
| Review workflow            | Skill       |
| Deployment procedure       | Skill       |
| Verification procedure     | Skill       |

### Memory trick

> **CLAUDE.md = HOW TO WORK**
> **Skill = HOW TO DO A TASK**

---

# 6. Hooks — Remember "ENFORCEMENT"

Hooks run automatically at lifecycle events.

Important ones:

```text
PreToolUse
PostToolUse
Stop
SessionStart
PreCompact
PostCompact
```

Hooks are deterministic automation rather than instructions Claude can choose whether to follow. ([Claude][2])

---

# 7. Hook Timing — Very Important

Memorize this table:

| Hook           | Think                      |
| -------------- | -------------------------- |
| `PreToolUse`   | **BEFORE**                 |
| `PostToolUse`  | **AFTER**                  |
| `Stop`         | **BEFORE Claude finishes** |
| `SessionStart` | **START**                  |
| `PreCompact`   | **BEFORE compact**         |
| `PostCompact`  | **AFTER compact**          |

### Exam question

> Which hook can prevent a dangerous command before it executes?

Answer:

```text
PreToolUse
```

---

# 8. PreToolUse — The Most Important Hook

Use:

```text
PreToolUse
```

when you need to:

```text
Allow
Deny
Ask
Modify tool input
```

Example:

```text
Claude
  ↓
git push --force
  ↓
PreToolUse
  ↓
DENY
```

Current Claude Code documentation confirms that `PreToolUse` can block a tool call before it executes. ([Claude][2])

---

# 9. PostToolUse — Remember "TOO LATE TO PREVENT"

`PostToolUse` executes **after** the tool succeeds.

Good uses:

```text
Format code
Run lint
Run typecheck
Trigger follow-up checks
```

Bad assumption:

> "PostToolUse can stop the file edit."

No.

The edit has already happened.

Current documentation explicitly notes that `PostToolUse` cannot undo an action because the tool has already executed. ([Claude][2])

---

# 10. Stop Hook — Remember "FINAL GATE"

Use `Stop` when Claude tries to finish.

Example:

```text
Claude wants to stop
        ↓
Stop Hook
        ↓
Run tests
        ↓
PASS → finish
FAIL → block
```

This is perfect for:

```text
npm test
npm run lint
npm run typecheck
npm run build
```

---

# 11. Hook Exit Codes

Memorize:

```text
exit 0
→ Success

exit 2
→ BLOCK

exit 1
→ Not a blocking signal
```

### Exam trap

If the question says:

> "Which exit code blocks Claude?"

Answer:

```text
2
```

Don't choose `1`.

---

# 12. PreToolUse Decisions

Remember:

```text
allow
deny
ask
```

There is also:

```text
defer
```

for non-interactive cases.

For basic certification questions, the important three are:

```text
ALLOW → proceed
DENY  → block
ASK   → ask user
```

Current documentation confirms these PreToolUse permission decisions. ([Claude][3])

---

# 13. `updatedInput`

This is an advanced exam concept.

`PreToolUse` can modify the tool input before execution.

Conceptually:

```text
Original command
      ↓
PreToolUse
      ↓
Modify input
      ↓
Execute modified command
```

Example:

```text
Claude wants:
echo SECRET

Hook changes to:
echo REDACTED
```

### Remember

> **`updatedInput` modifies what the tool receives.**

Important: it replaces the whole input object, so unchanged fields need to be preserved. ([Claude][3])

---

# 14. Permission Modes — Memorize the Spectrum

The important modes are:

```text
Manual
Accept Edits
Plan
Auto
Don't Ask
Bypass Permissions
```

Think:

```text
More supervision
       ↓
Manual
       ↓
Accept Edits
       ↓
Plan
       ↓
Auto
       ↓
Don't Ask
       ↓
Bypass
       ↓
More autonomy
```

But don't treat this as a simple "more is better" ladder. Each mode has a different purpose.

---

# 15. Plan Mode

Plan Mode means:

```text
READ
ANALYZE
PLAN
```

Not:

```text
EDIT
```

### Exam question

> Claude should inspect a large repository and propose a solution without changing files.

Answer:

```text
Plan Mode
```

### Memory

> **PLAN = READ ONLY**

---

# 16. Accept Edits

Use when Claude should perform normal coding work.

```text
Read
+
Edit files
+
Common development commands
```

### Exam question

> Developer wants Claude to modify source files normally.

Answer:

```text
Accept Edits
```

---

# 17. Auto Mode

Auto is designed for more hands-off execution while retaining safety classification.

Think:

```text
Claude wants action
      ↓
Safety classifier
      ↓
Potentially dangerous?
      ↓
Decision
```

### Critical distinction

```text
Auto
→ checks action safety

Tests
→ check code correctness
```

This distinction is extremely important.

---

# 18. Auto vs Bypass

### Auto

```text
Safety layer remains
```

### Bypass

```text
Permission checks skipped
```

### Exam question

> You need unattended work but still want the safety layer.

Answer:

```text
Auto
```

### Exam trap

> "Bypass is the best mode for unattended automation."

**Wrong.**

Bypass should be reserved for appropriately isolated environments.

---

# 19. Don't Ask

Think:

```text
Pre-approved tools
+
No interactive approval
```

Useful for:

```text
CI
Scheduled jobs
Unattended automation
```

### Don't Ask vs Auto

| Auto                         | Don't Ask                  |
| ---------------------------- | -------------------------- |
| Classifier evaluates actions | Pre-approved tools         |
| Safety-oriented              | Unattended allowlist style |
| More dynamic                 | More predetermined         |

---

# 20. Auto vs Verification

This is one of the **highest-value exam distinctions**.

```text
AUTO
↓
"Is this action dangerous?"

VERIFICATION
↓
"Is the resulting work correct?"
```

Therefore:

> **Auto does not mean verified.**

---

# 21. Steering Long Sessions

Remember:

```text
PLAN
COMPACT
REWIND
GOAL
LOOP
WORKTREE
```

---

# 22. `/compact`

Use when the conversation/context has become too large.

```text
/compact
```

You can steer the summary:

```text
/compact Focus on the authentication implementation and remaining tests.
```

### Exam question

> Claude has a long conversation and you want to reduce context while preserving important information.

Answer:

```text
/compact
```

---

# 23. Rewind

Rewind is for going back to an earlier point.

It can help restore:

```text
Code
Conversation
Both
```

### Memory

> **Compact = compress forward**
> **Rewind = go backward**

---

# 24. Goal

A goal defines a measurable completion condition.

Good:

```text
Implement authentication and ensure:
- tests pass
- lint passes
- build passes
```

Bad:

```text
Make it good.
```

### Exam trick

The goal should be **demonstrable**.

---

# 25. Loop

Loop repeatedly runs a prompt.

Useful for:

```text
Monitoring
Repeated checks
CI/deployment checks
```

Remember:

```text
Loop
→ repeat
```

---

# 26. Worktrees

Worktrees isolate parallel Claude sessions.

Think:

```text
Main repository
      |
      +---- Claude Session A
      |
      +---- Claude Session B
      |
      +---- Claude Session C
```

This avoids different sessions stepping on each other's working tree.

### Exam keyword

> "Parallel isolated Claude sessions"

Answer:

```text
Worktrees
```

---

# 27. Routines — "SCHEDULED CLOUD AUTOMATION"

A Routine is for repeatable automation managed in the cloud.

Example:

```text
Every morning
    ↓
Claude
    ↓
Dependency audit
```

### Exam keyword

> "Recurring cloud task without maintaining infrastructure"

Answer:

```text
Routine
```

---

# 28. Headless — "SCRIPT"

Headless Claude uses:

```bash
claude -p
```

Think:

```text
Interactive
→ claude

Script
→ claude -p
```

### Exam keyword

> "Non-interactive script/CI execution"

Answer:

```text
Headless / -p
```

---

# 29. `--bare`

Remember:

```text
--bare
→ deterministic CI
```

Don't confuse it with:

```text
-p
→ headless
```

### Quick comparison

| Option   | Meaning                                |
| -------- | -------------------------------------- |
| `-p`     | Headless/non-interactive               |
| `--bare` | Deterministic execution, especially CI |

---

# 30. Structured Output

For automation:

```text
--output-format json
```

and:

```text
--json-schema
```

Think:

```text
Claude
 ↓
JSON
 ↓
Script
```

The structured result is available as:

```text
structured_output
```

### Exam keyword

> "Machine-readable Claude output"

Answer:

```text
JSON + JSON Schema
```

---

# 31. Session Resume

If you need to continue a headless session:

```bash
claude --resume "<session-id>"
```

Memory:

```text
session_id
     ↓
--resume
     ↓
Continue
```

---

# 32. GitHub Actions vs Code Review

This is probably the **most important distinction from the GitHub lesson**.

```text
Managed Code Review
→ REVIEW

GitHub Action
→ DO WORK
```

### Code Review

```text
PR
 ↓
Claude
 ↓
Find problems
 ↓
Inline comments
```

### GitHub Action

```text
PR / Issue / Event
 ↓
Claude
 ↓
Implement
Fix
Analyze
Report
Automate
```

---

# 33. `@claude`

GitHub Actions can respond to:

```text
@claude
```

Example:

```text
@claude implement the feature described in this issue
```

Think:

```text
@claude
→ Trigger Claude GitHub automation
```

---

# 34. `claude_args`

Remember:

```yaml
claude_args: "--max-turns 5"
```

This passes CLI arguments to Claude Code.

### Exam trap

`prompt` and `claude_args` are different.

```text
prompt
→ What Claude should do

claude_args
→ How Claude Code should execute
```

---

# 35. `--max-turns`

```text
--max-turns 5
```

means:

```text
Maximum 5 agent turns
```

Think:

> **Turn limit, not permission limit.**

---

# 36. `workflow_dispatch`

This means:

```text
Manually trigger GitHub workflow
```

Whereas:

```yaml
schedule:
```

means:

```text
Scheduled execution
```

### Memory

```text
schedule
→ automatic

workflow_dispatch
→ manual
```

---

# 37. Unsupervised Runs

This lesson has one sentence you should memorize:

> **The less you watched, the more you verify.**

After an autonomous run:

```text
1. git status
2. git diff --stat
3. git diff
4. Tests
5. Lint
6. Typecheck
7. Build
8. Code review
9. Independent second opinion
```

---

# 38. The Most Important Verification Principle

Never rely only on:

```text
"Claude says it works."
```

Instead:

```text
Claude says:
"Tests passed."

         ↓

You verify:
npm test
```

### Remember

> **Claim ≠ Evidence**

---

# 39. Cold Second Opinion

A fresh Claude session reviews the work independently.

```text
Claude A
→ writes code

Claude B
→ reviews code
```

Why?

Claude B doesn't have the same assumptions as Claude A.

### Exam keyword

> "Independent/fresh review"

Answer:

```text
Cold second opinion
```

---

# 40. Tests as a Gate

This is extremely important.

Weak:

```text
Claude:
"I ran tests."
```

Strong:

```text
Stop Hook
   ↓
npm test
   ↓
PASS → finish
FAIL → block
```

### Memory

> **Tests should be a gate, not a promise.**

---

# 41. Plugins — "PACKAGE"

Plugins package reusable Claude Code functionality.

A plugin can contain:

```text
Skills
Agents
Hooks
MCP servers
Other extensions
```

Think:

```text
Skill = component

Plugin = package
```

---

# 42. Plugin vs Marketplace

Easy exam question.

```text
Plugin
→ Actual installable extension

Marketplace
→ Catalog/store containing plugins
```

Memory:

> **Plugin = product**
> **Marketplace = store**

---

# 43. Plugin Namespacing

If a plugin is:

```text
my-tools
```

and contains:

```text
review-code
```

you can invoke:

```text
/my-tools:review-code
```

Why?

> To prevent naming conflicts.

---

# 44. Plugin Security

Very important.

A plugin isn't just Markdown.

It can contain:

```text
Hooks
Agents
MCP
Executable code
```

Therefore:

```text
Before installing
       ↓
Inspect plugin
       ↓
Check hooks
       ↓
Check MCP
       ↓
Check agents
       ↓
Trust source
       ↓
Install
```

Current Claude Code documentation warns that hooks execute with your user permissions, making plugin/hook trust a real security consideration. ([Claude][3])

---

# 45. Plugin Hooks Don't Replace Your Hooks

Suppose you have:

```text
Your Hook
```

and plugin has:

```text
Plugin Hook
```

They can both run.

Remember:

> **Plugin hooks stack with existing hooks.**

---

# 46. The Ultimate Feature Map

Memorize this table.

| Requirement                     | Feature               |
| ------------------------------- | --------------------- |
| Project instructions            | `CLAUDE.md`           |
| Reusable procedure              | Skill                 |
| Specialized worker              | Agent/Subagent        |
| Before tool execution           | `PreToolUse`          |
| After tool execution            | `PostToolUse`         |
| Before Claude stops             | `Stop`                |
| Session initialization          | `SessionStart`        |
| Before compaction               | `PreCompact`          |
| Compress conversation           | `/compact`            |
| Go backward                     | Rewind                |
| Define completion               | Goal                  |
| Repeat task                     | Loop                  |
| Parallel isolated sessions      | Worktree              |
| Normal coding                   | Accept Edits          |
| Read-only planning              | Plan                  |
| Hands-off safety classification | Auto                  |
| Pre-approved unattended tools   | Don't Ask             |
| Skip permission checks          | Bypass                |
| Cloud recurring task            | Routine               |
| Script automation               | `claude -p`           |
| Deterministic CI                | `--bare`              |
| Continue session                | `--resume`            |
| Machine-readable result         | JSON / JSON Schema    |
| GitHub automation               | GitHub Action         |
| PR review                       | Code Review           |
| Manual GitHub workflow          | `workflow_dispatch`   |
| Agent turn limit                | `--max-turns`         |
| Verify autonomous work          | Diff + Tests + Review |
| Package/share configuration     | Plugin                |
| Plugin catalog                  | Marketplace           |

---

# 47. The "Which Tool?" Exam Game

When you see a scenario, identify the **verb**.

### "Tell"

```text
Tell Claude project rules
→ CLAUDE.md
```

### "Repeat"

```text
Repeat a procedure
→ Skill
```

### "Prevent"

```text
Prevent dangerous command
→ PreToolUse Hook
```

### "After"

```text
Format after edit
→ PostToolUse
```

### "Finish"

```text
Verify before Claude finishes
→ Stop Hook
```

### "Plan"

```text
Research without modifying
→ Plan Mode
```

### "Schedule"

```text
Recurring cloud automation
→ Routine
```

### "Script"

```text
Non-interactive execution
→ claude -p
```

### "Review"

```text
Automatically review PR
→ Code Review
```

### "Automate"

```text
Custom GitHub task
→ GitHub Action
```

### "Share"

```text
Package Claude setup
→ Plugin
```

---

# 48. High-Probability Comparison Questions

## CLAUDE.md vs Skill

```text
CLAUDE.md
→ General guidance

Skill
→ Reusable procedure
```

---

## Skill vs Hook

```text
Skill
→ Claude chooses/uses a procedure

Hook
→ System automatically executes enforcement
```

---

## Hook vs Permission Mode

```text
Hook
→ Specific deterministic rule/event

Permission Mode
→ Overall autonomy level
```

---

## Auto vs Bypass

```text
Auto
→ Safety classification

Bypass
→ Permission checks skipped
```

---

## Routine vs Headless

```text
Routine
→ Managed cloud automation

Headless
→ Your script/CI environment
```

---

## Headless vs Agent SDK

```text
Headless
→ CLI

Agent SDK
→ Claude embedded in your application
```

---

## Code Review vs GitHub Action

```text
Code Review
→ Review PR

GitHub Action
→ Custom automation
```

---

## Plugin vs Marketplace

```text
Plugin
→ Extension

Marketplace
→ Catalog
```

---

# 49. Top 20 Exam Questions to Practice

### 1. Claude should inspect a repository without modifying it.

**Answer:** Plan Mode

### 2. You need project-wide coding conventions.

**Answer:** `CLAUDE.md`

### 3. You repeatedly perform the same multi-step task.

**Answer:** Skill

### 4. You need to block `git push --force`.

**Answer:** `PreToolUse`

### 5. You need formatting after file edits.

**Answer:** `PostToolUse`

### 6. You need tests before Claude finishes.

**Answer:** `Stop` Hook

### 7. Claude has a very long conversation.

**Answer:** `/compact`

### 8. You want parallel isolated Claude sessions.

**Answer:** Worktrees

### 9. You want recurring cloud automation.

**Answer:** Routine

### 10. You want Claude from a shell script.

**Answer:** `claude -p`

### 11. You want deterministic CI execution.

**Answer:** `--bare`

### 12. You want machine-readable output.

**Answer:** JSON / JSON Schema

### 13. You want Claude to continue a previous session.

**Answer:** `--resume`

### 14. You want automatic PR review.

**Answer:** Managed Code Review

### 15. You want Claude to implement an issue from GitHub.

**Answer:** GitHub Action

### 16. You want to manually trigger a GitHub workflow.

**Answer:** `workflow_dispatch`

### 17. You want to limit agent iterations.

**Answer:** `--max-turns`

### 18. You want to verify autonomous work.

**Answer:** Diff + tests + review + evidence

### 19. You want to package Skills/Hooks/Agents for your team.

**Answer:** Plugin

### 20. You want a catalog of plugins.

**Answer:** Marketplace

---

# 50. Scenario Questions — Certification Style

## Scenario A

> A developer asks Claude to migrate an Angular application. They don't want Claude to change anything until they approve the plan.

**Answer:**

```text
Plan Mode
```

---

## Scenario B

> Your company prohibits force pushes regardless of Claude's permission mode.

**Answer:**

```text
PreToolUse Hook
```

Why?

Because the rule needs deterministic enforcement.

---

## Scenario C

> Claude modifies a TypeScript file and you want lint to run automatically afterward.

**Answer:**

```text
PostToolUse Hook
```

---

## Scenario D

> Claude is running overnight and should not finish if tests fail.

**Answer:**

```text
Stop Hook
+
tests
+
exit 2 on failure
```

---

## Scenario E

> You want to check dependencies every morning without maintaining a server.

**Answer:**

```text
Routine
```

---

## Scenario F

> Jenkins needs to call Claude and process the response.

**Answer:**

```text
claude -p
```

---

## Scenario G

> Your GitHub team wants Claude to implement an issue when someone comments `@claude`.

**Answer:**

```text
GitHub Action
```

---

## Scenario H

> Your organization wants every PR reviewed automatically with inline findings.

**Answer:**

```text
Managed Code Review
```

---

## Scenario I

> Claude completed a large unattended task and says everything is correct.

What should you do?

**Answer:**

```text
git diff
+
tests
+
lint
+
typecheck/build
+
code review
+
independent second opinion
```

---

## Scenario J

> You built Skills, Hooks and Agents and want to distribute them to multiple teams.

**Answer:**

```text
Plugin
```

---

# 51. The 10 Most Dangerous Exam Traps

## Trap 1

**"CLAUDE.md enforces rules."**

Wrong.

```text
CLAUDE.md → guidance
Hook → enforcement
```

---

## Trap 2

**"`PostToolUse` prevents an edit."**

Wrong.

It runs after the tool.

---

## Trap 3

**"Auto means code is correct."**

Wrong.

Auto evaluates action safety.

---

## Trap 4

**"`-p` means interactive mode."**

Wrong.

`-p` is headless/non-interactive.

---

## Trap 5

**"`--max-turns` controls permissions."**

Wrong.

It controls agent turns.

---

## Trap 6

**"Code Review automatically approves PRs."**

Wrong.

Human review remains important.

---

## Trap 7

**"Marketplace is the plugin."**

Wrong.

Marketplace is the catalog.

---

## Trap 8

**"Plugin only contains Skills."**

Wrong.

Plugins can contain multiple extension types.

---

## Trap 9

**"Claude saying tests passed proves tests passed."**

Wrong.

Run the tests yourself or enforce them through automation.

---

## Trap 10

**"Bypass is best for all unattended work."**

Wrong.

Prefer safer permission configurations such as Auto when appropriate.

---

# 52. Final 60-Second Revision

If you have only one minute before the exam, memorize this:

```text
CLAUDE.md
→ GUIDANCE

SKILL
→ PROCEDURE

HOOK
→ ENFORCEMENT

PRETOOLUSE
→ BEFORE TOOL

POSTTOOLUSE
→ AFTER TOOL

STOP
→ BEFORE FINISH

PLAN
→ READ ONLY

ACCEPT EDITS
→ NORMAL CODING

AUTO
→ SAFETY CLASSIFIER

DON'T ASK
→ PRE-APPROVED UNATTENDED

BYPASS
→ SKIP PERMISSION CHECKS

COMPACT
→ REDUCE CONTEXT

REWIND
→ GO BACK

GOAL
→ DEFINE DONE

LOOP
→ REPEAT

WORKTREE
→ ISOLATE PARALLEL WORK

ROUTINE
→ CLOUD SCHEDULE

-P
→ HEADLESS SCRIPT

--BARE
→ DETERMINISTIC CI

--RESUME
→ CONTINUE SESSION

JSON + JSON-SCHEMA
→ STRUCTURED OUTPUT

CODE REVIEW
→ REVIEW PR

GITHUB ACTION
→ CUSTOM GITHUB AUTOMATION

@CLAUDE
→ GITHUB TRIGGER

WORKFLOW_DISPATCH
→ MANUAL WORKFLOW

--MAX-TURNS
→ LIMIT AGENT TURNS

DIFF + TESTS + REVIEW
→ VERIFY UNSUPERVISED WORK

PLUGIN
→ PACKAGE & SHARE

MARKETPLACE
→ PLUGIN CATALOG
```

---

# 53. Ultimate Mental Model

If you remember only one diagram for the exam, remember this:

```text
                    CLAUDE CODE
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
     GUIDE             DO              CONTROL
        |                |                |
  CLAUDE.md           Skill             Hook
        |                |                |
        |             Agent          Permission
        |                                |
        +----------------+---------------+
                         |
                         v
                    AUTOMATE
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       Routine        Headless      GitHub Action
                         |
                         v
                    VERIFY
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
         Diff          Tests          Review
                         |
                         v
                     PACKAGE
                         |
                         v
                      Plugin
                         |
                         v
                   Marketplace
```

### The ultimate exam sentence

> **CLAUDE.md provides guidance, Skills provide reusable procedures, Hooks provide deterministic enforcement, Permission Modes control autonomy, Routines and Headless Mode automate execution, GitHub Actions integrate Claude into CI, Code Review reviews PRs, verification provides evidence of correctness, and Plugins package reusable Claude Code capabilities for distribution.**

This mental model ties together essentially the entire Claude Code in Action curriculum. ([Claude][2])

[1]: https://code.claude.com/docs/en?utm_source=chatgpt.com "Claude Code overview - Claude Code Docs"
[2]: https://code.claude.com/docs/en/hooks-guide?utm_source=chatgpt.com "Automate workflows with hooks - Claude Code Docs"
[3]: https://code.claude.com/docs/en/hooks?utm_source=chatgpt.com "Hooks reference - Claude Code Docs"
