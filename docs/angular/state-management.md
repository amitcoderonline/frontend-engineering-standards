# Angular State Management

## Purpose

Pick the smallest state tool that matches the problem: component state, a feature service, signals, or a global store (NgRx, NGXS, Akita, Elf, etc.).

## Why it matters

A global store for a tooltip is ceremony. Local `BehaviorSubject` for the logged-in user duplicates auth and races with interceptors.

## Recommended approach

**Default:** component state / signals for local UI (tabs, accordion). A feature service with a subject/signal for data used by a few sibling components. A global store when many distant features share the same entity graph and you need time-travel, interceptors, or strict unidirectional flow.

**Acceptable alternative:** NgRx (or your org standard) everywhere if the team already invested in it and knows the patterns.

**When the alternative is appropriate:** large product with many contributors; consistency beats local purity.

### ❌ Avoid

```ts
@Injectable({ providedIn: 'root' })
export class AppState {
  everything: Record<string, unknown> = {};
}
```

### ✅ Recommended

```ts
@Injectable()
export class OrderListFacade {
  private readonly orders = signal<Order[]>([]);
  readonly orders = this.orders.asReadonly();

  constructor(private readonly orderService: OrderService) {}

  async refresh(): Promise<void> {
    this.orders.set(await firstValueFrom(this.orderService.list()));
  }
}
```

Provide `OrderListFacade` on the route so state dies with the page.

Team decision: which global library (if any) is **not** mandated here. Document the choice in the application repo.

## Common mistakes

- Duplicating server state in the store without a cache policy.
- Putting every form control into NgRx.
- Mutating store state in place.

## Quick checklist

- [ ] State lifetime matches the user flow
- [ ] Server data has a single owner
- [ ] Global store is justified in the PR
- [ ] Immutable updates
