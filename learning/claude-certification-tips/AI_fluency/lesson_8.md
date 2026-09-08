# CCA-F Exam Preparation

## Lesson 8: A Closer Look at Description

**Course:** AI Fluency: Framework & Foundations
**Lesson:** 8 of 14
**Duration:** ~15 minutes

---

# 1. What Will You Learn?

This lesson focuses on the second competency of the 4D Framework:

> **Description**

By the end of the lesson, you should be able to:

* Understand how to communicate your intentions effectively to AI systems.
* Understand why clear and purposeful communication matters.
* Understand the three types of Description:

  * **Product Description**
  * **Process Description**
  * **Performance Description**

The official lesson emphasizes that Description goes **beyond simply writing prompts**. It is about creating a productive environment in which humans and AI can collaborate effectively.

---

# 2. What is Description?

In the 4D Framework:

> **Description = Communicating effectively with AI systems.**

But there is an important distinction.

Description is **not simply writing a prompt**.

It is about communicating:

* What you want
* How you want the AI to approach the task
* How you want the AI to behave during the collaboration

The lesson describes Description as creating a **collaborative environment** between the human and AI.

---

# 3. AI Cannot Read Your Mind

One of the simplest but most important concepts in this lesson is:

> **AI cannot read your mind.**

You may have a very clear idea of what you want in your head.

But unless you communicate that information to AI, the AI doesn't know it.

### Example

You think:

> "Create a professional architecture document for senior engineers. Keep it concise, focus on trade-offs, and challenge my assumptions."

But you only tell Claude:

```text
Create an architecture document.
```

Claude has to guess:

* Who is the audience?
* How detailed should it be?
* What format should it use?
* Should it challenge you?
* Should it explain alternatives?
* Should it focus on technical details or business impact?

The result may therefore not match your expectations.

---

# 4. Description Has Three Components

The three types of Description are:

```text
                    DESCRIPTION
                         |
             +-----------+-----------+
             |           |           |
          PRODUCT     PROCESS    PERFORMANCE
             |           |           |
          What?        How?       Behavior?
```

### Product

> **What do you want AI to create?**

### Process

> **How should AI approach the task?**

### Performance

> **How should AI behave during the collaboration?**

This is one of the most important things to remember for the CCA-F exam.

---

# 5. Product Description

## What is Product Description?

Product Description clearly defines:

> **What you want the AI to produce.**

The lesson specifically identifies several dimensions that can be part of a Product Description:

* Output
* Format
* Audience
* Style

---

# 6. Example of Product Description

Poor:

```text
Create a report about our architecture.
```

Better:

```text
Create a 5-page architecture report
for senior software engineers.

Include:
- Current architecture
- Problems
- Proposed architecture
- Alternatives
- Trade-offs
- Recommendation

Format:
Markdown

Style:
Technical but concise.
```

The second description defines the **product** much more clearly.

---

# 7. Product Description Questions

When describing the product, think:

### What?

What exactly should AI create?

### Format?

What format should the output use?

Examples:

* Markdown
* JSON
* Table
* Email
* Presentation
* Code
* Report

### Audience?

Who will consume the output?

Examples:

* Developer
* Architect
* Executive
* Customer
* Student

### Style?

How should the output look or sound?

Examples:

* Concise
* Technical
* Professional
* Friendly
* Formal
* Educational

---

# 8. Developer Example — Product Description

Instead of:

```text
Create tests for this code.
```

Try:

```text
Create Jest unit tests for this TypeScript service.

Output:
- Complete test file

Audience:
- Experienced TypeScript developers

Requirements:
- Cover success cases
- Cover error cases
- Cover edge cases

Style:
- Clear and maintainable
```

You have now described the **product**.

---

# 9. Process Description

## What is Process Description?

Process Description tells AI:

> **How you want it to approach the task.**

This is different from simply specifying the desired final output.

The lesson emphasizes that guiding **how AI approaches a request can be as important as specifying the end goal**.

---

# 10. Why Process Matters

Imagine asking:

```text
Design an authentication architecture.
```

