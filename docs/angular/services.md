# Angular Services

## Purpose

Services own reusable logic: HTTP, caching, mapping, and orchestration. Components consume observables or signals; they do not reimplement clients.

## Why it matters

Duplicated `HttpClient` calls drift (headers, error mapping, base URL). A single `OrderService` is the place to change pagination or retries.

## Recommended approach

**Default:** `providedIn: 'root'` for stateless API wrappers. Feature-scoped providers when state must reset with a route.

**Acceptable alternative:** a `providedIn` feature module / route `providers` array for stores that should die with the feature.

**When the alternative is appropriate:** a wizard that must not leak draft state into the next visit.

### ❌ Avoid

```ts
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}
  get(url: string) {
    return this.http.get(url);
  }
}
```

A generic “do HTTP” service hides domain language and accumulates flags.

### ✅ Recommended

```ts
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`/api/orders/${id}`);
  }
}
```

Keep mapping (DTO → view model) next to the service or in a pure `order.mapper.ts`.

## Common mistakes

- God `AppService` with unrelated methods.
- Storing UI-only state (modal open) in a root singleton that never resets.
- Swallowing HTTP errors inside the service so the component cannot show a message.

## Quick checklist

- [ ] Service name matches a domain concept
- [ ] Provider scope matches state lifetime
- [ ] Methods return typed observables/signals
- [ ] Errors can surface to the UI
