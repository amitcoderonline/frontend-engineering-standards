# Claude Code — GitHub Actions and Code Review

> **Claude Academy — Lesson 7 of 9: GitHub Actions and Code Review**
>
> This page is certification-focused and formatted for direct use as `github-actions-and-code-review.md`.

---

## 1. Core Idea

GitHub Pull Requests are a natural place to automate Claude Code because they are where:

* Code changes are proposed
* Code review happens
* CI runs
* Developers discuss changes
* Repetitive engineering work occurs

Claude Academy presents **two different approaches**:

```text
GitHub PR
   |
   +-----------------------------+
   |                             |
   v                             v
Managed Code Review        GitHub Action
   |                             |
   v                             v
Review PRs                  Custom CI work
   |                             |
Find issues                 Modify code
Inline comments             Run reports
Human decides               Respond to @claude
```

The key distinction is:

> **Code Review is primarily for reviewing pull requests. GitHub Actions are for custom automated work that can go beyond review.** ([Claude Academy][1])

---

# 2. Managed Code Review

Claude Code provides a managed **Code Review** service through the Claude GitHub app.

You don't need to build or host the review infrastructure yourself.

The flow is:

```text
Pull Request
      ↓
Claude GitHub App
      ↓
Claude Review Agents
      ↓
Analyze diff + full codebase
      ↓
Rank / deduplicate findings
      ↓
Inline PR comments
```

Claude analyzes the changes in the context of the **full codebase**, rather than looking only at the changed lines in isolation. ([Claude Academy][1])

---

# 3. Enabling Managed Code Review

An organization administrator enables Code Review through the Claude Code administration settings.

The general process is:

```text
Organization Admin
       ↓
Claude Code Admin Settings
       ↓
Code Review
       ↓
Configure
       ↓
Install Claude GitHub App
       ↓
Select repositories
       ↓
Configure when review runs
```

The GitHub app can be configured to review:

1. When a PR opens
2. Every time new commits are pushed to the PR
3. When someone comments:

```text
@claude review
```

([Claude Academy][1])

---

# 4. What Code Review Produces

Claude posts findings directly on the relevant lines of the Pull Request.

For example:

```text
PR #123

src/auth/service.ts:42

Claude:
This token is being stored without the expected
validation step.

Severity: High

Suggested fix:
Validate the token before processing the request.
```

The review also provides a summary in the GitHub check run.

Claude attempts to:

* Deduplicate findings
* Rank findings
* Focus attention on meaningful issues
* Explain why an issue matters
* Suggest a fix

This reduces the amount of low-value review noise. ([Claude Academy][1])

---

# 5. Important: Code Review Does NOT Approve or Block PRs

This is a very important certification point.

Claude Code Review:

```text
Finds issues
     ↓
Posts findings
     ↓
Human reviews findings
     ↓
Human decides
```

It does **not**:

```text
Claude
  ↓
Approve PR
```

or:

```text
Claude
  ↓
Block PR
```

The final judgment remains with a human. ([Claude Academy][1])

### Certification memory

> **Code Review informs the reviewer; it does not replace the reviewer.**

---

# 6. Managed Code Review Does Not Autofix

Another important limitation:

```text
Managed Code Review
        ↓
Find issue
        ↓
Post finding
        ↓
No managed autofix
```

If you want to apply the fix locally, Claude Code provides:

```text
/code-review --fix
```

This reviews the diff and applies the findings to your working tree.

So the typical flow is:

```text
PR
 ↓
Managed Code Review
 ↓
Claude finds issue
 ↓
Developer pulls changes locally
 ↓
/code-review --fix
 ↓
Developer verifies changes
```

([Claude Academy][1])

---

# 7. Code Review vs GitHub Action

This is probably the **most important distinction in this lesson**.

|                      | Managed Code Review  | GitHub Action        |
| -------------------- | -------------------- | -------------------- |
| Main purpose         | PR review            | Custom CI automation |
| Hosted by            | Anthropic            | GitHub Actions       |
| Setup                | Configure service    | Create workflow      |
| Review PR            | Excellent            | Possible             |
| Inline findings      | Yes                  | Depends on workflow  |
| Modify code          | No managed autofix   | Yes                  |
| Scheduled jobs       | Not the main purpose | Yes                  |
| Respond to `@claude` | Review trigger       | Custom automation    |
| Custom workflow      | Limited              | Excellent            |
| CI integration       | Managed              | Fully customizable   |

