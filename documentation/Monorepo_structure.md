# Monorepo structure

## Description

The Amido stacks webapp template is a monorepo managed with
[Lerna](https://lernajs.io/) and
[Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

At the moment, the project is comprised of:

- [Webapp](`packages/webapp`) - SSR React, Node.js
- [UI_Library](`packages/UILib`) - TBC

## Sample Project Directory Structure:

```
├── .editorconfig
├── .prettierrc
├── .browserslistrc
├── .huskyrc
├── .gitignore
├── lerna.json
├── package.json
├── packages
│   ├── Webapp
│   │   ├── babelrc
│   │   ├── __tests__
│   │   │   ├── index.test.tsx
│   │   ├── .eslint.config.js
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   ├── README.md
│   │   ├── pages
│   │   │   └── index.tsx
│   │   ├── task -> ../../scripts/task
│   │   └── Dockerfile
│   ├── [sample Package]
│   │   ├── README.md
│   │   ├── __tests__
│   │   ├── Storybook
│   │   ├── package.json
│   │   ├── task -> ../../scripts/task
│   │   └── Dockerfile
├── README.md
├── scripts
│   └── task
└── yarn.lock
```

## Approach

- _Yarn_ handles the dependencies.
- _Lerna_ handles tasks that affect multiple package (compile/test/lint all
  modules).
- One folder per package inside _packages/_.
  - any new package should be added within the `packages` directory and follow
    the above structure.
- All packages share the similar structure.
- _Task_ script is used to define set of common tasks like `test`, `lint` and
  `dev`. So any common task should be added in the script at the root level.
