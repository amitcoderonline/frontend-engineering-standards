# Claude Code Certification – Question & Answer Series

This series covers the major topics from the Claude Code tutorials we discussed. The questions are designed in **certification/exam style**, with the **topic mentioned for every question**.

> **Exam Strategy:** Focus not only on *what* a feature does, but also on **when to use it, what it should not be used for, and how it differs from similar features**.

---

# Topic 1: Steering Long Sessions

### Q1. What is the purpose of Plan Mode?

**Answer:**
Plan Mode allows Claude to **research and understand the codebase and create an implementation plan without modifying files**.

**Exam memory:**

> **Plan Mode = Read + Analyze + Plan, but Don't Modify**

---

### Q2. What is `/compact` used for?

**Answer:**
`/compact` summarizes the current conversation context so Claude can continue working while reducing the amount of context being carried forward.

You can guide the compaction:

```text
/compact Focus on the authentication implementation and remaining test failures.
```

**Exam memory:**

> `/compact` = Reduce context while preserving important information.

---

### Q3. What is the purpose of Rewind?

**Answer:**
Rewind allows you to go back to an earlier point in a Claude Code session and restore or summarize conversation/code state.

**Exam memory:**

> **Rewind = Go backward**

---

### Q4. What is the purpose of a Goal?

**Answer:**
A goal defines a **measurable completion condition** for Claude's work.

Example:

```text
/goal Implement the authentication change and ensure all tests pass.
```

The goal should be something that can be demonstrated with evidence.

---

### Q5. When would you use a Worktree?

**Answer:**
Use a Worktree when you want to work on multiple tasks or Claude sessions independently without having changes from one task interfere with another.

**Exam memory:**

> **Worktree = Isolation**

---

### Q6. What is the best strategy for managing a long Claude Code session?

**Answer:**

```text
PLAN → COMPACT → REWIND → GOAL → LOOP → WORKTREE
```

The exact tools used depend on the situation.

---

# Topic 2: CLAUDE.md

### Q7. What is CLAUDE.md?

**Answer:**
`CLAUDE.md` provides instructions and conventions that Claude should follow when working in a project.

Examples:

```text
Use Angular standalone components.
Put API services under src/app/services.
Use named exports instead of default exports.
Run npm test before completing a task.
```

---

### Q8. Can CLAUDE.md enforce a rule absolutely?

**Answer:**
No.

`CLAUDE.md` provides **guidance**, but it is not a deterministic enforcement mechanism.

For rules that Claude must not be able to bypass, use **Hooks**.

**Exam memory:**

> CLAUDE.md = Guidance
> Hook = Enforcement

---

### Q9. Which is better?

```text
Follow best practices for API routes.
```

or

```text
Put new API routes in src/api/handlers, one route per file.
```

**Answer:**

The second one.

Instructions should be **specific, measurable, and actionable**.

---

### Q10. What should you do when Claude repeatedly makes the same mistake?

**Answer:**

First determine whether the mistake is:

* A project convention → add/update `CLAUDE.md`
* A repeated procedure → create a Skill
* A rule that must never be violated → create a Hook

---

# Topic 3: Skills

### Q11. What is a Skill?

**Answer:**
A Skill is a reusable, task-specific procedure that teaches Claude **how to perform a particular type of work**.

Example:

```text
verify-code/
└── SKILL.md
```

The Skill might explain how to:

1. Run tests
2. Inspect the Git diff
3. Check whether tests were weakened
4. Run lint
5. Report evidence

---

### Q12. When should you create a Skill?

**Answer:**
When you repeatedly give Claude the same multi-step instructions.

**Exam memory:**

> **If you repeatedly explain a procedure → create a Skill.**

---

### Q13. What is the difference between CLAUDE.md and a Skill?

| Feature      | CLAUDE.md          | Skill                          |
| ------------ | ------------------ | ------------------------------ |
| Purpose      | General guidance   | Specific procedure             |
| Scope        | Always relevant    | Relevant when task requires it |
| Example      | Coding conventions | Verify implementation          |
| Mental model | Rules/conventions  | Procedure                      |

**Exam answer:**

> CLAUDE.md tells Claude **how the project works**; a Skill tells Claude **how to perform a particular task**.

---

# Topic 4: Permission Modes

### Q14. What is Plan Mode?

