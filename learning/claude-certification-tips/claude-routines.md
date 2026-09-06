# Claude Code — Routines and Headless

> **Claude Academy — Lesson 6 of 9: Routines and headless**
>
> This page is written as a certification-focused study note and can be saved directly as `routines-and-headless.md`.

## 1. Core Idea

Once Claude can reliably perform a task, the next step is to **automate that task**.

Claude Code provides an automation spectrum:

```text
Routines
   ↓
Headless Mode (-p)
   ↓
Deterministic CI (--bare)
   ↓
Agent SDK
```

The more you move to the right, the more control you get—but also the more you need to build and maintain.

### Easy memory trick

> **Routine = Cloud automation**
> **Headless = Script automation**
> **--bare = Deterministic CI**
> **Agent SDK = Claude inside your application**

The official lesson describes routines as managed cloud automation and headless/Agent SDK as options when you need more control from your own environment or code. ([Claude Academy][1])

---

# 2. Routines

## What is a Routine?

A **Routine** is a saved Claude Code task that runs automatically in the cloud.

A routine combines:

```text
Prompt
+
Repository
+
Connectors
+
Trigger
```

Claude runs this bundle whenever the trigger occurs. You don't need to maintain your own server or keep your computer running. ([Claude Academy][1])

### Example

Suppose your project needs a dependency audit every morning.

Instead of manually asking:

```text
Check our dependencies for security or version problems.
```

you can create a routine:

```text
Daily dependency audit at 9 AM
```

Claude automatically performs the task.

---

# 3. Routine Triggers

A routine can be triggered by:

| Trigger            | Example                                |
| ------------------ | -------------------------------------- |
| Cron schedule      | Every day at 9 AM                      |
| HTTP POST          | Your application calls the routine API |
| GitHub event       | New Pull Request                       |
| Recurring schedule | Daily Sentry issue analysis            |

For example:

```text
New PR
   ↓
Routine starts
   ↓
Claude analyzes PR
   ↓
Claude reports issues
```

Another example:

```text
9:00 AM every day
        ↓
Dependency audit routine
        ↓
Claude checks dependencies
        ↓
Report results
```

---

# 4. Creating a Routine

There are two main ways.

## Option 1 — Web

Create a routine through Claude's routines interface.

You provide:

```text
Name
Prompt / Instructions
Repository
Trigger
```

## Option 2 — Claude Code

You can use:

```text
/schedule
```

Example:

```text
/schedule daily dependency audit at 9am
```

Claude Code can create the recurring task from the terminal. ([Claude Academy][1])

---

# 5. Important Routine Limitations

These are particularly important for certification questions.

### 1. Research Preview

Routines are currently described by the course as a **research preview**, so behavior and limits may change.

### 2. Maximum Frequency

A recurring routine can run **at most hourly**.

Therefore, if you need something to execute every 5 minutes, a routine is not the appropriate solution.

### 3. Fresh Clone

Each routine execution starts from a **fresh clone of the default branch**.

### 4. Branch Protection

By default, routine runs can push only to branches beginning with:

```text
claude/
```

This provides protection against an autonomous process directly rewriting your main branch. ([Claude Academy][1])

---

# 6. Headless Mode

Routines are useful when Anthropic's cloud environment is sufficient.

But sometimes your automation needs:

* Your own machine
* Your own CI environment
* Shell scripts
* Custom data pipelines
* Custom orchestration
* Integration with existing tools

This is where **Headless Mode** comes in.

---

# 7. The `-p` / `--print` Flag

The central feature of headless mode is:

```bash
claude -p
```

`-p` means:

```text
--print
```

It runs Claude Code as a **one-shot, non-interactive command**.

Example:

```bash
claude -p "summarize the changes in this diff"
```

Conceptually:

```text
Script
   ↓
claude -p
   ↓
Claude Code
   ↓
Output
   ↓
Next script/tool
```

This makes Claude behave much more like a normal command-line utility. ([Claude Academy][1])

---

# 8. Important Difference: Interactive vs Headless

| Feature           | Interactive Claude Code     | Headless                    |
| ----------------- | --------------------------- | --------------------------- |
| UI                | Interactive                 | No interactive UI           |
| Command           | `claude`                    | `claude -p`                 |
| Human interaction | Yes                         | No                          |
| Good for scripts  | Less suitable               | Excellent                   |
| stdin/stdout      | Normal terminal interaction | Reads stdin / writes stdout |
| Automation        | Manual/interactive          | Automated                   |

### Certification memory

> **`-p` = one-shot, non-interactive Claude Code execution.**

---

# 9. Important `-p` Behavior

