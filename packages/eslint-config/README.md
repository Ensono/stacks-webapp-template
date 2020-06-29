---
id: eslint
title: eslint Configuration
sidebar_label: Packages
---

[![npm](https://img.shields.io/npm/v/@amidostacks/eslint-config)](https://www.npmjs.com/package/@amidostacks/eslint-config)

[![npm](https://img.shields.io/npm/dt/@amidostacks/scaffolding-cli)](https://www.npmjs.com/package/@amidostacks/scaffolding-cli)

- Checkout our [CHANGELOG](./CHANGELOG.md) for latest changes
- See the scaffolding-cli generated
  [templates project](../scaffolding-cli/templates/src/ssr/package.json) for
  example usage

## ESLint Configuration Usage

Shared ESLint config to guide a consistent code style across front end
development in (and outside!) [Amido](https://amido.com).

### Installation

Our default export contains all of our ESLint rules. The configuration was built
based on other open source configuration. To run and use with your project, we
must install peer dependencies.

1. To start run `npm install --save-dev @amidostacks/eslint-config` to save as a
   dev dependency
2. Install peer dependecies with the correct versions:
   `npx install-peerdeps --dev @amidostacks/eslint-config`

## Usage

After installing, simply add a `.eslintrc` file the following to your project
root (at the same level as `package.json`):

```json
{
  "extends": ["@amidostacks/eslint-config"]
}
```

You will also need to add a `.eslintignore` file to ensure that eslint ignores the relevant glob patterns. Please ensure that you configure this for your project, e.g. if your outdir is `out/` rather than `dist/` you will

```text
node_modules/
dist/
docs/
coverage/
__mocks__/
__tests__/
**/*.d.ts
```

In your `package.json` add a script to run linting:

```json
  "scripts": {
    "lint": "node_modules/.bin/eslint . -f codeframe"
  }
```

## Versioning and Publishing

For information on how to version and publish changes to this package, please
see [Publishing Packages](../../docs/publishing.md).

## Security

We are using the `eslint-plugin-security` plugin to help idendity potential
security hotspots. See
[Node Security](https://github.com/nodesecurity/eslint-plugin-security) for more
information.
