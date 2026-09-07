# CCA-F Exam Preparation

## Lesson 5: Capabilities & Limitations

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 5 of 14
**Duration:** ~9 minutes

---

# 1. Learning Objective

By the end of this lesson, you should be able to:

> **Identify the major capabilities and limitations of current Generative AI systems.**

This is important because effective AI collaboration requires understanding **both what AI can do well and where AI has limitations**.

---

# 2. Why Capabilities and Limitations Matter

Generative AI is extremely versatile.

It can:

* Generate text
* Generate code
* Summarize information
* Analyze content
* Translate languages
* Brainstorm ideas
* Answer questions
* Maintain conversational context
* Work across many different tasks

However, AI also has important limitations.

It can:

* Produce factually incorrect information
* Have outdated knowledge
* Run into context limitations
* Struggle with complex reasoning
* Produce convincing but incorrect answers

Therefore:

> **AI capability does not eliminate the need for human judgment.**

The strongest applications combine the strengths of **humans + AI**.

---

# 3. Major Capabilities of Generative AI

The lesson highlights several important capabilities.

---

# 4. Versatility Across Tasks

One of the most powerful characteristics of modern Generative AI is its ability to work across many different tasks.

For example, the same LLM can help with:

```text
Writing
   ↓
Summarization
   ↓
Translation
   ↓
Coding
   ↓
Analysis
   ↓
Brainstorming
   ↓
Question answering
```

The model does not necessarily need separate training for every individual task.

This makes Generative AI highly flexible.

### Developer Example

You can ask Claude to:

```text
1. Explain an Angular error
2. Generate TypeScript code
3. Write Jest tests
4. Review the code
5. Create documentation
6. Explain the architecture
```

The same AI system can perform all these different tasks.

### CCA-F Point

> **Versatility across tasks is a major capability of modern Generative AI.**

---

# 5. Conversational Awareness

Modern LLMs can maintain the flow of a conversation.

Instead of treating every message as completely independent, the model can use information from the current conversational context.

### Example

You say:

```text
User:
Explain OAuth.
```

Claude explains OAuth.

Then:

```text
User:
Now explain it specifically for a Next.js application.
```

Claude can use the previous discussion to understand what **"it"** refers to.

This creates a more natural interaction.

### Important

Conversational awareness depends on the information available in the model's context.

It should **not automatically be interpreted as permanent memory**.

---

# 6. Switching Between Tasks

Generative AI can move from one type of task to another without requiring separate training for each task.

For example:

```text
User:
Explain this API.

↓

User:
Now create TypeScript types.

↓

User:
Now write unit tests.

↓

User:
Now document the API.
```

The same model can switch between these activities.

This is one reason Generative AI is so useful for software development.

---

# 7. Connecting With External Tools

Modern AI systems can also work with external tools.

For example, an AI system may interact with:

* APIs
* Databases
* Code repositories
* Search systems
* File systems
* Development tools

This allows AI to go beyond simply generating text.

### Developer Example

A coding agent could potentially:

```text
Read repository
      ↓
Analyze code
      ↓
Modify files
      ↓
Run tests
      ↓
Inspect results
      ↓
Make corrections
```

This represents a more capable form of AI interaction.

### Important

Tool access does **not** automatically make the AI correct.

The AI still needs appropriate instructions, context, verification, and oversight.

---

# 8. Limitation #1 — Knowledge Cutoff

One important limitation of many AI systems is that their built-in knowledge may have a **cutoff date**.

This means the model's training does not necessarily include the latest information.

### Example

Suppose a framework releases a new version after the model's knowledge cutoff.

You ask:

```text
What is the latest version of this framework?
```

The model may provide an outdated answer.

### Developer Example

You are upgrading Angular.

You ask Claude about a feature introduced very recently.

If the model doesn't have current information, it may:

* Give an older answer
* Mix old and new APIs
* Incorrectly claim a feature exists
* Miss a recent breaking change

### CCA-F Principle

> **Do not assume an AI model automatically knows the latest information.**

When current information matters, appropriate external sources or tools may be required.

---

# 9. Limitation #2 — Hallucinations

One of the most important limitations is:

> **Hallucination**

A hallucination occurs when an AI generates information that is incorrect or unsupported but presents it as though it were a valid answer.

### Example

You ask:

```text
Give me the official documentation for a fictional API.
```

The model might generate:

```text
https://example.com/api/documentation
```

The response may look legitimate even though the API does not exist.

---

# 10. Why Hallucinations Are Dangerous

