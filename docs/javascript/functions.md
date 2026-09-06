# Functions

## Purpose

Keep functions small, named for their outcome, and easy to test. Frontend functions often mix UI events, mapping, and I/O—this doc says how to split that work.

## Why it matters

Long functions hide bugs (especially missed loading and error paths). Pure mappers are easy to unit test; event handlers that also call APIs are not.

## Recommended approach

**Default:** one obvious job per function. Extract mapping and validation out of click handlers.

**Acceptable alternative:** a slightly longer function when splitting would only create pass-through wrappers.

**When the alternative is appropriate:** a 15-line submit handler that is still linear and local to one component.

### ❌ Avoid

```ts
async function onClick(e: Event) {
  e.preventDefault();
  const name = (document.querySelector('#n') as HTMLInputElement).value;
  const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ name }) });
  const data = await res.json();
  document.querySelector('#list')!.innerHTML = data.map((o: any) => o.name).join();
}
```

### ✅ Recommended

```ts
function getOrderName(form: HTMLFormElement): string {
  const value = new FormData(form).get('name');
  return typeof value === 'string' ? value.trim() : '';
}

async function createOrder(name: string): Promise<Order> {
  return postJson<Order>('/api/orders', { name });
}

async function handleCreateOrder(form: HTMLFormElement): Promise<void> {
  const name = getOrderName(form);
  await createOrder(name);
}
```

Prefer early returns over deep nesting. Prefer parameters over reading globals. Keep `async` functions for real I/O, not for “maybe later”.

## Common mistakes

- Functions named `handleData` that both fetch and update the DOM.
- Optional flags that change behavior (`save(user, true, false)`).
- Mutating arguments when a new object would be clearer.

## Quick checklist

- [ ] Name starts with a verb that matches the return (`get`, `map`, `can`, `create`)
- [ ] I/O is separated from mapping
- [ ] No boolean soup parameters — use an options object if needed
- [ ] Testable core logic does not require rendering a component
