---
title: First tutorial
description: Learn the basic shape of a small Tutor tutorial.
---

A Tutor tutorial starts with a focused explanation and a small example. Keep the
first step easy to follow, then build on it with the next idea.

For example, this TypeScript function prints a friendly greeting:

```typescript
const greet = (name: string): string => `Hello, ${name}!`;

console.log(greet('Tutor'));
```

## Use callouts

Starlight renders these standard Markdown directives as accessible asides. Use a
note for context, a tip for a helpful suggestion, a caution for something that
may cause trouble, and a warning when readers must avoid a serious mistake.

:::note
Notes add useful context without interrupting the main explanation.
:::

:::tip
Tips highlight a shortcut or a practical suggestion readers can apply right
away.
:::

:::caution
Cautions call attention to an approach that may have an unexpected result.
:::

:::danger[Warning]
Warnings identify a serious mistake that readers should avoid.
:::
