# Angular Dependency Injection

## Purpose

Use Angular DI for testability and lifecycle—not as a service locator from `injector.get` in random functions.

## Why it matters

Wrong `providedIn` causes singleton state bugs (user A sees user B’s cart) or duplicate HTTP clients. Constructor injection makes tests replace one collaborator.

## Recommended approach

**Default:** constructor injection with `private readonly`. Provide HTTP, config, and stores through tokens when there are multiple implementations.

**Acceptable alternative:** `inject()` in field initializers for less constructor noise in recent Angular.

**When the alternative is appropriate:** the team is on an Angular version where `inject()` is the documented style; pick one per codebase.

### ❌ Avoid

```ts
export class PricePipe {
  transform(value: number): string {
    const currency = inject(CurrencyService); // called on every transform
    return currency.format(value);
  }
}
```

### ✅ Recommended

```ts
export class PricePipe {
  private readonly currency = inject(CurrencyService);

  transform(value: number): string {
    return this.currency.format(value);
  }
}
```

Use `InjectionToken` for config objects instead of importing `environment` everywhere (easier tests):

```ts
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
```

## Common mistakes

- `providedIn: 'root'` for a service that holds component-specific subscriptions.
- Circular DI (A → B → A) solved with `Injector` hacks instead of splitting a third helper.
- Providing `HttpClient` again in a component and losing interceptors.

## Quick checklist

- [ ] Dependencies are injected, not constructed with `new` inside features
- [ ] Tokens for config and swappable adapters
- [ ] Provider scope is documented when not root
- [ ] Tests override one token at a time
