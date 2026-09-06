# React Best Practices

## Purpose

Habits that keep React apps maintainable: keys, purity, accessibility, and where data fetching lives.

## Why it matters

Impure render (random IDs, mutating arrays during render) causes flickering and impossible tests. Accessibility is easier to bake in than retrofit.

## Recommended approach

**Default:** render is pure. Side effects in hooks. Semantic HTML (`button` not `div` + click). Data fetching in hooks or a framework loader (Next.js, Remix, Router loaders)—pick one per app.

**Acceptable alternative:** framework-specific server components if the app uses a RSC-capable stack.

**When the alternative is appropriate:** Next.js App Router (or similar) is already the platform; do not copy that model into a CRA SPA.

### ❌ Avoid

```tsx
function List({ items }: { items: string[] }) {
  items.sort();
  return items.map((item) => <div onClick={save}>{item}</div>);
}
```

### ✅ Recommended

```tsx
function List({ items, onSave }: { items: string[]; onSave: (item: string) => void }) {
  const sorted = [...items].sort();
  return (
    <ul>
      {sorted.map((item) => (
        <li key={item}>
          <button type="button" onClick={() => onSave(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

Keep state updates immutable. Prefer composition (`children`) over deep prop drilling when it clarifies layout.

## Common mistakes

- `div` clickables without keyboard support.
- Fetching in every nested component for the same resource.
- Ignoring error and empty states.

## Quick checklist

- [ ] Render does not mutate props/state
- [ ] Interactive elements are real buttons/links
- [ ] Loading, empty, and error UI exist
- [ ] Fetching strategy is the app’s documented one
