# Model Context Protocol (MCP) — Introduction

## 1. What is MCP?

**Model Context Protocol (MCP)** is a standard way for AI applications to connect to external tools, data, and context.

Without MCP, an AI application may need a separate integration for every external system:

```text
Claude → GitHub API
Claude → Jira API
Claude → MongoDB
Claude → Slack API
```

MCP provides a common protocol:

```text
                    MCP
                     |
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       GitHub      Database    Slack
```

### Key idea

> MCP provides a common interface through which AI applications can discover and use external tools, resources, and prompts.

---

# 2. Why MCP was created

Imagine building an AI coding assistant that needs access to:

- Files
- GitHub
- MongoDB
- Jira
- Slack
- Kubernetes
- Internal company APIs

Without a standard, every integration has its own implementation.

MCP standardizes the communication pattern:

```text
AI Application
      |
      v
     MCP
      |
 ┌────┼─────┬─────┐
 ↓    ↓     ↓     ↓
GitHub Jira Mongo Slack
```

This makes it easier to build an ecosystem of reusable AI integrations.

---

# 3. MCP Architecture

The most important architecture to remember is:

```text
                 AI Application / HOST
                 ┌────────────────────┐
                 │     Claude Code    │
                 └─────────┬──────────┘
                           │
                      MCP CLIENT
                           │
                      MCP PROTOCOL
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
          MCP SERVER A          MCP SERVER B
                │                     │
             GitHub               Database
```

There are three important concepts.

## Host

The **host** is the AI application that uses MCP.

Examples:

- Claude Code
- Claude Desktop
- Other AI applications

## MCP Client

The MCP client is the component inside the host that communicates with MCP servers.

## MCP Server

An MCP server exposes capabilities and information to the MCP client.

### Exam shortcut

Remember:

```text
Host → Client → MCP Server
```

---

# 4. MCP Server Does Not Mean Your Normal Backend Server

An MCP server and an application's backend server have different purposes.

A normal CycleConnect architecture could be:

```text
Next.js
   |
   v
Node.js API
   |
   v
MongoDB
```

An AI-facing architecture could be:

```text
Claude Code
     |
     v
CycleConnect MCP Server
     |
     v
CycleConnect API
     |
     v
MongoDB
```

The MCP server is an **AI-facing interface**.

It does not necessarily replace your normal application API.

---

# 5. MCP Tools

An MCP server can expose **tools**.

A tool is an action that the AI can invoke.

For CycleConnect:

```text
createRide()
getRide()
searchRiders()
createClub()
sendMessage()
```

Example:

```json
{
  "source": "Pune",
  "destination": "Lonavala",
  "date": "2026-10-10",
  "maxRiders": 10
}
```

Claude can determine that it needs to create a ride and invoke the appropriate tool.

### Mental model

> **Tool = DO something**

Examples:

```text
createRide
deleteRide
queryDatabase
createIssue
sendMessage
```

---

# 6. MCP Resources

A **resource** provides information or context to the AI.

Examples:

```text
ride://12345
user://987
club://cycling-pune
```

CycleConnect could expose:

```text
cycleconnect://architecture
cycleconnect://api-schema
cycleconnect://database-schema
cycleconnect://coding-guidelines
```

### Mental model

> **Resource = READ / provide information**

---

# 7. MCP Prompts

MCP can also expose reusable **prompts**.

For example:

```text
review-cycleconnect-code
review-api
review-security
generate-test-plan
```

A reusable prompt can define a consistent procedure.

For example, a code-review prompt could require:

1. Security review
2. Performance review
3. Accessibility review
4. TypeScript quality
5. Architecture review
6. Testing review

### Mental model

> **Prompt = reusable instruction**

---

# 8. The Three Core MCP Capabilities

This is worth memorizing:

```text
MCP Server
   |
   ├── Tools       → DO things
   |
   ├── Resources   → PROVIDE information/context
   |
   └── Prompts     → PROVIDE reusable instructions
```

Shortcut:

```text
Tools     = Action
Resources = Data / Context
Prompts   = Instructions
```

---

# 9. MCP Is About Context, Not Just Tools

The name is:

> **Model Context Protocol**

The goal is broader than simply allowing an AI to call functions.

For example, while fixing a CycleConnect authentication issue, Claude may need:

```text
CLAUDE.md
+
source code
+
database schema
+
GitHub issues
+
API documentation
+
deployment information
```

MCP provides a standardized way for external context and capabilities to become available to the AI application.

---

# 10. Practical CycleConnect Example

Suppose CycleConnect contains:

```text
CycleConnect
│
├── Web
│   └── Next.js
│
├── Mobile
│   └── React Native
│
├── API
│   └── Node.js
│
├── Database
│   └── MongoDB
│
└── MCP
    └── CycleConnect MCP Server
```

