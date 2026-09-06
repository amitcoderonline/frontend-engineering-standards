# Unit Testing

## Purpose

Unit tests lock behavior of pure functions, mappers, reducers, and component rendering with faked collaborators—not the whole browser stack.

## Why it matters

Tests that only click through the live API are slow and flake. Tests that assert implementation details (`toHaveBeenCalledWith` on an internal helper) break on refactors that do not change behavior.

## Recommended approach

**Default:** test public behavior. Prefer testing-library style queries (`getByRole`) for components. Keep HTTP behind a client you can fake.

**Acceptable alternative:** shallow tests of a hook with `renderHook` when the hook is the public API.

**When the alternative is appropriate:** a complicated `useOrderFilters` with no dedicated UI yet.

### ❌ Avoid

```ts
expect(wrapper.find('div').at(3).text()).toBe('Pending');
```

### ✅ Recommended

```ts
render(<OrderStatusBadge status={REQUEST_STATUS.PENDING} />);
expect(screen.getByText('Pending')).toBeInTheDocument();
```

```ts
it('adds a tag without mutating the original order', () => {
  const order = makeOrder({ tags: ['rush'] });
  const next = addTag(order, 'fragile');
  expect(order.tags).toEqual(['rush']);
  expect(next.tags).toEqual(['rush', 'fragile']);
});
```

## Common mistakes

- Snapshotting entire pages for every CSS tweak.
- Zero assertions (test only that it “does not throw”).
- Hitting real network in unit tests.

## Quick checklist

- [ ] Assert user-visible or public-API behavior
- [ ] No real HTTP
- [ ] Names follow [test naming](test-naming.md)
- [ ] Failure message would help a teammate
