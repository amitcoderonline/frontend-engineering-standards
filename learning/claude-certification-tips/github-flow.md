# Claude Code — GitHub Actions and Code Review: Step-by-Step Workflow

This is the **practical workflow** I recommend you add as `github-actions-workflow.md` to your Claude certification learning repository.

The important thing to understand first is that there are **two related but different workflows**:

```text
                    GitHub Repository
                           |
              +------------+------------+
              |                         |
              v                         v
      Managed Code Review        Claude GitHub Action
              |                         |
        Review PRs                 Do custom work
        Find issues                @claude commands
        Inline comments            Fix / implement
              |                    Create PRs
        Human decides              Scheduled jobs
```

Claude's current documentation describes managed Code Review as a PR-review service, while GitHub Actions lets you run Claude Code in your own GitHub Actions workflows. ([Claude][1])

---

# 1. Prerequisites

You need:

* A GitHub repository
* Repository administrator access
* A Claude/Anthropic account with access to Claude Code
* Ability to add GitHub repository secrets
* A repository where you can test a Pull Request

For the standard direct Anthropic API setup, the recommended setup is:

```text
GitHub Repository
        +
Claude GitHub App
        +
ANTHROPIC_API_KEY
        +
GitHub Actions workflow
```

The GitHub App requires repository permissions for **Contents, Issues, and Pull requests**. ([Claude][2])

---

# 2. Step 1 — Prepare Your Repository

A good starting structure is:

```text
my-project/
│
├── CLAUDE.md
│
├── src/
├── package.json
│
└── .github/
    └── workflows/
        └── claude.yml
```

For your Angular/React projects, I would strongly recommend having a `CLAUDE.md`.

Example:

```markdown
# Project Instructions

## Technology

- TypeScript
- Angular
- RxJS
- Jest

## Coding Standards

- Use strict TypeScript.
- Prefer standalone Angular components.
- Avoid unnecessary `any`.
- Use existing project patterns.
- Do not introduce a new dependency unless necessary.

## Verification

Before considering a task complete:

- Run unit tests.
- Run lint.
- Run TypeScript/build checks where applicable.

## Pull Request

When modifying code:

- Keep changes focused.
- Do not modify unrelated files.
- Explain important architectural decisions.
```

Claude Code uses `CLAUDE.md` to follow project-specific coding standards and instructions. ([Claude][3])

---

# 3. Step 2 — Install the Claude GitHub App

From Claude Code, run:

```bash
/install-github-app
```

This is the recommended setup path.

The installer guides you through connecting the GitHub repository and configuring the required secrets. You need repository administrator permissions. ([Claude][2])

The flow is:

```text
Claude Code
     |
     | /install-github-app
     v
Claude GitHub App
     |
     v
Select GitHub repository
     |
     v
Configure permissions
     |
     v
Configure secret
```

---

# 4. Step 3 — Add `ANTHROPIC_API_KEY`

Go to:

```text
GitHub Repository
   ↓
Settings
   ↓
Secrets and variables
   ↓
Actions
   ↓
New repository secret
```

Create:

```text
Name:
ANTHROPIC_API_KEY
```

Value:

```text
<your Anthropic API key>
```

Then your workflow can access it with:

```yaml
${{ secrets.ANTHROPIC_API_KEY }}
```

**Never put the API key directly into your YAML file.**

Good:

```yaml
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Bad:

```yaml
anthropic_api_key: "sk-ant-xxxxxxxx"
```

---

# 5. Step 4 — Create the GitHub Workflow

Create:

```text
.github/workflows/claude.yml
```

For the first test, use a very simple workflow:

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest

    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

This is the basic `@claude`-driven workflow documented for Claude Code GitHub Actions. ([Claude][2])

---

# 6. Step 5 — Commit the Workflow

Commit the file:

```bash
git add .github/workflows/claude.yml
git commit -m "Add Claude GitHub Action"
git push
```

Now GitHub knows about the workflow.

You should see:

```text
GitHub
  ↓
Actions
  ↓
