# Branching Strategy

## Purpose

Agree how work flows from a laptop to production so CI, reviews, and hotfixes stay predictable.

## Why it matters

Long-lived personal branches diverge. Direct commits to `main` skip review. This repo **does not** pick GitFlow vs trunk-based for every team—it states a default and asks you to record yours.

## Recommended approach

**Default (trunk-based-friendly):** short-lived branches off `main` (or `master` if that is the default). Open a PR. Merge with CI green. Delete the branch. Hotfixes follow the same path with higher priority review.

**Acceptable alternative:** GitFlow (`develop`, `release/*`, `hotfix/*`) when release trains and multiple supported versions require it.

**When the alternative is appropriate:** packaged products with versioned releases, not continuously deployed SPAs.

### ❌ Avoid

Working for weeks on `johns-branch` with no PR, then merging 80 files on Friday.

### ✅ Recommended

```text
main
  └── feat/order-status-badges   (hours to a few days)
```

Keep `main` deployable. Use feature flags if a partial UI must merge before the API is ready.

**Team decision:** protected branch names, squash vs merge commits, and whether `develop` exists.

## Common mistakes

- Rebasing shared remote branches that others pulled.
- Environment branches (`prod-backup-final-2`) as a substitute for tags.
- Mixing multiple features on one branch.

## Quick checklist

- [ ] Branch name describes the work
- [ ] Lifetime is short
- [ ] `main` is protected
- [ ] Strategy is written in the application repo if it differs
