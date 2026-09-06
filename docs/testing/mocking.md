# Mocking

## Purpose

Replace slow, flaky, or non-deterministic collaborators (network, time, random, location) with explicit fakes.

## Why it matters

Over-mocking (mocking the system under test) proves the mock, not the product. Under-mocking makes CI depend on VPN and gold data.

## Recommended approach

**Default:** inject dependencies (HTTP client, clock) so tests pass fakes without patching internals. Mock at the boundary (`fetch`, `HttpClient`).

**Acceptable alternative:** module mocks (`vi.mock` / `jest.mock`) when the code was not written with injection.

**When the alternative is appropriate:** third-party SDK with no interface; keep the mock in one test helper.

### ❌ Avoid

```ts
jest.mock('./order.mapper'); // hides the real mapping bugs
```

### ✅ Recommended

```ts
const http = { getJson: vi.fn().mockResolvedValue({ items: [] }) };
const service = new OrderService(http);
await service.list();
expect(http.getJson).toHaveBeenCalledWith('/api/orders');
```

Fake clocks for timeouts and debounce:

```ts
vi.useFakeTimers();
```

⚠️ Use with care: mocking `useNavigate` everywhere can hide broken routes; prefer a memory router when testing navigation.

## Common mistakes

- Partial mocks that still call the network on unmocked methods.
- Returning `{}` as a full `Order`.
- Shared mock state leaking between tests (`beforeEach` reset missing).

## Quick checklist

- [ ] Mock the collaborator, not the code you are testing
- [ ] Reset mocks between tests
- [ ] Fakes return realistic typed data
- [ ] Time and randomness are controlled when they affect assertions
