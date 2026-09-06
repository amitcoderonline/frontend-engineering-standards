# React Hooks

## Purpose

Use hooks with a consistent dependency discipline so effects do not loop, stale, or violate the rules of hooks.

## Why it matters

Effects that fetch without cleanup race. `useMemo` used as a “performance spell” hides expensive work that should not run on the client at all.

## Recommended approach

**Default:** `useState`/`useReducer` for local state; custom hooks for reusable behavior (`useOrder`, `useDebouncedValue`). Effects synchronize with the outside world, they do not replace derived values.

**Acceptable alternative:** a library hook (`useQuery`) instead of hand-rolled fetch effects.

**When the alternative is appropriate:** caching, retries, and deduping matter; do not reinvent React Query/SWR in every app unless the team chose not to add a dependency.

### ❌ Avoid

```tsx
function OrderTitle({ orderId }: { orderId: string }) {
  const [title, setTitle] = useState('');
  if (orderId) {
    useEffect(() => {
      fetch(`/api/orders/${orderId}`).then(/* ... */);
    });
  }
  return <h1>{title}</h1>;
}
```

Hooks cannot sit behind conditions.

### ✅ Recommended

```tsx
function useOrderTitle(orderId: string) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    void (async () => {
      const res = await fetch(`/api/orders/${orderId}`, { signal: ac.signal });
      const order = (await res.json()) as Order;
      setTitle(order.name);
    })();
    return () => ac.abort();
  }, [orderId]);

  return title;
}
```

Compute derived data during render (`const total = items.reduce(...)`) instead of storing it in an effect.

## Common mistakes

- Missing effect cleanup for `fetch` and subscriptions.
- Putting objects in dependency arrays that are new every render without `useMemo` (or better, stabilizing at the parent).
- `useEffect` to copy props into state (“sync”) causing extra renders.

## Quick checklist

- [ ] Hooks run unconditionally at the top level
- [ ] Effects have the right dependencies and cleanup
- [ ] Derived values are not duplicated in state
- [ ] Custom hooks named `useSomething`
