# Constants and Enums

## Purpose

This document explains how to name and share **fixed values** in frontend TypeScript: configuration numbers, API statuses, button actions, roles, and other values that should not be typed as raw literals in business logic.

JavaScript itself does **not** provide a native `enum` keyword. TypeScript **does**. Teams still need a consistent pattern for both languages: `const`, shared constant modules, `as const` objects, derived union types, and TypeScript `enum` used on purpose—not by habit.

## Why the practice matters

Unexplained literals (`'pending'`, `3`, `'Submit'`) scatter meaning across components, services, and tests. A typo becomes a production bug. A designer changing a label can accidentally change an API contract. Named constants give one source of truth, better diffs, and types the compiler can check.

## Recommended approach

**Default recommendation:** for a simple fixed set of related string (or number) values in modern frontend TypeScript, use an `as const` object and derive a union type.

**Acceptable alternative:** a TypeScript `enum` when you genuinely need enum semantics (see [When to consider TypeScript `enum`](#when-to-consider-typescript-enum)).

**When the alternative is appropriate:** interop with generated code that already emits enums, numeric enums required by a third-party API, or a team-wide existing enum convention you are not ready to migrate.

### What each term means

| Term | Meaning in this standard |
| ---- | ------------------------ |
| `const` | A binding that cannot be reassigned. The value may still be a mutable object unless you freeze it or use `as const`. |
| Shared constants | Named values imported from a module so more than one file uses the same source of truth. |
| Magic strings | String literals used as business identifiers with no name at the call site (`'admin'`, `'pending'`). |
| Magic numbers | Numeric literals used as business rules with no name (`3` retries, `30000` ms). |
| Fixed sets of values | A closed list of allowed values (request status, button action, user role). |
| TypeScript `enum` | A TypeScript language feature that compiles to its own runtime object (string enums) or a numeric reverse-mapping object (numeric enums). |
| `as const` | A TypeScript assertion that makes object properties readonly and literal types (`'pending'` instead of `string`). |
| Derived union types | A type built from the constant object, for example `typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS]`. |

### Default pattern: `as const` + derived union

```ts
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export type RequestStatus =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];
```

This approach is useful because it is:

- **Readable** — `REQUEST_STATUS.PENDING` explains intent at the call site.
- **Reusable** — components, services, and tests import the same object.
- **Type-safe** — `RequestStatus` is `'pending' | 'approved' | 'rejected'`, not a wide `string`.
- **Easy to debug** — runtime values are plain strings you see in network tabs and logs.
- **Aligned with JavaScript** — the runtime value is a normal object, not a special enum shape.
- **A single source of truth** — add a status once; types and runtime stay in sync.

### TypeScript `enum` example

Enums are not wrong. Choose them **intentionally**.

```ts
enum RequestStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}
```

String enums are closer to `as const` objects. Numeric enums add reverse mapping and extra runtime behavior that most UI code does not need. If you use `enum`, prefer **string** enums and document why `as const` was not enough.

## Why the practice matters in the UI: buttons

A common bug is treating the **label the user sees** as the **action the code performs**.

### ❌ Avoid

```ts
if (buttonType === 'submit') {
  form.submit();
}
```

The literal `'submit'` is a magic string. It is easy to mistype, hard to search consistently, and mixed up with the visible label `"Submit"`.

### ✅ Recommended

```ts
export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel',
  RESET: 'reset'
} as const;

export type ButtonAction =
  typeof BUTTON_ACTION[keyof typeof BUTTON_ACTION];

if (buttonType === BUTTON_ACTION.SUBMIT) {
  form.submit();
}
```

### Separate display labels from business values

```ts
export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel'
} as const;

export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel'
} as const;
```

UI labels change with copy, localization, and design. Business identifiers should stay stable so analytics, tests, and API payloads do not break when someone changes “Submit” to “Save order”.

```ts
<button type="button" data-action={BUTTON_ACTION.SUBMIT}>
  {BUTTON_LABEL.SUBMIT}
</button>
```

⚠️ Use with care: if you later add i18n, `BUTTON_LABEL` should become translation keys, not hardcoded English. Keep `BUTTON_ACTION` as the stable identifier.

## Avoid magic numbers

### ❌ Avoid

```ts
if (retryCount > 3) {
  stopRetry();
}
```

Readers cannot tell whether `3` is retries, tabs, or something copied from another feature.

### ✅ Recommended

```ts
const MAX_RETRY_COUNT = 3;

if (retryCount > MAX_RETRY_COUNT) {
  stopRetry();
}
```

For values shared across the app, put them in configuration:

```ts
export const APP_CONFIG = {
  API_TIMEOUT_MS: 30000,
  MAX_RETRY_COUNT: 3,
  DEFAULT_PAGE_SIZE: 20
} as const;
```

```ts
if (retryCount > APP_CONFIG.MAX_RETRY_COUNT) {
  stopRetry();
}
```

## Avoid magic strings

### ❌ Avoid

```ts
if (status === 'pending') {
  showSpinner();
}
```

### ✅ Recommended

```ts
if (status === REQUEST_STATUS.PENDING) {
  showSpinner();
}
```

## Do not create constants for every literal

Constants should **communicate meaning**. A name that only restates the number adds noise.

### ❌ Avoid

```ts
const FIVE = 5;
const TRUE = true;
```

### ✅ Recommended

```ts
const MAX_LOGIN_ATTEMPTS = 5;
```

One-off literals that are obvious in context (for example `index + 1` in a loop, or `0` as a start index) do not need names. Name the **rule**, not the digit.

## Practical examples

### API status values

```ts
export const ORDER_API_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled'
} as const;

export type OrderApiStatus =
  typeof ORDER_API_STATUS[keyof typeof ORDER_API_STATUS];
```

Map HTTP-like **application** states (not raw status codes) the same way when the UI cares about a small set of outcomes:

```ts
export const LOAD_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export type LoadState = typeof LOAD_STATE[keyof typeof LOAD_STATE];
```

Prefer named application states over repeating `if (httpStatus === 200)` in every component. Keep HTTP codes at the HTTP client boundary.

### User roles

```ts
export const USER_ROLE = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export function canEditOrders(role: UserRole): boolean {
  return role === USER_ROLE.ADMIN || role === USER_ROLE.EDITOR;
}
```

### Retry limits, pagination, timeouts

```ts
export const APP_CONFIG = {
  API_TIMEOUT_MS: 30000,
  MAX_RETRY_COUNT: 3,
  DEFAULT_PAGE_SIZE: 20
} as const;

export async function fetchOrdersPage(page: number): Promise<Order[]> {
  return getJson('/api/orders', {
    timeoutMs: APP_CONFIG.API_TIMEOUT_MS,
    query: {
      page,
      pageSize: APP_CONFIG.DEFAULT_PAGE_SIZE
    }
  });
}
```

## Decision table

| Requirement | Recommendation |
| ----------- | -------------- |
| One reusable value | `const` |
| Fixed set of related values | `as const` object |
| Need compile-time union type | `as const` + derived type |
| UI/business actions | `as const` |
| Application configuration | `const` object (`as const` when you want literal types) |
| Enum-specific semantics genuinely useful | Consider TypeScript `enum` |

## When to consider TypeScript `enum`

Use `enum` when the extra TypeScript semantics are the point, not because the tutorial used `enum`.

Reasons that can justify `enum`:

- Generated OpenAPI/gRPC clients already emit enums and you want to match them.
- You need a numeric enum for a protocol that is not a string union.
- The team has an existing enum-only public API you cannot change this sprint.

Otherwise prefer `as const`. It erases to a plain object, plays well with tree-shaking mental models, and keeps runtime values obvious in DevTools.

## Project structure

Shared, cross-feature constants can live together:

```text
src/
├── constants/
│   ├── api.constants.ts
│   ├── button.constants.ts
│   ├── request.constants.ts
│   └── app.constants.ts
│
├── types/
├── components/
├── services/
└── utils/
```

Constants do **not** always belong in a global `constants/` folder.

**Keep constants as local as possible, and as shared as necessary.**

If only the orders feature uses the values, colocate them:

```text
features/
└── orders/
    ├── order.constants.ts
    ├── order.types.ts
    ├── order.service.ts
    └── order.component.ts
```

Promote a constant to `src/constants/` when a second feature needs the same source of truth (for example `USER_ROLE` used by nav and settings).

## Explanation

`const` stops reassignment; it does not by itself create a closed set of string literals for TypeScript. Without `as const`, `REQUEST_STATUS.PENDING` is typed as `string`, so `status === REQUEST_STATUS.PENDING` does not narrow to a useful union.

`as const` locks the property types to the literals you wrote. Indexing those properties with `keyof typeof REQUEST_STATUS` produces the union you pass through props, API mappers, and reducers.

Magic strings and numbers fail in reviews because the compiler cannot tell `'pendng'` is wrong. Named constants plus a derived type catch that at compile time and keep tests aligned with production values.

## Common mistakes

- Using the visible button text as the action id (`if (label === 'Submit')`).
- Putting every number in a constants file (`const TWO = 2`).
- Exporting a mutable object without `as const`, then treating it as a closed set.
- Mixing API wire values (`'APPROVED'`) with UI labels (`'Approved'`) in one object.
- Defaulting to numeric `enum` because TypeScript offers it.
- Creating a global constants barrel that every feature imports for a value used once.
- Storing API keys, tokens, or passwords next to `APP_CONFIG` in source control.

## Recommended team standard

1. **Default:** `as const` objects + derived union types for closed string/number sets.
2. **Config:** named fields on `APP_CONFIG` (or feature `*.constants.ts`) for timeouts, retries, and page size.
3. **Labels:** separate `*_LABEL` (or i18n keys) from `*_ACTION` / API enums.
4. **Scope:** feature-local files first; shared `src/constants/` only when reused.
5. **Enums:** allowed when justified in the PR description; not the default for new UI code.
6. **Secrets:** never in constants modules. See [Secrets and configuration](../security/secrets-and-configuration.md).

## Quick checklist

- [ ] No unexplained magic strings for statuses, roles, or actions
- [ ] No unexplained magic numbers for retries, timeouts, or page size
- [ ] Constant names describe the **business rule**, not the digit
- [ ] Fixed sets use `as const` (or a documented `enum`)
- [ ] Union types are derived from the object when values are passed across files
- [ ] UI copy is not used as a business identifier
- [ ] Feature-only constants live next to the feature
- [ ] No secrets in source-code constants

## Learner exercise

Refactor the following so role, status, max login attempts, button action, and button label use appropriate constants and types.

Starting code:

```ts
if (user.role === 'admin') {
  if (user.status === 'active') {
    if (loginAttempts < 5) {
      showButton('Submit');
    }
  }
}
```

Suggested direction (try it yourself before reading):

- `USER_ROLE` and `USER_STATUS` as `as const` objects with derived types
- `MAX_LOGIN_ATTEMPTS` or `APP_CONFIG.MAX_LOGIN_ATTEMPTS`
- `BUTTON_ACTION.SUBMIT` for behavior / analytics
- `BUTTON_LABEL.SUBMIT` (or a translation key) for what `showButton` displays

A reference solution lives in [examples/good-examples/constants-login-gate.ts](../../examples/good-examples/constants-login-gate.ts). Compare with [examples/bad-examples/constants-login-gate.ts](../../examples/bad-examples/constants-login-gate.ts).

## Golden rules

1. Avoid unexplained magic strings.
2. Avoid unexplained magic numbers.
3. Give business values meaningful names.
4. Keep one source of truth.
5. Prefer `as const` for simple fixed value sets in modern TypeScript.
6. Separate UI labels from business values.
7. Keep feature-specific constants near the feature.
8. Do not create abstractions that make simple code harder to understand.
9. Never store secrets, credentials, tokens, or passwords in source-code constants.
