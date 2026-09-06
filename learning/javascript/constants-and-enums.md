# Understanding `export const` and `as const`

A common pattern in modern TypeScript applications is:

```ts
export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel'
} as const;
```

At first glance, `as const` may look confusing. This page explains what each part means and why this pattern is useful.

---

## 1. Breaking Down the Statement

The following code contains three important concepts:

```ts
export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel'
} as const;
```

They are:

```text
export
  ↓
Makes the value available to other modules

const
  ↓
Prevents reassignment of the variable

as const
  ↓
Tells TypeScript to preserve the values as readonly literals
```

Each one has a different purpose.

---

# 2. What Does `export` Mean?

`export` makes a variable, function, class, or other declaration available to other files.

For example:

```ts
export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel'
} as const;
```

Another file can import it:

```ts
import { BUTTON_LABEL } from './button.constants';
```

The imported constant can then be used:

```ts
console.log(BUTTON_LABEL.SUBMIT);
```

Output:

```text
Submit
```

### Why is this useful?

It allows us to define a value in one place and reuse it throughout the application.

This supports the principle:

> **Single Source of Truth**

Instead of defining the same value in multiple files, we define it once and import it wherever required.

---

# 3. What Does `const` Mean?

`const` prevents a variable from being reassigned.

For example:

```ts
const MAX_RETRY_COUNT = 3;
```

This is not allowed:

```ts
MAX_RETRY_COUNT = 5;
// ❌ Error
```

However, there is an important distinction when using objects.

Consider:

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
};
```

The variable itself cannot be reassigned:

```ts
BUTTON_LABEL = {};
// ❌ Error
```

But the object property can normally be changed:

```ts
BUTTON_LABEL.SUBMIT = 'Save';
// ✅ Allowed without `as const`
```

Therefore:

> `const` prevents reassignment of the variable, but it does not automatically make an object's properties readonly.

---

# 4. What Does `as const` Mean?

`as const` is a TypeScript feature.

It tells TypeScript:

> Treat this value as a readonly literal value rather than a mutable value with broader types.

Example:

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;
```

TypeScript understands this approximately as:

```ts
{
  readonly SUBMIT: 'Submit';
}
```

Therefore:

```ts
BUTTON_LABEL.SUBMIT = 'Save';
// ❌ TypeScript Error
```

The property is treated as readonly.

---

# 5. What Does "Literal Type" Mean?

This is one of the most important concepts behind `as const`.

Consider:

```ts
let label = 'Submit';
```

TypeScript generally treats `label` as:

```text
string
```

because a `let` variable can later contain another string.

For example:

```ts
label = 'Save';
```

is valid.

Now consider:

```ts
const label = 'Submit';
```

TypeScript can infer the exact value:

```text
"Submit"
```

rather than simply:

```text
string
```

This is called a **literal type**.

With an object, `as const` ensures that the object's property values are also preserved as literal types.

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;
```

TypeScript understands:

```text
BUTTON_LABEL.SUBMIT
        ↓
    "Submit"
```

rather than simply:

```text
string
```

---

# 6. Why Is `as const` Useful for Fixed Values?

Consider:

```ts
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;
```

These values represent a fixed set of application states.

We don't want developers accidentally changing them:

```ts
REQUEST_STATUS.PENDING = 'waiting';
// ❌ Error
```

We also want TypeScript to understand the exact values.

The resulting values are effectively:

```text
"pending"
"approved"
"rejected"
```

This allows us to create a strongly typed union.

---

# 7. Creating a Type from `as const`

One of the most useful patterns is deriving a TypeScript type from the constant.

```ts
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export type RequestStatus =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];
```

`RequestStatus` becomes:

```ts
'pending' | 'approved' | 'rejected'
```

Now TypeScript can prevent invalid values.

```ts
let status: RequestStatus;

status = 'pending';   // ✅
status = 'approved';  // ✅
status = 'rejected';  // ✅

status = 'completed'; // ❌ TypeScript Error
```

This gives us both:

```text
Runtime values
      +
Compile-time type safety
```

---

# 8. Why Not Just Use Strings?

We could write:

```ts
if (status === 'pending') {
  // ...
}
```

This works.

However, if `'pending'` is used throughout the application, we may end up with many repeated magic strings.

For example:

```ts
if (status === 'pending') { ... }

if (request.status === 'pending') { ... }

if (order.status === 'pending') { ... }
```

This creates duplication.

Instead:

```ts
if (status === REQUEST_STATUS.PENDING) {
  // ...
}
```

Now the application has a single named value.

---

# 9. Why Use Named Constants?

Compare:

```ts
if (status === 'pending') {
```

with:

```ts
if (status === REQUEST_STATUS.PENDING) {
```

The second version communicates more information.

The developer immediately understands:

```text
REQUEST_STATUS
      ↓
This is a request status

PENDING
      ↓
This is one of the supported request states
```

The code becomes self-documenting.

---

# 10. Practical Example: Button Actions

Consider a Submit button.

We can define:

```ts
export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel',
  RESET: 'reset'
} as const;
```

Then:

```ts
if (action === BUTTON_ACTION.SUBMIT) {
  submitForm();
}
```

Instead of:

```ts
if (action === 'submit') {
  submitForm();
}
```

The first version makes the meaning of the value clearer.

---

# 11. Action vs Label

It is important to distinguish between a **business action** and a **UI label**.

### Business Action

```ts
export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel'
} as const;
```

This represents what the application should do.

### UI Label

```ts
export const BUTTON_LABEL = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel'
} as const;
```

This represents what the user sees.

Therefore:

```text
BUTTON_ACTION.SUBMIT
        ↓
