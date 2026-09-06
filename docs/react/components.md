# React Components

## Purpose

Keep React components small, typed, and predictable: props in, events out, no hidden global writes.

## Why it matters

Components that fetch, format, and render everything are hard to reuse and snapshot-test. Implicit mutation of props breaks memoization.

## Recommended approach

**Default:** function components. Presentational components receive data; containers/hooks load it. Colocate the component with its CSS/test.

**Acceptable alternative:** a class component only for an error boundary or a legacy library.

**When the alternative is appropriate:** you need `componentDidCatch` and have not adopted a function-based boundary yet.

### ❌ Avoid

```tsx
export function OrderCard(props: any) {
  props.order.selected = true;
  return <div onClick={() => fetch('/api/select')}>{props.order.name}</div>;
}
```

### ✅ Recommended

```tsx
export interface OrderCardProps {
  order: Order;
  onSelect: (orderId: string) => void;
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
  return (
    <article>
      <h2>{order.name}</h2>
      <button type="button" onClick={() => onSelect(order.id)}>
        Select
      </button>
    </article>
  );
}
```

Lists need stable `key`s (ids, not array indexes) when items can reorder.

## Common mistakes

- Using indexes as keys for sortable lists.
- Giant `App.tsx` routes + screens + fetch.
- Conditional hooks (see [hooks](hooks.md)).

## Quick checklist

- [ ] Props are typed
- [ ] Props are not mutated
- [ ] Keys are stable ids
- [ ] Side effects live in hooks, not in render