**Answer:**
A read-only mode where Claude can investigate the project and develop a plan without making changes.

---

### Q15. What is Accept Edits mode?

**Answer:**
Accept Edits allows Claude to make normal coding changes without asking for approval for every file edit.

**Best use:** Normal interactive development.

---

### Q16. What is Auto mode?

**Answer:**
Auto provides hands-off execution while using a **classifier-based safety check** to evaluate actions before they execute.

Important:

> Auto checks whether an action appears safe/appropriate; it does **not prove that the code is correct**.

---

### Q17. What is Don't Ask mode?

**Answer:**
Don't Ask automatically permits only tools/actions that have already been approved by the configured permissions.

It is useful for **unattended environments**, such as CI or scheduled execution.

---

### Q18. What is Bypass Permissions mode?

**Answer:**
It skips permission checks.

Because this removes important safeguards, it should only be used in a **properly isolated environment**, such as a container or VM.

---

### Q19. What is the difference between Auto and Don't Ask?

**Answer:**

| Auto                             | Don't Ask                     |
| -------------------------------- | ----------------------------- |
| Classifier evaluates actions     | Uses pre-approved permissions |
| Safety-oriented                  | Unattended execution          |
| Can evaluate each action         | Does not interactively ask    |
| Useful for hands-off development | Useful for CI/automation      |

**Exam memory:**

> **Auto = classifier**
> **Don't Ask = pre-approved tools**

---

### Q20. What is the difference between Auto and Bypass Permissions?

**Answer:**

> Auto retains the permission/safety layer.
> Bypass Permissions skips permission checks.

---

# Topic 5: Hooks

### Q21. What is the primary purpose of Hooks?

**Answer:**
Hooks provide **deterministic, event-driven automation and enforcement** at specific points in Claude Code's execution lifecycle. ([Claude][1])

**Exam memory:**

> **Hooks turn "Claude should do this" into "Claude must do this."**

---

### Q22. Which Hook runs before a tool executes?

**Answer:**

```text
PreToolUse
```

Use it to:

* Allow an action
* Deny an action
* Ask for approval
* Modify tool input
* Protect sensitive files
* Block dangerous commands

---

### Q23. Which Hook runs after a successful tool execution?

**Answer:**

```text
PostToolUse
```

Typical uses:

```text
Edit file
   ↓
PostToolUse
   ↓
Run formatter/linter
```

---

### Q24. Can PostToolUse prevent the original action?

**Answer:**

No.

The tool has already executed.

Therefore:

> **Prevent something → PreToolUse**

---

### Q25. Which Hook can stop Claude from finishing?

**Answer:**

```text
Stop
```

For example, a Stop Hook can run:

```bash
npm test
npm run lint
npm run typecheck
```

If verification fails, the Hook can prevent Claude from finishing.

---

### Q26. What are the three major PreToolUse permission decisions?

**Answer:**

```text
allow
deny
ask
```

There is also a `defer` behavior relevant to certain non-interactive scenarios.

---

### Q27. What is `updatedInput` in a Hook?

**Answer:**
`updatedInput` allows a Hook to modify the input that Claude is about to send to a tool.

Example concept:

```text
Claude generates command
        ↓
PreToolUse Hook
        ↓
Detect secret
        ↓
Rewrite/redact command
        ↓
Execute modified command
```

Important:

> `updatedInput` replaces the tool input, so unchanged fields must be preserved.

---

### Q28. What does Hook exit code 0 mean?

**Answer:**

```text
Exit 0 = Success / continue
```

---

### Q29. What Hook exit code blocks Claude?

**Answer:**

```text
Exit 2 = Blocking error
```

The error can be fed back to Claude as context.

---

### Q30. Is exit code 1 the same as exit code 2?

**Answer:**

No.

A common exam trap:

```text
0 → success
2 → blocking error
1 → non-blocking error
```

**Memory trick:**

> **2 = STOP**

---

### Q31. Which Hook should protect against `git push --force`?

**Answer:**

```text
PreToolUse
```

Because the dangerous command must be blocked **before execution**.

---

### Q32. Which Hook is appropriate for automatically formatting modified files?

**Answer:**

```text
PostToolUse
```

---

### Q33. Which Hook is appropriate for ensuring tests pass before Claude finishes?

**Answer:**