### Memory trick

```text
Code Review
→ "Tell me what's wrong."

GitHub Action
→ "Do this work for me."
```

---

# 8. GitHub Actions

When the requirement goes beyond code review, use the **Claude Code GitHub Action**.

Examples:

```text
@claude implement this feature

@claude fix this bug

@claude update the documentation

@claude analyze this issue

Daily:
Generate engineering report
```

The GitHub Action can respond to:

* Pull request comments
* Issue comments
* Scheduled jobs
* Other GitHub events

([Claude Academy][1])

---

# 9. Installing the GitHub App

Claude Code provides:

```text
/install-github-app
```

This helps set up the GitHub integration.

You need repository administrator access for the installation.

The setup includes:

```text
Claude Code
     ↓
/install-github-app
     ↓
GitHub App
     ↓
Repository
     ↓
Anthropic API key secret
```

([Claude Academy][1])

---

# 10. Claude Code GitHub Action

The action is:

```yaml
anthropics/claude-code-action@v1
```

Example:

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
    trigger_phrase: "@claude"
    prompt: "Your instructions here"
    claude_args: "--max-turns 5"
```

The workflow can be stored at:

```text
.github/workflows/claude.yaml
```

([Claude Academy][1])

---

# 11. Important Action Inputs

The lesson highlights several inputs.

## `anthropic_api_key`

The Anthropic API key.

```yaml
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

It is optional in the action's configuration depending on the provider/setup.

---

## `github_token`

Used to interact with GitHub.

```yaml
github_token: ${{ secrets.GITHUB_TOKEN }}
```

The default is:

```text
secrets.GITHUB_TOKEN
```

---

## `trigger_phrase`

Specifies the phrase that activates the workflow.

Default:

```text
@claude
```

Example:

```yaml
trigger_phrase: "@claude"
```

---

## `prompt`

Defines what Claude should do.

Example:

```yaml
prompt: "Review the implementation and identify security issues."
```

---

## `claude_args`

Passes CLI arguments to Claude Code.

Example:

```yaml
claude_args: "--max-turns 5"
```

This is where you control the Claude Code execution. ([Claude Academy][1])

---

# 12. `@claude` Workflow

A common pattern is:

```text
Developer
    ↓
PR comment
    ↓
@claude implement the requested change
    ↓
GitHub Action
    ↓
Claude Code
    ↓
Modify repository
    ↓
Commit / push changes
    ↓
Comment on PR
```

Example:

```text
@claude implement the authentication changes described in the issue
```

The action picks up the request and Claude performs the work.

The resulting workflow can push commits and post comments describing the work performed. ([Claude Academy][1])

---

# 13. Scheduled GitHub Action

The Claude GitHub Action can also run on a schedule.

Example use case:

```text
Every day at 09:00 UTC
        ↓
GitHub Actions
        ↓
Claude
        ↓
Analyze repository
        ↓
Generate report
        ↓
Post results
```

GitHub's:

```yaml
schedule:
```

can be used with cron.

You can also add:

```yaml
workflow_dispatch:
```

to allow a developer to manually start the workflow from GitHub's Actions UI. ([Claude Academy][1])

---

# 14. Why `workflow_dispatch` Is Useful

Suppose you have:

```text
Daily architecture report
```

Normally:

```text
Cron
 ↓
Claude
 ↓
Report
```

But sometimes you want to run it immediately.

With:

```yaml
workflow_dispatch:
```

you get:

```text
GitHub Actions
      |
      +---- Scheduled
      |
      +---- Manual
```

This is useful for testing and on-demand execution.

---

# 15. `claude_args`

`claude_args` is one of the most important configuration points.

Example:

```yaml
claude_args: "--max-turns 5"
```

It passes CLI arguments directly to Claude Code.

You can use it to control things such as:

* Maximum agent turns
* Permission behavior
* Allowed tools
* Other Claude Code execution options

([Claude Academy][1])

---

# 16. `--max-turns`

Consider:

```yaml
claude_args: "--max-turns 5"
```

This puts a hard limit on the agent loop.

Conceptually:

```text
Claude
 ↓
Turn 1
 ↓
Turn 2
 ↓
Turn 3
 ↓
Turn 4
 ↓
Turn 5
 ↓
STOP
```

Why is this useful?

Because an unattended agent should have a bounded execution budget.

### Certification memory

> **`--max-turns` limits how many agent turns Claude can take.**

---

# 17. Permissions in GitHub Actions

GitHub Actions are often **unattended**.

There may be nobody available to answer:

```text
Allow this tool?
```

Therefore, the permission configuration needs to be appropriate for unattended execution.

The course specifically points out that an unattended job should not be configured to stop and wait for a human response. ([Claude Academy][1])

---

# 18. Allowed Tools

Another important principle is:

> Give the job exactly the tools it needs—and no more.

For example, suppose Claude only needs to generate a report.

You should prefer:

```text
Read-only tools
```

rather than:

```text
Read
+
Write
+
Git push
+
Shell
+
Everything else
```

Conceptually:

```text
Report Job
    ↓
Read repository
    ↓
Analyze
    ↓
Generate report
```

rather than:

```text
Report Job
    ↓
Full repository permissions
    ↓
Potentially modify code
```

This follows the **least privilege** principle. ([Claude Academy][1])

---

# 19. Practical Example — Angular Project

Suppose your repository is:

```text
angular-app/
├── src/
├── package.json
├── angular.json
├── CLAUDE.md
└── .github/
    └── workflows/
```

You want developers to be able to ask Claude to review a PR.

A developer writes:

```text
@claude review this PR for Angular architecture issues
```

The workflow:

```text
GitHub PR
   ↓
@claude
   ↓
GitHub Action
   ↓
Claude
   ↓
Analyze Angular application
   ↓
Report findings
```

---

# 20. Practical Example — Automated Fix

Suppose a developer writes:

```text
@claude implement the changes described in issue #245
```

The flow could be:

```text
Issue #245
     ↓
Developer comments
     ↓
@claude implement...
     ↓
GitHub Action
     ↓
Claude
     ↓
Read issue
     ↓
Read repository
     ↓
Implement change
     ↓
Run tests
     ↓
Commit changes
     ↓
Push
     ↓
Comment on PR
```

This is a **GitHub Action use case**, not simply managed Code Review.

---

# 21. Practical Example — Daily Engineering Report

You could create a scheduled workflow:

```text
Every day
   ↓
Claude
   ↓
Analyze recent repository activity
   ↓
Generate engineering summary
   ↓
Post result
```

Possible report:

```text
Daily Engineering Report

PRs opened: 4
PRs merged: 3

Potential concerns:
- 2 dependency updates pending
- 1 large PR requires review
- 1 failing test suite

Recommended action:
Review authentication PR #245.
```

This is exactly the kind of custom automation where GitHub Actions become more useful than managed Code Review.

---

# 22. How This Connects With Routines and Headless

The previous lesson introduced:

```text
Routines
Headless
--bare
Agent SDK
```

This lesson adds GitHub-specific automation.

Think about it this way:

```text
Generic Automation
        |
        +---- Routine
        |
        +---- Headless
        |
        +---- Agent SDK
        |
        v
GitHub Automation
        |
        +---- Managed Code Review
        |
        +---- GitHub Action
```

### Key distinction

```text
Routine
→ Scheduled cloud automation

Headless
→ Run Claude from your own script

GitHub Action
→ Run Claude as part of GitHub workflows

Managed Code Review
→ Claude reviews PRs for you
```

---

# 23. How This Connects With Hooks

You learned earlier:

```text
PreToolUse
PostToolUse
Stop
```

These can provide deterministic behavior around Claude's actions.

GitHub Actions provide the **outer automation environment**.

Conceptually:

```text
GitHub Action
      ↓
Claude Code
      ↓
Hooks
      ↓
Tool execution
      ↓
Verification
```

For example:

```text
GitHub Action
     ↓
Claude changes code
     ↓
PostToolUse
     ↓
Format code
     ↓
Stop Hook
     ↓
Run tests
     ↓
Finish
```

This creates a much stronger automation pipeline.