Claude could immediately produce an answer.

But perhaps you want it to:

1. Understand your current architecture.
2. Identify requirements.
3. Identify security constraints.
4. Generate multiple approaches.
5. Compare trade-offs.
6. Recommend one approach.
7. Explain why.

If you don't communicate this process, Claude may skip important steps.

---

# 11. Example — Process Description

```text
First, analyze the current architecture.

Then:
1. Identify the key requirements.
2. Identify security constraints.
3. Propose three possible approaches.
4. Compare their trade-offs.
5. Identify risks.
6. Recommend the best approach.

Do not provide the final recommendation until
you have completed the comparison.
```

This is **Process Description**.

You are describing **how you want Claude to approach the task**.

---

# 12. Process vs Product

This distinction is very important.

### Product

> What should Claude produce?

### Process

> How should Claude approach producing it?

### Example

```text
PRODUCT:
Create an architecture recommendation.

PROCESS:
Analyze requirements → generate options →
compare trade-offs → identify risks →
recommend an approach.
```

### Memory Trick

> **Product = Destination**

> **Process = Journey**

---

# 13. Performance Description

## What is Performance Description?

Performance Description defines:

> **How you want AI to behave during the collaboration.**

The lesson gives examples such as whether you want AI to be:

* Concise or detailed
* Challenging or supportive

This is about the **behavior and interaction style** of the AI.

---

# 14. Examples of Performance Description

You might tell Claude:

```text
Be concise.
```

or:

```text
Explain your reasoning in detail.
```

Or:

```text
Challenge my assumptions rather than simply agreeing with me.
```

Or:

```text
Act as a supportive tutor and ask questions
before giving me the answer.
```

These are examples of **Performance Description**.

---

# 15. Performance Description Is About Interaction

Consider:

```text
Review my architecture.
```

This tells Claude the task.

But:

```text
Review my architecture.

Be critical rather than agreeable.
Identify assumptions I may have missed.
Ask clarifying questions when necessary.
Be concise but specific.
```

This describes **how you want Claude to behave**.

---

# 16. Product + Process + Performance

The strongest descriptions can combine all three.

### Example

```text
PRODUCT

Create an architecture decision record
in Markdown for senior engineers.

PROCESS

First analyze the current architecture.
Then identify alternatives.
Compare trade-offs.
Identify risks.
Finally recommend an approach.

PERFORMANCE

Be concise but technically precise.
Challenge my assumptions.
Ask clarifying questions if information
is missing.
```

This gives Claude:

* What to produce
* How to approach it
* How to interact with you

---

# 17. Complete Developer Example

Suppose you want Claude to help with an Angular migration.

### Product

```text
Create a migration plan in Markdown.
```

### Process

```text
First analyze the current Angular version.

Then:
1. Identify breaking changes.
2. Identify deprecated APIs.
3. Group migration tasks.
4. Identify risks.
5. Create a phased migration plan.
```

### Performance

```text
Be critical of risky assumptions.
Ask questions when important information is missing.
Keep the final plan concise and actionable.
```

### Combined

```text
Create a Markdown migration plan for
our Angular application.

PRODUCT:
- Markdown document
- Audience: senior developers
- Include risks and migration phases

PROCESS:
1. Analyze current architecture.
2. Identify breaking changes.
3. Identify deprecated APIs.
4. Group migration tasks.
5. Identify risks.
6. Create migration phases.

PERFORMANCE:
- Be concise but technically precise.
- Challenge assumptions.
- Ask clarifying questions when needed.
```

This is a strong example of **Description**.

---

# 18. Description Is a Collaborative Skill

The lesson makes an important conceptual shift:

> AI systems should be treated as **interactive partners**, not simply databases or vending machines.

### Database mindset

```text
Ask question
     ↓
Get answer
     ↓
Done
```

### Collaborative mindset

```text
Human
  ↓
Describe goal
  ↓
AI
  ↓
Responds
  ↓
Human evaluates
  ↓
Clarifies / refines
  ↓
AI
  ↓
Improved result
```

The second approach encourages better collaboration.

---

