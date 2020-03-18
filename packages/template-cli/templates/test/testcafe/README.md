# Template Functional Automation Test Framework

## Getting started

Ensure that [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed with the versions specified in [package.json](./package.json).

### Dependencies

```bash
npm install
```

To install peer dependencies for linting:
```bash
npx install-peerdeps --save-dev @amidostacks/eslint-config
```

### Linting

```bash
npm run lint
```

### End to End (E2E) Tests

```bash
npm test:e2e
```

This should launch [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) and run the tests in the browsers specified in [.testcaferc.json](./.testcaferc.json) in headless mode.

## Browser configuration

We assume that most users will have Chrome installed on their operating system. If this is not the case, the base configuration file  
  "browsers": [
    "chrome:headless",
    "firefox:headless"
  ],

To bypass the browser config in the [.testcaferc.json](./.testcaferc.json) config file, simply run passing in the browser arg:

```bash
npm run test:e2e -- chrome
```

See [browsers](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/) for more information.


## Environment variables

### E2E Tests
We can use the [.env](./.env) file to specify defaults instead of exporting locally, or using your IDE.

_Important: if you have defined an environment varibale, then `dotenv` will not override thi with the values in the `.env` file. The environment should always hold the source of truth._

- Base URL: `process.env.APP_BASE_URL` (defaults to deployed dev environment `http://dev.amidostacks.com`)
- Base URL: `process.env.APP_BASE_PATH` (optional, default to deployed dev environment `/web/stacks`)
- Base URL API: `process.env.MENU_API_URL` (defaults to deployed dev environment `http://dev.amidostacks.com/api/menu`)
- NODE_ENV: `process.env.NODE_ENV` (should be `production` for a deployed runnable webapp)

An example of your environment varibale configuration for running against a locally hosted server:
``` bash
export NODE_ENV=development
export PORT=3000
export APP_BASE_URL=http://localhost
export MENU_API_URL=http://dev.amidostacks.com/api/menu
export APP_BASE_PATH=""
```

Alternately, an example of your environment varibale configuration for running against a deployed webapp instance:

```bash
export NODE_ENV=production
export APP_BASE_URL=http://dev.amidostacks.com \
export APP_BASE_PATH=/web/stacks \
export MENU_API_URL=http://dev.amidostacks.com/api/menu \
```

## Running tests in Docker

In order to be able to run these tests across environments and as part of CI, we need to use Docker to run them.

### Build

```bash
npm install
```

### Run
```bash
docker pull testcafe/testcafe:latest
```

```bash
docker run -e APP_BASE_URL=$APP_BASE_URL -e APP_BASE_PATH=$APP_BASE_PATH -e MENU_API_URL=$MENU_API_URL -e NODE_ENV=$NODE_ENV -it -v $(pwd):/tests testcafe/testcafe chromium /tests/**/*.test.cf.ts
```

### Running in CI/CD

Currently, we are supporting running Azure Pipelines. Please refer to the [test-functional-testcafe.yml](https://github.com/amido/stacks-pipeline-templates/blob/feature/cycle2/azDevOps/azure/templates/v2/steps/test-functional-testcafe.yml)

