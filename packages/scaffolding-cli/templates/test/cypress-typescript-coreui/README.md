# Cypress: Typescript CoreUI

Example of Cypress configuration with:

* core UI performance, security and profiling tests
* ...all in Typescript

## Getting started

Run `npm install`

## Folder structure

```text
.
├── compositions
│   └── home
│     ├── index.test.cy.ts
├── environment-configuration
│   ├── environment-variables.js
│   └── index.js
├── fixures
├── plugins
│   └── index.config.js
├── support
│   ├── commands.ts
│   └── index.config.js
├── applitools.config.js
├── cypress.json
├── package.json
├── reporter-config.json
├── structure.md
└── tsconfig.cypress.json
```

### compositions/home

We suggest saving your tests along side the Reacty components, and page compositions. For this example, all of our `home` page tests will be saved here. Note that the Typscript config will compile these tests, and Cypress will pick up the compiled js code from `"integrationFolder": "dist/__tests__"`. This allows for tests to be saved anywhere the code is, not in a seperate folder.

### environment-variables.js

This contains shared environmental config for both the webapp and Cypress. We can pull this into `plugins/index.config.js` to append to the global Cypress config.

_⚠️ IMPORTANT: if you have defined an environment varibale, then `dotenv` will not override this with the values in the `.env` file. The environment should always hold the source of truth._

An example of your environment varibale configuration for running against a locally hosted server is as follows.

For Linux/Mac (replacing `export` with `set` for Windows):

``` bash
export NODE_ENV=development \
export PORT=3000 \
export APP_BASE_URL=http://localhost \
export MENU_API_URL=https://dev.amidostacks.com/api/menu \
export APP_BASE_PATH=""
```

Alternately, an example of your environment varibale configuration for running against a deployed webapp instance:

```bash
export NODE_ENV=production \
export PORT="" \
export APP_BASE_URL=https://app.nonprod.amidostacks.com \
export APP_BASE_PATH=/web/stacks \
export MENU_API_URL=https://dev.amidostacks.com/api/menu
```

### tsconfig.cypress.json

Contains the typescript configuration for compiling Cypress tests. Note that ALL paths are relative to the tsconfig file. e.g. `outDir` would be relative to root in this case.

  `"types": ["node", "cypress"]`

## Environment variables

We need to ensure that Cypress knows the following at a minimum:

* protocol (e.g. https)
* host (e.g. google.com)
* path (e.g. /images)

All variables should be pulled in using the same method the app does. However for the purpose of this example, we have put in [/environment-configuration/](./environment-configuration/index.js) to showcase how to pull these into Cypress.

## Scripts

```json
    "test:cypress:build": "node_modules/.bin/tsc --project config/cypress/tsconfig.cypress.json",
    "test:cypress:watch": "npm run test:cypress:build -- --watch",
    "test:cypress:run": "npm run test:cypress:build && node_modules/.bin/cypress run --spec \"**/*.cy.js\"",
    "test:cypress:axe:run": "npm run test:cypress:run -- --spec \"**/*.test.axe.cy.js\"",
    "test:cypress:open": "npm run test:cypress:build && node_modules/.bin/cypress open",
    "test:cypress": "env CI=true node_modules/.bin/start-server-and-test start https://$HOST:$PORT test:cypress:run"
```
