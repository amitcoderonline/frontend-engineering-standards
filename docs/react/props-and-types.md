# React Props and Types

## Purpose

Type props so misuse is a compile error. Keep the public props of a shared component small and documented.

## Why it matters

`children?: any` and spreading `...rest` onto a `div` hide mistakes (passing `onSelect` to a DOM node). Optional props that are actually required after data loads cause runtime holes.

## Recommended approach

**Default:** a named `Props` interface (or `type`) per exported component. Use union props for exclusive variants (`icon` vs `iconSrc`). Extend native button/input props when wrapping DOM elements.

**Acceptable alternative:** `ComponentProps<'button'>` for thin wrappers.

**When the alternative is appropriate:** the component is a styled native element with no extra API.

### ❌ Avoid

```tsx
export function Button(props: any) {
  return <button {...props} />;
}
```

### ✅ Recommended

```tsx
type ButtonProps = {
  action: ButtonAction;
  children: React.ReactNode;
  onPress: (action: ButtonAction) => void;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'type'>;

export function Button({ action, children, onPress, type = 'button', disabled }: ButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={() => onPress(action)}>
      {children}
    </button>
  );
}
```

Discriminated unions beat optional fields that conflict:

```ts
type AlertProps =
  | { variant: 'success'; message: string }
  | { variant: 'error'; message: string; retry: () => void };
```

## Common mistakes

- `React.FC` plus `children` confusion on older typings—prefer explicit `children` if you need them.
- Optional callback props that are assumed to exist inside the child.
- Exporting props as `export type { Props as OrderCardProps }` inconsistently; pick a naming rule (`OrderCardProps`).

## Quick checklist

- [ ] Public props have a named type
- [ ] Native attributes are picked, not blindly spread, unless it is a DOM wrapper
- [ ] Mutually exclusive props are a union
- [ ] Callbacks include the payload the parent needs