One very important certification point:

> `claude -p` does **not automatically discover** the local `CLAUDE.md`, hooks, skills, plugins, or MCP servers.

The lesson explains that headless mode uses explicitly allowed tools rather than automatically loading everything available in the local environment. ([Claude Academy][1])

This is important because someone might incorrectly assume:

```text
claude -p
   ↓
Automatically loads everything from project
```

That is **not** the correct mental model.

Instead:

```text
claude -p
   ↓
Explicitly configured tools/environment
   ↓
Claude executes task
```

---

# 10. Structured Output

Headless mode becomes especially powerful when Claude's output is consumed by another program.

Instead of returning:

```text
I found these functions...
```

you can request structured JSON.

Claude Code supports:

```text
--output-format json
```

together with:

```text
--json-schema
```

Example:

```bash
claude -p "Extract the exported function names from src/core/style.js" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'
```

The structured result is available under:

```text
structured_output
```

You can then extract it using `jq`:

```bash
... | jq '.structured_output.functions'
```

This allows Claude's output to become input for another script, database, or pipeline. ([Claude Academy][1])

---

# 11. Why Structured Output Matters

Without structured output:

```text
Claude
  ↓
Human-readable text
  ↓
Difficult for scripts to consume
```

With structured output:

```text
Claude
  ↓
JSON
  ↓
jq / Node.js / Python
  ↓
Database / API / CI pipeline
```

### Example

Imagine a CI pipeline wants Claude to classify a PR:

```json
{
  "risk": "high",
  "issues": 3,
  "needs_review": true
}
```

A script can easily consume this.

---

# 12. Multi-Step Automation

Headless execution doesn't have to be one command.

Claude Code can return a **session ID**.

You can later resume that session.

Example:

```bash
claude --resume "$(jq -r .session_id /tmp/plan.json)"
```

Conceptually:

```text
Script 1
   ↓
Claude
   ↓
Create plan
   ↓
Session ID
   ↓
Save session ID
        |
        ↓
Script 2
   ↓
Resume session
   ↓
Continue work
```

This is useful when a workflow has multiple stages. ([Claude Academy][1])

---

# 13. Example: Plan → Implement

Imagine an Angular project.

### Step 1 — Analyze

```bash
claude -p "Analyze the Angular application and create a plan to migrate the authentication service."
```

Save the session ID.

### Step 2 — Continue

```bash
claude --resume "<session-id>"
```

Then ask Claude to implement the plan.

This allows a multi-step workflow without putting the entire workflow into one enormous prompt.

---

# 14. `--bare` — Deterministic CI

Another important option is:

```bash
--bare
```

The lesson describes `--bare` as **deterministic mode**.

It is intended for CI pipelines where you want predictable, repeatable execution rather than behavior that varies between runs. ([Claude Academy][1])

### Memory trick

```text
-p
→ Headless

--bare
→ Deterministic CI
```

---

# 15. Agent SDK

At the far end of the automation spectrum is the **Agent SDK**.

Instead of calling Claude Code from the shell, you embed the Claude Code engine into your own application.

The course describes TypeScript and Python interfaces using a `query` function. ([Claude Academy][1])

Conceptually:

```text
Your Application
       ↓
   Agent SDK
       ↓
   Claude Code
       ↓
   Tools / Actions
       ↓
   Your Application
```

You can provide things such as:

```text
allowedTools
system prompt
permission mode
```

and process the messages Claude streams back.

---

# 16. TypeScript Example

Conceptually:

```typescript
const result = query({
  prompt: "Analyze this pull request",
  options: {
    allowedTools: ["Read", "Grep"],
    permissionMode: "plan"
  }
});
```

Your application can then process Claude's responses.

This is fundamentally different from:

```bash
claude -p "Analyze this pull request"
```

because the SDK makes Claude part of your application's own execution flow.

---

# 17. Routines vs Headless vs Agent SDK

| Capability           | Routines               | Headless         | Agent SDK               |
| -------------------- | ---------------------- | ---------------- | ----------------------- |
| Infrastructure       | Anthropic              | Your environment | Your application        |
| Coding required      | Very little            | Some scripting   | More                    |
| Interactive UI       | No                     | No               | Depends on your app     |
| Recurring automation | Excellent              | Excellent        | Excellent               |
| Shell integration    | Limited                | Excellent        | Via your application    |
| Structured output    | Yes                    | Excellent        | Excellent               |
| Custom orchestration | Limited                | Excellent        | Excellent               |
| Embed into product   | No                     | Not directly     | Yes                     |
| Best use             | Repeatable cloud tasks | Scripts/CI       | AI-powered applications |

---