Claude Code
```

---

# 7. Step 6 — Test `@claude`

Open an Issue or Pull Request.

Add a comment:

```text
@claude explain this issue and suggest an implementation approach
```

The workflow is triggered.

The flow is:

```text
Developer
    |
    | @claude
    v
GitHub Comment
    |
    v
GitHub Actions
    |
    v
Claude Code Action
    |
    v
Claude
    |
    v
Response on GitHub
```

Claude Code Actions automatically respond to `@claude` mentions in issue and PR comments. ([Claude][2])

---

# 8. Step 7 — Ask Claude to Analyze a PR

Now try:

```text
@claude review this PR for security issues and potential regressions
```

Claude receives the GitHub context and analyzes the request.

Possible response:

```text
Claude:

I found two potential issues:

1. Authentication token is not validated before use.
2. Error handling exposes internal server information.

Recommended action:
Validate the token before processing the request.
```

This is **GitHub Action automation**.

It is different from the managed Code Review service.

---

# 9. Step 8 — Ask Claude to Implement Something

Now try:

```text
@claude implement the feature described in this issue
```

The workflow becomes:

```text
Issue
  ↓
@claude implement...
  ↓
GitHub Actions
  ↓
Claude
  ↓
Read repository
  ↓
Understand issue
  ↓
Modify code
  ↓
Run appropriate checks
  ↓
Create/update changes
```

Claude Code GitHub Actions can be used for implementation, bug fixes, PR creation, and other custom automation. ([Claude][2])

---

# 10. Step 9 — Add a Maximum Turn Limit

You don't want an unattended agent to continue indefinitely.

Add:

```yaml
claude_args: "--max-turns 5"
```

Complete example:

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest

    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          claude_args: "--max-turns 5"
```

Now:

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

The current action uses `claude_args` to pass Claude Code CLI options such as `--max-turns`. ([Claude][2])

---

# 11. Step 10 — Customize Claude's Behavior

You have two important places to give Claude instructions.

## Project-wide instructions

Use:

```text
CLAUDE.md
```

For example:

```markdown
# Code Review Rules

When reviewing code:

1. Check authentication and authorization.
2. Check input validation.
3. Check error handling.
4. Check TypeScript type safety.
5. Check Angular subscription cleanup.
6. Check unnecessary API calls.
7. Check performance issues.
8. Do not suggest unrelated refactoring.
```

## Workflow-specific instructions

Use:

```yaml
prompt: |
  Review this change specifically for:
  - Security
  - TypeScript errors
  - Angular architecture
  - Performance
  - Test coverage
```

The documentation supports both `CLAUDE.md` and the `prompt` input for customizing behavior. ([Claude][2])

---

# 12. Step 11 — Add Custom Prompt

For example:

```yaml
name: Claude PR Analysis

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest

    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Analyze the requested change.

            Focus on:
            1. Security
            2. TypeScript correctness
            3. Angular architecture
            4. Performance
            5. Test coverage

            Keep the response concise.
          claude_args: "--max-turns 5"
```

---

# 13. Step 12 — Understand `prompt` vs `@claude`

This is an important certification concept.

### Interactive workflow

```text
@claude fix the TypeScript error
```

Claude receives the comment as the task.

### Automation workflow

You can provide:

```yaml
prompt: |
  Generate a summary of yesterday's commits.
```

In that case, the workflow itself tells Claude what to do.

Current Claude Code Actions automatically distinguish interactive `@claude` usage from automation based on the workflow configuration. ([Claude][2])

---

# 14. Step 13 — Create Automatic PR Review

There are actually **two ways** to automate PR reviews.

## Option A — Managed Code Review

Use Claude's managed Code Review service.

```text
PR opened
   ↓
Claude Code Review
   ↓
Multiple review agents
   ↓
Analyze diff + codebase
   ↓
Verify findings
   ↓
Inline comments
```

It can run:

* Once after PR creation
* After every push
* Manually

Manual review can be started with:

```text
@claude review
```

or:

```text
@claude review once
```

([Claude][1])

---

