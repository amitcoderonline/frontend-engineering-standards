# Example: Verifying an Unsupervised Claude Code Run

Let's take a **realistic Angular project example**.

Imagine you tell Claude:

```text
Implement refresh-token support in the Angular authentication flow.
Update the interceptor, authentication service, and tests.
Run all tests before finishing.
```

You then leave Claude running **without watching it**.

This is an **unsupervised run**.

---

## 1. Claude Starts the Task

Claude might work on:

```text
src/app/auth/auth.service.ts
src/app/auth/auth.interceptor.ts
src/app/auth/token.service.ts
src/app/auth/auth.service.spec.ts
```

It may also decide to modify:

```text
package.json
```

or other files.

You don't know yet whether those changes are necessary.

---

# 2. Claude Says "Done"

Claude eventually reports:

```text
Implemented refresh-token support.

- Added token refresh logic
- Updated HTTP interceptor
- Added unit tests
- All tests pass
```

### Should you trust it?

**No—not yet.**

This is the key idea of the lesson:

> Claude's report is not independent evidence.

---

# 3. First Verification — Check Git Status

Start with:

```bash
git status
```

You might see:

```text
modified:
  src/app/auth/auth.service.ts
  src/app/auth/auth.interceptor.ts
  src/app/auth/token.service.ts
  src/app/auth/auth.service.spec.ts
  package.json
```

Immediately ask:

> Why did `package.json` change?

Maybe Claude installed a dependency you didn't ask for.

---

# 4. Second Verification — Check Diff Statistics

Run:

```bash
git diff --stat
```

Example:

```text
src/app/auth/auth.service.ts        | 45 +++++++++++++
src/app/auth/auth.interceptor.ts    | 28 ++++++++
src/app/auth/token.service.ts       | 31 +++++++++
src/app/auth/auth.service.spec.ts   | 52 ++++++++++++++
package.json                        |  2 +
```

Now you know the scope of the change.

---

# 5. Third Verification — Inspect the Actual Diff

Run:

```bash
git diff
```

Now you might discover:

```diff
+ refreshToken(): Observable<Token> {
+   return this.http.post('/refresh', ...);
+ }
```

Looks reasonable.

But then you find:

```diff
- if (response.status === 401) {
+ if (response.status === 401 || response.status === 403) {
```

You need to ask:

> Was changing 403 behavior actually required?

And perhaps you discover:

```diff
+ localStorage.setItem('refresh_token', token);
```

Now you have a **security concern**.

The original Claude summary didn't mention it.

This is exactly why:

```text
Claude summary
     ≠
Verification
```

---

# 6. Fourth Verification — Run Tests Yourself

Don't rely on:

```text
Claude:
"All tests passed."
```

Run them yourself:

```bash
npm test
```

Suppose the result is:

```text
Test Suites: 18 passed, 18 total
Tests:       241 passed, 241 total
```

Good.

But you're not finished.

---

# 7. Fifth Verification — Run Type Checking

For TypeScript:

```bash
npm run typecheck
```

Suppose:

```text
Found 0 errors.
```

Good.

---

# 8. Sixth Verification — Run Lint

```bash
npm run lint
```

Result:

```text
✔ No lint errors found.
```

Now you have another independent signal.

---

# 9. Seventh Verification — Build

For Angular:

```bash
npm run build
```

Suppose:

```text
Application bundle generation complete.
```

Now:

```text
Tests       PASS
Typecheck   PASS
Lint        PASS
Build       PASS
```

This is much stronger evidence than Claude simply saying:

```text
"Done."
```

---

# 10. Eighth Verification — Run `/code-review`

Now ask Claude to review the changes:

```text
/code-review
```

You can also explicitly ask:

```text
Review the current changes independently.

Focus on:
- authentication security
- token lifecycle
- race conditions
- error handling
- Angular architecture
- regressions
```

Suppose the review identifies:

```text
Potential issue:

The refresh token is stored in localStorage.
Consider whether the application's security model
requires a more secure storage strategy.
```

Excellent.

You just found something that wasn't obvious from the original implementation.

---

# 11. Ninth Verification — Get a Cold Second Opinion

This is even stronger.

