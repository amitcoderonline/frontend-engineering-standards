# Claude Code Commands Reference

Slash commands control the Claude Code session itself — they're different from a normal prompt. Type `/` in any session to see the full, current list; it changes across versions, so treat this as a working reference rather than the final word. `/help` is always the authoritative source for what's installed on your version.

## Getting started

| Command | What it does |
|---|---|
| `/init` | Generates a starting `CLAUDE.md` for your project — Claude scans the repo and writes a first pass at project context (stack, structure, conventions). Run this once when you start using Claude Code on a project, then edit the file by hand as things settle. |
| `/login` / `/logout` | Switch between Anthropic accounts. |
| `/doctor` | Checks your Claude Code installation and reports problems. Useful first step if something's misbehaving. |
| `/bug` | Reports a bug straight to Anthropic. |

## Session & context management

| Command | What it does |
|---|---|
| `/clear` | Wipes the conversation and starts fresh. Use this between unrelated tasks so old context doesn't bleed into the new one — one of the most-used commands day to day. |
| `/compact` | Summarizes the conversation so far instead of clearing it, freeing up context space while keeping the thread. You can steer what it keeps: `/compact preserve the API design decisions and open TODOs`. |
| `/memory` | Opens the active `CLAUDE.md` file(s) so you can view or edit what Claude has persisted about your project. |
| `/context` | Shows a breakdown of what's currently taking up context window space. |
| `/add-dir [path]` | Adds another directory to the session — useful when your frontend and backend live in separate folders and you need both in view. |

## Working with code

| Command | What it does |
|---|---|
| `/review` | Asks Claude to review the current code or your recent changes. |
| `/plan` | Switches to a read-only planning mode — Claude can look at files and propose an approach but won't edit or run anything until you approve it. Good default for anything non-trivial. |
| `/exit-plan-mode` | Leaves plan mode and lets Claude act on the plan you just approved. |
| `/rewind` | Undoes code changes from previous turns in the session. |

## Exporting & resuming

| Command | What it does |
|---|---|
| `/export` | Exports the full current conversation as plain text — either copied to your clipboard or saved to a file in your working directory. Handy for pasting a debugging session into a PR description, Slack, or your own notes. `/export my-session` skips the dialog and saves directly to `my-session.txt`. |
| `/resume` (also `/continue`) | Picks up an earlier session. Without a name it opens a picker of past sessions. |

## System & configuration

| Command | What it does |
|---|---|
| `/model` | Switches which Claude model the session uses. |
| `/permissions` | Sets allow/ask/deny rules for what Claude can do without asking each time. |
| `/mcp` | Manages connected MCP servers (external tools/data sources Claude can use). |
| `/skills` | Lists available skills — reusable playbooks Claude can invoke, either automatically or via their own slash command. |

## Custom commands

You can define your own. Drop a markdown file in:
- `.claude/commands/your-command.md` — project-scoped, shareable with your team via the repo
- `~/.claude/commands/your-command.md` — personal, available across all your projects

The filename becomes the command name. A file at `.claude/commands/security-check.md` becomes `/security-check`. This is worth doing for anything you find yourself typing out as a full prompt more than twice — a PR review checklist, a "check this against our conventions" prompt, a "write tests in our style" prompt.

The newer, recommended format is `.claude/skills/<name>/SKILL.md`, which does the same job as a command but Claude can also invoke it on its own when relevant, not just when you type `/name`.
