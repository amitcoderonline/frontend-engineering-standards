# Claude Code — Plugins

> **Claude Academy — Lesson 9 of 9: Plugins**
>
> This page is certification-focused and can be saved directly as `plugins.md`.

---

# 1. Core Idea

You have now learned how to build a useful Claude Code setup:

```text
.claude/
├── skills/
├── agents/
└── hooks/
```

But there is a problem.

Suppose you have built a great setup and want your entire team to use it.

Without plugins, you might do this:

```text
Developer A
    ↓
Copy .claude/
    ↓
Developer B
    ↓
Copy .claude/
    ↓
Developer C
```

This creates problems:

* Files get out of sync
* Updates have to be copied manually
* Different developers may have different versions
* Skills and hooks can conflict

### Plugins solve this problem.

> **A plugin packages your Claude Code setup into one installable unit that can be shared and versioned.** ([Claude Academy][1])

---

# 2. What Is a Plugin?

A Claude Code plugin can bundle:

```text
Plugin
 ├── Skills
 ├── Agents / Subagents
 ├── Hooks
 ├── MCP server configuration
 ├── LSP servers
 ├── Monitors
 ├── Executables
 └── Limited settings
```

Instead of distributing all these pieces separately:

```text
Skill
+
Agent
+
Hook
+
MCP
```

you distribute:

```text
             Plugin
                |
     +----------+----------+
     |          |          |
   Skill      Agent      Hook
     |          |          |
     +----------+----------+
                |
               MCP
```

Claude Academy describes a plugin as an installable unit that bundles skills, subagents, hooks, MCP server configurations, and other extensions. ([Claude Academy][1])

---

# 3. The Problem Plugins Solve

Imagine your team has created:

```text
.claude/
├── skills/
│   ├── verify-code/
│   └── review-angular/
├── agents/
│   └── security-reviewer.md
├── hooks/
│   └── hooks.json
└── .mcp.json
```

You now want five teams to use this setup.

### Without a Plugin

```text
Copy files
    ↓
Hope everything is copied
    ↓
Developer uses version 1
    ↓
You update version 2
    ↓
Copy files again
```

### With a Plugin

```text
Plugin v1.0.0
      ↓
Install
      ↓
Team A
Team B
Team C
Team D
```

Then:

```text
Plugin v1.1.0
      ↓
Update
      ↓
Everyone gets the new version
```

---

# 4. Plugin vs Standalone `.claude`

This is an important certification distinction.

| Standalone `.claude/`          | Plugin                       |
| ------------------------------ | ---------------------------- |
| Project/personal configuration | Shareable package            |
| Good for experimentation       | Good for distribution        |
| Short skill names              | Namespaced skills            |
| Usually local to project       | Reusable across projects     |
| Easy to start                  | Better for team distribution |
| No packaging required          | Versionable/installable      |

### Memory trick

> **`.claude/` = build it**
> **Plugin = package and share it**

Claude's current documentation recommends standalone configuration for project-specific or experimental work and plugins when functionality needs to be shared, versioned, or distributed. ([Claude][2])

---

# 5. Installing an Existing Plugin

You can install a plugin directly:

```text id="3f9xk7"
/plugin install github@claude-plugins-official
```

After installation, Claude Code may ask you to reload plugins:

```text id="4z7v5p"
/reload-plugins
```

The official marketplace is automatically available in Claude Code, and plugins can be discovered through the `/plugin` interface. ([Claude][3])

---

# 6. Plugin Namespacing

Plugins use namespaces to avoid conflicts.

Suppose your plugin is:

```text id="0d9z3a"
my-company-tools
```

and it contains:

```text
skills/
└── review-code/
    └── SKILL.md
```

The skill can be invoked as:

```text id="u5g2kx"
/my-company-tools:review-code
```

Instead of simply:

```text id="b1r8y4"
/review-code
```

### Why?

Imagine two plugins both provide:

