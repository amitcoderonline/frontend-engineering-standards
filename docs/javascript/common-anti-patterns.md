# Common Anti-Patterns

## Purpose

A short catalog of patterns that repeatedly hurt frontend maintainability. Prefer the linked topic docs for depth.

## Why it matters

These show up in PRs even when tests pass: implicit globals, god components, copy-pasted fetch logic, and “clever” one-liners nobody can change.

## Recommended approach

Fix the anti-pattern at the source (shared client, named constant, smaller component) rather than adding comments that say “do not copy this”.

### Implicit any and `any` escape hatches

### ❌ Avoid

```ts
function parse(payload: any) {
  return payload.items.map((i: any) => i.id);
}
```

### ✅ Recommended

```ts
function parse(payload: OrderListResponse): string[] {
  return payload.items.map((item) => item.id);
}
```

### Copy-pasted fetch in every component

Extract `getJson`/`postJson` once. See [async/await](async-await-and-promises.md).

### Mutating React/Angular state in place

See [arrays and objects](arrays-and-objects.md).

### Magic strings for UI flow

See [constants and enums](constants-and-enums.md).

### Nested callbacks instead of `async`/`await`

### ❌ Avoid

```ts
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    render(orders);
  });
});
```

### ✅ Recommended

```ts
const user = await getUser(id);
const orders = await getOrders(user.id);
render(orders);
```

### Doing too much in a template

Move formatting, permission checks, and sorting into functions or pipes/selectors so templates stay declarative.

## Common mistakes

- “We’ll type it later” `as any` left in merged code.
- Shared `utils.ts` dumping unrelated helpers.
- Feature flags checked with raw strings in ten files.

## Quick checklist

- [ ] No new `any` without a ticket/comment and a type plan
- [ ] HTTP and auth live in one place
- [ ] Templates do not contain business rules
- [ ] New code does not deepen callback pyramids
