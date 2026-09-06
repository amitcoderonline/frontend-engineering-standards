# Frontend Security

## Purpose

Frontend code runs on a machine you do not control. Treat the browser as hostile: it can be modified, and anything shipped in JS is public.

## Why it matters

Hiding an “Admin” button is not authorization. Tokens in `localStorage` leak via XSS. `dangerouslySetInnerHTML` and unsanitized URLs (`javascript:`) turn copy/paste into incidents.

## Recommended approach

**Default:** enforce access on the API. Use the framework’s default escaping. Prefer `HttpOnly` cookies for session tokens when the backend supports it. CSP, trusted types where available, and dependency scanning in CI.

**Acceptable alternative:** bearer tokens in memory (not `localStorage`) for SPAs that cannot use cookies, with short expiry and refresh.

**When the alternative is appropriate:** the API is purely token-based and XSS risk is actively mitigated (CSP, no HTML injection). Still never treat the token as secret from the user.

### ❌ Avoid

```ts
if (localStorage.getItem('role') === 'admin') {
  showRevenueDashboard();
}
```

### ✅ Recommended

```ts
const me = await api.getCurrentUser();
if (me.permissions.includes('revenue.read')) {
  showRevenueDashboard();
}
```

The API must still reject unauthorized `/api/revenue` calls.

See [XSS and input handling](xss-and-input-handling.md), [secrets and configuration](secrets-and-configuration.md), and [dependency security](dependency-security.md).

## Common mistakes

- Relying on obfuscation or minification to hide business rules.
- Disabling CSRF protection because “we use JSON”.
- Logging full access tokens to analytics.

## Quick checklist

- [ ] Sensitive operations are authorized server-side
- [ ] No secrets in the bundle
- [ ] XSS-safe rendering by default
- [ ] Auth storage choice is documented and reviewed
