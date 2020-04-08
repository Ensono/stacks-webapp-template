# Web Application

## Implementatation details

The template is a Server Side Rendered (SSR) implementation using:

- [React.js](https://reactjs.org/) for the user interface (UI)
- React SSR framework [Next.js](https://nextjs.org/)
- Nextjs using a
  [Custom Server](https://nextjs.org/docs/advanced-features/custom-server) with
  Node.js [Express.js](https://expressjs.com/)

### Overview

_TODO: This needs to be refined for those whom are using this solution_

1. How are definining the routing for API's?

   - menu.ts
   - how do we extend the endpoints
   - new API endpoints are then typeguarded to automatically get the internal
     endpoint
   - one place to configure the mapping
   - route definition in the express definition
   - internal: BFF, external: the actual API

2. How does this run?

3. How does the
   [next.config.js](/packages/template-cli/templates/src/ssr/next.config.js)
   work?

- Webpack additional config for Next.js,
  https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config.

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
- To maximise cache layer capacity we should copy over package.json into /tmp
  and build there

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

We are using [Cypress](https://docs.cypress.io/) for functional testing as much
as possible. The key features of Cypress:

- Integration testing with API testing support (Node.js)
- Easy debugabillity (DOM snapshotting)
- Selector playground
- Great documentation
- Best implementation of Live Reloading

Please read
[Cypress - Best Practices](https://docs.cypress.io/guides/references/best-practices.html)
for how to get the most out of Cypress.

To open and run Cypress locally with live reload, after installing dependencies:

1. Install app dependencies `npm install`
2. Build the webapp `npm run build`
3. Compile the `*.cy.ts` Cypress test files `npm run test:cypress:compile`
   (optional: pass `--watch` through to watch for changes)
4. Start the server, run the tests headless, tear down the server:
   `npm run test:cypress`. When writing tests: Open Cypress with live-reloading
   and selector playground `npm run test:cypress:open`

To spin up the server locally, running Cypress headless, use:
`npm run test:cypress:eyes`. This is the same for running in CI pipelines.

The `*.cy.ts` are located with the rendered Next.js [pages](./pages/).
Environment configuration is pulled in using
[Cypress plugin](./__tests__/cypress/plugins/index.js) from
[environment-configuration](./environment-configuration/index.js). Note that the
environment variables are required on the hosting platform, e.g.
`export NODE_ENV=dev`

### Visual Testing

_Keywords: visual regression testing, browser support, cross browser_

We are using the [Applitools](https://applitools.com/) for visual testing. For
the purposes of this demo app, we are using the free tier on the
[stacks@amido.com](mailto: stacks@amido.com) Github account. This is free
allowing for:

- 1 user
- 100 checkpoints per month

Eyes-Cypress ships with official type declarations for TypeScript. This allows
you to add eyes commands to your TypeScript tests. The configuration file has
been added to the [tsconfig.cypress.json](./tsconfig.cypress.json).

To run the visual tests follow steps above.

To spin up the server locally, running Cypress headless, use:
`npm run test:cypress:eyes`. This is the same for running in CI pipelines.

The `*.test.eyes.cy.ts` tests are located with the rendered Next.js
[pages](./pages/). Please ensure you follow naming conventions to ensure
segregation of visual tests within CI.

### Accessibility Testing

From the Deque famility of products, we are using
[aXe](https://www.deque.com/axe/) for accessibility testing. When developing, we
expect to support WCAG 2.1 Level AA ["wcag21aa"] at a minimum.

aXe tests are performed on two levels:

1. first by rendering the React component and testing with Jest. See
   [index.axe.test.tsx](./components/ApiPane/index.axe.test.tsx) for example;
2. second with Next rendering the entire page and tessting with Cypress. See
   [index.test.axe.cy.ts](./compositions/home/index.test.axe.cy.ts) for example.

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

Please refer to the very verbose documentation in [__tests__/pact/README](./__tests__/pact/README.md).
