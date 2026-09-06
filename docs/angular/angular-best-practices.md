# Angular Best Practices

## Purpose

Cross-cutting Angular habits that keep apps upgradeable and consistent: standalone vs NgModules, change detection, templates, and style encapsulation.

## Why it matters

Mixing modules, standalone, and implicit `any` in templates slows upgrades. Inconsistent folder layout makes code review slower than the feature itself.

## Recommended approach

**Default:** follow the Angular version’s current style (standalone components on modern versions). `OnPush` for list-heavy views. Strict template type checking (`strictTemplates`).

**Acceptable alternative:** NgModules until the app finishes a planned standalone migration.

**When the alternative is appropriate:** a large NgModule app mid-migration; do not wrap every new component in a module *and* standalone without a map.

### ❌ Avoid

```html
<button (click)="user.role==='admin' && save($event) && log($event)">Save</button>
```

### ✅ Recommended

```html
<button type="button" [disabled]="!canSave()" (click)="save()">Save</button>
```

```ts
canSave(): boolean {
  return this.auth.can('order.update') && this.form.valid;
}
```

Use `trackBy` for large lists. Keep CSS in the component unless the style is truly global (theme tokens).

Prefer Angular’s control flow (`@if`, `@for`) on versions that support it, with a team migration note.

## Common mistakes

- Disabling `strictTemplates` to “ship faster”.
- Subscribing in the constructor.
- Putting API URLs in templates.

## Quick checklist

- [ ] Template type checking is on
- [ ] New screens follow the app’s standalone/module convention
- [ ] Permissions and formatting live in TS, not complex template expressions
- [ ] Lists use `trackBy` when they churn
