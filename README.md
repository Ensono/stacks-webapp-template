[![Build Status](https://dev.azure.com/amido-dev/Amido-Stacks/_apis/build/status/stacks-webapp-template-pipeline?branchName=master)](https://dev.azure.com/amido-dev/Amido-Stacks/_build/latest?definitionId=70&branchName=master)

# stacks-webapp-template

Packages for templating SSR Node.js with React apps with little build configuration.

## Documentation

See [Amido Stacks Webapp](https://amido.github.io/stacks-webapp-template/) for docs.

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

## Contribution guidelines

Changes to this base repo flow through the Azure DevOps pipeline as defined in [build/azDevOps/azure](build/azDevOps/azure/).

We enforce the use of [Conventional Commits](https://commitlint.js.org) with CommitLint at commit time. We also lint and test all code before committing.

To link to an Azure Boards ticket, please include `AB#{id}` in your commit message. eg. `AB#1230`

Please see [Stacks/CONTRIBUTING](https://github.com/amido/stacks/blob/master/.github/CONTRIBUTING.md) to find out more.


## To start

`npm install` to install the dev dependencies from the root. This should invoke `npm run postinstall` automatically to bootstrap the packages in the current Lerna repo. Lerna installs all package dependencies and links any cross-dependencies.


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

## To create the sample app locally

For package management, we are using [Lerna](https://lernajs.io) which can be installed using [npm](https://www.npmjs.com/package/lerna).

We are using npx to execute and create the [template-cli](./packages/template-cli) [npx](https://www.npmjs.com/package/npx).

See [template-cli](./packages/template-cli/README.md) for information.

## Versioning and Publishing [packages](./docs/packages.md)

We are also using Lerna to publish our packages, version control, and for changelogs. For more informatiion checkout the publishing docs on [publishing](./docs/publishing.md).