# 18. Decision Guide

Use this simple decision tree:

```text
Do I have a repeatable task?
        |
        Yes
        |
        v
Can it run in Anthropic's cloud?
        |
      Yes
        |
        v
     ROUTINE
```

If you need your own environment:

```text
Need custom scripts / pipeline?
        |
        v
   HEADLESS (-p)
```

If you need deterministic CI behavior:

```text
CI requires repeatable execution?
        |
        v
     --bare
```

If Claude needs to become part of your product:

```text
Claude inside my application?
        |
        v
   AGENT SDK
```

---

# 19. Practical Example for My Project

Suppose you have an Angular + Node.js project.

## Requirement 1 — Daily dependency audit

Use a:

```text
Routine
```

Example:

```text
Every morning:
Check package.json and package-lock.json for outdated
or potentially problematic dependencies and produce a report.
```

---

## Requirement 2 — PR analysis from CI

Use:

```text
Headless mode
```

Example:

```bash
claude -p "Review the current git diff for security and architectural issues"
```

Your CI pipeline can capture the output.

---

## Requirement 3 — Machine-readable PR result

Use:

```text
-p
+
--output-format json
+
--json-schema
```

Example result:

```json
{
  "risk": "medium",
  "securityIssues": 1,
  "architectureIssues": 2,
  "approved": false
}
```

Your CI system can then make a decision.

---

## Requirement 4 — Claude-powered application

Suppose you build an internal developer portal:

```text
Developer Portal
      ↓
Agent SDK
      ↓
Claude
      ↓
Repository analysis
      ↓
Results
```

Use:

```text
Agent SDK
```

rather than repeatedly spawning shell commands.

---

# 20. How This Connects With Previous Lessons

This lesson connects directly to the previous Claude Code concepts.

```text
CLAUDE.md
    ↓
Project guidance

Skills
    ↓
Reusable procedures

Hooks
    ↓
Deterministic enforcement

Permission Modes
    ↓
Level of autonomy

Routines
    ↓
Cloud-based repeat automation

Headless
    ↓
Script / pipeline automation

Agent SDK
    ↓
Claude inside your application
```

### Very important distinction

```text
CLAUDE.md
→ Tell Claude how to work

Skill
→ Tell Claude how to perform a procedure

Hook
→ Enforce a rule automatically

Permission Mode
→ Control what Claude is allowed to do

Routine
→ Run repeatable work automatically

Headless
→ Run Claude from scripts

Agent SDK
→ Embed Claude into an application
```

---

# 21. Certification Questions

## Q1. What is a Claude Code Routine?

**Answer:**
A Routine is a saved prompt, repository, connectors, and trigger that runs Claude Code automatically on Anthropic's managed infrastructure.

---

## Q2. What is the main advantage of Routines?

**Answer:**
They automate recurring tasks without requiring you to maintain your own server, script, or workflow infrastructure.

---

## Q3. Which command creates a scheduled routine from Claude Code?

**Answer:**

```text
/schedule
```

Example:

```text
/schedule daily dependency audit at 9am
```

---

## Q4. What is the maximum recurring frequency of a Routine?

**Answer:**

```text
Hourly
```

The course states that routines can run at most hourly.

---

## Q5. What is Headless Mode?

**Answer:**
Headless Mode runs Claude Code non-interactively from the command line, primarily using:

```bash
claude -p
```

---

## Q6. What does `-p` mean?

**Answer:**

```text
--print
```

It runs Claude Code as a one-shot command without the interactive UI.

---

## Q7. Does `claude -p` automatically discover CLAUDE.md, Hooks, Skills, Plugins and MCP servers?

**Answer:**

```text
No.
```

Headless mode does not automatically discover these local resources; tools/environment need to be explicitly configured.

---

## Q8. How do you get structured JSON output from headless Claude?

**Answer:**

Use:

```text
--output-format json
```

together with:

```text
--json-schema
```

The resulting object is available in:

```text
structured_output
```

---

## Q9. Why use JSON Schema with headless mode?

**Answer:**
To constrain Claude's response to a predictable structure that scripts and CI pipelines can consume reliably.

---

## Q10. How can you continue a previous headless session?

**Answer:**

Capture the session ID and use:

```bash
claude --resume "<session-id>"
```

---

## Q11. What is `--bare` used for?

**Answer:**
`--bare` provides deterministic mode and is intended for CI pipelines where repeatable, predictable execution is important.

---

## Q12. What is the Agent SDK?

**Answer:**
The Agent SDK allows developers to embed Claude Code capabilities directly into their own TypeScript or Python applications.

---

## Q13. When should you use a Routine instead of Headless Mode?

