# Secrets and Configuration

## Purpose

Separate public runtime config (API base URL, feature flags that are not secrets) from credentials. Frontend bundles are downloadable.

## Why it matters

A key in `app.constants.ts` or `environment.prod.ts` committed to git is public forever (history included). Payment, map, and auth secrets belong on a server.

## Recommended approach

**Default:** only **public** values in frontend env (`NG_APP_*`, `VITE_*`, `NEXT_PUBLIC_*`). Private keys stay on the backend. CI injects env at build or runtime config endpoint.

**Acceptable alternative:** a runtime `config.json` fetched on boot so one artifact can serve multiple environments.

**When the alternative is appropriate:** you cannot rebuild per environment; the JSON must still contain only public settings.

### ❌ Avoid

```ts
export const APP_CONFIG = {
  STRIPE_SECRET_KEY: 'sk_live_example',
  API_TIMEOUT_MS: 30000
} as const;
```

### ✅ Recommended

```ts
export const APP_CONFIG = {
  API_TIMEOUT_MS: 30000,
  MAX_RETRY_COUNT: 3
} as const;

export const PUBLIC_ENV = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL
};
```

Never put passwords, private API keys, client secrets, or long-lived personal tokens in source constants. See [constants and enums](../javascript/constants-and-enums.md) golden rules.

⚠️ Use with care: “publishable” Stripe/map keys are still constrained by domain and quotas; they are not an excuse to embed secret keys.

## Common mistakes

- Checking in `.env` with production values.
- Using the same API key in examples and production.
- Feature-flag services treated as security controls.

## Quick checklist

- [ ] No credentials in git
- [ ] Frontend env vars are documented as public
- [ ] `.env.example` has placeholders only
- [ ] Rotated keys if they ever landed in a PR