# 19. Description Is More Than Prompt Engineering

This is a likely CCA-F exam distinction.

### Prompting

A prompt is an instruction or input given to an AI system.

### Description

Description is the broader skill of communicating your intentions and creating the conditions for effective collaboration.

Therefore:

> **Description is broader than simply writing prompts.**

The lesson explicitly makes this distinction.

---

# 20. Clear Communication Saves Time

The lesson emphasizes that:

> **Clear communication up front saves time and leads to better results.**

Imagine this interaction:

```text
Human:
Create a report.

AI:
Creates report.

Human:
That's not what I wanted.

AI:
What would you like?

Human:
I wanted it for executives.

AI:
Okay...

Human:
And only 2 pages.

AI:
Okay...

Human:
And focus on business impact.

AI:
Okay...
```

This wastes time.

Instead:

```text
Create a 2-page executive report.

Audience:
Senior executives

Focus:
Business impact

Style:
Concise and non-technical

Include:
- Problem
- Business impact
- Recommendation
```

Better Description reduces unnecessary iteration.

---

# 21. Description and the 4D Framework

Remember:

```text
Delegation
    ↓
What should AI do?

Description
    ↓
What exactly do I want?
How should AI approach it?
How should AI behave?

Discernment
    ↓
Is the result good?

Diligence
    ↓
Am I using AI responsibly?
```

Description is therefore the bridge between:

> **Deciding what AI should do**

and

> **Evaluating what AI produces.**

---

# 22. Description and Delegation

These competencies are closely connected.

### Delegation

Decide:

> "Claude should help me design the architecture."

### Description

Explain:

> "Here is our architecture, here are the requirements, here is the desired output, here is how I want you to approach the analysis, and here is how I want you to interact with me."

So:

```text
Delegation
    ↓
WHAT should AI do?

Description
    ↓
WHAT exactly do I want?
HOW should it approach it?
HOW should it behave?
```

---

# 23. Description and Discernment

Good Description can make Discernment easier.

For example, if you explicitly tell Claude:

```text
Identify assumptions and uncertainties.
```

Claude may expose assumptions that you can then evaluate.

Similarly:

```text
Provide three alternatives and compare trade-offs.
```

makes it easier for you to evaluate the options.

Therefore:

> **Better Description can create better conditions for Discernment.**

---

# 24. Exercise: Bad Prompt Makeover

The official lesson includes an exercise called **Bad Prompt Makeover**.

The process is:

### Step 1

Ask Claude to give you poorly written prompts.

### Step 2

Improve each prompt using the three Description components:

```text
Product
Process
Performance
```

### Step 3

Discuss the before/after versions with Claude.

Ask Claude how the improved description could help it provide better responses.

### Step 4

Switch roles.

Give Claude poorly written prompts and ask Claude to improve them.

Then observe:

> What information does Claude add?

> How does Claude organize the information?

This exercise helps you recognize what makes a description effective.

---

# 25. CCA-F Exam Focus

## Must Remember #1

Description is:

> **Communicating effectively with AI to create a productive collaborative environment.**

---

## Must Remember #2

Description has three components:

```text
PRODUCT
PROCESS
PERFORMANCE
```

---

## Must Remember #3

### Product

**What do I want AI to create?**

Includes:

* Output
* Format
* Audience
* Style

---

### Process

**How should AI approach the task?**

---

### Performance

**How should AI behave during the collaboration?**

Examples:

* Concise vs detailed
* Challenging vs supportive

---

# 26. Common Exam Traps

## Trap 1

> "Description means writing a detailed prompt."

**Too narrow.**

Description is broader than prompting.

---

## Trap 2

> "Product Description tells AI how to perform the task."

**Incorrect.**

Product = what you want produced.

Process = how AI should approach the task.

---

## Trap 3

> "Performance Description defines the final output."

**Incorrect.**

Performance describes AI's behavior during collaboration.

---

## Trap 4

> "Process Description only specifies the output format."

**Incorrect.**

Output format is part of Product Description.

Process describes the approach.

---

## Trap 5

