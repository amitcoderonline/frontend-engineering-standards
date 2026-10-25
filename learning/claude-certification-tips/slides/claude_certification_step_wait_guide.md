# Claude Certification Study Guide: What Forces a Step to Wait?

## Overview

The image illustrates three important concepts in agentic AI workflow
design:

1.  **Sequential execution**
2.  **Prompt chaining**
3.  **Dependency graphs**

From a Claude certification perspective, the key question is: **When
must an agent wait for another step to finish, and when can it execute
work in parallel?**

These are general agentic-workflow and orchestration concepts. They are
useful when designing systems that use Claude, tools, APIs, and multiple
reasoning or processing steps.

------------------------------------------------------------------------

## 1. Sequential execution

### What it means

Tasks execute one after another in a defined order. A later task may
need the result or successful completion of an earlier task.

### Example: Order refund workflow

1.  Retrieve the order.
2.  Verify the order status and refund eligibility.
3.  Calculate the refund amount.
4.  Check authorization limits.
5.  Submit the refund if authorized.

The workflow should not calculate a final refund based on an order that
has not yet been retrieved. It should not submit a refund before
eligibility and authorization checks are complete.

### Why does a step wait?

A step waits when it has a **data dependency**, a **control-flow
dependency**, or a required safety/authorization gate that has not been
satisfied.

### Claude-oriented example

A Claude tool-use workflow might ask Claude to retrieve an order using a
tool. The application then validates the tool result and provides it
back to Claude. Claude can then decide which step is appropriate next.

Important: the application---not just the model prompt---must enforce
authorization, validation, and business rules for consequential actions.

### Benefits and trade-offs

-   **Benefits:** Clear ordering, easier debugging, simpler failure
    handling.
-   **Trade-off:** Independent tasks may be delayed unnecessarily if
    everything is forced to run sequentially.

------------------------------------------------------------------------

## 2. Prompt chaining

### What it means

Prompt chaining is a particular kind of sequential workflow in which one
LLM call's output becomes the next LLM call's input. Each call can have
a narrow responsibility.

### Example: Technical design assistant

1.  **Call 1 --- Requirements extraction:** Extract functional and
    non-functional requirements from a project brief.
2.  **Call 2 --- Architecture proposal:** Use the extracted requirements
    to propose a system architecture.
3.  **Call 3 --- Risk review:** Evaluate the architecture for security,
    scalability, and reliability risks.
4.  **Call 4 --- Final document:** Produce the design document
    incorporating the reviewed findings.

Call 2 needs Call 1's output. Call 3 needs the architecture proposal.
Call 4 needs the reviewed result.

### Why does a step wait?

The next prompt depends on the previous LLM response. The workflow
cannot reliably proceed until the response has arrived and any required
validation has passed.

### Best practices

-   Give each call one clear responsibility.
-   Define the expected output format, such as JSON with a schema.
-   Validate outputs before passing them to the next stage.
-   Handle malformed output, timeouts, refusals, and tool errors.
-   Avoid adding LLM calls where ordinary code would be more reliable,
    cheaper, or simpler.

### Key distinction

**Prompt chaining is about how LLM calls are composed.** Sequential
execution is the broader execution pattern. Prompt chaining often uses
sequential execution, but not every sequential workflow requires an LLM.

------------------------------------------------------------------------

## 3. Dependency graphs

### What it means

A dependency graph represents workflow tasks as nodes and dependencies
as directed edges. It makes clear which tasks must finish before others
can begin.

A common representation is a directed acyclic graph (DAG), although real
agent systems can also contain loops and conditional transitions.

### Example: Product replacement workflow

Suppose a customer asks to replace a damaged product.

-   **A:** Retrieve the order.
-   **B:** Check replacement inventory.
-   **C:** Check warranty eligibility.
-   **D:** Decide whether replacement is allowed, using the results of
    A, B, and C.
-   **E:** Create the replacement shipment, if authorized.

B and C may be independent and can run in parallel. D must wait for the
required results. E must wait for D and any necessary authorization.

``` text
          A: Retrieve order
          /              \
 B: Check inventory    C: Check warranty
          \              /
           D: Evaluate eligibility
                     |
           E: Create shipment
```

Depending on the actual business rules, A may also be required before B
or C. The graph should reflect real prerequisites rather than assume
every task is independent.

### Why does a step wait?

A node waits when one or more of its required predecessor nodes have not
completed successfully. A scheduler can run a node when its
prerequisites are satisfied.

### Benefits

-   Reveals opportunities for parallel execution.
-   Helps avoid running a task before its inputs exist.
-   Supports clearer failure handling and retry strategies.
-   Makes it easier to identify critical-path tasks.

------------------------------------------------------------------------

## 4. How the three concepts differ

  -----------------------------------------------------------------------
  Concept           Main focus        Why a step waits  Example
  ----------------- ----------------- ----------------- -----------------
  Sequential        Execution order   Earlier step must Validate a
  execution                           complete first    payment before
                                                        submitting it

  Prompt chaining   LLM-call          Next prompt needs Extract
                    composition       the previous      requirements,
                                      model output      then design
                                                        architecture

  Dependency graph  Relationships     Required          Check inventory
                    among tasks       predecessor nodes and warranty in
                                      are incomplete    parallel, then
                                                        decide
  -----------------------------------------------------------------------

These concepts are related, not mutually exclusive. A workflow can use a
dependency graph to orchestrate several prompt chains, with sequential
execution inside each chain and parallel execution between independent
branches.

------------------------------------------------------------------------

## 5. Claude certification perspective

When answering scenario-based questions, reason from the workflow
requirements rather than memorizing a label.

Ask:

1.  **What input does this step require?** If it needs a previous
    result, identify the dependency.
