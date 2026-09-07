# CCA-F Exam Preparation

## Lesson 3: The 4D Framework

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 3 of 14
**Lesson duration:** ~45 minutes

---

# 1. What will you learn?

By the end of this lesson, you should be able to explain the four core competencies of the AI Fluency Framework:

1. **Delegation**
2. **Description**
3. **Discernment**
4. **Diligence**

These are collectively called the **4Ds**.

The key idea is that the four competencies work **together** across different ways of engaging with AI.

---

# 2. AI Fluency — Quick Reminder

AI Fluency means interacting with AI systems in ways that are:

* **Effective**
* **Efficient**
* **Ethical**
* **Safe**

The 4D Framework provides the practical competencies needed to achieve this.

### Remember

> **AI Fluency = Effective + Efficient + Ethical + Safe**

---

# 3. The 4Ds

The four competencies are:

| 4D              | What it means                                 |
| --------------- | --------------------------------------------- |
| **Delegation**  | Deciding what work to do with AI vs. yourself |
| **Description** | Communicating effectively with AI systems     |
| **Discernment** | Evaluating AI outputs critically              |
| **Diligence**   | Ensuring responsible AI collaboration         |

---

# 4. Delegation

## Definition

**Delegation** means thoughtfully deciding:

> **What work should I do with AI, and what should I do myself?**

This is not simply about giving AI as much work as possible.

You need to make a deliberate decision about the appropriate role of AI.

### Developer Example

You are developing a Next.js application.

You could ask Claude to:

* Generate boilerplate code
* Create unit tests
* Explain an unfamiliar library
* Suggest architecture alternatives
* Analyze a large log file

But you should decide what parts require your own expertise and judgment.

### Architect Question

Before delegating a task, ask:

```text
Is this task appropriate for AI?

What should remain under human control?

What are the consequences if AI gets it wrong?
```

### Key Point

> **Delegation = deciding what to give to AI and what to keep for yourself.**

---

# 5. Description

## Definition

**Description** means communicating clearly with AI systems.

AI needs sufficient information about what you want it to accomplish.

A good description can include:

* Goal
* Context
* Requirements
* Constraints
* Desired outcome
* Success criteria

### Poor Description

```text
Create an authentication system.
```

### Better Description

```text
Design an authentication architecture for a
Next.js application using OAuth/OIDC.

Requirements:
- Enterprise SSO
- Token expiration handling
- Secure token storage
- Role-based access
- Audit logging

Explain the architecture and identify security risks.
```

The second description gives AI much more useful context.

### Key Point

> **Description = communicating effectively with AI.**

---

# 6. Discernment

## Definition

**Discernment** means critically evaluating AI outputs and behavior.

Never assume that an AI response is correct simply because it looks convincing.

You should ask:

* Is the information correct?
* Is the code correct?
* Does it satisfy the requirements?
* Are there missing details?
* Are there security concerns?
* Are there unsupported assumptions?
* Is the output appropriate for the context?

### Developer Example

Claude generates an API implementation.

The code:

* Compiles successfully
* Passes basic tests
* Looks professionally written

But you discover that it does not properly validate authorization.

The developer must identify the problem.

That is **Discernment**.

### Key Point

> **Discernment = critically evaluating AI output.**

---

# 7. Diligence

## Definition

**Diligence** means ensuring that your collaboration with AI is responsible.

This includes considering your responsibilities when using AI and when putting AI-assisted work into the world.

Questions include:

* Is AI being used responsibly?
* Do I need to disclose AI assistance?
* Are there ethical concerns?
* Have I verified the work?
* Am I taking responsibility for the final result?

### Important Principle

> **AI-generated work does not eliminate human responsibility.**

If Claude generates production code, the developer remains responsible for ensuring that the final code is appropriate.

### Key Point

> **Diligence = responsible AI collaboration.**

---

# 8. The 4Ds Work Together

The 4Ds should not be considered isolated skills.

They work together.

For example, when building an application:

### Delegation

Decide which part of the work AI should handle.

↓

### Description

Explain the task, requirements, context, and constraints.

↓

### AI produces output

↓

### Discernment

Evaluate whether the output is correct and useful.

↓

### Diligence

Make sure the collaboration and final result are responsible.

---

# 9. Three Ways of Working With AI

The lesson also reinforces the three primary ways we engage with AI:

### 1. Automation

AI executes specific tasks based on your instructions.

**Example:**

```text
Convert this JSON into TypeScript interfaces.
```

---

### 2. Augmentation

You and AI collaborate as creative-thinking and task-execution partners.

**Example:**

```text
Let's compare Redux, Zustand, and Context
for our application and evaluate the trade-offs.
```