```text
Stop
```

---

# Topic 6: Verification

### Q34. Why aren't green tests alone sufficient?

**Answer:**
Because Claude could potentially modify or weaken tests so that they pass without properly implementing the requirement.

Therefore verification should include:

```text
Tests
+
Git diff
+
Test quality
+
Code review
```

---

### Q35. What is the core principle of verifying unsupervised Claude runs?

**Answer:**

> **The less you watched, the more you verify.**

---

### Q36. What should you inspect first after an unattended coding run?

**Answer:**

Start with the **Git diff**, rather than simply trusting Claude's summary.

Example:

```bash
git status
git diff --stat
git diff
```

---

### Q37. Why use a fresh Claude session for review?

**Answer:**
A fresh session provides a **cold second opinion** because it does not have the same context or assumptions that influenced the original implementation.

---

### Q38. What is the relationship between Auto mode and verification?

**Answer:**

> **Auto = safety of actions**
> **Verification = correctness of results**

This is one of the most important certification distinctions.

---

# Topic 7: Routines

### Q39. What is a Routine?

**Answer:**
A Routine is a saved automation consisting of a prompt, repository/context, connectors, and a trigger that runs on managed infrastructure.

---

### Q40. What can trigger a Routine?

**Answer:**
Examples include:

```text
Cron schedule
HTTP request
GitHub event
```

---

### Q41. When should you use a Routine?

**Answer:**
Use a Routine when you want Claude to perform **repeatable work automatically on a schedule or event**.

Example:

```text
Every morning:
Check dependencies
Identify outdated packages
Create a report
```

---

# Topic 8: Headless Claude

### Q42. What is headless Claude?

**Answer:**
Headless Claude runs Claude Code non-interactively, typically using:

```bash
claude -p
```

It is useful for scripts, pipelines, and automation.

---

### Q43. What is the difference between Routine and Headless mode?

| Routine                      | Headless                  |
| ---------------------------- | ------------------------- |
| Managed automation           | Script/CLI automation     |
| Cloud-oriented               | Your pipeline/environment |
| Triggered by schedule/events | Invoked by command/script |
| Managed infrastructure       | Developer/CI controlled   |

**Exam memory:**

> **Routine = managed recurring automation**
> **Headless = command-line automation**

---

### Q44. What does `--bare` provide?

**Answer:**
`--bare` is intended for more deterministic execution, particularly in CI environments.

**Memory:**

> `--bare` → deterministic CI

---

# Topic 9: GitHub Actions

### Q45. What is the purpose of Claude Code GitHub Actions?

**Answer:**
GitHub Actions allow Claude to participate in GitHub workflows and automate tasks such as:

* Responding to `@claude`
* Implementing requested changes
* Running automated workflows
* Performing scheduled tasks
* Working with issues and pull requests

---

### Q46. What is the difference between Managed Code Review and GitHub Action?

**Answer:**

| Managed Code Review | GitHub Action            |
| ------------------- | ------------------------ |
| Reviews PRs         | Runs custom automation   |
| Focuses on findings | Can implement work       |
| Anthropic-managed   | Repository workflow      |
| Review-oriented     | Task/automation-oriented |

**Exam memory:**

> **Code Review = Tell me what's wrong**
> **GitHub Action = Do this work**

---

### Q47. Can Managed Code Review automatically approve or block a PR?

**Answer:**
No. The review provides findings/comments; the human/team remains responsible for the PR decision.

---

### Q48. What is `@claude` commonly used for in GitHub workflows?

**Answer:**
It can be used as a trigger phrase to ask Claude to perform a task.

Example:

```text
@claude implement pagination for the users API
```

---

# Topic 10: Plugins

### Q49. What is a Claude Code Plugin?

**Answer:**
A Plugin is a **package of reusable Claude Code functionality**.

It can contain things such as:

```text
Skills
Agents
Hooks
MCP configuration
LSP configuration
Commands
Other supporting components
```

---

### Q50. What is the difference between a Skill and a Plugin?

**Answer:**

> **Skill = one reusable capability/procedure**
> **Plugin = package containing reusable capabilities**

---

### Q51. What is a Marketplace?

**Answer:**
A Marketplace is a catalog/distribution mechanism for Claude Code Plugins.

**Mental model:**

