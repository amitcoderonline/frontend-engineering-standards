# CCA-F Exam Preparation

## Lesson 1: Introduction to AI Fluency

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 1 of 14
**Lesson duration:** ~15 minutes

---

# 1. What is this lesson about?

This lesson introduces the concept of **AI Fluency**.

The important idea is that AI Fluency is **not simply about understanding AI technology**.

Instead, it is about learning how to **work and collaborate effectively with AI systems**.

The course focuses on developing a lasting framework for working with AI rather than relying on temporary AI tips and tricks.

According to Anthropic, AI Fluency means being able to collaborate with AI in ways that are:

* **Effective**
* **Efficient**
* **Ethical**
* **Safe**

> **CCA-F Exam Point:** AI Fluency is about **human-AI collaboration**, not merely knowledge of AI technology.

---

# 2. Why is AI Fluency important?

AI technology is changing rapidly.

Specific AI models, tools, interfaces, and techniques may change over time.

Therefore, simply learning how to use one particular AI tool is not enough.

The goal is to develop **lasting skills and principles** that remain useful as AI technology evolves.

### Example

Today you may use Claude to generate TypeScript code.

Tomorrow, a newer model may replace Claude or the way you interact with AI may change.

However, skills such as:

* deciding what AI should do,
* clearly explaining what you need,
* evaluating AI output,
* and taking responsibility for the result

remain valuable.

This is the purpose of AI Fluency.

---

# 3. AI Fluency vs. Knowing AI

These are not the same thing.

### Knowing AI

You might understand:

* What an LLM is
* What Generative AI is
* How prompting works
* How AI generates text
* What Claude can do

### AI Fluency

You also need to know:

* When to use AI
* What task to give AI
* How to communicate your requirements
* How to evaluate AI output
* When AI output should not be trusted
* How to use AI responsibly
* Who remains responsible for the final result

### Simple way to remember

> **AI knowledge = understanding the technology.**

> **AI Fluency = knowing how to collaborate with the technology.**

---

# 4. The 4D AI Fluency Framework

The AI Fluency Framework is built around four core competencies called the **4Ds**:

| 4D              | Meaning                                      |
| --------------- | -------------------------------------------- |
| **Delegation**  | Deciding what to ask AI to do                |
| **Description** | Clearly communicating what you want AI to do |
| **Discernment** | Evaluating and judging AI's output           |
| **Diligence**   | Taking responsibility for the resulting work |

These four competencies form one of the most important concepts in this course.

> **CCA-F MEMORY TIP:**
> **4D = Delegate → Describe → Discern → Diligence**

---

# 5. Delegation

**Delegation** is about deciding:

> **What should I ask AI to do?**

Before using AI, you should determine which parts of a task are appropriate for AI.

### Developer example

You are building an Angular application.

You could delegate to Claude:

* Generate an Angular component
* Explain an RxJS operator
* Create unit-test cases
* Suggest possible architecture approaches
* Refactor repetitive code

But you should still decide:

* What problem needs solving?
* What should AI handle?
* What requires human judgment?
* What information should not be provided to AI?

### Exam thinking

Delegation is primarily about **deciding what AI should do**.

---

# 6. Description

**Description** is about communicating your requirements to AI.

The better you describe the task, the more useful the AI response can become.

For example, instead of:

```text
Create a login page.
```

provide useful context:

```text
Create an Angular standalone login component.

Requirements:
- Angular 20
- Reactive Forms
- TypeScript
- Email and password fields
- Form validation
- Accessible error messages
- Use Angular Material
- Do not create a backend
```

The second request gives AI much more information about the desired outcome.

> **Description = communicating your intent clearly.**

---

# 7. Discernment

AI can produce useful output, but AI output should not automatically be accepted as correct.

**Discernment** means evaluating the output and determining:

* Is it correct?
* Is it relevant?
* Does it satisfy the requirements?
* Are there errors?
* Are there security problems?
* Are there missing requirements?
* Does it make sense in the actual application?

### Developer example

Claude generates:

```typescript
const token = localStorage.getItem('token');
```

The code may compile.

But an architect should ask:

* Is storing this token in localStorage appropriate?
* Does this create a security risk?
* Does it meet our application's authentication architecture?
* Is there a better approach?

This is **Discernment**.

> **AI-generated code compiling does NOT automatically mean the code is correct or appropriate.**

---

# 8. Diligence

**Diligence** is about responsible use of AI and taking responsibility for the resulting work.

The fact that AI generated something does not remove human responsibility.

For example:

```text
Claude generated the code, so if it is wrong, Claude is responsible.
```

This is incorrect.

The developer/architect still needs to:

* Verify the result
* Test the result
* Check correctness
* Consider security
* Consider ethical implications
* Ensure the final work meets requirements

> **Important:** AI assistance does not transfer responsibility from the human to the AI.

---

# 9. The 4Ds in a real development task

Suppose you need to implement a new authentication feature.

### Step 1 — Delegation

Decide what Claude should help with.

```text
Ask Claude to propose authentication architecture options.
```

### Step 2 — Description

Give Claude sufficient context.

```text
Our application uses:
- Next.js
- TypeScript
- Spring Boot
- OAuth/OIDC
- Enterprise SSO
```

### Step 3 — Discernment

Evaluate Claude's proposal.

Ask:

* Is the architecture secure?
* Does it fit our existing system?
* Are there hidden assumptions?
* Are there better alternatives?

### Step 4 — Diligence

Verify and take responsibility.

* Test the implementation
* Review security
* Validate requirements
* Document decisions

### Complete flow

