# Error Handling

## Purpose

Failures should be typed, logged once, and shown to users in language they can act on—without leaking internals.

## Why it matters

Empty `catch` blocks hide outages. Throwing raw API bodies into toasts confuses users and can expose PII. Unhandled rejections crash sessions.

## Recommended approach

**Default:** throw or return a small error type at the API boundary; map to UI messages in the feature; log with a correlation id.

**Acceptable alternative:** `Result`-style `{ ok: true, data } | { ok: false, error }` when you want no throw on expected 404s.

**When the alternative is appropriate:** “not found” is a normal UI state, not an exceptional crash.

### ❌ Avoid

```ts
try {
  await saveOrder(order);
} catch (e) {
  console.log(e);
  alert(String(e));
}
```

### ✅ Recommended

```ts
try {
  await saveOrder(order);
} catch (error) {
  logger.error('saveOrder failed', { orderId: order.id, error });
  setFormError(toUserMessage(error));
}
```

```ts
function toUserMessage(error: unknown): string {
  if (error instanceof ApiError && error.status === 409) {
    return 'This order was updated elsewhere. Refresh and try again.';
  }
  return 'We could not save the order. Try again in a moment.';
}
```

Do not use exceptions for ordinary control flow (empty search results). Do use them for unexpected contract breaks.

## Common mistakes

- Catching `error` as `any` and reading `.message` without a type guard.
- Showing stack traces in production UI.
- Retrying non-idempotent POST without a clearly defined policy.

## Quick checklist

- [ ] User-facing text is mapped, not dumped from the server
- [ ] Errors are logged with enough context to debug
- [ ] Expected empty states are not thrown
- [ ] Global handler exists for unhandled promise rejections
