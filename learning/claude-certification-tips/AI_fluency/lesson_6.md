# CCA-F Exam Preparation

## Lesson 6: A Closer Look at Delegation

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 6 of 14
**Duration:** ~20 minutes

---

# 1. Learning Objectives

By the end of this lesson, you should be able to:

* Understand the **Delegation** competency.
* Understand its three components:

  * **Problem Awareness**
  * **Platform Awareness**
  * **Task Delegation**
* Recognize when and how to delegate tasks to AI effectively.
* Consider the **task, platform, and mode** when working with AI.
* Create an effective human-AI partnership.

---

# 2. What is Delegation?

Delegation is the first core competency of the AI Fluency Framework.

It is about making thoughtful decisions about:

* What work should **you** do?
* What work should you do **together with AI**?
* What work can AI handle **independently**?
* How should the overall work be divided between you and AI?

The goal is **not** to automate everything.

The goal is:

> **Create the most effective human-AI partnership for a particular task or goal.**

---

# 3. The Three Components of Delegation

Delegation consists of three important components:

```text
             DELEGATION
                  |
       +----------+----------+
       |          |          |
    Problem    Platform     Task
    Awareness  Awareness   Delegation
```

## 1. Problem Awareness

Understand the problem, goal, and work involved.

## 2. Platform Awareness

Understand what different AI systems can and cannot do.

## 3. Task Delegation

Strategically divide the work between humans and AI.

These three components work together.

---

# 4. Problem Awareness

## What is Problem Awareness?

Before asking AI to do something, first understand:

> **What problem am I actually trying to solve?**

You should have a clear understanding of:

* Your overall goal
* What a successful result looks like
* The work required to reach that goal
* Which parts require human expertise
* Which parts may benefit from AI

---

# 5. Why Problem Awareness Comes First

A common mistake is:

```text
I have Claude
    ↓
What can I ask Claude to do?
```

Instead, think:

```text
What problem am I solving?
        ↓
What does success look like?
        ↓
What work is required?
        ↓
Where can AI help?
```

This is a major mindset shift.

> **Do not start with the AI tool. Start with the problem.**

---

# 6. Example — Software Architecture

Suppose your team wants to modernize an old application.

A weak approach is:

```text
Ask Claude:
"How do I migrate my application?"
```

A better approach begins with Problem Awareness.

First identify:

### Goal

Modernize the application while maintaining existing functionality.

### Constraints

* Existing backend must continue working.
* No major downtime.
* Security requirements must remain unchanged.
* Migration should be incremental.

### Success

* Application works on the target architecture.
* Existing functionality remains intact.
* Tests pass.
* Security requirements are satisfied.

Only after understanding these should you determine how AI can help.

---

# 7. Problem Awareness and Human Expertise

Problem Awareness requires **domain understanding**.

AI can help you explore a problem, but you should not blindly rely on AI to define what the problem actually is.

For example, an architect should understand:

* Business requirements
* Technical constraints
* Security requirements
* Operational requirements
* Team capabilities
* Architecture standards

AI can assist with analysis, but the human brings important context and expertise.

---

# 8. Platform Awareness

## What is Platform Awareness?

Platform Awareness means:

> **Understanding the capabilities and limitations of the AI systems available to you.**

Different AI systems can have different:

* Capabilities
* Interfaces
* Context limits
* Tool access
* Strengths
* Weaknesses
* Levels of autonomy

Therefore, delegation should consider **which AI platform is appropriate for the task**.

---

# 9. Why Platform Awareness Matters

Imagine you need to analyze a large software repository.

You could use:

* A basic chatbot
* A coding assistant
* An AI agent with repository access
* An AI system with external tools

These systems may support different workflows.

Therefore:

```text
Task
 ↓
Understand requirements
 ↓
Understand available AI platforms
 ↓
Choose appropriate platform
```

---

# 10. Platform Awareness Example

Suppose you want to:

> "Explain this TypeScript function."

A conversational AI system may be perfectly suitable.

But suppose you want:

> "Analyze this entire repository, modify several files, run tests, and fix failures."