```text
review-code
```

Without namespacing:

```text
/review-code
```

Which plugin should Claude use?

With namespacing:

```text
/company-a:review-code
/company-b:review-code
```

No ambiguity.

### Certification takeaway

> **Plugin components are namespaced to prevent conflicts.** ([Claude Academy][1])

---

# 7. Plugin Marketplace

A marketplace is a **catalog of plugins**.

Think of it like an app store:

```text
Marketplace
     |
     +── Plugin A
     +── Plugin B
     +── Plugin C
     +── Plugin D
```

Adding a marketplace does **not** automatically install every plugin.

The process is:

```text
1. Add marketplace
       ↓
2. Browse plugins
       ↓
3. Select plugin
       ↓
4. Install plugin
```

Claude's documentation explicitly describes this two-step model: **add the marketplace, then install individual plugins**. ([Claude][3])

---

# 8. Team Marketplace

For an organization, you can maintain a private marketplace.

Example:

```text id="s8t2h1"
/plugin marketplace add your-org/claude-plugins
```

Then:

```text
Team Member A
       ↓
your-org/claude-plugins
       ↓
Install Plugin

Team Member B
       ↓
your-org/claude-plugins
       ↓
Install Plugin
```

The advantage is centralized:

* Discovery
* Version tracking
* Updates
* Distribution

Claude Academy specifically recommends a private marketplace for teams that want a shared source for plugins. ([Claude Academy][1])

---

# 9. Plugin Security — Very Important

This is one of the **most important concepts in the lesson**.

A plugin is not simply a collection of Markdown instructions.

A plugin can contain executable behavior.

For example:

```text
Plugin
 ├── Skill
 ├── Agent
 ├── Hook
 └── MCP Server
```

Hooks can run automatically when Claude performs matching tool calls.

Therefore:

> **A plugin can execute code with your privileges.** ([Claude Academy][1])

---

# 10. Why You Should Inspect a Plugin Before Installing

Imagine you install:

```text
awesome-security-plugin
```

You look at the Skills and think:

```text
"Looks useful."
```

But the plugin also contains:

```text
hooks/hooks.json
```

and:

```text
.mcp.json
```

The hook might execute whenever Claude uses Bash.

The MCP server might communicate with an external service.

Therefore:

```text
Skill looks safe
        ≠
Plugin is safe
```

You need to inspect:

```text
Skills
Agents
Hooks
MCP servers
Settings
```

before enabling an untrusted plugin.

Claude Academy explicitly warns that third-party plugins can contain hooks that execute with your privileges and recommends checking what a plugin actually does before installing it. ([Claude Academy][1])

---

# 11. Reviewed Does Not Mean Trusted

This is another certification-worthy point.

A plugin may have gone through automated review.

That does **not** mean:

```text
Reviewed
    =
Completely safe
```

Instead:

```text
Reviewed
    ↓
Some problems may have been detected
```

You still need to:

```text
Inspect
+
Trust the source
+
Understand what it installs
```

Claude Academy's lesson explicitly emphasizes that automated review does not guarantee that a plugin is trustworthy. ([Claude Academy][1])

---

# 12. Plugin Components Run Alongside Yours

Installing a plugin does not simply replace your configuration.

Suppose you already have:

```text
Your project
└── PreToolUse hook
```

and the plugin provides:

```text
Plugin
└── PreToolUse hook
```

After installation:

```text
Tool call
   |
   +---- Your PreToolUse hook
   |
   +---- Plugin PreToolUse hook
```

Both can execute.

### Important

> **Plugin hooks stack with your hooks; they don't simply replace them.** ([Claude Academy][1])

---

# 13. Plugin Hooks

Suppose your project has:

```text
PreToolUse
→ Block git push --force
```

The plugin has:

```text
PreToolUse
→ Check security policy
```

Then:

```text
Claude wants to run command
          |
          +------------------+
          |                  |
          v                  v
Your Hook              Plugin Hook
          |                  |
          +--------+---------+
                   |
                   v
              Tool decision
```

This is powerful, but it is also why you need to understand what a plugin installs.

---

# 14. Plugin Settings

A plugin can contain:

```text
settings.json
```

but the plugin settings are intentionally limited.

The current documentation says supported plugin settings include:

```text
agent
subagentStatusLine
```

The `agent` setting is particularly important because it can make one of the plugin's agents the main Claude Code agent, including its system prompt, tool restrictions, and model. ([Claude][2])

---

# 15. The `agent` Setting

Imagine a plugin contains:

```text
agents/
└── security-reviewer.md
```

and:

```json
{
  "agent": "security-reviewer"
}
```

When the plugin is enabled, that agent can become the main agent.

Conceptually:

```text
Normal Claude
     ↓
Default behavior

Plugin enabled
     ↓
security-reviewer agent
     ↓
Different system prompt
Different tool restrictions
Different model
```

### Certification warning

> **Enabling a plugin can change Claude Code's default behavior if the plugin uses the `agent` setting.** ([Claude Academy][1])

---

# 16. Packaging Your Own Plugin

Suppose you already have:

```text
.claude/
├── skills/
├── agents/
├── hooks/
└── .mcp.json
```

Once it works well, package it.

A plugin can preserve the same general component structure.

Example:

```text id="w7x1za"
my-company-plugin/
│
├── .claude-plugin/
│   └── plugin.json
│
├── skills/
│   ├── verify-code/
│   │   └── SKILL.md
│   │
│   └── review-angular/
│       └── SKILL.md
│
├── agents/
│   └── security-reviewer.md
│
├── hooks/
│   └── hooks.json
│
└── .mcp.json
```

---

# 17. Plugin Manifest

The optional manifest lives at:

```text
.claude-plugin/plugin.json
```

Example:

```json
{
  "name": "company-dev-tools",
  "version": "1.0.0",
  "description": "Shared Claude Code tools for our engineering teams",
  "author": {
    "name": "My Company"
  }
}
```

The manifest provides plugin metadata such as:

* Name
* Version
* Description
* Author

Claude Academy notes that the manifest is optional, but the `name` field is the key field for namespacing and versioning. ([Claude Academy][1])

---

# 18. Why Versioning Matters

Imagine your team starts with:

```text
company-dev-tools v1.0.0
```

Later you improve the verification Skill:

```text
company-dev-tools v1.1.0
```

Then you add security hooks:

```text
company-dev-tools v2.0.0
```

Now the team has a controlled upgrade path.

```text
v1.0.0
   ↓
v1.1.0
   ↓
v2.0.0
```

Instead of:

```text
"Copy these five files from Amit's laptop."
```

---

# 19. Developing a Plugin Locally

You can test a plugin locally using:

```bash
claude --plugin-dir ./my-plugin
```

For example:

```text id="s5f0i9"
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── hello/
        └── SKILL.md
```

Then:

```bash
claude --plugin-dir ./my-plugin
```

Inside Claude:

```text
/my-plugin:hello
```

This is useful during development because you can test the plugin before distributing it. ([Claude][2])

---

# 20. Example: Build a Team Verification Plugin

This is a great example for your own development environment.

Suppose your team repeatedly does:

```text
git diff
npm test
npm run lint
npm run typecheck
npm run build
```

You could package this as:

```text
company-dev-tools
└── skills/
    └── verify-code/
        └── SKILL.md
```

The Skill could contain:

```markdown
---
description: Verify code changes before completion
---

Perform the following verification:

1. Inspect git status.
2. Inspect git diff.
3. Run unit tests.
4. Run lint.
5. Run TypeScript checks.
6. Run the production build.
7. Report all failures.
8. Do not claim success unless the commands actually pass.
```

Now every team member can use the same verification procedure.

