---
id: monorepo
title: Template Monorepo
sidebar_label: Template Monorepo
---

<!-- TODO: change this around -->

## Description

The Amido stacks webapp template is a monorepo managed with
[Lerna](https://lernajs.io/)

At the moment, the project is comprised of:

- [Webapp](`packages/webapp`) - SSR React, Node.js
- [UI_Library](`packages/UILib`) - TBC

## Sample Project Directory Structure:

```
THIS NEEDS TO BE PRODUCED
```

## Approach

- _npm_ handles the dependencies.
- _Lerna_ handles tasks that affect multiple package (compile/test/lint all
  modules).
- One folder per package inside _packages/_.
  - any new package should be added within the `packages` directory and follow
    the above structure.
- All packages share the similar structure.
- _Task_ script is used to define set of common tasks like `test`, `lint` and
  `dev`. So any common task should be added in the script at the root level.
