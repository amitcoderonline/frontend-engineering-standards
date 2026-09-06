# XSS and Input Handling

## Purpose

Stop untrusted strings (user content, query params, API HTML) from executing as script in the browser.

## Why it matters

XSS steals sessions, defaces UI, and pivots to APIs the user can call. Framework escaping is the default defense; bypasses must be rare and reviewed.

## Recommended approach

**Default:** interpolate text through React/Angular bindings. Validate and encode URLs before `href`/`src`. Sanitize HTML with a vetted library if you must render rich text.

**Acceptable alternative:** a backend-provided sanitized HTML subset (allowlist tags).

**When the alternative is appropriate:** a CMS already sanitizes; still do not skip `bypassSecurityTrustHtml` reviews.

### ❌ Avoid

```tsx
<div dangerouslySetInnerHTML={{ __html: comment.body }} />
```

```ts
this.trust = this.sanitizer.bypassSecurityTrustHtml(comment.body);
```

### ✅ Recommended

```tsx
<p>{comment.body}</p>
```

If rich text is required:

```ts
const html = sanitizeHtml(comment.body, {
  allowedTags: ['b', 'i', 'em', 'a'],
  allowedAttributes: { a: ['href'] }
});
```

Reject `javascript:` and `data:text/html` links. Encode values put into `innerHTML` by accident in vanilla widgets.

Query params are untrusted:

```ts
const q = new URLSearchParams(window.location.search).get('q') ?? '';
setSearch(q); // display as text, never eval
```

## Common mistakes

- Sanitizing on write only, then concatenating unsanitized admin notes later.
- Using `eval` or `new Function` on server messages.
- Assuming `JSON.parse` makes content safe to inject as HTML.

## Quick checklist

- [ ] Default rendering is text, not HTML
- [ ] Any `dangerouslySetInnerHTML` / bypass has a sanitizer and a PR note
- [ ] URLs are allowlisted by protocol
- [ ] User input is not used as code