2.  **Are the tasks genuinely independent?** If yes, consider parallel
    execution.
3.  **Is this a model call or an ordinary operation?** Use an LLM when
    language understanding or generation is needed; use deterministic
    code for straightforward validation and business rules.
4.  **What must be validated?** Check tool arguments, outputs, schemas,
    identity, permissions, and business constraints as appropriate.
5.  **What happens on failure?** Define bounded retries, timeouts, error
    handling, and a safe stopping condition.
6.  **Does this action need approval?** High-impact or out-of-authority
    actions must not proceed merely because the model requested them.

Certification exams can use different terminology across courses. Treat
this guide as a conceptual study aid and compare the wording with the
current official course material.

------------------------------------------------------------------------

## 6. Agent loop example: refund processing

Consider an agent asked to refund an order.

1.  Receive the request.
2.  Authenticate the caller and check authorization.
3.  Retrieve the order.
4.  Check refund eligibility and calculate the permitted amount.
5.  If the amount exceeds the agent's authority, stop and request an
    authorized human decision.
6.  If approved and permitted, call the refund tool.
7.  Verify the tool result and report the outcome.

### What should the agent do if it is stuck?

If the same tool call repeatedly returns the same empty result, the
agent should not continue looping indefinitely. It should recognize that
no new information is being produced, apply a bounded retry policy if
appropriate, and then stop, report the blocker, or escalate.

### Certification principle

A well-designed agent is not one that keeps acting. It is one that makes
progress, checks prerequisites, respects authority, and knows when to
stop.

------------------------------------------------------------------------

## 7. Practice questions

Try answering each question before looking at the explanation.

### Question 1 --- Sequential execution

An agent must read a file, extract its data, validate the extracted
data, and then save the validated result. Which design is most
appropriate?

A. Run every step concurrently\
B. Run the dependent steps in sequence\
C. Skip validation to reduce latency\
D. Repeat the extraction until the output changes

**Answer: B.** Each step depends on the previous result. Parallelism is
only appropriate for independent tasks.

### Question 2 --- Prompt chaining

A system uses one Claude call to summarize a document and a second
Claude call to turn that summary into action items. What pattern is
this?

A. Prompt chaining\
B. Random execution\
C. Unrelated parallelism\
D. Authentication

**Answer: A.** The second LLM call consumes the first call's output.

### Question 3 --- Dependency graph

An agent must check inventory and warranty eligibility. Neither check
needs the other's result. A final decision requires both results. What
should happen?

A. Run the checks in parallel, then make the decision\
B. Make the decision before either check completes\
C. Run the same inventory check indefinitely\
D. Skip the warranty check

**Answer: A.** The checks are independent; the final decision has
dependencies on both.

### Question 4 --- Repeated empty result

An agent issues the same database query with identical parameters and
receives the same empty result every time. No new information is
available. What is the best response?

A. Continue forever\
B. Increase the number of identical retries without a limit\
C. Detect lack of progress, stop after the defined retry policy, and
report or escalate the blocker\
D. Invent a result

**Answer: C.** Agents need loop controls and explicit stop conditions.

### Question 5 --- Authorization boundary

A refund agent discovers that a refund exceeds its authorization limit.
It has no alternative permitted path. What should it do?

A. Issue the refund anyway\
B. Ask the model to ignore the limit\
C. Stop the action and escalate for authorized approval\
D. Split the refund into smaller calls to evade the limit

**Answer: C.** The agent must respect authorization boundaries and must
not evade controls.

### Question 6 --- Output validation

A Claude call is expected to return JSON conforming to a defined schema.
What should the application do before using the output in a
consequential next step?

A. Trust the output because it came from an LLM\
B. Parse and validate it, then handle invalid output safely\
C. Skip validation when the prompt is detailed\
D. Execute any tool names mentioned in the text

**Answer: B.** Structured output still needs application-side validation
and appropriate authorization checks.

### Question 7 --- Parallelism and dependencies

A dependency graph has tasks A and B with no dependency between them.
Task C requires both A and B. Which statement is correct?

A. C can always start immediately\
B. A and B may run concurrently; C must wait for its required inputs\
C. A must always wait for B\
D. The graph means every task must be sequential

**Answer: B.** Independent tasks can run concurrently, while dependent
tasks wait for their prerequisites.

### Question 8 --- Prompt chaining versus sequential execution

Which statement is most accurate?

A. They mean exactly the same thing in every context\
B. Prompt chaining specifically connects LLM calls; sequential execution
is a broader ordering pattern\
C. Prompt chaining always permits full parallel execution\
D. Sequential execution is only used for LLMs

**Answer: B.** Prompt chaining is a particular composition pattern that
commonly runs sequentially.

------------------------------------------------------------------------

## 8. Quick revision notes

-   **Sequential execution:** Do steps in order when ordering or outputs
    require it.
-   **Prompt chaining:** Feed one LLM call's output into the next.
-   **Dependency graph:** Map prerequisites and identify tasks that can
    run concurrently.
-   **Wait condition:** A required input, predecessor, validation, or
    authorization gate is not yet satisfied.
-   **Parallelism:** Use it only when tasks are independent and the
    tools and system can safely support concurrent execution.
-   **Loop control:** Detect repeated no-progress behavior; use bounded
    retries, timeouts, and explicit stop/escalation paths.
-   **Safety:** Model output is not authorization. Validate data and
    enforce permissions in application code.

## Final takeaway

The central question behind the image is: **Does this step need
something that has not happened yet?**

If yes, wait for that prerequisite. If no, the step may be eligible to
run in parallel. Prompt chaining explains how LLM calls pass information
forward, while dependency graphs help an orchestrator determine the
correct execution order and find safe opportunities for concurrency.
