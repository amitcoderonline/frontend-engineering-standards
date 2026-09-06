# Pull Request Guidelines

## Purpose

PRs are the handoff: reviewers verify design, security, and missed tests. Authors make that cheap.

## Why it matters

A 40-file PR with no description gets rubber-stamped or stalled. Small PRs with a test plan catch constants, XSS, and a11y issues faster.

## Recommended approach

**Default:** one problem per PR. Description includes why, screenshots for UI, and how to test. Link the standard you followed when relevant.

**Acceptable alternative:** a stacked/stacked-diff workflow if the team uses it.

**When the alternative is appropriate:** a large migration split into ordered PRs that cannot ship independently.

### ❌ Avoid

Title: `updates`. Body empty. 2,000-line generated screenshot diffs mixed with a security change.

### ✅ Recommended

```md
## Why
Order badges used magic strings and showed the wrong label after copy changes.

## How
Introduced REQUEST_STATUS and BUTTON_LABEL per frontend-engineering-standards.

## Test
- [ ] Unit tests for badge mapping
- [ ] Pending/approved/rejected in the orders table
```

Keep review comments about the code, not the person. Authors should not merge failing CI without a documented exception.

## Common mistakes

- “LGTM” on files not opened.
- Scope creep in review (“while you are here, rewrite the store”).
- Merging with `console.log` and skipped tests.

## Quick checklist

- [ ] Description + test plan
- [ ] CI green
- [ ] Docs/examples updated if a standard changed
- [ ] Security-sensitive files called out
