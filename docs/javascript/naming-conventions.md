# Naming Conventions

## Purpose

Consistent names make search, review, and onboarding faster. This guideline covers files, functions, variables, booleans, components, and TypeScript types in frontend apps.

## Why it matters

A reader should guess what a symbol does from its name. Inconsistent casing (`userId` vs `user_id` vs `UserID`) causes duplicate helpers and missed refactors.

## Recommended approach

**Default:** camelCase for values and functions, PascalCase for types/components/classes, SCREAMING_SNAKE_CASE for true constants (see [constants and enums](constants-and-enums.md)), kebab-case or consistent framework file names as the app already uses.

**Acceptable alternative:** match Angular/React CLI defaults even if they differ slightly (for example `order-list.component.ts`).

**When the alternative is appropriate:** you are inside a generated feature folder; do not invent a second file-naming scheme.

### ❌ Avoid

```ts
const d = new Date();
function doIt(x: any) {
  return x.n;
}
```

### ✅ Recommended

```ts
const orderCreatedAt = new Date();

function getOrderItemCount(order: Order): number {
  return order.items.length;
}
```

Booleans read as questions or states: `isLoading`, `hasError`, `canSubmit` — not `loadingFlag` or `status1`.

Event handlers: `handleSubmit`, `onStatusChange` depending on whether you are defining or passing the callback. Pick one style per framework and stick to it (React often uses `on*` in props and `handle*` in the parent).

## Common mistakes

- Abbreviations only one teammate knows (`cfg`, `btnMgr`).
- Types named like values (`user` for an interface — use `User`).
- File names that do not match the exported component.
- Negated names that force double negatives (`isNotHidden`).

## Recommended team standard

Use domain words from the product (Order, Cart, Rider) rather than generic `Data`/`Info`/`Manager` unless the type is truly generic.

## Quick checklist

- [ ] Name describes behavior or domain concept
- [ ] Booleans read clearly
- [ ] File name matches primary export
- [ ] Casing matches this doc and the framework