AI-generated errors can be particularly dangerous because they may sound confident.

For example:

```text
AI:
This Angular API was introduced in Angular 19.
```

The statement sounds authoritative.

But it may be wrong.

Therefore:

> **Confidence ≠ correctness**

This is one of the most important ideas to remember.

---

# 11. Hallucination and Software Development

Imagine Claude generates:

```typescript
someNewAngularFunction()
```

The code looks reasonable.

But the API doesn't actually exist.

If the developer blindly copies the code, the application fails.

Therefore the developer should:

1. Check official documentation
2. Verify the API
3. Test the implementation
4. Evaluate compatibility

This is an example of **Discernment**.

---

# 12. Limitation #3 — Context Window Constraints

LLMs have a finite context window.

The model can only work with a certain amount of information at one time.

The context may include:

* User prompts
* Conversation history
* Documents
* Code
* Instructions
* Tool results

As the amount of information increases, managing context becomes important.

### Example

Suppose you give an AI coding assistant:

```text
1000 source files
+
large architecture documents
+
large logs
+
long conversation
```

Not all information can necessarily be treated equally or remain available indefinitely within the active context.

---

# 13. Why Context Matters

Consider these two requests.

### Request 1

```text
Fix this function.
```

### Request 2

```text
Here is the function.

Here is the error.

Here is the expected behavior.

Here is the framework version.

Here is the relevant API documentation.

Fix the issue and explain the root cause.
```

The second request provides much more useful context.

Therefore:

> **Good context can significantly improve AI collaboration.**

But context is still finite.

---

# 14. Limitation #4 — Complex Reasoning

Current Generative AI systems can perform impressive reasoning-like tasks.

However, they can still struggle with:

* Complex multi-step reasoning
* Ambiguous problems
* Long chains of dependencies
* Edge cases
* Problems requiring precise calculations
* Situations requiring deep domain expertise

A model may produce an answer that looks logically structured while still containing an error.

### Important

> **A well-written explanation is not proof that the reasoning is correct.**

---

# 15. Human + AI = Complementary Strengths

The lesson emphasizes that the most effective applications combine human and AI strengths.

### AI strengths

AI is particularly useful for:

* Speed
* Scale
* Generating alternatives
* Pattern recognition
* Drafting
* Summarization
* Handling repetitive tasks
* Generating code

### Human strengths

Humans provide:

* Critical thinking
* Judgment
* Creativity
* Domain expertise
* Context
* Ethical oversight
* Accountability

---

# 16. Human-AI Collaboration

Think of the relationship like this:

```text
              AI
               |
     +---------+---------+
     |         |         |
    Speed    Scale    Generation
     |         |         |
     +---------+---------+
               |
               ↓
       Human evaluates
               |
     +---------+---------+
     |         |         |
   Judgment  Context  Ethics
     |         |         |
     +---------+---------+
               ↓
        Final outcome
```

The goal isn't:

> **AI replaces humans.**

The goal is:

> **AI and humans combine complementary strengths.**

---

# 17. Capability Does Not Mean Reliability

This is an important CCA-F concept.

An AI can be capable of performing a task without being perfectly reliable at that task.

For example:

```text
AI can write code
        ≠
AI always writes correct code
```

Similarly:

```text
AI can explain a technology
        ≠
AI's explanation is always accurate
```

And:

```text
AI can reason about a problem
        ≠
AI's reasoning is always correct
```

---

# 18. Architect Example

Imagine you ask Claude:

```text
Design a highly available architecture for
our enterprise application.
```

Claude produces:

```text
Load Balancer
     ↓
Next.js
     ↓
API Gateway
     ↓
Microservices
     ↓
Database Cluster
     ↓
Redis
```

The architecture looks excellent.

But before accepting it, the architect should ask:

### Business

* What is the expected traffic?
* What are the availability requirements?
* What is the budget?

### Security

* How is authentication handled?
* How are secrets managed?
* What are the trust boundaries?

### Operations

* How will this be monitored?
* How will it be deployed?
* How will failures be handled?

### Architecture

* Is this complexity justified?
* Does the team have the required skills?
* Does it fit the existing platform?

This is where **human judgment** becomes critical.

---

# 19. Connecting Capabilities & Limitations to the 4Ds

This lesson connects directly to the 4D Framework.

## Delegation

Understanding AI capabilities helps you decide:

> **What should I delegate to AI?**

---

## Description

Understanding context limitations helps you decide:

> **What information should I provide?**

---

## Discernment

