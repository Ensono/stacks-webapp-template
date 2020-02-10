# Web Application

## To run locally

```bash
npm run dev
```

## Testing

#### Unit, Component and Snapshot Testing

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

#### Static Testing

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
