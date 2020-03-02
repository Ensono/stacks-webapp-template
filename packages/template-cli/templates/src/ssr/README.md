# Web Application

## Implementatation details

The template is a Server Side Rendered (SSR) implementation using:
- [React.js](https://reactjs.org/) for the user interface (UI) 
- React SSR framework [Next.js](https://nextjs.org/)
- Nextjs using a [Custom Server](https://nextjs.org/docs/advanced-features/custom-server) with Node.js [Express.js](https://expressjs.com/)

### Overview
*TODO: This needs to be refined for those whom are using this solution*

1. How are definining the routing for API's? 
   - menu.ts
   - how do we extend the endpoints
   - new API endpoints are then typeguarded to automatically get the internal endpoint
   - one place to configure the mapping 
   - route definition in the express definition
   - internal: BFF, external: the actual API

2. How does this run?

3. How does the [next.config.js](/packages/template-cli/templates/src/ssr/next.config.js) work?
  - Webpack additional config for Next.js, https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config.


## To run locally

```bash
npm run dev
```

## To build and run using Docker

In order to be able to build and run the webapp template, across environments
and as part of CI, we need to use [Docker](https://docs.docker.com/install/).

```bash
# build from the webapp directory
docker build ../ -f ./Dockerfile -t stacks-app
# or, use multi-stage builds to build a smaller docker image
docker build -t stacks-app -f ./Dockerfile.multistage .
```

Run it:

```bash
docker run --rm -it -p 3000:3000 stacks-app
docker run --rm -it -v $(pwd):/app/deployed/src stacks-app:latest /bin/sh
docker run --rm -it -v $(pwd):/usr/src sonarsource/sonar-scanner-cli
docker run --rm -it -p 3000:3000 stacks-app:latest /bin/sh
```

Alternatives to running in a container

```bash
CMD ["pm2-runtime", "--json", "./ecosystem.yml", "--exp-backoff-restart-delay=500", "-a", "--update-env"]
```

### Dockerfile Notes

Best practice guidelines:
  - Do not run app under root 
  - To maximise cache layer capacity we should copy over package.json into /tmp and build there


## Testing

### Unit, Component and Snapshot Testing

We are using [Jest](https://jestjs.io/) for running all unit, component,
integration and snapshot tests. Jest supports TypeScript via Babel. Because
TypeScript support in Babel is transpilation, to ensure that Jest will
type-check the tests as they are run we use
[ts-jest](https://github.com/kulshekhar/ts-jest).

We are using [Jest](https://jestjs.io/) for running all unit, component,
integration and snapshot tests. Jest supports TypeScript via Babel. Because
TypeScript support in Babel is transpilation, to ensure that Jest will
type-check the tests as they are run we use
[ts-jest](https://github.com/kulshekhar/ts-jest).

To help that encourage good testing practices for React DOM testing, we are
leveraging a helper library [react-testing-library](https://jestjs.io/).

`npm run test`: To run all unit tests. This will also run any snapshot tests.
Snapshots are to be checked in and are found in
[**snapshots**](__tests__/__snapshots__).

> To run from root refer the [Readme](../../README.md)

### Functional Tests
_Keywords: Functional automation, End to End, E2E_

We are using [Cypress](https://docs.cypress.io/) for functional testing as much as possible. The key features of Cypress:
* Integration testing with API testing support (Node.js)
* Easy debugabillity (DOM snapshotting)
* Selector playground
* Great documentation
* Best implementation of Live Reloading

Please read [Cypress - Best Practices](https://docs.cypress.io/guides/references/best-practices.html) for how to get the most out of Cypress.

To open and run Cypress locally with live reload, after installing dependencies:
1. Install app dependencies `npm install`
2. Build the webapp `npm run build`
3. Compile the `*.cy.ts` Cypress test files `npm run test:cypress:compile` (optional: pass `--watch` through to watch for changes)
4. Start the server, run the tests headless, tear down the server: `npm run test:cypress`. When writing tests: Open Cypress with live-reloading and selector playground `npm run test:cypress:open`

To spin up the server locally, running Cypress headless, use: `npm run test:cypress:eyes`. This is the same for running in CI pipelines.

The `*.cy.ts` are located with the rendered Next.js [pages](./pages/).
Environment configuration is pulled in using [Cypress plugin](./__tests__/cypress/plugins/index.js) from [environment-configuration](./environment-configuration/index.js). Note that the environment variables are required on the hosting platform, e.g. `export NODE_ENV=dev`

### Visual Testing
_Keywords: visual regression testing, browser support, cross browser_

We are using the [Applitools](https://applitools.com/) for visual testing. For the purposes of this demo app, we are using the free tier on the [stacks@amido.com](mailto: stacks@amido.com) Github account. This is free allowing for:
* 1 user
* 100 checkpoints per month

Eyes-Cypress ships with official type declarations for TypeScript. This allows you to add eyes commands to your TypeScript tests. The configuration file has been added to the [tsconfig.cypress.json](./tsconfig.cypress.json).

To run the visual tests follow steps above.

To spin up the server locally, running Cypress headless, use: `npm run test:cypress:eyes`. This is the same for running in CI pipelines.

The `*.cy.eyes.ts` tests are located with the rendered Next.js [pages](./pages/). Please ensure you follow naming conventions to ensure segregation of visual tests within CI.

### Static Testing

There is support with [SonarCloud](https://sonarcloud.io/) for static analysis.
We can run this with
[SonarScanner Docker](https://github.com/SonarSource/sonar-scanner-cli-docker)

In order to run, the export the followings environment variables for the
SonarCloud Project:

```bash
export SONAR_TOKEN=
export SONAR_PROJECT_NAME=
export SONAR_PROJECT_KEY=
export SONAR_ORGANIZATION=
```

To find this, please ensure that you sign up with GitHub to
[Sonarcloud](https://sonarcloud.io).

First generate the code coverage results, then run the SonarCloud scanner and
push up the results:

```bash
npm run test
docker run -e SONAR_HOST_URL=https://sonarcloud.io -e SONAR_TOKEN=$SONAR_TOKEN -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_ORGANIZATION=$SONAR_ORGANIZATION -e BUILD_NUMBER=1.2.3 --rm -t -v $(pwd):/usr/src sonarsource/sonar-scanner-cli
docker run -it -v $(pwd):/usr/src sonarsource/sonar-scanner-cli -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=$SONAR_TOKEN -Dsonar.projectKey=$SONAR_PROJECT_KEY -e sonar.organization=$SONAR_ORGANIZATION
```

### Consumer driven contract testing with Pact

_Note: The `beforeAll` and `afterAll` hooks in Jest is not before all tests but before each file._

Consumer Driven Contract (CDC) Testing is a pattern that allows a consumer (i.e: a client) and a provider (i.e. an API provider) to communicate using an agreed contract (a pact).

We are using Jest to wrap pact-js in order to create the interactions and generate the Pacts for the webapp as a consumer. Following the examples on [pact-js](https://github.com/pact-foundation/pact-js).

There is full documentation for how contract testing works available on the [Pact website](https://docs.pact.io/how_pact_works).

A global 'provider' variable is setup in the [pactSetup.ts](./pact/pactSetup.ts) file. Then the [pactTestWrapper.ts](./pact/pactTestWrapper.ts) ensures each test file will have the provider setup for them.

The `pactFileWriteMode` option been set to `update` in the provider that the pacts append to. Please see [pactFileWriteMode](https://docs.pact.io/implementation_guides/ruby/configuration#pactfile_write_mode)

```bash
# Generate and verify pacts against mock
npm run test:pact
```

Due to the afterAll hooks in Jest not invoking after all tests, but before each file, there is a [pactPublish](./pact/pactPublish.ts) script to publish the pacts to the configured broker.

```bash
# Export broker credentials for running locally, or define in Azure Pipelines Library
export PACT_BROKER= \
PACT_BEARER_TOKEN= 
``` 

```bash
# Publish the pacts to the configured broker
npm run test:pact-publish
```

#### Pact Stub Service
Pact contracts are easily turned into locally running API stubs. They are great for using as a simple service to run integration tests against, whether with Jest, or with Cypress. This ensures that you can test your application without hitting the actual endpoint, and ensures the same response everytime, without duplicating mock definitions.

If gives the consumer confidence that if the contract tests are passing with the provider, then the mocks should suffice to test parts of their application against.

No more updating stub responses that go out of date. Hooray!

The Pact files (.json) are generated when the Pact tests are run (`npm run tests:pact`), and are published to the broker on succeeding. In order to get the latest pact file to generate the stub service from, you can either:

1. Run the tests, which will output the Pact .json files to [__tests__/pacts](./__tests__/pacts)
2. Pull down the latest passing contracts from the broker (`https://PACT_BROKER/pacts/provider/PROVIDER/consumer/CONSUMER/latest`)

Once the files are sourced, it's as simple as starting the stub service either from the npm script in CI, or by calling the [pactStubServer.ts](./pact/packStubServer.ts) from your test.

```bash
# To start the Pact stub server
npm run test:pact-start-stub
```

To test the server:

```bash
# To test that the service is running and returning expected responses:
curl -v localhost:8389/v1/menu/7f993e28-b9b1-4ea7-830b-b30f9758db68 -H "Accept: application/json"
```

Please remember to always stop your server once done testing.
