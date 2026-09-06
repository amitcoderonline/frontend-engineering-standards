# Testing Best Practices

## Purpose

Balance unit, integration, and end-to-end tests so CI stays fast and regressions still get caught.

## Why it matters

Only E2E is slow and brittle. Only unit tests miss wiring (router, interceptors, env). A documented pyramid (or trophy) keeps PRs from arguing every time.

## Recommended approach

**Default:** many unit tests for mappers, validators, and reducers; fewer component tests with testing-library; a thin E2E smoke for login + one critical path.

**Acceptable alternative:** more integration tests if the UI is the product (design system) and units would be trivial.

**When the alternative is appropriate:** a shared component library where visual/behavior contracts matter more than isolated functions.

### ❌ Avoid

Relying on a single E2E that logs in, creates an order, pays, and asserts PDF download for every PR.

### ✅ Recommended

- Unit: `addTag`, `toUserMessage`, `canEditOrders`
- Component: `OrderCard` shows name and calls `onSelect`
- E2E: user can log in and open the orders list against a stub or dedicated env

Keep tests deterministic. Seed data explicitly. Do not `sleep(5000)` to wait for UI—use find-by queries and fake timers.

Team decision: coverage thresholds and whether visual regression is required.

## Common mistakes

- Testing private functions through `export` hacks.
- Conditional tests (`it.skip` left behind).
- Depending on execution order between files.

## Quick checklist

- [ ] Right layer for the risk
- [ ] No arbitrary sleeps
- [ ] CI runs unit+component on every PR; E2E on main or nightly if heavy
- [ ] Flakes are quarantined with a ticket, not ignored forever
