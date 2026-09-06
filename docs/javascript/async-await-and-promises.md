# Async/Await and Promises

## Purpose

Handle asynchronous work (HTTP, timers, user confirmation) with a single, readable control flow and correct error handling.

## Why it matters

Un-awaited promises, missing cancellation, and mixed `.then` plus `await` make race conditions (stale search results, double submits) hard to see in review.

## Recommended approach

**Default:** `async`/`await` with `try`/`catch` at the boundary that can show UI errors. Always `await` or explicitly void-and-log.

**Acceptable alternative:** `.then` chains in tiny glue (for example `void fetchConfig().then(apply)` in bootstrap).

**When the alternative is appropriate:** you are not adding new branching; a one-liner is clearer than an async function.

### ❌ Avoid

```ts
function loadProfile(userId: string) {
  fetch(`/api/users/${userId}`).then((r) => r.json());
  showToast('Loaded');
}
```

The toast runs before the request finishes, and JSON errors are ignored.

### ✅ Recommended

```ts
async function loadProfile(userId: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Profile request failed: ${response.status}`);
  }
  return response.json() as Promise<UserProfile>;
}
```

Run independent requests together with `Promise.all`. Use `Promise.allSettled` when one failure should not hide the others (dashboard widgets).

⚠️ Use with care: `for...of` plus `await` is sequential on purpose (rate limits). Do not `map` + `await` inside without `Promise.all` unless you intend serial calls.

See [error handling](error-handling.md) for how to surface failures.

## Common mistakes

- Forgetting `return` in a `.then`.
- Catching errors and swallowing them (`catch (() => {})`).
- Ignoring in-flight requests when the user types a new search (no abort / request id).

## Quick checklist

- [ ] Promises are awaited or intentionally ignored with a comment
- [ ] HTTP helpers check `response.ok`
- [ ] Parallel vs sequential is a conscious choice
- [ ] Latest-request-wins or AbortController for typeahead