The MCP server could expose:

## Resources

```text
cycleconnect://architecture
cycleconnect://api-schema
cycleconnect://database-schema
cycleconnect://coding-guidelines
```

## Tools

```text
getRide()
createRide()
searchRiders()
getClub()
createClub()
```

## Prompts

```text
review-feature
review-api
review-security
generate-test-plan
```

Claude Code could then interact with CycleConnect using standardized MCP interfaces.

---

# 11. MCP and Claude Code

For Claude Code, the architecture can look like:

```text
                    Claude Code
                         |
                    MCP Client
                         |
        ┌────────────────┼─────────────────┐
        │                │                 │
        ▼                ▼                 ▼
   GitHub MCP      CycleConnect       Database MCP
      Server         MCP Server           Server
        │                │                 │
     GitHub          CycleConnect        MongoDB
                       APIs
```

This enables more advanced workflows.

For example:

> Find the open authentication issue, inspect the relevant code, check the API specification, implement the fix, run tests, and create a PR.

This is an example of an AI agent working across multiple systems.

---

# 12. MCP vs REST API

MCP does **not** replace REST APIs.

### REST

Primarily used for application-to-application communication:

```text
Frontend
   ↓
REST API
   ↓
Backend
   ↓
Database
```

### MCP

Designed to standardize how AI applications access tools and context:

```text
Claude
   ↓
MCP
   ↓
Tools / Resources / Prompts
```

An MCP server can actually call an existing REST API:

```text
Claude
  ↓
MCP
  ↓
CycleConnect MCP Server
  ↓
REST API
  ↓
MongoDB
```

So MCP can sit above or alongside your existing application architecture.

---

# 13. MCP vs Function Calling

Traditional function calling can look like:

```text
LLM
 ↓
Application-defined function
 ↓
API
```

The application defines and manages the functions.

MCP standardizes a broader ecosystem for AI applications to discover and interact with external capabilities.

Conceptually:

```text
Function Calling
       ↓
Model → Application action

MCP
       ↓
AI Application
       ↓
Standardized external capabilities
       ↓
Tools + Resources + Prompts
```

---

# 14. Architect-Level Understanding

For the Claude Code Architect Foundation exam, focus on the architecture rather than only memorizing implementation commands.

You should be able to answer:

### What problem does MCP solve?

It standardizes communication between AI applications and external tools, data, and context.

### What is an MCP host?

The AI application that hosts MCP clients.

Example:

```text
Claude Code
```

### What is an MCP client?

The component that communicates with MCP servers.

### What is an MCP server?

A server that exposes capabilities and information to MCP clients.

### What can an MCP server expose?

```text
Tools
Resources
Prompts
```

### Does MCP replace REST?

No. MCP can work alongside existing APIs and can call them internally.

---

# 15. Architecture to Memorize

```text
                  USER
                    │
                    ▼
              ┌───────────┐
              │ AI HOST   │
              │ Claude    │
              │ Code      │
              └─────┬─────┘
                    │
              MCP CLIENT
                    │
             MCP PROTOCOL
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
  MCP SERVER A            MCP SERVER B
        │                       │
   ┌────┼────┐             ┌────┼────┐
   │    │    │             │    │    │
 Tools Resources Prompts   Tools Resources
        │                       │
        ▼                       ▼
     GitHub                  CycleConnect
                              API / DB
```

### Core sequence

> **Host → Client → Protocol → Server → Tools / Resources / Prompts**

---

# 16. CycleConnect Learning Strategy

For your Claude Code Architect Foundation preparation, each lesson should connect theory to the CycleConnect project.

Use this learning cycle:

```text
MCP Concept
     ↓
Understand the theory
     ↓
Architecture diagram
     ↓
CycleConnect example
     ↓
Claude Code implementation
     ↓
Exam-style questions
     ↓
Architect/interview questions
```

This turns the course from passive learning into a practical architecture lab.

---

# Exam Quick Notes

| Concept | Remember |
|---|---|
| MCP | Standard protocol for AI ↔ external capabilities/context |
| Host | AI application |
| Client | Communicates with MCP servers |
| Server | Exposes capabilities/context |
| Tool | Performs an action |
| Resource | Provides information/context |
| Prompt | Reusable instruction |
| REST | Application API; not replaced by MCP |
| MCP Server | AI-facing interface |
| Claude Code | Can act as an MCP host/client |

## One-line memory aid

> **MCP connects AI applications to external context and capabilities through a standardized protocol.**

---

## Suggested next step

For every future Anthropic/Claude Code lesson you provide, we will use the same pattern:

**Lesson → Simple Explanation → Architecture → CycleConnect Example → Claude Code Application → Exam Notes → Exam Questions → Markdown Study File**

This will gradually build a complete **Claude Code Architect Foundation study repository**.