Understanding hallucinations and reasoning limitations helps you ask:

> **Can I trust this output?**

---

## Diligence

Understanding AI limitations helps you determine:

> **What responsibility and oversight are required?**

---

# 20. CCA-F Important Comparisons

## Capability vs Limitation

| Capability                       | Related Limitation                        |
| -------------------------------- | ----------------------------------------- |
| Can generate content             | Generated content can be incorrect        |
| Can answer questions             | May hallucinate                           |
| Can maintain conversation        | Context is finite                         |
| Can perform reasoning-like tasks | Complex reasoning can fail                |
| Can work across many tasks       | Capability does not guarantee reliability |
| Can use external tools           | Tool use still requires oversight         |

---

# 21. Common Exam Traps

## Trap #1

> "If the AI sounds confident, the answer must be correct."

**Wrong.**

AI can produce convincing but factually incorrect information.

---

## Trap #2

> "A larger context window means the AI has permanent memory."

**Wrong.**

Context availability and permanent memory are different concepts.

---

## Trap #3

> "Because AI can perform a task, it should always be given that task."

**Wrong.**

Delegation requires evaluating whether AI is appropriate for the task.

---

## Trap #4

> "AI reasoning is equivalent to human expert judgment."

**Wrong.**

AI can perform impressive reasoning-like tasks but can still make errors, particularly with complex reasoning.

---

## Trap #5

> "AI can access external tools, therefore its answers are always accurate."

**Wrong.**

Tool access can improve capabilities but does not eliminate the need for verification and human judgment.

---

# 22. CCA-F Exam Questions

**Stop here and answer these yourself before looking at the Answer Key.**

---

## Q1. Which is a major capability of modern Generative AI?

A. It can only perform one task.

B. It can work across many different tasks without separate training for each task.

C. It never produces incorrect information.

D. It has unlimited context.

---

## Q2. What is a hallucination?

A. AI refusing to answer a question

B. AI generating factually incorrect or unsupported information

C. AI running out of context

D. AI connecting to an external tool

---

## Q3. Which statement about AI confidence is correct?

A. Confident responses are always accurate.

B. Confident responses are proof of correct reasoning.

C. AI can produce confident but incorrect responses.

D. Confidence eliminates the need for verification.

---

## Q4. What is one important limitation related to model knowledge?

A. AI cannot generate code.

B. AI cannot understand language.

C. AI may have a knowledge cutoff and therefore lack recent information.

D. AI cannot summarize documents.

---

## Q5. Which is a limitation of current Generative AI systems?

A. They can generate text.

B. They can translate languages.

C. They can connect with external tools.

D. They can struggle with complex reasoning.

---

## Q6. Why does context matter when working with an LLM?

A. Context changes the model's pre-training.

B. Context provides information the model can use to generate a response.

C. Context permanently retrains the model.

D. Context eliminates hallucinations.

---

## Q7. Which statement best describes the human-AI relationship emphasized in this lesson?

A. AI should replace human judgment.

B. Humans should avoid using AI for important work.

C. The strongest applications combine complementary human and AI strengths.

D. AI should make all final decisions.

---

# 23. Scenario Questions

## Q8. Scenario

You ask Claude for the latest information about a software library that released a major update yesterday.

Claude gives you an answer based on older information.

What limitation is most relevant?

A. Hallucination only

B. Knowledge cutoff

C. Context window

D. Fine-tuning

---

## Q9. Scenario

Claude provides a fictional API name and documentation URL that sound completely legitimate.

You cannot find the API anywhere in the official documentation.

What is the most likely issue?

A. Context window limitation

B. Knowledge cutoff only

C. Hallucination

D. Automation

---

## Q10. Scenario

You provide Claude with a very large codebase and ask it to understand every file and dependency simultaneously.

The resulting analysis misses important information.

Which limitation should you consider?

A. Context window constraints

B. Fine-tuning

C. Transformer architecture

D. Classification

---

## Q11. Scenario

Claude creates an impressive architecture proposal.

However, it does not know your company's budget, regulatory requirements, team expertise, or operational constraints.

What should the architect do?

A. Deploy the architecture immediately.

B. Trust Claude because the proposal looks professional.

C. Apply human judgment and evaluate the architecture against real-world requirements.

D. Assume the model already knows the company's constraints.

---

## Q12. Scenario

You are deciding whether to ask Claude to generate production authentication code.

You know Claude can generate code quickly, but mistakes could create serious security problems.

Which AI Fluency competency is most relevant when deciding whether and how to delegate this task?

