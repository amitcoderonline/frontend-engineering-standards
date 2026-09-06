# Type-Safety Best Practices

## Purpose

Make TypeScript earn its keep: catch real bugs, not just satisfy `tsc`. Avoid types that lie (`as Order` on unknown JSON).

## Why it matters

`any`, overly wide `string`, and assertions move failures to runtime (usually production). Discriminated unions make loading/error UI exhaustive.

## Recommended approach

**Default:** `strict` compiler options; type API responses with interfaces; use discriminated unions for UI state; validate at the boundary if the server is untrusted.

**Acceptable alternative:** a single `as Order` immediately after a runtime schema parse (Zod/io-ts).

**When the alternative is appropriate:** you validated the payload; the assertion is the last step, not the first.

### ❌ Avoid

```ts
const data = (await res.json()) as Order;
data.items[0].price.toFixed(2);
```

### ✅ Recommended

```ts
type OrderViewState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; order: Order }
  | { status: 'error'; message: string };

function priceLabel(state: OrderViewState): string {
  if (state.status !== 'success') {
    return '';
  }
  return state.order.total.toFixed(2);
}
```

Prefer `unknown` + narrowing over `any`. Prefer `satisfies` (when available) to check objects against a type without widening.

Do not disable `noImplicitAny` for convenience.

## Common mistakes

- Exporting `Record<string, any>` for “flexible” props.
- Catch clauses typed as `any`.
- Duplicate interfaces that drift from the real API.

## Quick checklist

- [ ] `strict` is enabled in application `tsconfig`
- [ ] UI state uses a discriminated union where it helps exhaustiveness
- [ ] Assertions only after validation
- [ ] Public functions have explicit return types when inference hides errors
