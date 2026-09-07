# CCA-F Exam Preparation

## Lesson 2: Why Do We Need AI Fluency?

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 2 of 14
**Duration:** ~7 minutes

---

# 1. What will you learn?

By the end of this lesson, you should understand:

* What **AI Fluency** means
* Why AI Fluency matters in today's rapidly changing technology landscape
* Three emerging ways humans collaborate with AI:

  * **Automation**
  * **Augmentation**
  * **Agency**

These three modes of AI collaboration are especially important for understanding how our relationship with AI is evolving.

---

# 2. Why do we need AI Fluency?

AI is rapidly becoming part of how people work, create, analyze information, and solve problems.

Simply knowing how to use an AI chatbot is not enough.

We need practical skills, knowledge, insights, and values that allow us to interact with AI systems:

* **Effectively**
* **Efficiently**
* **Ethically**
* **Safely**

This is what AI Fluency is about.

### Simple definition

> **AI Fluency is the ability to work with AI effectively, efficiently, ethically, and safely.**

---

# 3. AI Fluency is more than prompting

A common mistake is to think:

> "AI Fluency = knowing how to write good prompts."

Prompting is useful, but AI Fluency is broader.

It includes understanding:

* What to ask AI to do
* How to communicate your requirements
* How to work collaboratively with AI
* How to evaluate AI output
* How to use AI responsibly
* How much independence to give AI

This becomes increasingly important as AI systems become capable of doing more work independently.

---

# 4. Three Ways We Collaborate With AI

The lesson introduces three emerging ways of working with AI:

```text
Automation
     ↓
Augmentation
     ↓
Agency
```

These represent different levels/types of human-AI collaboration.

---

# 5. Automation

## What is Automation?

In **Automation**, AI completes a specific task based on your instructions.

You tell AI what to do, and AI performs that task.

### Simple example

You ask Claude:

```text
Convert this JSON data into a TypeScript interface.
```

Claude performs the specific task.

This is **Automation**.

### Developer examples

AI can automate:

* Generating boilerplate code
* Converting JSON to TypeScript types
* Creating unit-test templates
* Summarizing logs
* Generating documentation
* Converting SQL queries
* Creating basic test data

### Key idea

> **Automation = AI completes a specific task based on your instructions.**

---

# 6. Augmentation

## What is Augmentation?

In **Augmentation**, the human and AI work together as partners.

AI is not simply performing an isolated task.

Instead:

> **You and AI collaborate as creative-thinking and task-execution partners.**

The human contributes judgment, context, goals, and expertise.

AI contributes things such as:

* Ideas
* Analysis
* Alternatives
* Drafts
* Code
* Explanations
* Feedback

---

## Developer Example

Suppose you need to design an authentication architecture.

Instead of saying:

```text
Create authentication code.
```

you collaborate with Claude:

```text
Here is our existing architecture.

We use:
- Next.js
- Spring Boot
- OAuth/OIDC
- Enterprise SSO

Help me evaluate three authentication approaches.

For each approach:
1. Explain the architecture.
2. Identify security risks.
3. Explain scalability implications.
4. Recommend when it should be used.
```

You then discuss the results with Claude and refine the architecture.

This is **Augmentation**.

### Key idea

> **Augmentation = Human + AI collaborate as partners.**

---

# 7. Agency

## What is Agency?

**Agency** is different from simple task automation.

With Agency, you configure AI to work **independently on your behalf**.

Instead of giving AI only a single task, you establish:

* Its knowledge
* Its behavior
* Its goals
* The way it should operate

The AI can then work more independently.

### Simple example

Instead of:

```text
Review this pull request.
```

you configure an AI system to operate as a code-review agent with:

* Repository context
* Coding standards
* Security rules
* Architecture guidelines
* Review criteria

The AI can then independently review code according to those established patterns.

### Key idea

> **Agency = AI works independently on your behalf based on configured knowledge and behavior.**

---

# 8. Automation vs Augmentation vs Agency

This distinction is extremely important for the exam.

| Mode             | Human-AI Relationship                 | Example                                           |
| ---------------- | ------------------------------------- | ------------------------------------------------- |
| **Automation**   | AI performs a specific task           | Generate a TypeScript interface                   |
| **Augmentation** | Human + AI collaborate                | Discuss architecture alternatives                 |
| **Agency**       | AI works independently on your behalf | AI agent independently performs code-review tasks |

### Easy memory trick

```text
Automation
"Do this task."

Augmentation
"Let's work on this together."

Agency
"Work on this for me."
```

---

# 9. The progression

You can think about the three modes as increasing AI independence:

```text
AUTOMATION
     │
     │ AI performs a defined task
     ↓
AUGMENTATION
     │
     │ Human + AI collaborate
     ↓
AGENCY
     │
     │ AI operates independently
     ↓
Higher AI independence
```

**Important:** This does not mean Agency is always better than Automation.

The appropriate mode depends on:

* The task
* Risk
* Required human judgment
* Desired level of control
* Complexity
* Consequences of errors

---

# 10. Architect Example

Imagine you are building a Next.js application.

## Automation

You ask Claude:

```text
Create a React component for a user profile card.
```

AI creates the component.

**Mode:** Automation

---

## Augmentation

You ask Claude:

```text
We need to redesign our application's state management.

Compare Redux, Zustand, and React Context.

Consider:
- Application size
- Team experience
- Performance
- Testing
- Maintainability
```