A. Delegation

B. Description

C. Discernment

D. Automation

---

# 24. Advanced CCA-F Questions

## Q13.

Which statement best captures the relationship between AI capability and AI reliability?

A. If AI can perform a task, it will always perform it correctly.

B. Capability does not guarantee reliability.

C. AI capabilities eliminate the need for human expertise.

D. AI output becomes reliable when the prompt is long enough.

---

## Q14.

An AI system can summarize a 500-page document but occasionally misses an important qualification in the source material.

What does this example demonstrate?

A. AI has no useful capabilities.

B. AI capability and limitation can coexist.

C. AI cannot process language.

D. Fine-tuning is always required.

---

## Q15.

Which human capability is especially important when working with AI-generated information?

A. Blind trust

B. Critical thinking and judgment

C. Removing all human involvement

D. Avoiding verification

---

# 25. Quick Revision Sheet

## Major Capabilities

```text
Generative AI
     ↓
Versatile
     ↓
Multiple tasks
     ↓
Conversational awareness
     ↓
Task switching
     ↓
External tool integration
```

---

## Major Limitations

```text
Knowledge cutoff
        +
Hallucinations
        +
Context constraints
        +
Complex reasoning challenges
```

---

## Human Strengths

```text
Critical thinking
Judgment
Creativity
Domain expertise
Ethical oversight
Accountability
```

---

# 26. One-Minute Memory Trick

Remember:

> **AI is powerful, but not infallible.**

Think:

```text
CAPABILITIES
     ↓
Generate
Analyze
Summarize
Code
Translate
Collaborate
Use tools

BUT

LIMITATIONS
     ↓
Outdated knowledge
Hallucinations
Finite context
Reasoning challenges

THEREFORE

HUMAN
     ↓
Judgment
Critical thinking
Creativity
Ethics
Oversight
```

---

# 27. Connection to CCA-F

This lesson prepares you for the next major part of the course:

> **Delegation**

You need to understand AI's capabilities and limitations before deciding **what work should be delegated to AI**.

For example:

```text
Understand AI
     ↓
Know capabilities
     ↓
Know limitations
     ↓
Decide what AI should do
     ↓
Delegation
```

The next lesson specifically moves into **Delegation** and teaches how to make strategic decisions about dividing work between yourself and AI.

---

# 28. Answer Key

**Only check this section after attempting all questions.**

| Question | Answer | Explanation                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------------------- |
| **Q1**   | **B**  | Modern Generative AI is versatile and can work across many different tasks.                          |
| **Q2**   | **B**  | A hallucination is factually incorrect or unsupported AI-generated information.                      |
| **Q3**   | **C**  | AI can produce confident-sounding answers that are nevertheless incorrect.                           |
| **Q4**   | **C**  | Knowledge cutoff dates can mean the model lacks recent information.                                  |
| **Q5**   | **D**  | Complex reasoning remains a limitation of current AI systems.                                        |
| **Q6**   | **B**  | Context gives the model information it can use when generating its response.                         |
| **Q7**   | **C**  | The lesson emphasizes combining complementary human and AI strengths.                                |
| **Q8**   | **B**  | The issue is that the model may not have information from after its knowledge cutoff.                |
| **Q9**   | **C**  | Invented APIs or unsupported information are examples of hallucination.                              |
| **Q10**  | **A**  | A very large amount of information can create context-window challenges.                             |
| **Q11**  | **C**  | Human judgment is needed to evaluate AI output against actual business and operational requirements. |
| **Q12**  | **A**  | Delegation involves deciding what work should be given to AI versus handled by the human.            |
| **Q13**  | **B**  | An AI system can be capable of a task without being reliably correct every time.                     |
| **Q14**  | **B**  | AI can be highly capable while still having limitations and making mistakes.                         |
| **Q15**  | **B**  | Critical thinking and judgment are important human strengths when evaluating AI output.              |

---

# 29. Final CCA-F Takeaway

The key lesson is:

> **Understanding what AI can do is only half of AI Fluency. You must also understand what it cannot reliably do.**

Modern Generative AI is:

* Versatile
* Conversational
* Capable of switching between tasks
* Capable of working with external tools

But it can also suffer from:

* **Knowledge cutoff limitations**
* **Hallucinations**
* **Context window constraints**
* **Complex reasoning challenges**

Therefore, the strongest approach is:

> **AI capability + Human judgment = Effective AI collaboration**

This understanding becomes the foundation for the next 4D competency: **Delegation**.
