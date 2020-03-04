---
id: eslint
title: eslint Configuration
sidebar_label: Packages
---

* While we remain private: [GETTING STARTED](./GETTING_STARTED.md)
* Checkout our [CHANGELOG](./CHANGELOG.md) for latest changes
* See the template-cli generated [templates project](../template-cli/templates/src/ssr/package.json) for example usage

## ESLint Configuration Usage

Shared ESLint config to guide a consistent code style across front end development in (and outside!) [Amido](https://amido.com).

### Installation

Our default export contains all of our ESLint rules. The configuration was built based on other open source configuration. To run and use with your project, we must install peer dependencies.

1. To start run `npm install --save-dev @amido-stacks/eslint-config` to save as a dev dependency
2. Install peer dependecies with the correct versions:
   `npm info "@amido-stacks/eslint-config@latest" peerDependencies`

    ```shell
    npm install --save-dev \
    @typescript-eslint/parser \
    eslint \
    eslint-config-airbnb \
    eslint-config-prettier \
    eslint-import-resolver-typescript \
    eslint-plugin-jest \
    eslint-plugin-react \
    eslint-plugin-security \
    ```
    
## Usage
After installing, simply add a `.eslintrc` file the following to your project root (at the same level as `package.json`):

```json
{
  "extends": [
    "@amido-stacks/eslint-config"
  ]
}
```

In your `package.json` add a script to run linting:
```json
  "scripts": {
    "lint": "node_modules/.bin/eslint . -f codeframe"
  }
```

## Publishing

For information on how to publish changes to the linting rules, please see [Publishing Packages](../../docs/publishing.md).

## Security

We are using the `eslint-plugin-security` plugin to help idendity potentuiall security hotspots. See [Node Security](https://github.com/nodesecurity/eslint-plugin-security) for more information.
