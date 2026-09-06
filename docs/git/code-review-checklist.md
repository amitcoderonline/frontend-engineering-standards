# Code Review Checklist

## Purpose

A practical list for reviewers of frontend PRs. Use it as a prompt, not a humiliation script.

## Why it matters

Reviewers catch what CI cannot: naming, missing empty states, tokens in code, and “this will not scale to the next three screens.”

## Recommended approach

Skim the PR description first. Run the happy path if UI changed. Then scan for the items below. Ask questions when intent is unclear; request changes when the standard is violated without a reason.

### Correctness and UX

- [ ] Loading, empty, and error states exist
- [ ] Forms prevent double submit
- [ ] Keys/trackBy are stable
- [ ] Copy is not used as a business id ([constants](../javascript/constants-and-enums.md))

### TypeScript and JS

- [ ] No new `any` without a plan
- [ ] Nullish handling is explicit
- [ ] Async work is awaited and errors mapped

### Framework

- [ ] Angular: subscriptions completed; HTTP in services
- [ ] React: hooks rules; no prop mutation

### Security

- [ ] No secrets in the diff
- [ ] No unsanitized HTML
- [ ] Authz not only in the UI

### Tests and ops

- [ ] Tests name the behavior
- [ ] Mocks sit at the boundary
- [ ] Env and feature flags documented

### ❌ Avoid (review anti-pattern)

Nitpicking import order while ignoring a token in `constants.ts`.

### ✅ Recommended

Prioritize security, data loss, and user-facing bugs; then standards; then style (prefer the formatter).

## Common mistakes

- Approving despite red CI “because it works locally.”
- Expanding scope instead of filing a follow-up.
- Ignoring accessibility on new interactive controls.

## Quick checklist

Use the boxes above. For Git process, see [pull requests](pull-request-guidelines.md) and [commits](commit-guidelines.md).
