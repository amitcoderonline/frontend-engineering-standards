# Angular RxJS

## Purpose

Use RxJS for streams over time (HTTP, user events, store). Keep operators readable and complete subscriptions.

## Why it matters

Nested `subscribe` callbacks recreate callback hell. Missing `switchMap` on search boxes floods the API. Completing HTTP observables is not enough if you merge them into a long-lived `Subject`.

## Recommended approach

**Default:** `async` pipe or `takeUntilDestroyed` in components. `switchMap` for latest-wins (typeahead). `exhaustMap` for submit buttons. `concatMap` when order of saves matters.

**Acceptable alternative:** Angular signals + `toObservable`/`toSignal` if the team has standardized on signals for new code.

**When the alternative is appropriate:** local UI state with no multi-event coordination; still use RxJS at the HTTP layer if that is the app convention.

### ❌ Avoid

```ts
this.searchControl.valueChanges.subscribe((term) => {
  this.http.get(`/api/orders?q=${term}`).subscribe((rows) => {
    this.rows = rows;
  });
});
```

### ✅ Recommended

```ts
readonly rows$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) => this.orderService.search(term))
);
```

Do not `subscribe` inside `subscribe`. Name custom operators only when reused.

⚠️ Use with care: `shareReplay(1)` caches; remember to complete or use `refCount` so you do not pin memory forever.

## Common mistakes

- `mergeMap` on search (every keystroke in flight).
- Ignoring errors so the stream dies after the first 500.
- Putting side effects in `map` instead of `tap`.

## Quick checklist

- [ ] Flattening operator matches concurrency intent
- [ ] Streams that reach the template use `async` pipe or explicit teardown
- [ ] Errors are caught at a level that can recover
- [ ] No nested `subscribe`