Application/business meaning

BUTTON_LABEL.SUBMIT
        ↓
User-facing text
```

These concepts should not automatically be treated as the same thing.

---

# 12. Why Separate Actions and Labels?

Suppose the product team changes:

```text
Submit
```

to:

```text
Submit Request
```

The business action can remain:

```text
submit
```

The UI label changes independently.

```ts
BUTTON_ACTION.SUBMIT
// "submit"

BUTTON_LABEL.SUBMIT
// "Submit Request"
```

This separation is especially useful when applications support localization.

For example, the UI could eventually display:

```text
Submit
Submit Request
सबमिट करें
Soumettre
```

while the application continues to use:

```text
submit
```

as its business action.

---

# 13. `const` vs `as const`

These are related but not identical.

### `const`

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
};
```

`const` prevents reassignment of the variable:

```ts
BUTTON_LABEL = {};
// ❌ Error
```

But the property can normally be modified:

```ts
BUTTON_LABEL.SUBMIT = 'Save';
// ✅ Allowed
```

### `as const`

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;
```

Now TypeScript treats the property as readonly:

```ts
BUTTON_LABEL.SUBMIT = 'Save';
// ❌ Error
```

And it preserves the literal type:

```text
"Submit"
```

---

# 14. Is `as const` the Same as `Object.freeze()`?

No.

This is an important distinction.

`as const` is primarily a **TypeScript type-system feature**.

It provides compile-time readonly behavior.

```ts
const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;
```

It does not automatically freeze the JavaScript object at runtime in the same way as:

```ts
Object.freeze(...)
```

Therefore:

> `as const` helps developers and TypeScript prevent unintended changes during development, while `Object.freeze()` provides runtime freezing behavior.

In most application code, `as const` is used primarily for type safety and fixed-value modeling.

---

# 15. When Should We Use `as const`?

Use `as const` when you have a fixed set of named values.

Good examples include:

### Request Status

```ts
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;
```

### User Roles

```ts
export const USER_ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
} as const;
```

### Button Actions

```ts
export const BUTTON_ACTION = {
  SUBMIT: 'submit',
  CANCEL: 'cancel',
  RESET: 'reset'
} as const;
```

### Application Configuration

```ts
export const APP_CONFIG = {
  API_TIMEOUT_MS: 30000,
  MAX_RETRY_COUNT: 3,
  DEFAULT_PAGE_SIZE: 20
} as const;
```

---

# 16. When Should We NOT Use `as const`?

Don't use it simply because it is available.

For a normal variable:

```ts
const name = 'Amit';
```

there may be no reason to write:

```ts
const name = 'Amit' as const;
```

Likewise, don't create constants for meaningless literals.

### ❌ Not useful

```ts
const FIVE = 5;
```

### ✅ Meaningful

```ts
const MAX_LOGIN_ATTEMPTS = 5;
```

The purpose of the abstraction should be clear.

---

# 17. Recommended Pattern

For a fixed set of application values, the recommended pattern is:

```ts
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;
```

If a type is needed:

```ts
export type RequestStatus =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];
```

Then use the constant in application logic:

```ts
function processRequest(status: RequestStatus) {
  if (status === REQUEST_STATUS.PENDING) {
    // Process pending request
  }
}
```

---

# 18. Quick Reference

| Syntax                          | Meaning                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `const`                         | Prevents reassignment of a variable                                                 |
| `export`                        | Makes a declaration available to other modules                                      |
| `as const`                      | Preserves literal values and makes the value readonly from TypeScript's perspective |
| `typeof`                        | Gets the type of a value                                                            |
| `keyof`                         | Gets the keys of a type                                                             |
| `as const` + `keyof` + `typeof` | Can create a type-safe union from a constant object                                 |

---

# 19. The Pattern to Remember

When you see:

```ts
export const BUTTON_LABEL = {
  SUBMIT: 'Submit'
} as const;
```

read it as:

> **Export a named constant object containing fixed values, and tell TypeScript to treat those values as readonly literal values.**

In simple terms:

```text
export
  → Share it with other files

const
  → Don't reassign the variable

as const
  → Keep the values fixed and preserve their exact types
```

---

# 20. Team Standard

For modern TypeScript frontend applications:

### Prefer

```ts
export const SOME_VALUES = {
  VALUE_ONE: 'value-one',
  VALUE_TWO: 'value-two',
  VALUE_THREE: 'value-three'
} as const;
```

When type safety is useful:

```ts
export type SomeValue =
  typeof SOME_VALUES[keyof typeof SOME_VALUES];
```

### Avoid

```ts
if (status === 'pending') {
```

when `pending` represents a shared business/application value.

### Prefer

```ts
if (status === REQUEST_STATUS.PENDING) {
```

This creates a clear, maintainable, and type-safe pattern.

---

# Key Takeaway

`export const ... as const` is not one feature. It combines three concepts:

```text
export + const + as const
```

Together they provide a useful pattern for creating **shared, named, fixed values with strong TypeScript type information**.

The most important principle is not to memorize the syntax.

Understand the reason:

> **Use named constants to make important values explicit, avoid duplication, create a single source of truth, and make code safer to change.**