Start a **fresh Claude session**.

Don't give it the previous conversation.

Ask:

```text
Review the current git diff independently.

You did not implement these changes.

Focus specifically on:
1. Authentication security
2. Refresh-token lifecycle
3. Race conditions
4. Error handling
5. Backward compatibility
6. Angular interceptor behavior
7. Test coverage

Do not assume the implementation is correct.
Identify anything that could cause a production problem.
```

Now you have:

```text
Claude A
    ↓
Implemented code

Claude B
    ↓
Fresh review
```

Claude B doesn't have the same assumptions Claude A had.

---

# 12. Tenth Verification — Check the Tests Were Not Weakened

This is a **very important point**.

Suppose Claude says:

```text
All tests pass.
```

But when you inspect the diff, you discover:

```diff
- expect(response.status).toBe(401);
+ expect(true).toBe(true);
```

The tests pass—but the test was weakened.

Therefore:

```text
Green tests
     ≠
Good implementation
```

You need to check:

```text
Did Claude add useful tests?
Did Claude modify existing tests?
Did Claude remove assertions?
Did Claude reduce coverage?
```

---

# 13. The Complete Example

Your overnight workflow becomes:

```text
11:00 PM
   |
   v
Claude starts
   |
   v
Implement refresh-token support
   |
   v
Claude modifies files
   |
   v
Claude runs tests
   |
   v
Claude says "Done"
   |
   |
   |  YOU DID NOT WATCH
   |
   v
Morning
   |
   v
git status
   |
   v
git diff --stat
   |
   v
git diff
   |
   v
/code-review
   |
   v
npm test
   |
   v
npm run lint
   |
   v
npm run typecheck
   |
   v
npm run build
   |
   v
Fresh Claude review
   |
   v
Human review
   |
   v
MERGE
```

---

# 14. How Hooks Make This Even Better

Instead of relying on you to remember everything, automate verification.

### PostToolUse Hook

After Claude edits TypeScript:

```text
Claude edits file
      ↓
PostToolUse
      ↓
npm run lint
      ↓
npm run typecheck
```

### Stop Hook

When Claude wants to finish:

```text
Claude wants to stop
        ↓
Stop Hook
        ↓
npm test
        ↓
PASS → Claude can finish
FAIL → exit 2
        ↓
Claude receives failure
        ↓
Claude fixes problem
```

Now you have:

```text
Claude
  ↓
Automatic verification
  ↓
Evidence
```

instead of:

```text
Claude
  ↓
"I think it works"
```

---

# 15. GitHub Actions Example

This same concept applies to an unattended GitHub Action.

```text
Pull Request
     ↓
GitHub Action
     ↓
Claude
     ↓
Modify code
     ↓
Tests
     ↓
Lint
     ↓
Build
     ↓
Review
     ↓
PR result
```

For example:

```yaml
- name: Install dependencies
  run: npm ci

- name: Test
  run: npm test

- name: Lint
  run: npm run lint

- name: Typecheck
  run: npm run typecheck

- name: Build
  run: npm run build
```

The important point is that **GitHub executes these commands**.

You aren't trusting Claude's statement that they passed.

---

# 16. The Certification Concept

Remember this distinction:

```text
CLAUDE SAYS:
"Tests passed."
        ↓
Claim


CI ACTUALLY RUNS:
npm test
        ↓
Evidence
```

And:

```text
AUTO MODE
→ Is this action safe?

TESTS
→ Does the code work?

CODE REVIEW
→ Are there problems?

DIFF
→ What actually changed?

SECOND OPINION
→ Did another perspective find anything?
```

---

# 17. Certification Question

### Question

Claude performs an unattended task overnight and reports:

> "Implementation completed successfully. All tests passed."

What should you do?

### Best answer

Do **not** rely solely on Claude's report.

You should:

```text
1. Inspect git status
2. Inspect git diff
3. Check that changes are expected
4. Verify tests independently
5. Run lint/typecheck/build
6. Review the changes
7. Consider a cold second opinion
```

### Memory Trick

> **Don't verify what Claude says. Verify what Claude changed.**

And for certification:

> **The less you watched, the more you verify.**
