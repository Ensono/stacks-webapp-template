[![Maintained by Amido](https://img.shields.io/badge/Maintained%20by-Amido-yellow)](https://amido.com/)

# Server Side Rendering Web Application

## Getting started

Install dependencies (this may take a while, please be patient): `npm install`

Compile the app: `npm run build`

## Implementation details

The template is a Server Side Rendered (SSR) implementation using:

- [React.js](https://reactjs.org/) for the user interface (UI)
- React SSR framework [Next.js](https://nextjs.org/)
- Nextjs using a
  [Custom Server](https://nextjs.org/docs/advanced-features/custom-server) with
  Node.js [Express.js](https://expressjs.com/)

### Overview

_TODO: This needs to be refined for those whom are using this solution_

## To run locally

```bash
npm run start
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

To help that encourage good testing practices for React DOM testing, we are
leveraging a helper library [react-testing-library](https://jestjs.io/).

`npm run test`: To run all unit tests. This will also run any snapshot tests.
Snapshots are to be checked in and are found in
[**snapshots**](__tests__/__snapshots__).

### Functional Tests

For more information using Cypress, see:
[Testing and Quality](https://amido.github.io/stacks/docs/testing).

### Visual Testing

For more information using Applitools with Cypress, see:
[Testing and Quality](https://amido.github.io/stacks/docs/testing).

### Accessibility Testing

For more information using Axe with Jest and Cypress, see:
[Testing and Quality](https://amido.github.io/stacks/docs/testing).

### Static Testing

For more information about the running using amidostacks/ci-sonarscanner, please
refer to:
[amidostacks/ci-sonarscanner](https://hub.docker.com/repository/docker/amidostacks/ci-sonarscanner)

For general information about setting up and using SonarQube for static
analysis, please refer to the
[docs/test_static_code](https://github.com/amido/stacks-webapp-template/tree/master/docstest_static_code.md)

### Consumer driven contract testing with Pact

Please refer to the very verbose documentation in
[**tests**/pact/README](./__tests__/pact/README.md).