---

# 21. Example: Angular Team Plugin

For your Angular projects, imagine creating:

```text
angular-team-tools/
│
├── .claude-plugin/
│   └── plugin.json
│
├── skills/
│   ├── verify-angular/
│   │   └── SKILL.md
│   │
│   ├── review-angular/
│   │   └── SKILL.md
│   │
│   └── upgrade-angular/
│       └── SKILL.md
│
├── agents/
│   └── angular-architect.md
│
└── hooks/
    └── hooks.json
```

Your team could then have reusable capabilities such as:

```text
/angular-team-tools:verify-angular
/angular-team-tools:review-angular
/angular-team-tools:upgrade-angular
```

The same setup can be used across multiple Angular repositories.

---

# 22. Plugin vs Skill

This is a common certification question.

A **Skill** is a reusable procedure.

A **Plugin** is a package that can contain multiple Claude Code capabilities.

```text
Skill
→ One reusable capability

Plugin
→ Package containing:
   Skills
   Agents
   Hooks
   MCP
   etc.
```

Think:

```text
Skill = component

Plugin = package
```

---

# 23. Plugin vs Hook

A Hook:

```text
Runs at a defined Claude Code event
```

A Plugin:

```text
Packages Hooks + Skills + Agents + other components
```

Therefore:

```text
Hook
   ↓
One component

Plugin
   ↓
Container/package
   ├── Hook
   ├── Skill
   ├── Agent
   └── MCP
```

---

# 24. Plugin vs Marketplace

Don't confuse these.

### Plugin

The actual extension:

```text
company-dev-tools
```

### Marketplace

The catalog containing plugins:

```text
company marketplace
├── company-dev-tools
├── security-tools
└── frontend-tools
```

Memory trick:

> **Plugin = product**
> **Marketplace = store**

---

# 25. Complete Plugin Lifecycle

The entire workflow is:

```text
1. Build .claude setup
        ↓
2. Test Skills / Agents / Hooks
        ↓
3. Setup works
        ↓
4. Package as Plugin
        ↓
5. Add plugin.json
        ↓
6. Version plugin
        ↓
7. Test locally
        ↓
8. Create marketplace
        ↓
9. Publish/share
        ↓
10. Team installs
        ↓
11. Team updates versions
```

---

# 26. How Plugins Connect With Previous Lessons

This lesson completes the Claude Code architecture you've been learning.

```text
CLAUDE.md
    ↓
Project guidance

Skills
    ↓
Reusable procedures

Permission Modes
    ↓
Level of autonomy

Hooks
    ↓
Deterministic enforcement

Routines
    ↓
Scheduled automation

Headless
    ↓
Script/CI automation

GitHub Actions
    ↓
GitHub automation

Verification
    ↓
Evidence of correctness

Plugins
    ↓
Package and share the whole setup
```

### The big picture

```text
BUILD
  ↓
Configure Claude
  ↓
AUTOMATE
  ↓
Run Claude with less supervision
  ↓
VERIFY
  ↓
Trust the result
  ↓
PACKAGE
  ↓
Share with the team
```

That is essentially the purpose of the entire **Claude Code in Action** course. The course itself describes the progression as steering, configuring, automating, verifying, and finally packaging a trusted setup for team use. ([Anthropic][4])

---

# 27. Certification Questions

## Q1. What problem do Plugins solve?

**Answer:**

Plugins package Claude Code configuration and capabilities into an installable, reusable unit that can be shared and versioned across projects and teams.

---

## Q2. What can a Plugin contain?

**Answer:**

It can contain:

```text
Skills
Agents / Subagents
Hooks
MCP servers
LSP servers
Monitors
Executables
Limited settings
```

---

## Q3. What is the difference between `.claude/` and a Plugin?

**Answer:**

`.claude/` is useful for project-specific or personal configuration.

A Plugin packages reusable functionality for sharing, versioning, and distribution.