You and AI work through the problem together.

---

### 3. Agency

You guide AI to work independently on your behalf.

Instead of specifying every individual action, you establish the AI's knowledge and behavior.

**Example:**

An AI coding agent has:

* Repository context
* Coding standards
* Architecture rules
* Testing requirements

and independently works through an assigned development task.

These three modes are explicitly identified in the lesson.

---

# 10. Important Relationship

The **4Ds apply across all three ways of working with AI**:

```text
                 AI Fluency
                     |
        +------------+------------+
        |            |            |
   Automation   Augmentation   Agency
        |            |            |
        +------------+------------+
                     |
                    4Ds
                     |
       +------+------+------+------+
       |             |      |      |
  Delegation   Description Discernment Diligence
```

The 4Ds are therefore **not limited to chat-based AI use**.

They apply whether AI is:

* Performing a simple task
* Collaborating with you
* Operating more independently

---

# 11. Communication Project Example

The official lesson provides a marketing communication example.

Suppose you are using AI to draft emails for a marketing campaign.

### Delegation

Decide:

> Which parts should AI handle and which parts should I handle myself?

For example:

AI:

* Draft variations
* Suggest subject lines

Human:

* Final campaign strategy
* Final approval

### Description

Tell AI:

* Campaign purpose
* Target audience
* Desired tone
* Success criteria

### Discernment

Evaluate:

* Is the messaging appropriate?
* Is the tone correct?
* Does it meet campaign objectives?

### Diligence

Consider:

* Transparency
* Responsibility
* Appropriate use of AI

This demonstrates how all four competencies work together.

---

# 12. Research Project Example

Suppose AI is helping analyze a large dataset for a research paper.

### Delegation

Decide which analytical tasks AI should perform.

### Description

Provide AI with:

* Research question
* Dataset context
* Analytical requirements
* Relevant constraints

### Discernment

Verify the AI's analysis.

Do not simply accept its conclusions.

### Diligence

Consider the ethical implications of publishing AI-assisted research.

This is especially important when AI-generated analysis influences real-world conclusions.

---

# 13. Creative Project Example

Suppose you are developing character concepts for a story.

### Delegation

Decide which creative elements to explore with AI.

### Description

Explain:

* Story world
* Character requirements
* Style
* Narrative constraints

### Discernment

Decide which AI suggestions should be:

* Kept
* Modified
* Rejected

### Diligence

Consider how AI's contribution should be acknowledged.

Again, all four Ds participate in the workflow.

---

# 14. Developer/Architect Example

Let's apply the 4Ds to a real software architecture task.

## Problem

Your company wants to migrate an Angular application to a modern architecture.

### Delegation

Ask:

> Which parts of the migration analysis should Claude help with?

Possible AI tasks:

* Analyze existing dependencies
* Identify deprecated APIs
* Suggest migration strategies
* Generate migration checklists

Human responsibilities:

* Business-critical architecture decisions
* Security decisions
* Final technology selection

---

### Description

Give Claude:

```text
Current application:
- Angular 12
- RxJS
- NgRx
- REST APIs
- Enterprise SSO

Target:
- Modern Angular
- Standalone components
- Updated build system

Constraints:
- No major functional changes
- Existing backend must remain compatible
- Security requirements must not change
```

---

### Discernment

Evaluate Claude's recommendations.

Ask:

* Is the migration technically correct?
* Are there breaking changes?
* Are dependencies compatible?
* Are security assumptions valid?
* Could the migration introduce regressions?

---

### Diligence

Before implementation:

* Verify recommendations
* Test the migration
* Review security implications
* Document AI's role where appropriate
* Take responsibility for the final architecture

---

# 15. CCA-F Exam Focus

## Must Remember #1

The four competencies are:

> **Delegation, Description, Discernment, Diligence**

---

## Must Remember #2

Their basic meanings:

```text
Delegation
What should AI do?

Description
How do I communicate what I need?

Discernment
Is the AI output good/correct?

Diligence
Am I using AI responsibly?
```

---

# 16. Important Difference: Description vs Discernment

This is an easy exam area to confuse.

### Description

Happens primarily **before/during AI generation**.

You communicate:

> "This is what I need."

### Discernment

Happens when **evaluating the AI's response/behavior**.

You ask:

> "Is what AI produced actually good enough?"

### Memory Trick

```text
DESCRIPTION
      ↓
Tell AI

DISCERNMENT
      ↓
Judge AI
```

---

# 17. Important Difference: Delegation vs Diligence

These can also be confused.

### Delegation

Decision about **who/what does the work**.

> Should AI do this?

### Diligence

