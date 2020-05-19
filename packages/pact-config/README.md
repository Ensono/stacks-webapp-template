# Pact-Config

Jest wrapper to help write Consumer contract tests with Jest.
Inspired heavily and credit to the Pact supported [jest-pact adapter](https://github.com/pact-foundation/jest-pact).

Additional features include binaries to:

* Publish Pacts to broker
* Check if if's safe to deploy
* Start stub loclly using the Pact contract

## Getting started

`npm install --save-dev jest-pact`

Install peer dependencies (if required):

`npx install-peerdeps --dev @amidostacks/pact-config`

## Configuration

### Environment variables

```bash
export PACT_CONSUMER= \
export PACT_PROVIDER=
```

Optionally, if you are using a Pact broker please also set the following:

```bash
export PACT_BEARER_TOKEN= \
export PACT_BROKER=
```

For more information, please refer to [Consumer Driven Contract Testing with Pact](https://amido.github.io/stacks/docs/testing#consumer-driven-contract-testing-with-pact).

### Jest config

After installing the packages, you will need to configure Jest.

It is recommended to create a seperate file that can be called with `jest --c jest.pact.config.json --runInBand` as a script:

 ```json
 {
  "testMatch": ["**/*.test.pact.(ts)"],
  "testEnvironment": "node",
  "moduleFileExtensions": ["ts", "js", "json"],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "!<rootDir>/node_modules/@amidostacks/pact-config"
  ],
  "reporters": [
    "default",
    [
      "jest-junit",
      {
        "outputName": "pact-junit-test-report.xml"
      }
    ]
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  }
}
```

### npm Scripts

We suggest the folllowing to be added to your `package.json` to run pact.

```json
    "test:pact": "node_modules/.bin/jest --c jest.pact.config.json --runInBand",
    "test:pact-publish": "node_modules/.bin/pact-publish",
    "test:pact-start-stub": "node_modules/.bin/pact-start-stub",
    "test:pact-can-i-deploy-ci": "node_modules/.bin/pact-can-i-deploy",
    "test:pact-can-i-deploy-cli": "node_modules/.bin/pact-broker can-i-deploy --pacticipant $PACT_CONSUMER -l --broker-base-url $PACT_BROKER --broker-token $PACT_BEARER_TOKEN"
```

#### test:pact

Runs the Pact tests against the mock, and writes the contract out on success.

#### test:pact-publish

Publishes the contracts to the broker.

#### test:pact-start-stub

Starts a local stub server from the generated Pact contracts

#### test:pact-can-i-deploy-ci

Example script to run in Continuous Integration pipeline to check if the Consumer is OK to deploy without breaking changes.

#### test:pact-can-i-deploy-cli

Same as `test:pact-can-i-deploy-ci`, except run using the Command Line Interface (CLI).

## Examples

For examples of clients using this package, see the templated code in [stacks-webapp-template](https://github.com/amido/stacks-webapp-template/tree/master/packages/scaffolding-cli/templates/src).

## Credits

[Jest-Pact](https://github.com/pact-foundation/jest-pact)
[Pact Foundation](https://github.com/pact-foundation)
[Pact JS](https://github.com/pact-foundation/pact-js)