You may need a more capable coding/agent environment with access to:

* Repository
* Files
* Terminal
* Tests
* Development tools

### Key Point

> **Choose the AI platform based on the task.**

---

# 11. Platform Awareness Is Not Just Model Selection

Platform Awareness is broader than asking:

> "Which model is better?"

You should consider the complete environment.

For example:

```text
AI model
+
Context available
+
Tools
+
File access
+
Repository access
+
Autonomy
+
Constraints
```

All of these affect what the AI can effectively accomplish.

---

# 12. Task Delegation

## What is Task Delegation?

Once you understand:

1. The problem
2. Your goal
3. The available AI platforms

you can decide:

> **How should the work be divided between the human and AI?**

This is Task Delegation.

---

# 13. Task Delegation Is Not "Give Everything to AI"

The goal is not:

```text
Human
   ↓
Give everything to AI
   ↓
AI does everything
```

Instead:

```text
Human strengths
      +
AI strengths
      ↓
Effective division of work
```

The human may handle:

* Goals
* Important decisions
* Domain judgment
* Ethical decisions
* Final approval

AI may handle:

* Repetitive tasks
* Drafting
* Analysis
* Generating alternatives
* Large-scale processing
* Code generation

---

# 14. Example — Building a Web Application

Suppose you're building a Next.js application.

### Human

You decide:

* Product requirements
* Business priorities
* Security architecture
* Technology strategy
* Final design decisions

### AI

Claude could help:

* Generate boilerplate
* Create components
* Generate tests
* Analyze errors
* Suggest alternatives
* Create documentation

### Shared

Human + AI could collaborate on:

* Architecture alternatives
* API design
* Performance strategies
* Refactoring approaches
* Debugging

This is thoughtful Task Delegation.

---

# 15. Delegation Depends on Expertise

The lesson emphasizes that effective Delegation requires two kinds of awareness:

```text
Domain Expertise
       +
AI Capability Knowledge
       ↓
Effective Delegation
```

You need to understand the work **and** understand what AI can do.

### Example

A security architect who understands OAuth but does not understand AI limitations may delegate poorly.

Likewise, someone who understands AI tools but doesn't understand authentication may not know which security decisions should remain human-controlled.

Effective delegation requires both.

---

# 16. The Goal Is Not Maximum Automation

This is one of the most important exam concepts.

> **The goal of Delegation is NOT to automate everything.**

Instead:

> **The goal is to create the most effective human-AI partnership for the specific task or goal.**

Sometimes the best decision is:

### No AI

The task is too sensitive or requires human judgment.

Sometimes:

### Human + AI

AI helps with analysis while the human makes decisions.

Sometimes:

### AI handles the task

The task is well-defined, low-risk, and suitable for AI.

---

# 17. Three Possible Approaches

You can think about delegation as:

```text
        TASK
         |
    +----+----+
    |    |    |
 Human  Both  AI
```

### Human

You do the work yourself.

### Both

You and AI collaborate.

### AI

AI handles the task independently.

The correct choice depends on the task and context.

---

# 18. A Practical Delegation Process

Use this sequence:

```text
1. Understand the problem
          ↓
2. Define the goal
          ↓
3. Define what success looks like
          ↓
4. Break the work into tasks
          ↓
5. Identify human expertise/judgment
          ↓
6. Understand available AI platforms
          ↓
7. Decide what AI should handle
          ↓
8. Create a delegation plan
```

---

# 19. Developer Example — API Development

Suppose the requirement is:

> Build a REST API for managing customer profiles.

## Step 1 — Problem Awareness

Understand:

* What customer data is required?
* Who can access it?
* What are the security requirements?
* What are the performance requirements?
* What does success look like?

## Step 2 — Platform Awareness

Determine whether your AI environment can:

* Understand the repository
* Access existing code
* Generate code
* Run tests
* Inspect test results

## Step 3 — Task Delegation

### Human

* Define API contract
* Decide authorization model
* Approve architecture

### AI

* Generate boilerplate
* Generate unit tests
* Create documentation
* Identify possible edge cases

### Shared