# 15. Option B — Code Review Through GitHub Action

You can also build your own review workflow using the GitHub Action.

The current documentation shows a workflow using the `code-review` plugin:

```yaml
name: Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest

    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: "https://github.com/anthropics/claude-code.git"
          plugins: "code-review@claude-code-plugins"
          prompt: "/code-review:code-review ${{ github.repository }}/pull/${{ github.event.pull_request.number }}"
```

This approach gives you more control over the workflow. ([Claude][2])

---

# 16. Which Code Review Should You Choose?

This is the key decision:

| Requirement                            | Recommended         |
| -------------------------------------- | ------------------- |
| Automatically review every PR          | Managed Code Review |
| Inline review findings                 | Managed Code Review |
| Minimal setup                          | Managed Code Review |
| Custom review workflow                 | GitHub Action       |
| Run Claude when `@claude` is mentioned | GitHub Action       |
| Modify code                            | GitHub Action       |
| Implement an issue                     | GitHub Action       |
| Scheduled automation                   | GitHub Action       |
| Custom CI pipeline                     | GitHub Action       |

### Certification memory

> **Managed Code Review = review service.**
> **GitHub Action = customizable automation.**

---

# 17. Step 14 — Create a Scheduled Claude Job

Now let's make the workflow more powerful.

Suppose you want Claude to create a daily engineering report.

```yaml
name: Claude Daily Report

on:
  schedule:
    - cron: "0 9 * * *"

  workflow_dispatch:

jobs:
  report:
    runs-on: ubuntu-latest

    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate an engineering report.

            Include:
            - Recent commits
            - Open issues
            - Open pull requests
            - Potential risks
            - Recommended actions
          claude_args: "--max-turns 5"
```

The important parts are:

```yaml
schedule:
```

and:

```yaml
workflow_dispatch:
```

`workflow_dispatch` lets you manually run the workflow from GitHub. Scheduled workflows can use cron. ([Claude][2])

---

# 18. Step 15 — Add Verification

For your projects, I recommend this architecture:

```text
GitHub Event
      ↓
GitHub Action
      ↓
Claude
      ↓
Modify code
      ↓
Run tests
      ↓
Run lint
      ↓
Run build
      ↓
Report result
```

For example:

```yaml
- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm test

- name: Run lint
  run: npm run lint

- name: Build
  run: npm run build
```

This is important because:

> **Claude making a change does not prove that the change is correct.**

This connects directly to your earlier **Verification Skills** lesson.

---

# 19. Recommended Architecture for Your Projects

For an Angular/React project, I would eventually build this:

```text
                         GitHub
                            |
              +-------------+-------------+
              |                           |
              v                           v
          Pull Request                Issue
              |                           |
              v                           v
      Managed Code Review          @claude Action
              |                           |
              v                           v
       Find problems               Implement change
              |                           |
              |                           v
              |                      Run tests
              |                           |
              |                           v
              |                     Run lint/build
              |                           |
              +-------------+-------------+
                            |
                            v
                       Human Review
                            |
                            v
                         Merge
```

---

# 20. Recommended Repository Structure

I would structure your learning/project repository like this:

```text
project/
│
├── CLAUDE.md
│
├── .claude/
│   ├── skills/
│   │   └── verify-code/
│   │       └── skill.md
│   │
│   └── hooks/
│       ├── protect-git.sh
│       ├── format.sh
│       └── verify.sh
│
├── .github/
│   └── workflows/
│       ├── claude.yml
│       ├── claude-review.yml
│       └── ci.yml
│
├── src/
│
└── package.json
```

Now all the concepts you've learned start working together.

---

# 21. Complete Mental Model

You have now learned:

```text
CLAUDE.md
     ↓
Project rules
     |
     v
Skills
     ↓
Reusable procedures
     |
     v
Hooks
     ↓
Deterministic enforcement
     |
     v
Permission Modes
     ↓
Level of autonomy
     |
     v
Verification
     ↓
Prove correctness
     |
     v
GitHub Actions
     ↓
Automate Claude in CI
     |
     v
Code Review
     ↓
Review Pull Requests
```

