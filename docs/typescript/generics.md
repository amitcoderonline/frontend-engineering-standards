# Generics

## Purpose

Use generics to keep helpers reusable without falling back to `any`. Keep parameter names meaningful (`TResponse`, not only `T` when several exist).

## Why it matters

A typed `getJson<T>` prevents every caller from casting. Over-generic APIs (`pipe<A, B, C, D>`) become unreadable.

## Recommended approach

**Default:** add a generic when the caller knows the shape and the function is truly reusable (HTTP, list helpers, form controls).

**Acceptable alternative:** a concrete function per resource (`getOrder`, `getUser`) when there is only one call site.

**When the alternative is appropriate:** wrapping one endpoint; a generic would not be reused.

### ❌ Avoid

```ts
async function getJson(url: string): Promise<any> {
  const res = await fetch(url);
  return res.json();
}
```

### ✅ Recommended

```ts
async function getJson<TResponse>(url: string): Promise<TResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status}`);
  }
  return res.json() as Promise<TResponse>;
}

const order = await getJson<Order>(`/api/orders/${orderId}`);
```

Constrain generics when you actually need a capability:

```ts
function byId<TItem extends { id: string }>(items: TItem[], id: string): TItem | undefined {
  return items.find((item) => item.id === id);
}
```

## Common mistakes

- Defaulting `T` to `any`.
- Six type parameters for a function that maps one list.
- Using generics to hide a bad union that should be a discriminated union.

## Quick checklist

- [ ] Generic is inferred or passed at the call site, not `any`
- [ ] Constraints match real usage
- [ ] One-off endpoints can stay concrete
