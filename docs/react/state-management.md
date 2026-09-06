# React State Management

## Purpose

Choose local state, context, or an external store based on how widely the data is shared—not based on what is fashionable.

## Why it matters

Context for high-frequency values (mouse position) re-renders large trees. Redux for a single checkbox is ceremony. Server cache mixed with “is modal open” in one blob is hard to debug.

## Recommended approach

**Default:** `useState`/`useReducer` in the component that owns the UI. Lift state to the nearest common parent. Context for rare updates (theme, auth). A server-state library for HTTP cache. A client store (Redux, Zustand, Jotai, etc.) when many distant features share client-only state with complex updates.

**Acceptable alternative:** one global store if the product already standardized on it.

**When the alternative is appropriate:** multiple teams, established middleware, and existing DevTools workflows.

### ❌ Avoid

```tsx
<AppContext.Provider value={{ ...everything, setEverything }}>
  <Page />
</AppContext.Provider>
```

### ✅ Recommended

```tsx
function OrderFilter() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

Split server state (`useOrdersQuery`) from ephemeral UI state (`isFiltersOpen`).

Team decision: which store library is **not** fixed in this repo. Record it in the application.

## Common mistakes

- Storing derived lists in global state.
- Context value as a new object every render without memoizing (when it actually causes pain).
- Fetching in Redux thunks and also in `useEffect`.

## Quick checklist

- [ ] State lives as close as possible to usage
- [ ] Server cache is not reinvented ad hoc
- [ ] Global store PRs explain the sharing need
- [ ] Updates are immutable