This is the bigger picture of Claude Code automation.

---

# 22. Certification Questions

## Q1. What is the difference between Claude Code Review and GitHub Actions?

**Answer:**

Code Review is a managed PR review service. GitHub Actions provides customizable automation that can execute Claude Code for tasks such as implementation, issue handling, scheduled jobs, and custom CI workflows.

---

## Q2. What triggers Claude GitHub Actions interactively?

**Answer:**

A GitHub issue or PR comment containing:

```text
@claude
```

---

## Q3. What action is used?

**Answer:**

```yaml
anthropics/claude-code-action@v1
```

---

## Q4. Where should the Anthropic API key be stored?

**Answer:**

As a GitHub Actions secret:

```text
ANTHROPIC_API_KEY
```

Never hard-code it into the workflow.

---

## Q5. What does `claude_args` do?

**Answer:**

It passes Claude Code CLI arguments to the action.

Example:

```yaml
claude_args: "--max-turns 5"
```

---

## Q6. What does `--max-turns` control?

**Answer:**

The maximum number of agent turns Claude can execute.

---

## Q7. What is `workflow_dispatch`?

**Answer:**

It allows a GitHub Actions workflow to be manually triggered from GitHub.

---

## Q8. What should you use if you simply want every PR automatically reviewed?

**Answer:**

Managed **Claude Code Review** is the simplest choice.

---

## Q9. What should you use if Claude needs to implement an issue?

**Answer:**

Claude Code **GitHub Action**.

---

## Q10. Does managed Code Review approve or block PRs?

**Answer:**

No. It posts findings; the existing human review process remains responsible for the final decision. ([Claude][1])

---

# 23. Certification Scenario

### Question

Your company wants:

1. Claude to automatically review every PR.
2. Claude to identify security problems.
3. Claude to post inline comments.
4. Developers to decide whether to merge.
5. No custom GitHub workflow maintenance.

### Answer

Use:

```text
Managed Claude Code Review
```

---

### Another Scenario

Your company wants:

1. Developer comments `@claude implement this feature`.
2. Claude reads the issue.
3. Claude modifies the repository.
4. Claude runs tests.
5. Claude creates/updates the PR.

### Answer

Use:

```text
Claude Code GitHub Action
```

---

# 24. Final Workflow to Remember

```text
STEP 1
Create GitHub repository
        ↓
STEP 2
Create CLAUDE.md
        ↓
STEP 3
Install Claude GitHub App
        ↓
STEP 4
Add ANTHROPIC_API_KEY
        ↓
STEP 5
Create .github/workflows/claude.yml
        ↓
STEP 6
Use anthropics/claude-code-action@v1
        ↓
STEP 7
Test @claude
        ↓
STEP 8
Add project-specific prompt
        ↓
STEP 9
Add --max-turns
        ↓
STEP 10
Add tests/lint/build verification
        ↓
STEP 11
Choose managed Code Review for PR review
        ↓
STEP 12
Use GitHub Actions for custom automation
```

## The certification sentence

> **Claude Code Review is the managed solution for automated Pull Request review, while Claude Code GitHub Actions lets you build custom GitHub automation around Claude, including `@claude` commands, implementation tasks, scheduled jobs, and CI workflows.** ([Claude][1])

### Official documentation

[Claude Code GitHub Actions documentation](https://code.claude.com/docs/en/github-actions?asuniq=7b2efe36&utm_source=chatgpt.com)

[Claude Code Code Review documentation](https://code.claude.com/docs/en/code-review?utm_source=chatgpt.com)

[1]: https://code.claude.com/docs/en/code-review?utm_source=chatgpt.com "Code Review - Claude Code Docs"
[2]: https://code.claude.com/docs/en/github-actions?asuniq=7b2efe36&utm_source=chatgpt.com "Claude Code GitHub Actions - Claude Code Docs"
[3]: https://code.claude.com/docs/en/overview?utm_source=chatgpt.com "Claude Code overview - Claude Code Docs"
