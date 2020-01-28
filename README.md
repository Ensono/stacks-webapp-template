# stacks-webapp-template

![Stacks Webapp Template](.github/images/stacks_banner.png)

Create SSR Node.js with React apps with no build configuration.

## Why?

Every new project exists to solve a unique challenge 
but requires common building blocks to get up and running.

Traditional approaches require clients to use a single, specific templating model that is quick to set up but too rigid to allow development of the ideal solution.

Amido Stacks brings 10 years of client expertise to every project, providing fast, flexible, bespoke value in an accelerated environment.

## Requirements

We are supporting and running [node@12](https://nodejs.org/en/about/releases/).

Please ensure that your local environment has the correct version
[installed](https://nodejs.org/en/download/).

We are leveraging [npm](https://www.npmjs.com/) for dependency management - follow the
installation instructions for your OS [here](https://www.npmjs.com/get-npm).

For package management, we are using [Lerna](https://lernajs.io) which can be installed using [npm](https://www.npmjs.com/package/lerna).

We are using npx to execute and create the [template-cli](./packages/template-cli) [npx](https://www.npmjs.com/package/npx).


## To start

`npm install` to install the dev dependencies from the root.

`npm run postinstall` to bootstrap the packages in the current Lerna repo. Installs
all of their dependencies and links any cross-dependencies.


## To create the sample app locally

See [template-cli](./packages/template-cli/README.md) for information.


## Tests

##### Static

`npm run lint`: runs global linting from root level, ensuring all packages are
following conventions specified in [.eslintrc](.eslintrc).
  
`npm run prettier`: runs formatting from root level, ensuring all packages are
following conventions specified in [.prettierrc](.prettierrc).

`npm run validate`: ensures that the project adheres to Typescript checks,
formatting and linting rules.

##### Unit

`npm run test`: runs the unit tests for all packages.