```text
Delegation
    ↓
What should AI do?
    ↓
Description
    ↓
How should I explain the task?
    ↓
AI produces output
    ↓
Discernment
    ↓
Is the output good/correct?
    ↓
Diligence
    ↓
Verify + take responsibility
```

---

# 10. Human-AI Collaboration

The course emphasizes that effective AI use requires a **fundamental shift in how we think about working with AI**.

AI should not simply be viewed as a tool that produces an answer.

Instead, think of the interaction as **collaboration**.

For example:

```text
Human
  ↓
Defines goal
  ↓
AI
  ↓
Generates ideas / output
  ↓
Human
  ↓
Evaluates
  ↓
AI
  ↓
Refines
  ↓
Human
  ↓
Verifies and takes responsibility
```

This collaborative approach becomes especially important for architecture and engineering work.

---

# 11. Practical Exercise

The course recommends working directly with a language model during the lessons.

Although the examples use Claude, the principles can also be applied to other AI chatbots.

The course does not require a paid subscription for the exercises.

The purpose of these exercises is to gain **hands-on experience with AI collaboration**.

---

# 12. Reflection Questions

Before continuing through the course, consider:

1. What problems have you experienced while working with AI?
2. What AI collaboration possibilities are most useful to you?
3. What do you want to learn from the course?

For CCA-F preparation, these questions are useful because they encourage you to think about **how you actually collaborate with AI**, rather than just memorizing terminology.

---

# 13. What comes next?

The next lesson introduces:

### Three ways people collaborate with AI

* **Automation**
* **Augmentation**
* **Agency**

It also goes deeper into the four core competencies:

* Delegation
* Description
* Discernment
* Diligence

These topics are explicitly identified by the course as upcoming concepts.

---

# 14. CCA-F Exam Focus

## Must Remember

### 1. Definition of AI Fluency

AI Fluency is the ability to collaborate with AI in ways that are:

**Effective + Efficient + Ethical + Safe**

### 2. AI Fluency is NOT simply:

> Knowing how AI technology works.

It is about:

> **Human-AI collaboration.**

### 3. The 4Ds

```text
Delegation
Description
Discernment
Diligence
```

### 4. Lasting skills

The purpose of the framework is to develop skills that remain useful even as AI technology changes.

### 5. Human responsibility

AI-generated output must be evaluated and responsibly used by the human.

---

# 15. Exam Questions & Answers

## Q1. What is AI Fluency?

**Answer:**

AI Fluency is the ability to collaborate with AI systems in ways that are **effective, efficient, ethical, and safe**.

---

## Q2. What is the primary focus of the AI Fluency course?

A. Learning how to build an AI model
B. Memorizing AI terminology
C. Developing meaningful human-AI collaboration
D. Learning only how to use Claude

**Answer: C**

**Explanation:** The course focuses on human-AI collaboration rather than simply understanding AI technology.

---

## Q3. What are the 4Ds of the AI Fluency Framework?

**Answer:**

1. Delegation
2. Description
3. Discernment
4. Diligence

---

## Q4. Which 4D is concerned with deciding what AI should do?

A. Description
B. Delegation
C. Discernment
D. Diligence

**Answer: B — Delegation**

---

## Q5. Which 4D involves clearly communicating your requirements to AI?

A. Delegation
B. Description
C. Discernment
D. Diligence

**Answer: B — Description**

---

## Q6. Claude generates code that compiles successfully. What should you do next?

A. Immediately merge it
B. Assume it is correct
C. Evaluate the code for correctness and suitability
D. Ask Claude whether the code is correct and accept its answer

**Answer: C — Evaluate the code for correctness and suitability**

**Concept:** Discernment.

---

## Q7. Who is responsible for AI-generated work?

A. The AI model
B. The AI vendor
C. The human using the AI
D. Nobody

**Answer: C**

**Concept:** Diligence.

---

## Q8. Why does the course focus on lasting skills?

A. AI technology never changes
B. Specific AI tools and techniques can change over time
C. Prompting is no longer important
D. AI models cannot improve

**Answer: B**

---

## Q9. Which statement best describes AI Fluency?

A. Knowing the architecture of an LLM
B. Being able to write Python AI applications
C. Effectively collaborating with AI while using appropriate judgment and responsibility
D. Knowing every Claude feature

**Answer: C**

---

## Q10. You ask Claude to design a Next.js architecture. Claude provides a proposal. You check whether it meets your security, scalability, and business requirements. Which competency are you primarily demonstrating?

**Answer: Discernment**

---

# 16. Scenario-Based Exam Question

### Scenario

You ask Claude to create an authentication implementation for a Next.js application.

Claude provides working code.

You review the implementation and discover that the suggested approach may expose sensitive authentication information.

What should you do?

### Answer

Do **not** blindly use the generated code.

Evaluate the security implications, determine whether the approach satisfies the requirements, modify or reject the solution as necessary, and verify the final implementation.

This demonstrates:

**Discernment + Diligence**

---

# 17. Quick Revision Sheet

```text
AI Fluency
    ↓
Human + AI Collaboration
    ↓
Effective
Efficient
Ethical
Safe
```

### 4Ds

```text
Delegation
    ↓
What should AI do?

Description
    ↓
How should I communicate the task?

Discernment
    ↓
Is the AI output correct/useful?

Diligence
    ↓
Have I verified it and taken responsibility?
```

### Remember

> **Don't just ask AI for an answer. Know what to delegate, describe the task clearly, evaluate the result, and take responsibility for the outcome.**

---

# CCA-F Key Takeaway

The most important concept from this lesson is:

> **AI Fluency is not about simply knowing AI. It is about developing the ability to collaborate with AI effectively, efficiently, ethically, and safely.**

The **4Ds — Delegation, Description, Discernment, and Diligence — provide the foundation for this collaboration.**
