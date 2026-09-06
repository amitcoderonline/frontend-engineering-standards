# Angular Components

## Purpose

Keep Angular components focused on presentation and user interaction. Move HTTP, mapping, and shared business rules into services.

## Why it matters

Fat components are hard to test and reuse. Change detection and subscriptions leak when inputs, outputs, and lifecycle are mixed with API calls.

## Recommended approach

**Default:** smart/container vs presentational split when a screen grows; `OnPush` when inputs are stable; unsubscribe via `takeUntilDestroyed` or `async` pipe.

**Acceptable alternative:** a single component for a tiny widget with one HTTP call.

**When the alternative is appropriate:** the whole feature is under ~100 lines and will not grow this quarter.

### ❌ Avoid

```ts
@Component({ selector: 'app-orders', template: `...` })
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<Order[]>('/api/orders').subscribe((orders) => {
      this.orders = orders;
    });
  }
}
```

Subscriptions without teardown leak when the user navigates away.

### ✅ Recommended

```ts
@Component({
  selector: 'app-order-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (orders$ | async; as orders) {
      <app-order-row *ngFor="let order of orders" [order]="order" />
    }
  `
})
export class OrderListComponent {
  readonly orders$ = this.orderService.list();
  constructor(private readonly orderService: OrderService) {}
}
```

Inputs are data; outputs are events. Do not mutate `@Input()` objects.

## Common mistakes

- Business logic in the template (`*ngIf="user.role === 'admin' && ..."` duplicated).
- Forgetting `trackBy` on large `*ngFor` lists.
- Using `any` on `@Input()`.

## Quick checklist

- [ ] HTTP lives in a service
- [ ] Subscriptions are completed
- [ ] Inputs are typed
- [ ] Template stays declarative
