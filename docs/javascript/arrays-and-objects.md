# Arrays and Objects

## Purpose

Use arrays and objects in a way that stays immutable-by-default in UI state, with clear updates and no accidental shared mutation.

## Why it matters

Frontend bugs often come from mutating state that React/Angular still thinks is the previous value, or from `for` loops that are harder to read than `map`/`filter`.

## Recommended approach

**Default:** treat state as immutable. Use `map`, `filter`, `slice`, spread, and structured clone where needed.

**Acceptable alternative:** in-place mutation in a local, non-state builder (for example assembling a payload in a loop inside one function).

**When the alternative is appropriate:** tight loops over large lists in a worker or a one-off parser, documented and not shared as app state.

### ❌ Avoid

```ts
function addTag(order: Order, tag: string): Order {
  order.tags.push(tag);
  return order;
}
```

### ✅ Recommended

```ts
function addTag(order: Order, tag: string): Order {
  return {
    ...order,
    tags: [...order.tags, tag]
  };
}
```

Lookup maps beat nested searches when you key by id:

```ts
const orderById = new Map(orders.map((order) => [order.id, order]));
```

⚠️ Use with care: `JSON.parse(JSON.stringify(x))` drops dates, maps, and undefined. Prefer structuredClone or explicit mappers.

## Common mistakes

- Using `forEach` to build an array instead of `map`.
- Spreading nested objects once and mutating a nested field.
- Depending on object key order for UI except for insertion-ordered string keys you control.

## Quick checklist

- [ ] State updates create new objects/arrays
- [ ] Nested updates copy each changed level
- [ ] Transformations use `map`/`filter`/`reduce` when they clarify intent