---

# 24. How This Connects With Verification Skills

Unsupervised automation should not simply be:

```text
Claude changes code
     ↓
Done
```

A better architecture is:

```text
GitHub Action
      ↓
Claude
      ↓
Implement
      ↓
Verification Skill
      ↓
Tests
      ↓
Lint
      ↓
Type checking
      ↓
Result
```

This connects directly to the previous lesson:

> **Automation tells Claude when and where to work; verification tells you whether the work is correct.**

---

# 25. Managed Code Review vs `/code-review`

Don't confuse these.

### Managed Code Review

Runs through the managed GitHub service:

```text
GitHub PR
 ↓
Claude GitHub App
 ↓
Review findings
 ↓
Inline comments
```

### Local `/code-review`

Runs from your own Claude Code environment:

```text
Terminal
 ↓
/code-review
 ↓
Review diff
```

With:

```text
/code-review --fix
```

Claude can apply the findings to your working tree.

([Claude Academy][1])

---

# 26. Certification Comparison

| Question                                      | Answer                   |
| --------------------------------------------- | ------------------------ |
| Want managed PR review?                       | **Code Review**          |
| Want inline PR findings?                      | **Code Review**          |
| Want Claude to modify code from a PR comment? | **GitHub Action**        |
| Want scheduled Claude work in GitHub?         | **GitHub Action**        |
| Want `@claude` custom automation?             | **GitHub Action**        |
| Want local review?                            | **`/code-review`**       |
| Want local automatic fixes?                   | **`/code-review --fix`** |
| Want to limit agent iterations?               | **`--max-turns`**        |
| Want custom CLI configuration?                | **`claude_args`**        |
| Want least-privilege automation?              | **Limit allowed tools**  |

---

# 27. Certification Questions

## Q1. What are the two ways to use Claude with GitHub PRs?

**Answer:**

1. Managed Code Review
2. Claude Code GitHub Action

---

## Q2. What is the primary purpose of managed Code Review?

**Answer:**

To automatically review Pull Requests and post findings as inline comments.

---

## Q3. Does managed Code Review approve or block PRs?

**Answer:**

**No.**

A human makes the final decision.

---

## Q4. Does managed Code Review provide automatic fixes?

**Answer:**

**No.**

The managed service posts findings. Local `/code-review --fix` can be used to apply findings locally.

---

## Q5. What command can apply Code Review findings locally?

**Answer:**

```bash
/code-review --fix
```

---

## Q6. What command installs the Claude GitHub App?

**Answer:**

```bash
/install-github-app
```

Repository administrator access is required.

---

## Q7. What GitHub Action is used?

**Answer:**

```yaml
anthropics/claude-code-action@v1
```

---

## Q8. What is the default trigger phrase?

**Answer:**

```text
@claude
```

---

## Q9. What does `trigger_phrase` control?

**Answer:**

It determines which comment phrase activates the Claude GitHub Action.

Example:

```yaml
trigger_phrase: "@claude"
```

---

## Q10. What does `prompt` specify?

**Answer:**

The instructions Claude should execute during the GitHub Action run.

---

## Q11. What does `claude_args` do?

**Answer:**

It passes CLI arguments directly to Claude Code.

---

## Q12. What does `--max-turns 5` do?

**Answer:**

It limits the Claude agent loop to a maximum of five turns.

---

## Q13. Why are allowed tools important in GitHub Actions?

**Answer:**

Because unattended automation should follow least privilege. The job should receive only the tools it actually needs.

---

## Q14. Can the GitHub Action run on a schedule?

**Answer:**

**Yes.**

GitHub Actions can trigger the Claude Action using scheduled workflows.

---

## Q15. What is `workflow_dispatch`?

**Answer:**

A GitHub Actions trigger that allows a workflow to be manually started from the GitHub Actions interface.

---

# 28. Scenario-Based Certification Questions

### Scenario 1

You want Claude to automatically review every new PR and post inline findings.

**What should you use?**

**Answer:**

```text
Managed Code Review
```

---

### Scenario 2

You want Claude to implement a feature when a developer writes:

```text
@claude implement issue #123
```

**What should you use?**

**Answer:**

```text
GitHub Action
```

---

### Scenario 3