**Answer:**
Use a Routine when the task is repeatable and can run using Anthropic's managed cloud infrastructure without needing your own custom environment or orchestration.

---

## Q14. When should you use Headless Mode?

**Answer:**
Use Headless Mode when you need to run Claude from your own scripts, shell environment, CI pipeline, or custom automation.

---

## Q15. When should you use the Agent SDK?

**Answer:**
Use the Agent SDK when Claude needs to become part of your own application rather than simply being invoked as a command-line tool.

---

# 22. Scenario-Based Certification Questions

### Scenario 1

Your team wants Claude to check dependencies every morning at 9 AM. You don't want to maintain a server.

**What should you use?**

**Answer:**

```text
Routine
```

---

### Scenario 2

Your Jenkins pipeline needs to run Claude and pipe its output into another shell command.

**What should you use?**

**Answer:**

```text
Headless mode (-p)
```

---

### Scenario 3

Your CI pipeline requires predictable, deterministic Claude execution.

**What should you consider?**

**Answer:**

```text
--bare
```

---

### Scenario 4

You are building an internal developer portal and want Claude's capabilities directly inside your TypeScript application.

**What should you use?**

**Answer:**

```text
Agent SDK
```

---

### Scenario 5

You want Claude to return a list of TypeScript functions that another program will consume.

**What should you use?**

**Answer:**

```text
--output-format json
+
--json-schema
```

---

### Scenario 6

You want one script to create a plan and another script to continue the work using the same Claude context.

**What should you use?**

**Answer:**

```text
Session ID + claude --resume
```

---

# 23. Common Certification Traps

### Trap 1

> "Routine requires me to keep my laptop running."

**Wrong.**

Routines execute on Anthropic's managed infrastructure.

---

### Trap 2

> "`-p` is an interactive Claude Code mode."

**Wrong.**

`-p` is non-interactive/headless execution.

---

### Trap 3

> "`-p` automatically loads my project's CLAUDE.md and hooks."

**Wrong.**

Headless mode does not automatically discover those resources.

---

### Trap 4

> "`--bare` means more autonomous permissions."

**Wrong.**

`--bare` is about deterministic execution, particularly for CI.

---

### Trap 5

> "Agent SDK is just another name for `claude -p`."

**Wrong.**

Headless mode invokes Claude from scripts; the Agent SDK embeds Claude Code capabilities into your application.

---

# 24. Easy Memory Table

| Term                   | Remember It As                      |
| ---------------------- | ----------------------------------- |
| Routine                | **Repeat in the cloud**             |
| `/schedule`            | **Create scheduled work**           |
| `-p`                   | **Headless / one-shot**             |
| `--output-format json` | **Machine-readable output**         |
| `--json-schema`        | **Constrain JSON structure**        |
| `structured_output`    | **Where structured result appears** |
| `--resume`             | **Continue session**                |
| `--bare`               | **Deterministic CI**                |
| Agent SDK              | **Claude inside your app**          |

---

# 25. One-Minute Certification Cheat Sheet

```text
ROUTINE
→ Saved prompt + repo + connectors + trigger
→ Runs in Anthropic's cloud
→ Good for recurring work
→ Maximum recurring frequency: hourly

HEADLESS
→ claude -p
→ Non-interactive
→ Good for scripts and pipelines
→ Reads stdin / writes stdout
→ Doesn't automatically discover local CLAUDE.md, hooks, skills, plugins or MCP

STRUCTURED OUTPUT
→ --output-format json
→ --json-schema
→ Result in structured_output

MULTI-STEP
→ Capture session_id
→ claude --resume <session-id>

CI
→ --bare
→ Deterministic execution

AGENT SDK
→ TypeScript / Python
→ query()
→ Embed Claude Code into your application
```

---

# 26. Final Certification Takeaway

The most important concept from this lesson is the **automation spectrum**:

```text
             LESS CONTROL                         MORE CONTROL
                  |                                      |
                  v                                      v

             ROUTINE → HEADLESS → --bare → AGENT SDK
               |          |          |          |
             Cloud       Script      CI       Application
```

Remember:

> **Start with a Routine. Move to Headless when you need your own environment. Use `--bare` when deterministic CI execution matters. Use the Agent SDK when Claude needs to live inside your application.** ([Claude Academy][1])

**Official lesson:** [Claude Academy — Routines and headless](https://academy.claude.com/courses/claude-code-in-action/routines-and-headless?utm_source=chatgpt.com)

[1]: https://academy.claude.com/courses/claude-code-in-action/routines-and-headless "Routines and headless · Claude Code in Action · Claude Academy"