---

## Q4. Why are Plugin skills namespaced?

**Answer:**

To prevent conflicts between skills with the same name from different plugins.

Example:

```text
/company-a:review
/company-b:review
```

---

## Q5. What is a Marketplace?

**Answer:**

A Marketplace is a catalog/source from which plugins can be discovered and installed.

---

## Q6. Does adding a Marketplace install all its plugins?

**Answer:**

**No.**

Adding a marketplace makes its catalog available. You still choose which plugins to install. ([Claude][3])

---

## Q7. Why should you inspect a plugin before installing it?

**Answer:**

Because plugins can contain executable hooks, MCP servers, agents, and other components that may run with your privileges.

---

## Q8. Are reviewed third-party plugins automatically trustworthy?

**Answer:**

**No.**

Automated review can catch some problems, but you should still inspect the plugin and trust its source. ([Claude Academy][1])

---

## Q9. Do plugin hooks replace your existing hooks?

**Answer:**

**No.**

Plugin hooks run alongside your own hooks.

---

## Q10. Where does the plugin manifest live?

**Answer:**

```text
.claude-plugin/plugin.json
```

---

## Q11. Is `plugin.json` mandatory?

**Answer:**

The manifest is optional when Claude Code can discover components through directory conventions, but it is useful for metadata, namespacing, and versioning. ([Claude Academy][1])

---

## Q12. What is the most important field in `plugin.json`?

**Answer:**

```json
"name": "my-plugin"
```

The name provides the plugin namespace.

---

## Q13. How can you test a plugin locally?

**Answer:**

Use:

```bash
claude --plugin-dir ./my-plugin
```

---

## Q14. What command reloads installed plugins?

**Answer:**

```text
/reload-plugins
```

---

# 28. Scenario-Based Certification Questions

### Scenario 1

You have built several Skills and Hooks that work well in your project. Five developers need the same setup.

What should you do?

**Answer:**

Package the setup as a **Plugin** rather than copying `.claude` files manually.

---

### Scenario 2

You want your entire organization to discover and install your internal plugins.

What should you create?

**Answer:**

A **private Plugin Marketplace**.

---

### Scenario 3

You add a marketplace but don't want to install every plugin.

Is that possible?

**Answer:**

Yes.

Adding the marketplace only makes its catalog available. Install individual plugins as needed.

---

### Scenario 4

You install a community plugin because its Skill looks useful.

What else should you inspect?

**Answer:**

Check:

```text
Hooks
Agents
MCP servers
Settings
Other executable components
```

because these may execute with your privileges.

---

### Scenario 5

Your project already has a `PreToolUse` hook. A plugin also provides a `PreToolUse` hook.

What happens?

**Answer:**

Both hooks can run. The plugin hook does not simply replace your existing hook.

---

### Scenario 6

Two plugins both contain a `review-code` Skill.

How does Claude avoid a naming conflict?

**Answer:**

Plugin skills are namespaced.

For example:

```text
/plugin-a:review-code
/plugin-b:review-code
```

---

### Scenario 7

Your team has a plugin version `1.0.0`. You improve its security hooks and want controlled updates.

What should you use?

**Answer:**

Version the plugin and distribute the new version through your marketplace.

---

# 29. Common Certification Traps

### Trap 1

> "A plugin is just a Skill."

**Wrong.**

A plugin can contain Skills, Agents, Hooks, MCP servers, and other components.

---

### Trap 2

> "Marketplace = Plugin."

**Wrong.**

Marketplace is the catalog; Plugin is the installable extension.

---

### Trap 3

> "Adding a marketplace installs all plugins."

**Wrong.**

You must explicitly install individual plugins.

---

### Trap 4

> "A plugin only contains Markdown."

**Wrong.**

Plugins can contain executable hooks, MCP servers, agents, and other executable components.

---

### Trap 5

> "Installing a plugin replaces my project's hooks."