You want Claude to generate a report every morning.

**What should you use?**

**Answer:**

```text
GitHub Action + schedule/cron
```

---

### Scenario 4

You want developers to manually trigger the scheduled workflow.

**What should you add?**

**Answer:**

```yaml
workflow_dispatch:
```

---

### Scenario 5

Your unattended GitHub Action keeps running for too long.

**What should you consider?**

**Answer:**

Set a limit such as:

```text
--max-turns 5
```

---

### Scenario 6

Claude only needs to read the repository and produce a report.

Should you give Claude every available tool?

**Answer:**

**No.**

Give it only the required read-oriented tools.

This follows least privilege.

---

### Scenario 7

A managed Code Review identifies a security problem, but you want Claude to automatically modify the code in CI.

**What should you use?**

**Answer:**

A custom **GitHub Action**, rather than relying on managed Code Review's findings-only behavior.

---

# 29. Common Certification Traps

### Trap 1

> "Code Review automatically approves good PRs."

**Wrong.**

Human judgment remains responsible for approval.

---

### Trap 2

> "Managed Code Review automatically fixes issues."

**Wrong.**

Managed Code Review posts findings; it does not provide managed autofix.

---

### Trap 3

> "GitHub Action and Code Review are the same thing."

**Wrong.**

Code Review is a managed PR review service.

GitHub Actions provide customizable CI automation.

---

### Trap 4

> "`claude_args` is the prompt."

**Wrong.**

`prompt` contains the task instruction.

`claude_args` contains CLI arguments passed to Claude Code.

---

### Trap 5

> "`--max-turns` controls Claude's permissions."

**Wrong.**

It limits the agent loop.

Permissions and allowed tools are separate concerns.

---

### Trap 6

> "Give an unattended Claude Action unrestricted tools."

**Wrong.**

Use the minimum tools required for the job.

---

# 30. Easy Memory Trick

Remember:

```text
REVIEW → CODE REVIEW

DO WORK → GITHUB ACTION

TRIGGER → @claude

SETUP → /install-github-app

CUSTOMIZE → claude_args

LIMIT LOOP → --max-turns

MANUAL RUN → workflow_dispatch

SCHEDULE → cron

LOCAL FIX → /code-review --fix
```

---

# 31. One-Minute Certification Cheat Sheet

```text
MANAGED CODE REVIEW
→ Anthropic-hosted
→ GitHub App
→ PR review
→ Inline comments
→ Analyzes diff against full codebase
→ Deduplicates/ranks findings
→ Does NOT approve/block PR
→ Does NOT provide managed autofix

GITHUB ACTION
→ anthropics/claude-code-action@v1
→ Custom CI automation
→ @claude trigger
→ Can modify repository
→ Can run on GitHub events
→ Can run on schedule
→ Can use workflow_dispatch

SETUP
→ /install-github-app

IMPORTANT INPUTS
→ anthropic_api_key
→ github_token
→ trigger_phrase
→ prompt
→ claude_args

claude_args
→ CLI configuration
→ --max-turns
→ permission settings
→ allowed tools

SECURITY
→ Unattended job
→ Don't wait for human permission
→ Use least privilege
→ Give only required tools
```

---

# 32. Final Certification Takeaway

The single most important distinction is:

```text
                    GitHub
                       |
             +---------+---------+
             |                   |
             v                   v
       Code Review          GitHub Action
             |                   |
       "Review this"       "Do this work"
             |                   |
       Find problems       Execute tasks
             |                   |
       Inline comments     Custom automation
             |                   |
       Human decides      Can modify repo
```

### Remember this sentence

> **Use managed Code Review when you want Claude to review Pull Requests. Use the GitHub Action when you want Claude to perform custom work in CI, such as responding to `@claude`, modifying code, or running scheduled reports.** ([Claude Academy][1])

---

## Source

[Claude Academy — GitHub Actions and Code Review](https://academy.claude.com/courses/claude-code-in-action/github-actions-and-code-review?utm_source=chatgpt.com)

[1]: https://academy.claude.com/courses/claude-code-in-action/github-actions-and-code-review?utm_source=chatgpt.com "GitHub Actions and Code Review · Claude Code in Action · Claude Academy"