* Review API design
* Discuss error handling
* Explore implementation options

---

# 20. Delegation and Risk

Risk should influence delegation decisions.

Consider:

### Low-risk task

Generate a README.

AI can probably handle much of the task.

### Medium-risk task

Generate application code.

Human review is required.

### High-risk task

Make a production security decision.

Human expertise and judgment should remain central.

### Important

> **The more significant the consequences of an error, the more carefully you should consider what to delegate and what oversight is required.**

---

# 21. Delegation and AI Modes

From previous lessons, we learned three ways of working with AI:

### Automation

AI performs a defined task.

### Augmentation

Human + AI collaborate.

### Agency

AI works more independently.

Delegation helps determine **which mode is appropriate**.

---

# 22. Example

### Task

Generate unit tests.

Possible approach:

**Automation**

```text
Generate Jest tests for this function.
```

---

### Task

Design an architecture.

Possible approach:

**Augmentation**

```text
Compare three architecture approaches
and discuss the trade-offs with me.
```

---

### Task

Work through a multi-step repository task.

Possible approach:

**Agency**

Configure an AI coding environment with:

* Repository context
* Requirements
* Coding standards
* Testing requirements

and allow it to work more independently.

---

# 23. Delegation Is a Strategic Decision

Delegation should not be:

```text
AI is available → use AI
```

It should be:

```text
Problem
   ↓
Goal
   ↓
Work required
   ↓
Human strengths
   ↓
AI strengths
   ↓
Risk
   ↓
Best division of work
```

This is a strategic approach to AI collaboration.

---

# 24. Exercise From the Lesson

The official lesson asks you to select a relatively small task, such as:

* Drafting an email
* Outlining a presentation
* Planning a meeting
* Planning an event

Then discuss the task with Claude and create a delegation plan.

The important questions are:

### Question 1

> What is the overall vision for the task?

### Question 2

> What does a good result look like?

### Question 3

> What different pieces of work are needed?

### Question 4

> Which pieces require human expertise, creativity, or judgment?

### Question 5

> Which pieces could benefit from AI?

The lesson specifically recommends having an **actual conversation with AI** about these questions rather than simply generating a static list of answers.

---

# 25. Delegation Plan Example

Suppose your task is:

> Prepare a presentation about a new software architecture.

### Overall vision

Create a clear presentation that explains the proposed architecture to senior engineers.

### Work breakdown

| Task                      | Human | AI | Collaboration |
| ------------------------- | ----- | -- | ------------- |
| Define objective          | ✓     |    |               |
| Analyze audience          | ✓     | ✓  | ✓             |
| Generate outline          |       | ✓  | ✓             |
| Architecture decisions    | ✓     |    | ✓             |
| Create diagrams           | ✓     | ✓  | ✓             |
| Draft slide content       |       | ✓  | ✓             |
| Verify technical accuracy | ✓     |    |               |
| Final presentation        | ✓     |    |               |

This is a **delegation plan**.

---

# 26. Important CCA-F Distinctions

## Problem Awareness vs Platform Awareness

### Problem Awareness

> **What problem am I solving?**

### Platform Awareness

> **What can this AI system do?**

Memory trick:

```text
Problem Awareness
      ↓
Understand the WORK

Platform Awareness
      ↓
Understand the AI
```

---

# 27. Platform Awareness vs Task Delegation

### Platform Awareness

Understand the AI's capabilities and limitations.

### Task Delegation

Decide how to distribute the actual work.

Memory trick:

```text
Platform Awareness
      ↓
Know the AI

Task Delegation
      ↓
Divide the work
```

---

# 28. The Three Components Together

```text
PROBLEM AWARENESS
"What are we trying to accomplish?"
          ↓
PLATFORM AWARENESS
"What can the AI do?"
          ↓
TASK DELEGATION
"Who should do which part?"
```

This is one of the most important diagrams to remember for CCA-F.

---

# 29. Common Exam Traps

## Trap 1

> "Delegation means giving as much work as possible to AI."

**Incorrect.**

Delegation is about thoughtfully dividing work.

---

## Trap 2

> "The best AI strategy is maximum automation."

