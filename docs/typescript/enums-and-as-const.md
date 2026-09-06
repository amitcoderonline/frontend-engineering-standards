# Enums and `as const`

## Purpose

This is the TypeScript-focused companion to [Constants and enums](../javascript/constants-and-enums.md). Use it when choosing runtime representation and emitted JavaScript.

## Why it matters

Numeric enums reverse-map and can surprise `Object.keys`. `as const` objects stay plain JSON-friendly values that match APIs.

## Recommended approach

**Default:** `as const` object + derived union for UI and API string sets.

**Acceptable alternative:** string `enum` when matching generated backend enums.

**When the alternative is appropriate:** OpenAPI client already ships `enum OrderStatus { ... }`.

### ❌ Avoid

```ts
enum PageSize {
  Small,
  Medium,
  Large
}

fetch(`/api/items?size=${PageSize.Medium}`); // may send "1", not a business value
```

### ✅ Recommended

```ts
export const PAGE_SIZE = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 50
} as const;

export type PageSize = typeof PAGE_SIZE[keyof typeof PAGE_SIZE];
```

String enums are less surprising than numeric ones:

```ts
enum OrderStatus {
  Open = 'open',
  Closed = 'closed'
}
```

⚠️ Use with care: `const enum` inlining depends on `isolatedModules` / bundler settings. Prefer regular `as const` for app code.

## Common mistakes

- Mixing enum members and raw strings for the same concept.
- Using numeric enums as HTTP query params.

## Quick checklist

- [ ] New closed sets default to `as const`
- [ ] Numeric enums are justified in the PR
- [ ] Derived union is exported next to the object
