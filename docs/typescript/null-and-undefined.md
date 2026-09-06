# Null and Undefined

## Purpose

Be explicit about missing values so templates and optional chaining do not hide bugs. Align with `strictNullChecks`.

## Why it matters

`null` vs `undefined` vs omitted fields come from JSON, forms, and uninitialized state. Mixing them (`user.name || 'Guest'` treating `''` as missing) causes wrong UI.

## Recommended approach

**Default:** `undefined` for “not set yet” in app state; `null` when the API uses JSON `null`. Enable `strictNullChecks`. Prefer explicit checks over `||` for defaults.

**Acceptable alternative:** normalize all empties to `undefined` at the HTTP mapper so the rest of the app has one missing-value style.

**When the alternative is appropriate:** a chaotic API that mixes `null`, `''`, and missing keys.

### ❌ Avoid

```ts
const label = user.displayName || 'Unknown';
```

`0`, `''`, and `false` are swallowed if you reuse this pattern on non-strings.

### ✅ Recommended

```ts
const label = user.displayName ?? 'Unknown';
```

Narrow before use:

```ts
function getEmail(user: User | null): string {
  if (user === null) {
    return '';
  }
  return user.email;
}
```

⚠️ Use with care: optional chaining `user?.address?.city` is good for display, bad as a substitute for validating a required checkout field.

## Common mistakes

- `!` non-null assertions to silence the compiler.
- Optional props that are actually required after load (`order?: Order` forever).
- Sending `undefined` in JSON expecting the key to appear as `null`.

## Quick checklist

- [ ] `strictNullChecks` is on
- [ ] `??` for defaults, not `||`, unless you intend to treat falsy as empty
- [ ] API mappers document null vs undefined
- [ ] No stray `!` in feature code