**Incorrect.**

The goal is the most effective human-AI partnership.

---

## Trap 3

> "Platform Awareness means knowing how to write prompts."

**Incorrect.**

Platform Awareness means understanding AI systems' capabilities and limitations.

---

## Trap 4

> "Problem Awareness means asking AI what the problem is."

**Incorrect.**

You should first understand your goal and the nature of the work.

---

## Trap 5

> "Task Delegation means AI decides what work it should do."

**Incorrect.**

Task Delegation is the thoughtful distribution of work between humans and AI.

---

# 30. CCA-F Exam Questions

**Stop here and answer all questions before checking the Answer Key.**

---

## Q1. What are the three components of Delegation?

A. Prompting, Testing, Verification

B. Problem Awareness, Platform Awareness, Task Delegation

C. Automation, Augmentation, Agency

D. Description, Discernment, Diligence

---

## Q2. What is the primary purpose of Problem Awareness?

A. Selecting an AI model

B. Understanding your goals and the work required to achieve them

C. Writing prompts

D. Testing AI output

---

## Q3. What does Platform Awareness involve?

A. Understanding what different AI systems can and cannot do

B. Writing application code

C. Defining business requirements

D. Evaluating the final product

---

## Q4. What is Task Delegation?

A. Giving every task to AI

B. Allowing AI to decide what humans should do

C. Strategically distributing work between humans and AI

D. Automating the entire workflow

---

## Q5. What is the primary goal of Delegation?

A. Automate everything

B. Reduce human involvement as much as possible

C. Create the most effective human-AI partnership for a given task or goal

D. Always use the most powerful AI model

---

# 31. Scenario Questions

## Q6. Scenario

An architect immediately asks Claude:

> "Design our new enterprise architecture."

The architect has not yet identified business requirements, constraints, security needs, or what success means.

Which Delegation component is missing?

A. Platform Awareness

B. Problem Awareness

C. Task Delegation

D. Diligence

---

## Q7. Scenario

A developer wants an AI system to modify an entire repository, run tests, inspect results, and make corrections.

Before choosing the AI environment, the developer evaluates whether the system has repository access, tool access, sufficient context, and the ability to perform multi-step tasks.

Which competency is being demonstrated?

A. Problem Awareness

B. Platform Awareness

C. Task Delegation

D. Description

---

## Q8. Scenario

A team decides:

* Human defines the security architecture.
* Claude generates boilerplate code.
* Human and Claude discuss API design.
* Human performs final security review.

What does this demonstrate?

A. Maximum automation

B. Thoughtful Task Delegation

C. Platform Awareness only

D. Problem Awareness only

---

## Q9. Scenario

You are deciding whether Claude should independently make a production security decision.

The decision could have serious consequences if incorrect.

What should influence your delegation decision most?

A. How impressive Claude's previous answers were

B. The potential consequences and need for human expertise and judgment

C. Whether Claude can generate code quickly

D. Whether the task can technically be automated

---

## Q10. Scenario

You have a simple task:

> Convert 50 JSON objects into TypeScript interfaces.

The task is well-defined and low-risk.

Which delegation approach is most reasonable?

A. Human must manually write every interface.

B. AI can handle much of the task, with appropriate verification.

C. AI should redesign the entire application.

D. No AI system can perform this task.

---

# 32. Advanced CCA-F Questions

## Q11.

Which sequence best represents effective Delegation?

A. Choose AI → Give it everything → Check the result

B. Understand problem → Understand AI capabilities → Divide work strategically

C. Write prompt → Automate → Deploy

D. Select model → Fine-tune → Deploy

---

## Q12.

A developer knows Claude extremely well but has little understanding of the business problem being solved.

Can the developer necessarily delegate the task effectively?

A. Yes, because AI knowledge is sufficient.

B. Yes, because Claude can determine the business requirements.

C. No, because effective Delegation requires understanding the problem as well as AI capabilities.

D. No, because AI should never be used for business tasks.

---

## Q13.

A business analyst understands the business problem very well but does not understand the capabilities or limitations of the available AI systems.

