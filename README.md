# Frontend Engineering Standards

Reusable JavaScript, TypeScript, Angular, React, testing, security, and Git/code-review standards for application teams.

This repository is a **shared reference**, not an application. Product repos should follow these guidelines so frontend code stays readable, consistent, and maintainable across teams.

## Who should use this

- Frontend engineers (about 1–5 years of experience, and anyone onboarding)
- Tech leads and architects reviewing pull requests
- Teams sharing UI work across Angular and React applications
- Anyone adding ESLint, TypeScript, tests, or CI rules that should match the written standard

## How application repositories should reference this

1. Link this repo from the application `README.md` (clone URL or internal docs portal).
2. Prefer a **pinned version** (git tag or commit SHA) when you cite a rule in a PR or RFC, so the standard does not silently change under you.
3. Copy only what you must (for example a snippet into an ADR). Do not fork entire docs into each app unless you have a documented reason.
4. Align local tooling with the docs: ESLint configs, `tsconfig`, test helpers, and CI checks should enforce the same rules this repo describes.
5. When an app needs an exception, document it in that app (ADR or `docs/exceptions.md`) and say **why**, rather than silently diverging.

Suggested application README snippet:

```md
Frontend coding standards: see [frontend-engineering-standards](../frontend-engineering-standards/README.md).
```

Adjust the relative path to match how your org lays out repositories.

## How standards are organized

| Area | Location |
| ---- | -------- |
| JavaScript | [docs/javascript](docs/javascript/constants-and-enums.md) |
| TypeScript | [docs/typescript](docs/typescript/types-vs-interfaces.md) |
| Angular | [docs/angular](docs/angular/angular-best-practices.md) |
| React | [docs/react](docs/react/react-best-practices.md) |
| Testing | [docs/testing](docs/testing/testing-best-practices.md) |
| Security | [docs/security](docs/security/frontend-security.md) |
| Git and code review | [docs/git](docs/git/commit-guidelines.md) |
| Worked examples | [examples](examples/good-examples/README.md) |

### JavaScript

- [Constants and enums](docs/javascript/constants-and-enums.md)
- [Naming conventions](docs/javascript/naming-conventions.md)
- [Functions](docs/javascript/functions.md)
- [Arrays and objects](docs/javascript/arrays-and-objects.md)
- [Async/await and promises](docs/javascript/async-await-and-promises.md)
- [Error handling](docs/javascript/error-handling.md)
- [Common anti-patterns](docs/javascript/common-anti-patterns.md)

### TypeScript

- [Types vs interfaces](docs/typescript/types-vs-interfaces.md)
- [Enums and `as const`](docs/typescript/enums-and-as-const.md)
- [Generics](docs/typescript/generics.md)
- [Null and undefined](docs/typescript/null-and-undefined.md)
- [Type-safety best practices](docs/typescript/type-safety-best-practices.md)

### Angular

- [Components](docs/angular/components.md)
- [Services](docs/angular/services.md)
- [Dependency injection](docs/angular/dependency-injection.md)
- [RxJS](docs/angular/rxjs.md)
- [State management](docs/angular/state-management.md)
- [Angular best practices](docs/angular/angular-best-practices.md)

### React

- [Components](docs/react/components.md)
- [Hooks](docs/react/hooks.md)
- [State management](docs/react/state-management.md)
- [Props and types](docs/react/props-and-types.md)
- [React best practices](docs/react/react-best-practices.md)

### Testing

- [Unit testing](docs/testing/unit-testing.md)
- [Mocking](docs/testing/mocking.md)
- [Test naming](docs/testing/test-naming.md)
- [Testing best practices](docs/testing/testing-best-practices.md)

### Security

- [Frontend security](docs/security/frontend-security.md)
- [Secrets and configuration](docs/security/secrets-and-configuration.md)
- [XSS and input handling](docs/security/xss-and-input-handling.md)
- [Dependency security](docs/security/dependency-security.md)

### Git

- [Commit guidelines](docs/git/commit-guidelines.md)
- [Branching strategy](docs/git/branching-strategy.md)
- [Pull request guidelines](docs/git/pull-request-guidelines.md)
- [Code review checklist](docs/git/code-review-checklist.md)

## Documentation vs enforcement

Written standards explain **why**. Tooling should make the easy, correct path the default.

```text
Documentation
      ↓
Coding Standard
      ↓
ESLint / TypeScript / Tests
      ↓
CI Pipeline
      ↓
Pull Request
```

- **Documentation** describes intent, trade-offs, and examples humans can apply in review.
- **Coding standard** is the agreed team rule (for example: prefer `as const` for simple value sets).
- **ESLint / TypeScript / tests** catch violations automatically: unused vars, `any`, missing keys, broken contracts.
- **CI** runs those checks on every change so local setup is not the only gate.
- **Pull request** is where reviewers check what tools cannot: naming that matches the domain, security judgment, and whether an exception is justified.

Documentation without enforcement drifts. Enforcement without documentation produces “the linter said so” reviews. Use both.

## How to contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: branch, add real examples and reasoning, open a PR, get maintainer review, then merge.

## Markers used in the docs

```text
❌ Avoid
✅ Recommended
⚠️ Use with care
```

## License and ownership

Treat this as internal engineering documentation unless your organization publishes it under a specific license. Update owners in your org’s CODEOWNERS when you adopt the repo.