You discuss the alternatives with Claude and make the final decision.

**Mode:** Augmentation

---

## Agency

You configure an AI coding agent with:

* Repository access
* Coding conventions
* Architecture rules
* Testing requirements
* Security guidelines

The agent independently works through assigned development tasks.

**Mode:** Agency

---

# 11. Why this matters for Architects

For an architect, understanding these modes is important because AI can participate at different levels of the software-development lifecycle.

### Automation

Useful for repetitive work.

### Augmentation

Useful for:

* Architecture discussions
* Design exploration
* Code reviews
* Problem solving
* Brainstorming

### Agency

Useful when AI needs to operate more independently, such as:

* Autonomous coding tasks
* Multi-step workflows
* Repository analysis
* Automated code review
* Agent-based development workflows

But greater independence also means you need to think carefully about **control, verification, safety, and responsibility**.

---

# 12. Connection to the 4Ds

Remember the previous lesson's **4D Framework**:

1. Delegation
2. Description
3. Discernment
4. Diligence

The three collaboration modes affect how you apply these competencies.

For example:

### Automation

You need to clearly describe the task and verify the result.

### Augmentation

You need to continuously collaborate and exercise judgment.

### Agency

You need to carefully establish the AI's knowledge and behavior and ensure appropriate oversight.

---

# 13. Important CCA-F Exam Concepts

## AI Fluency

Remember:

> AI Fluency involves practical skills, knowledge, insights, and values that help people interact with AI effectively, efficiently, ethically, and safely.

---

## Automation

Remember:

> AI completes specific tasks based on your instructions.

---

## Augmentation

Remember:

> Human and AI collaborate as creative-thinking and task-execution partners.

---

## Agency

Remember:

> AI is configured to work independently on your behalf by establishing its knowledge and behavior patterns.

---

# 14. Common Exam Trap

### Question

AI generates a complete feature after receiving a detailed instruction.

Is this automatically **Agency**?

**No.**

The fact that AI generates a lot of output does not make it Agency.

Ask:

> **How is the AI being used?**

If AI is simply completing a defined task based on an instruction, it is **Automation**.

Agency involves configuring AI to operate independently on your behalf.

---

# 15. Another Exam Trap

### Question

You and Claude discuss several architecture options, compare trade-offs, and refine the design together.

Which mode is this?

**Answer: Augmentation**

Why?

Because the human and AI are collaborating as partners rather than AI simply completing one isolated task.

---

# 16. Exam Questions

## Q1. What are the three emerging ways people collaborate with AI?

**Answer:**

1. Automation
2. Augmentation
3. Agency

---

## Q2. What is Automation?

**Answer:**

Automation is when AI completes specific tasks based on your instructions.

---

## Q3. What is Augmentation?

**Answer:**

Augmentation is when humans and AI collaborate as creative-thinking and task-execution partners.

---

## Q4. What is Agency?

**Answer:**

Agency is when AI is configured to work independently on your behalf by establishing its knowledge and behavior patterns.

---

## Q5. Which mode involves human and AI working together as partners?

A. Automation
B. Augmentation
C. Agency
D. Delegation

**Answer: B — Augmentation**

---

## Q6. You ask Claude to summarize 1,000 lines of application logs. Which collaboration mode is this?

A. Automation
B. Augmentation
C. Agency
D. Diligence

**Answer: A — Automation**

---

## Q7. You ask Claude to help you compare three database architectures and discuss the trade-offs with you. Which mode is this?

A. Automation
B. Augmentation
C. Agency
D. Description

**Answer: B — Augmentation**

---

## Q8. You configure an AI agent with repository knowledge, coding standards, and behavioral rules so that it can independently work on assigned tasks. Which mode best describes this?

A. Automation
B. Augmentation
C. Agency
D. Description

**Answer: C — Agency**

---

## Q9. Which statement about Agency is correct?

A. AI only performs a single predefined task
B. Human and AI must always make every decision together
C. AI is configured to work independently on behalf of the user
D. Agency means writing longer prompts

**Answer: C**

---

# 17. Scenario-Based Question

### Scenario

You are an architect working on a large Next.js application.

You give Claude access to your project context, coding standards, architecture guidelines, and testing requirements. You configure Claude to independently identify issues, make appropriate code changes, run tests, and report the results.

Which AI collaboration mode best describes this?

### Answer

**Agency**

### Why?

The AI has been configured with knowledge and behavior patterns and is operating more independently on your behalf.

---

# 18. Quick Revision

### AI Fluency

```text
Effective
Efficient
Ethical
Safe
```

### Three Collaboration Modes

```text
Automation
    ↓
AI performs a specific task

Augmentation
    ↓
Human + AI collaborate

Agency
    ↓
AI works independently on your behalf
```

### Remember

> **Automation = Do it.**

> **Augmentation = Do it with me.**

> **Agency = Do it for me.**

---

# 19. CCA-F Final Takeaway

AI Fluency is increasingly important because AI is moving beyond simple question-and-answer interactions.

AI can:

1. **Perform specific tasks** → Automation
2. **Collaborate with humans** → Augmentation
3. **Operate more independently** → Agency

As AI becomes more capable and autonomous, humans need stronger AI Fluency to determine **how AI should be used, how much independence to give it, and how to collaborate with it responsibly.**
