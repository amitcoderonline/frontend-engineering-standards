# Types vs Interfaces

## Purpose

Choose `type` or `interface` consistently so public shapes are easy to extend and unions stay correct.

## Why it matters

Both can describe object shapes. Mixing styles in one module, or using `interface` for unions, confuses reviews. The compiler treats them differently for declaration merging and unions.

## Recommended approach

**Default:** `interface` for object shapes that components/services implement or extend (props, entities). `type` for unions, mapped types, and aliases (`RequestStatus`, function types).

**Acceptable alternative:** `type` for all object aliases if the team already standardized on types-only.

**When the alternative is appropriate:** a greenfield React app that wants one keyword; document it and do not mix randomly.

### ❌ Avoid

```ts
type User = { id: string };
interface User { email: string } // accidental merge / conflict depending on form
```

### ✅ Recommended

```ts
export interface User {
  id: string;
  email: string;
}

export type UserId = User['id'];

export type PaymentMethod = 'card' | 'wallet' | 'invoice';
```

Do not use `interface` for a union of string literals—that is a `type`.

Declaration merging (`interface` reopened in another file) is powerful and dangerous. Prefer explicit `extends` over accidental merges.

## Common mistakes

- Empty interfaces used only to “brand” primitives—use a branded `type` instead if you need that.
- Exporting both `IUser` and `User` for the same shape (C# habit). Skip the `I` prefix in TypeScript apps.

## Quick checklist

- [ ] Unions and aliases use `type`
- [ ] Extendable object contracts use `interface` (or the documented types-only rule)
- [ ] No `I` prefix on models
- [ ] No accidental declaration merging