```text
Skill
   ↓
Component

Plugin
   ↓
Package

Marketplace
   ↓
Distribution/Catalog
```

---

### Q52. Why should Plugins be treated carefully?

**Answer:**
Plugins can execute code with the user's privileges.

Therefore you should inspect:

* Hooks
* Agents
* MCP servers
* Executable scripts
* Configuration

**Exam memory:**

> **Reviewed does not automatically mean trusted.**

---

# Topic 11: Integrated Scenario Questions

### Q53. Topic: CLAUDE.md vs Hook

**Question:**
Your company says Claude must never push directly to `main`. What should you use?

**Answer:**

```text
PreToolUse Hook
```

Why?

`CLAUDE.md` provides guidance, while a Hook can deterministically block the dangerous command.

---

### Q54. Topic: Skill vs CLAUDE.md

**Question:**
Every developer asks Claude to perform the same 7-step verification process. What should you create?

**Answer:**

```text
Verification Skill
```

Because this is a reusable **procedure**.

---

### Q55. Topic: PostToolUse vs PreToolUse

**Question:**
You want to prevent Claude from executing:

```bash
git push --force origin main
```

Which Hook?

**Answer:**

```text
PreToolUse
```

Because the command must be blocked before it executes.

---

### Q56. Topic: Stop Hook

**Question:**
Claude says:

```text
Implementation complete.
```

But `npm test` fails.

What should prevent Claude from declaring the task complete?

**Answer:**

```text
Stop Hook
```

The Hook can run verification and return exit code `2` when tests fail.

---

### Q57. Topic: Auto vs Verification

**Question:**
Claude is running in Auto mode. Does that mean the generated code is correct?

**Answer:**

**No.**

Auto provides action-level safety checks.

Verification determines whether the implementation is actually correct.

---

### Q58. Topic: Unattended execution

**Question:**
You want Claude to run overnight against a repository without interactive approval. What concepts should you consider?

**Answer:**

Depending on the requirement:

```text
Routine
Headless
Don't Ask
Auto
Hooks
Verification
```

The key is to combine **controlled permissions with deterministic verification** rather than simply removing safeguards.

---

### Q59. Topic: GitHub automation

**Question:**
You want Claude to automatically respond to a GitHub issue containing:

```text
@claude implement this feature
```

What should you consider?

**Answer:**

```text
GitHub Action
```

---

### Q60. Topic: PR review

**Question:**
You want Claude to inspect a pull request and report potential problems without necessarily implementing fixes. What should you use?

**Answer:**

```text
Code Review
```

---

### Q61. Topic: Plugin

**Question:**
Your organization has created:

```text
security-review Skill
angular-review Skill
security Hook
MCP server
security-reviewer Agent
```

You want to distribute all of these as one reusable package.

What should you create?

**Answer:**

```text
Plugin
```

---

# Topic 12: Most Important Certification Comparisons

## Q62. CLAUDE.md vs Skill vs Hook

| Requirement               | Best choice |
| ------------------------- | ----------- |
| Project convention        | `CLAUDE.md` |
| Reusable procedure        | Skill       |
| Deterministic enforcement | Hook        |

**Memory:**

```text
CLAUDE.md → CONVENTION
Skill     → PROCEDURE
Hook      → ENFORCEMENT
```

---

## Q63. Plan vs Accept Edits vs Auto

| Mode         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| Plan         | Read/analyze/plan                                |
| Accept Edits | Normal coding                                    |
| Auto         | Hands-off execution with classifier-based checks |

**Memory:**

```text
PLAN → THINK
ACCEPT EDITS → CODE
AUTO → AUTONOMOUS EXECUTION
```

---

## Q64. Auto vs Don't Ask vs Bypass

| Mode      | Main idea                      |
| --------- | ------------------------------ |
| Auto      | Classifier-based safety checks |
| Don't Ask | Pre-approved tools/actions     |
| Bypass    | Skip permission checks         |

**Memory:**

```text
AUTO       → CHECK
DON'T ASK  → ALLOWLIST
BYPASS     → SKIP
```

---

## Q65. Routine vs Headless vs Agent SDK

| Technology | Best use                                            |
| ---------- | --------------------------------------------------- |
| Routine    | Managed recurring automation                        |
| Headless   | CLI/script/CI automation                            |
| Agent SDK  | Embed Claude capabilities into your own application |

