# Dependency Security

## Purpose

Third-party packages run with the same privileges as your app. Keep them current, minimal, and reviewed.

## Why it matters

A tiny date helper can ship a prototype-polluting update. Lockfiles exist so CI installs what you reviewed, not “latest”.

## Recommended approach

**Default:** commit the lockfile. Run `npm audit` / `pnpm audit` / Dependabot/Renovate in CI. Prefer well-maintained libraries over copy-pasting gists. Pin actions and image versions in CI.

**Acceptable alternative:** allow an advisory if it does not affect the browser path and the team recorded a waiver with an expiry date.

**When the alternative is appropriate:** a transitive dev-only CVE with no runtime exploit; still schedule an upgrade.

### ❌ Avoid

```json
{
  "dependencies": {
    "left-pad": "*",
    "lodash": "*"
  }
}
```

### ✅ Recommended

- Add a package only when you would maintain the code yourself otherwise.
- Review install scripts (`postinstall`) on unfamiliar packages.
- Do not commit `node_modules`.
- Remove unused dependencies in the same PR that deletes the last import.

Team decision: who auto-merges patch bots, and the SLA for high-severity CVEs.

## Common mistakes

- Installing a full icon library for two icons.
- `--force` / `--legacy-peer-deps` as a permanent habit.
- Private packages from unknown registries.

## Quick checklist

- [ ] Lockfile committed
- [ ] Audit in CI
- [ ] New deps justified in the PR
- [ ] High-severity issues have an owner and date
