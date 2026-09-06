# Contributing

Changes to this repository become the default guidance for multiple application teams. Keep updates practical, example-driven, and easy to enforce in tooling.

## Process

1. **Create a branch.** Use a short name that matches the topic, for example `docs/js-error-handling` or `fix/react-hooks-checklist`.
2. **Update or add the guideline.** Prefer editing the existing file in `docs/` over creating a parallel document with a similar name.
3. **Include real code examples.** Use TypeScript unless the topic requires plain JavaScript. Show frontend situations (forms, API clients, buttons, lists), not abstract `Foo`/`Bar` samples.
4. **Explain the reasoning.** Say how the practice helps maintainability, readability, consistency, or scale. If more than one approach is valid, label:
   - **Default recommendation**
   - **Acceptable alternative**
   - **When the alternative is appropriate**
5. **Open a pull request.** Summarize what changed and which application teams are affected.
6. **Review with frontend architects or maintainers.** Call out anything that needs a team decision (for example branching model or state library).
7. **Merge after approval.** After merge, update application ESLint, TypeScript, tests, or CI when the new rule can be automated.

## Document shape

New or substantially rewritten Markdown files should include:

1. A clear title
2. Purpose
3. Why the practice matters
4. Recommended approach
5. Bad example
6. Good example
7. Explanation
8. Common mistakes
9. Recommended team standard
10. Quick checklist
11. Learner exercise where it helps juniors practice the idea

Shorter drafts are acceptable for first versions if they still include purpose, key recommendations, examples, common mistakes, and a checklist. Do not merge empty heading-only files.

Use these markers consistently:

```text
❌ Avoid
✅ Recommended
⚠️ Use with care
```

## Examples folder

Put copy-paste snippets in [examples/good-examples](examples/good-examples) and [examples/bad-examples](examples/bad-examples). Link them from the related guideline when the snippet is more than a few lines.

## What not to do

- Do not store secrets, tokens, or production URLs in examples.
- Do not present one library as mandatory when several are valid—state the default and the alternative.
- Do not add academic language that does not help someone shipping UI this week.