> "AI will automatically know your preferred interaction style."

**Incorrect.**

AI cannot read your mind.

If you want a particular behavior, communicate it.

---

# 27. CCA-F Exam Questions

**Stop here and answer all questions before checking the Answer Key.**

---

## Q1. What are the three types of Description?

A. Planning, Prompting, Testing

B. Product, Process, Performance

C. Delegation, Discernment, Diligence

D. Input, Output, Context

---

## Q2. What does Product Description specify?

A. How AI should behave

B. How AI should approach a task

C. What you want AI to create

D. Whether AI should be used

---

## Q3. Which elements can be part of Product Description?

A. Output, format, audience, style

B. Model size, GPU, CPU, memory

C. Training data, parameters, tokenizer

D. Risk, security, accountability

---

## Q4. What does Process Description specify?

A. The desired output format

B. How AI should approach the task

C. How much the AI costs

D. Who should use the final output

---

## Q5. What does Performance Description specify?

A. The AI's training process

B. The desired output format

C. How the AI should behave during collaboration

D. The business requirements

---

# 28. Scenario Questions

## Q6. Scenario

You tell Claude:

> "Create a 3-page Markdown architecture document for senior engineers. Include the current architecture, proposed architecture, alternatives, and trade-offs."

Which type of Description is primarily being used?

A. Product

B. Process

C. Performance

D. Delegation

---

## Q7. Scenario

You tell Claude:

> "First analyze the requirements, then propose three approaches, compare their trade-offs, and finally recommend one."

Which type of Description is this?

A. Product

B. Process

C. Performance

D. Diligence

---

## Q8. Scenario

You tell Claude:

> "Be concise, challenge my assumptions, and ask clarifying questions instead of making unsupported assumptions."

Which type of Description is this?

A. Product

B. Process

C. Performance

D. Delegation

---

## Q9. Scenario

You want Claude to create a technical document, but you don't specify the audience, format, or level of detail.

Claude produces something that doesn't meet your expectations.

What could have improved the interaction?

A. More powerful hardware

B. Better Product Description

C. Fine-tuning the model

D. Removing all context

---

## Q10. Scenario

You tell Claude:

> "Create a security architecture recommendation."

Claude immediately gives you one answer.

You actually wanted Claude to compare several alternatives before making a recommendation.

What was missing?

A. Product Description

B. Process Description

C. Performance Description

D. Diligence

---

# 29. Advanced CCA-F Questions

## Q11.

Which statement best describes Description?

A. Description is simply writing longer prompts.

B. Description is communicating intentions in ways that create an effective collaborative environment.

C. Description is evaluating whether AI output is correct.

D. Description is deciding whether AI should perform a task.

---

## Q12.

Which sequence correctly represents the three types of Description?

A. What → How → Behavior

B. How → What → Why

C. Why → What → When

D. Input → Output → Testing

---

## Q13.

A developer specifies:

```text
Product:
Create a Markdown architecture decision record.

Process:
Compare three alternatives before recommending one.

Performance:
Challenge my assumptions and be concise.
```

Which statement is correct?

A. Only Product Description is being used.

B. Only Process Description is being used.

C. Product, Process, and Performance are all being used.

D. This is Delegation rather than Description.

---

## Q14.

Why is clear communication important when working with AI?

A. AI can read human intentions without explanation.

B. Clear communication reduces ambiguity, saves time, and can lead to better results.

C. Clear communication eliminates hallucinations.

D. Clear communication guarantees correct answers.

---

## Q15.

Which statement best reflects the lesson's view of AI?

A. AI should be treated like a database that returns answers.

B. AI should be treated like a vending machine.

C. AI can be treated as an interactive partner in a collaborative process.

D. AI should make all decisions independently.

---

# 30. Expert Scenario

## Q16.

You are an architect working with Claude on a system design.

Your instruction is:

> "Create a system architecture document."

Claude produces a technically reasonable document, but it is too detailed for executives.

Which Description component could have prevented this problem most directly?

A. Product — specify the audience and desired style

B. Process — specify the sequence of analysis

C. Performance — specify the model's training behavior

