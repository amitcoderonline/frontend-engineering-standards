# Test Naming

## Purpose

A failing test name should tell you the scenario and the expectation without opening the file.

## Why it matters

`it('works')` forces every failure into a debugging session. Consistent names also double as living documentation of the feature.

## Recommended approach

**Default:** `it('does X when Y')` or `it('[unit] returns empty list when the API returns no items')`. Include the condition and the outcome.

**Acceptable alternative:** nested `describe` blocks for the unit name plus short `it` clauses.

**When the alternative is appropriate:** many cases share a setup (`describe('OrderStatusBadge')`).

### ❌ Avoid

```ts
it('test1', () => { /* ... */ });
it('should work correctly', () => { /* ... */ });
```

### ✅ Recommended

```ts
describe('canEditOrders', () => {
  it('returns true for admin and editor roles', () => {
    expect(canEditOrders(USER_ROLE.ADMIN)).toBe(true);
    expect(canEditOrders(USER_ROLE.EDITOR)).toBe(true);
  });

  it('returns false for viewer', () => {
    expect(canEditOrders(USER_ROLE.VIEWER)).toBe(false);
  });
});
```

Prefer domain language (`pending request`) over implementation (`sets state.flag`).

## Common mistakes

- Duplicating the assertion in the name and then changing only one.
- File names that do not match the source (`utils.test.ts` for `orderTotals.ts`).

## Quick checklist

- [ ] Name states condition + result
- [ ] File name tracks the unit
- [ ] No numbered tests (`test1`)
- [ ] Role/status values use constants, not mystery strings
