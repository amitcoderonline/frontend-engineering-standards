# Commit Guidelines

## Purpose

Commits should tell a story a reviewer can bisect. Prefer small, focused snapshots over “WIP” dumps.

## Why it matters

`git blame` and revert depend on messages that describe **why**. Mixed commits (fmt + feature + lockfile bump) make review and rollback painful.

## Recommended approach

**Default:** imperative mood, area prefix optional: `fix(orders): prevent double submit on save`. One logical change per commit when practical.

**Acceptable alternative:** Conventional Commits if the team uses changelog tooling.

**When the alternative is appropriate:** you generate release notes from `feat:`/`fix:` prefixes—then the format is mandatory.

### ❌ Avoid

```text
update
fix stuff
WIP
```

### ✅ Recommended

```text
fix(auth): map 409 conflicts to a refresh message

The save button retried the original payload and overwrote
newer server data. Surface the conflict instead of retrying POST.
```

Do not commit secrets. Do not commit generated `dist/` unless the repo’s documented artifact policy requires it.

## Common mistakes

- Committing `.env`.
- Huge “address review comments” commits with no message body.
- Rewriting published history on shared branches.

## Quick checklist

- [ ] Subject explains why, not only “updated files”
- [ ] No unrelated formatting in a behavior commit
- [ ] Secrets scan mentally (and via hook if available)
- [ ] Message would help a revert in six months
