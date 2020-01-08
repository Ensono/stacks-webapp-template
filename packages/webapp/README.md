# Web Application

## To run locally

```bash
yarn dev
```

## Testing

#### Unit Testing

We are using [Jest](https://jestjs.io/) for running all unit, component,
integration and snapshot tests. Jest supports TypeScript via Babel. Because
TypeScript support in Babel is transpilation, to ensure that Jest will
type-check the tests as they are run we use
[ts-jest](https://github.com/kulshekhar/ts-jest).

To help that encourage good testing practices for React DOM testing, we are
leveraging a helper library [react-testing-library](https://jestjs.io/).

`yarn test`: To run all unit tests

> To run from root refer the [Readme](../../README.md)

## To build and run using Docker

In order to be able to build and run the webapp template, across environments
and as part of CI, we need to use [Docker](https://docs.docker.com/install/).

```bash
# build
docker build -t stacks-app .
# or, use multi-stage builds to build a smaller docker image
docker build -t stacks-app -f ./Dockerfile.multistage .
```

Run it:

```bash
docker run --rm -it -p 3000:3000 stacks-app
```