Responsibility for **how AI is used and the resulting work**.

> Am I using AI responsibly?

### Memory Trick

```text
Delegation → Decide
Diligence  → Responsible
```

---

# 18. Exam Questions

## Q1. What are the four core competencies of AI Fluency?

**Answer:**

* Delegation
* Description
* Discernment
* Diligence

---

## Q2. What does Delegation mean?

A. Writing better prompts
B. Evaluating AI output
C. Deciding what work to do with AI versus yourself
D. Testing AI models

**Answer: C**

---

## Q3. What does Description mean?

A. Communicating effectively with AI systems
B. Deciding whether AI should be used
C. Checking AI output
D. Taking responsibility for AI

**Answer: A**

---

## Q4. What does Discernment mean?

A. Giving AI more autonomy
B. Critically evaluating AI outputs and behavior
C. Writing prompts
D. Selecting an AI model

**Answer: B**

---

## Q5. What does Diligence mean?

A. Making AI faster
B. Ensuring responsible AI collaboration
C. Generating more output
D. Automating everything

**Answer: B**

---

# 19. Scenario Question

### Scenario

You ask Claude to generate a Spring Boot authentication service.

Claude produces code that compiles successfully.

Before using it, you review the implementation and discover that authorization checks are missing.

Which 4D competency is primarily being demonstrated?

A. Delegation
B. Description
C. Discernment
D. Diligence

### Answer

**C — Discernment**

Because you are critically evaluating the AI-generated output and identifying a problem.

---

# 20. Scenario Question

### Scenario

You decide that Claude should generate unit tests but that you will personally design the security architecture.

Which competency are you demonstrating?

A. Delegation
B. Description
C. Discernment
D. Diligence

### Answer

**A — Delegation**

You are deciding what work should be done with AI versus yourself.

---

# 21. Scenario Question

### Scenario

You provide Claude with:

* Business requirements
* Technical constraints
* Existing architecture
* Expected output
* Acceptance criteria

Which competency does this primarily demonstrate?

### Answer

**Description**

You are clearly communicating the context and requirements to the AI.

---

# 22. Scenario Question

### Scenario

Claude generates production code for your application. You test it, review security implications, verify its behavior, and take responsibility for the final implementation.

Which competency is most strongly represented?

### Answer

**Diligence**

---

# 23. Multiple-Choice Exam Challenge

### Question

Which statement is TRUE?

A. Discernment means deciding whether to use AI.

B. Delegation means verifying AI output.

C. Description means communicating effectively with AI.

D. Diligence means generating better prompts.

### Answer

**C — Description means communicating effectively with AI.**

---

# 24. Multiple-Choice Exam Challenge

### Question

Which statement best describes the relationship between the 4Ds and the three ways of engaging with AI?

A. The 4Ds only apply to Automation.

B. The 4Ds only apply to autonomous AI agents.

C. The 4Ds apply across Automation, Augmentation, and Agency.

D. The 4Ds are alternatives to Automation, Augmentation, and Agency.

### Answer

**C**

The lesson explicitly states that the four competencies apply across all three ways of working with AI.

---

# 25. CCA-F Quick Revision Sheet

## AI Fluency

**Effective + Efficient + Ethical + Safe**

---

## 4Ds

| D               | Remember                 |
| --------------- | ------------------------ |
| **Delegation**  | Decide what AI should do |
| **Description** | Communicate clearly      |
| **Discernment** | Critically evaluate      |
| **Diligence**   | Use AI responsibly       |

---

## Three AI Collaboration Modes

| Mode             | Simple meaning                             |
| ---------------- | ------------------------------------------ |
| **Automation**   | AI does a specific task                    |
| **Augmentation** | Human + AI collaborate                     |
| **Agency**       | AI works more independently on your behalf |

---

# 26. One-Minute Memory Trick

Remember this sentence:

> **"Decide → Describe → Discern → Do responsibly."**

```text
DELEGATION
     ↓
DECIDE

DESCRIPTION
     ↓
DESCRIBE

DISCERNMENT
     ↓
DISCERN

DILIGENCE
     ↓
DO RESPONSIBLY
```

---

# 27. Final CCA-F Takeaway

The **4D Framework is the foundation of AI Fluency**.

It gives you four capabilities for working effectively with AI:

> **Delegation** — Decide what AI should do.

> **Description** — Clearly communicate what you need.

> **Discernment** — Critically evaluate what AI produces.

> **Diligence** — Ensure the collaboration and resulting work are responsible.

The important exam concept is that these four competencies **work together** and apply across **Automation, Augmentation, and Agency**.

### Remember:

**4Ds = Decide → Describe → Discern → Do responsibly**