Which component is weak?

A. Problem Awareness

B. Platform Awareness

C. Task Delegation

D. Diligence

---

## Q14.

Which statement best describes the relationship between Domain Expertise and Platform Awareness?

A. Only AI knowledge is necessary.

B. Only domain knowledge is necessary.

C. Effective Delegation benefits from both understanding the work and understanding AI capabilities.

D. Neither is important if the prompt is detailed.

---

## Q15.

Which statement is most consistent with the lesson?

A. Every task should be automated if AI can technically perform it.

B. AI should always work independently.

C. Humans should never delegate important work.

D. Delegation should be based on the strengths of both humans and AI.

---

# 33. Quick Revision

## Delegation

> **Thoughtfully decide what humans do, what humans and AI do together, and what AI can handle independently.**

### Three Components

```text
Problem Awareness
       ↓
Understand the problem

Platform Awareness
       ↓
Understand the AI

Task Delegation
       ↓
Divide the work
```

---

# 34. One-Minute Memory Trick

Remember:

> **Problem → Platform → Task**

### Problem

**What are we trying to accomplish?**

### Platform

**What can the AI do?**

### Task

**Who should do which part?**

```text
PROBLEM
   ↓
PLATFORM
   ↓
TASK
   ↓
Effective Human-AI Partnership
```

---

# 35. Final CCA-F Takeaway

The most important idea from this lesson is:

> **Delegation is not about maximizing automation. It is about making thoughtful decisions about how work should be divided between humans and AI.**

Effective Delegation requires:

1. **Problem Awareness** — Understand the goal and the work involved.
2. **Platform Awareness** — Understand AI systems' capabilities and limitations.
3. **Task Delegation** — Strategically divide the work between human and AI.

And remember:

> **Effective Delegation requires both domain expertise and understanding of AI capabilities.**

The ultimate goal is to create the **most effective human-AI partnership for a particular task or goal**.

---

# 36. Answer Key

**Only check after completing the questions.**

| Question | Answer | Explanation                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------- |
| **Q1**   | **B**  | Delegation consists of Problem Awareness, Platform Awareness, and Task Delegation.                |
| **Q2**   | **B**  | Problem Awareness means understanding your goals and the work involved in achieving them.         |
| **Q3**   | **A**  | Platform Awareness means understanding the capabilities and limitations of different AI systems.  |
| **Q4**   | **C**  | Task Delegation is the strategic distribution of work between humans and AI.                      |
| **Q5**   | **C**  | The goal is an effective human-AI partnership, not maximum automation.                            |
| **Q6**   | **B**  | The architect hasn't first established the goal, requirements, constraints, and success criteria. |
| **Q7**   | **B**  | Evaluating repository access, tools, context, and capabilities is Platform Awareness.             |
| **Q8**   | **B**  | The work has been deliberately divided based on human and AI strengths.                           |
| **Q9**   | **B**  | Consequences, risk, expertise, and judgment should influence delegation decisions.                |
| **Q10**  | **B**  | A well-defined, relatively low-risk task can be delegated to AI with appropriate verification.    |
| **Q11**  | **B**  | Effective Delegation starts with understanding the problem, then the AI, then dividing the work.  |
| **Q12**  | **C**  | Domain/problem understanding is essential alongside knowledge of AI capabilities.                 |
| **Q13**  | **B**  | The person understands the problem but lacks understanding of the AI platform.                    |
| **Q14**  | **C**  | Effective Delegation requires understanding both the work and the AI's capabilities.              |
| **Q15**  | **D**  | Delegation should leverage complementary human and AI strengths.                                  |

---

# 37. CCA-F Memory Card

```text
             DELEGATION
                  |
       +----------+----------+
       |          |          |
    PROBLEM    PLATFORM     TASK
    AWARENESS  AWARENESS   DELEGATION
       |          |          |
   Understand   Understand   Divide
   the work     the AI      the work
       |          |          |
       +----------+----------+
                  ↓
       Effective Human-AI
           Partnership
```

### Remember:

**Problem → Platform → Task**

**Understand the work → Understand the AI → Divide the work**