D. Delegation — decide whether Claude should write anything

---

## Q17.

You ask Claude to review an architecture and say:

> "Don't simply agree with me. Challenge my assumptions and point out risks I may have overlooked."

Which Description component is this?

A. Product

B. Process

C. Performance

D. Delegation

---

# 31. Quick Revision

```text
                 DESCRIPTION
                      |
          +-----------+-----------+
          |           |           |
       PRODUCT      PROCESS    PERFORMANCE
          |           |           |
         WHAT?       HOW?       BEHAVIOR?
          |           |           |
     What to       How to      How should
     create        approach    AI interact?
```

---

# 32. Memory Trick

Remember:

> **Product = What**

> **Process = How**

> **Performance = Behavior**

Or:

```text
WHAT?
  ↓
PRODUCT

HOW?
  ↓
PROCESS

HOW SHOULD AI BEHAVE?
  ↓
PERFORMANCE
```

---

# 33. Combined Example

If you remember only one example, remember this:

```text
PRODUCT
Create a 5-page architecture report for senior engineers.

PROCESS
First analyze requirements.
Then generate alternatives.
Compare trade-offs.
Then recommend an approach.

PERFORMANCE
Be concise.
Challenge my assumptions.
Ask questions when information is missing.
```

This single example demonstrates all three types of Description.

---

# 34. Final CCA-F Takeaway

The key lesson is:

> **Description is not simply about writing prompts. It is about clearly communicating your intentions so that humans and AI can collaborate effectively.**

A strong Description communicates three things:

### 1. Product

**What do I want?**

### 2. Process

**How should AI approach it?**

### 3. Performance

**How should AI behave during our collaboration?**

And remember:

> **AI cannot read your mind.**

The more clearly you communicate your desired output, approach, and interaction style, the more effectively you can collaborate with AI.

The next lesson moves into **Effective Prompting Techniques**, where these Description concepts are turned into practical prompting techniques.

---

# 35. Answer Key

**Check only after attempting all questions.**

| Question | Answer | Explanation                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------------- |
| **Q1**   | **B**  | The three types are Product, Process, and Performance.                                        |
| **Q2**   | **C**  | Product Description defines what you want AI to create.                                       |
| **Q3**   | **A**  | Product Description can specify output, format, audience, and style.                          |
| **Q4**   | **B**  | Process Description guides how AI should approach the request.                                |
| **Q5**   | **C**  | Performance Description defines AI's behavior during collaboration.                           |
| **Q6**   | **A**  | The instruction defines the desired output, format, audience, and content.                    |
| **Q7**   | **B**  | It specifies the approach/sequence AI should follow.                                          |
| **Q8**   | **C**  | It specifies how AI should behave during the interaction.                                     |
| **Q9**   | **B**  | Audience, format, and level of detail are aspects of Product Description.                     |
| **Q10**  | **B**  | The desired approach—compare alternatives before recommending—belongs to Process Description. |
| **Q11**  | **B**  | Description is broader than prompting; it creates a productive collaborative environment.     |
| **Q12**  | **A**  | Product = What, Process = How, Performance = Behavior.                                        |
| **Q13**  | **C**  | The example explicitly contains Product, Process, and Performance.                            |
| **Q14**  | **B**  | Clear communication reduces ambiguity and can save time and improve results.                  |
| **Q15**  | **C**  | The lesson frames AI as an interactive partner rather than a database or vending machine.     |
| **Q16**  | **A**  | Audience and desired style are part of Product Description.                                   |
| **Q17**  | **C**  | Telling AI to challenge assumptions and point out risks defines desired behavior.             |

---

# 36. CCA-F Memory Card

```text
DESCRIPTION

PRODUCT
"What do I want?"
↓
Output
Format
Audience
Style

PROCESS
"How should AI approach it?"
↓
Steps
Method
Analysis approach

PERFORMANCE
"How should AI behave?"
↓
Concise / Detailed
Challenging / Supportive
Interactive behavior
```

### The one-line memory rule:

> **Product = What | Process = How | Performance = Behavior**