**Memory:**

```text
Routine   → Cloud automation
Headless  → Script automation
SDK       → Claude inside your application
```

---

# Topic 13: Rapid-Fire Certification Questions

### Q66. Which feature provides project instructions?

**Answer:** `CLAUDE.md`

### Q67. Which feature provides reusable procedures?

**Answer:** Skills

### Q68. Which Hook runs before a tool?

**Answer:** `PreToolUse`

### Q69. Which Hook runs after a tool?

**Answer:** `PostToolUse`

### Q70. Which Hook can prevent Claude from finishing?

**Answer:** `Stop`

### Q71. Which Hook is best for blocking dangerous commands?

**Answer:** `PreToolUse`

### Q72. Which Hook is best for formatting after edits?

**Answer:** `PostToolUse`

### Q73. Which exit code blocks?

**Answer:** `2`

### Q74. What does exit code `0` mean?

**Answer:** Success/continue.

### Q75. What does `/compact` do?

**Answer:** Summarizes/reduces conversation context.

### Q76. What is a Worktree used for?

**Answer:** Isolated parallel work.

### Q77. What is `claude -p`?

**Answer:** Non-interactive/headless execution.

### Q78. What is `--bare` associated with?

**Answer:** Deterministic CI execution.

### Q79. What is a Routine?

**Answer:** Managed recurring/event-driven Claude automation.

### Q80. What is a Plugin?

**Answer:** A reusable package of Claude Code components.

### Q81. What is a Marketplace?

**Answer:** A catalog/distribution mechanism for Plugins.

### Q82. What is the key principle of unattended execution?

**Answer:**

> **The less you watched, the more you verify.**

---

# Topic 14: Ultimate Exam Memory Map

Memorize this:

```text
CLAUDE.md
    ↓
Tell Claude the project conventions

SKILL
    ↓
Teach Claude a reusable procedure

HOOK
    ↓
Enforce deterministic rules

PERMISSION MODE
    ↓
Control Claude's autonomy

PLAN MODE
    ↓
Research without modifying

AUTO
    ↓
Hands-off execution + classifier checks

DON'T ASK
    ↓
Pre-approved unattended execution

BYPASS
    ↓
Skip permission checks

ROUTINE
    ↓
Managed recurring automation

HEADLESS
    ↓
CLI/script automation

GITHUB ACTION
    ↓
GitHub automation

CODE REVIEW
    ↓
Review PR/code

VERIFICATION
    ↓
Prove the result is correct

PLUGIN
    ↓
Package and share capabilities

MARKETPLACE
    ↓
Discover/distribute plugins
```

---

# Topic 15: The 15-Second Exam Cheat Sheet

```text
Guidance?          → CLAUDE.md
Procedure?         → Skill
Enforcement?       → Hook
Before action?     → PreToolUse
After action?      → PostToolUse
Before finishing?  → Stop
Read-only planning?→ Plan Mode
Normal coding?     → Accept Edits
Hands-off safety?  → Auto
Unattended?        → Don't Ask
No permission?     → Bypass
Recurring cloud?   → Routine
CLI automation?    → claude -p
Deterministic CI?  → --bare
GitHub automation? → GitHub Action
PR review?         → Code Review
Proof correctness? → Verification
Package/share?     → Plugin
Plugin catalog?    → Marketplace
```

## Final Certification Rule

When you see a scenario question, identify the **verb** first:

```text
"Tell Claude..."       → CLAUDE.md
"Repeat this process"  → Skill
"Prevent/block..."     → Hook
"Before executing..."  → PreToolUse
"After executing..."   → PostToolUse
"Before finishing..."  → Stop
"Plan..."              → Plan Mode
"Run automatically"    → Routine / Headless
"Review PR..."         → Code Review
"Automate GitHub..."   → GitHub Action
"Verify..."            → Verification
"Package/share..."     → Plugin
```

**Most important distinction to remember:**

> **Permission controls what Claude is allowed to do. Hooks control what happens at specific execution events. Verification proves whether the result is correct.**

This is the core mental model behind many Claude Code certification questions. ([Claude][1])

[1]: https://code.claude.com/docs/id/changelog?utm_source=chatgpt.com "claude-code/CHANGELOG.md at main · anthropics/claude-code · GitHub"