**Wrong.**

Plugin components run alongside your existing components.

---

### Trap 6

> "A reviewed plugin is automatically safe."

**Wrong.**

Review is not the same as trust. Inspect the plugin and trust its source.

---

### Trap 7

> "The plugin manifest must contain every possible configuration."

**Wrong.**

The manifest is optional and primarily provides plugin metadata such as name, version, description, and author.

---

# 30. Easy Memory Trick

Remember:

```text
PLUGIN
= PACKAGE
```

And:

```text
Skill
→ Procedure

Agent
→ Specialized Claude

Hook
→ Enforcement

MCP
→ External capability

Plugin
→ Package them together
```

For distribution:

```text
Plugin
   ↓
Marketplace
   ↓
Team
```

For security:

```text
Plugin
   ↓
READ FIRST
   ↓
Hooks
Agents
MCP
Settings
   ↓
THEN INSTALL
```

---

# 31. One-Minute Certification Cheat Sheet

```text
PLUGIN
→ Installable package
→ Share Claude Code setup
→ Version and distribute

CAN CONTAIN
→ Skills
→ Agents
→ Hooks
→ MCP servers
→ LSP servers
→ Monitors
→ Executables
→ Limited settings

STANDALONE .claude/
→ Personal/project-specific
→ Quick experiments
→ Local customization

PLUGIN
→ Team/community sharing
→ Versioning
→ Reuse across projects
→ Marketplace distribution

NAMESPACE
→ /plugin-name:skill-name
→ Prevents conflicts

MARKETPLACE
→ Catalog of plugins
→ Add marketplace first
→ Install plugins individually

SECURITY
→ Plugins can execute code
→ Hooks run with your privileges
→ MCP may communicate externally
→ Inspect before installing
→ Reviewed ≠ automatically trusted

HOOKS
→ Plugin hooks run alongside your hooks
→ They don't simply replace yours

MANIFEST
→ .claude-plugin/plugin.json
→ Optional
→ name
→ version
→ description
→ author

LOCAL TESTING
→ claude --plugin-dir ./my-plugin

RELOAD
→ /reload-plugins
```

---

# 32. Final Certification Takeaway

The most important idea from this lesson is:

> **When you have built a Claude Code setup that you trust, a Plugin lets you package that setup into one versioned, installable unit that can be shared with your team.** ([Claude Academy][1])

The complete journey is:

```text
Build
  ↓
CLAUDE.md
  ↓
Skills
  ↓
Hooks
  ↓
Permission controls
  ↓
Automation
  ↓
Verification
  ↓
Trusted setup
  ↓
PLUGIN
  ↓
MARKETPLACE
  ↓
TEAM
```

### Certification sentence to remember

> **A Plugin packages reusable Claude Code capabilities such as Skills, Agents, Hooks, and MCP configuration for installation, versioning, and distribution; a Marketplace provides the catalog through which those plugins can be discovered and installed.** ([Claude Academy][1])

---

## Official Sources

[Claude Academy — Plugins](https://academy.claude.com/courses/claude-code-in-action/plugins) ([Claude Academy][1])

[Claude Code — Create Plugins](https://code.claude.com/docs/en/plugins) ([Claude][2])

[Claude Code — Discover and Install Plugins](https://code.claude.com/docs/en/discover-plugins) ([Claude][3])

[1]: https://academy.claude.com/courses/claude-code-in-action/plugins "Plugins · Claude Code in Action · Claude Academy"
[2]: https://code.claude.com/docs/en/plugins?utm_source=chatgpt.com "Create plugins - Claude Code Docs"
[3]: https://code.claude.com/docs/en/discover-plugins?utm_source=chatgpt.com "Discover and install prebuilt plugins through marketplaces - Claude Code Docs"
[4]: https://anthropic.skilljar.com/claude-code-in-action?utm_source=chatgpt.com "Claude Code in Action"
