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
npm run test:e2e
```

This should launch [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) and run the tests in the browsers specified in [.testcaferc.json](./.testcaferc.json) in headless mode.


### Accessibility Tests with aXe

```bash
npm run test:axe
```

This should launch [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) and run the tests in the browsers specified in [.testcaferc.json](./.testcaferc.json) in headless mode.

This will validated using axe-core, from the Deque famility of products: [aXe](https://www.deque.com/axe/). When developing, we expect to support WCAG 2.1 Level AA ["wcag21aa"] at a minimum. Additional configuration can be changed by defining the [context and options](https://www.npmjs.com/package/axe-testcafe#axe-options).


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

_⚠️ IMPORTANT: if you have defined an environment varibale, then `dotenv` will not override thi with the values in the `.env` file. The environment should always hold the source of truth._

- Base URL: `process.env.APP_BASE_URL` (defaults to deployed dev environment `http://dev.amidostacks.com`)
- Base URL: `process.env.APP_BASE_PATH` (optional, default to deployed dev environment `/web/stacks`)
- Base URL API: `process.env.MENU_API_URL` (defaults to deployed dev environment `http://dev.amidostacks.com/api/menu`)
- NODE_ENV: `process.env.NODE_ENV` (should be `production` for a deployed runnable webapp)

An example of your environment varibale configuration for running against a locally hosted server is as follows.

For Linux/Mac (replacing `export` with `set` for Windows):

``` bash
export NODE_ENV=development \
export PORT=3000 \
export APP_BASE_URL=http://localhost \
export MENU_API_URL=http://dev.amidostacks.com/api/menu \
export APP_BASE_PATH=""
```

Alternately, an example of your environment varibale configuration for running against a deployed webapp instance:

```bash
export NODE_ENV=production \
export APP_BASE_URL=http://dev.amidostacks.com \
export APP_BASE_PATH=/web/stacks \
export MENU_API_URL=http://dev.amidostacks.com/api/menu
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

Currently, we are supporting running Azure Pipelines. Please refer to the [test-functional-testcafe.yml](https://github.com/amido/stacks-pipeline-templates/blob/feature/cycle2/azDevOps/azure/templates/v2/steps/test-functional-testcafe.yml) for information on the step.

We run the TestCafe functional tests after successful deployment of the webapp to the cluster.

The publishArtifact task ensures the screenshots are captured if an applicable test fails. These are available as artifacts in the pipeline.

## Running with Lambdatest

[Lambdatest](https://www.lambdatest.com) is a Cross Browser Testing Cloud platform, leveraging the running on 2000+ Real Browsers and Operating Systems Online.

To run using [Lambdatest](https://accounts.lambdatest.com/dashboard), the following environment varibales must be enabled on the platform:

For Linux/Mac (replacing `export` with `set` for Windows):

```bash
export LT_USERNAME= {your lambdatest username}
export LT_ACCESS_KEY= {your lambdatest access_key}
```

Lambdatest will create a tunnel to run the tests and automatically record videos.

### Running E2E tests

```bash
npm run test:e2e -- "lambdatest:IE@11.0:Windows 10"
```

The full list of browser configuration available can be found by running the following in the root:

```bash
node_modules/.bin/testcafe -b lambdatest
```

_Documentation: https://www.lambdatest.com/support/docs/npm-plugin-for-testcafe-integration-with-lambdatest/_
