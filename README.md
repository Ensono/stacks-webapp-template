# stacks-webapp-template

![Stacks Webapp Template](.github/images/stacks_banner.png)

Create SSR Node.js with React apps with no build configuration.

## Why?

Every new project exists to solve a unique challenge 
but requires common building blocks to get up and running.

Traditional approaches require clients to use a single, specific templating model that is quick to set up but too rigid to allow development of the ideal solution.

Amido Stacks brings 10 years of client expertise to every project, providing fast, flexible, bespoke value in an accelerated environment.

## Requirements

[npx](https://www.npmjs.com/package/npx) we are using npx to execute and create the [template-cli](./packages/template-cli). 
[Lerna](https://lernajs.io) and [Yarn](https://yarnpkg.com/) - follow the
installation instructions for your OS
[here](https://yarnpkg.com/lang/en/docs/install).

```
yarn global add lerna
```

**Make sure yarn workspaces are enabled!**

```
yarn config set workspaces-experimental true
```

## Contribution guidelines
We enforce the use of [Conventional Commits](https://commitlint.js.org) with CommitLint at commit time. We also lint and test all code before committing.

To link to an Azure Boards ticket, please include `AB#{id}` in your commit message. eg. `AB#1230`

## To create sample app locally

See [template-cli](./packages/template-cli/README.md) for information.


## To start

`yarn lerna:setup` to bootstrap the packages in the current Lerna repo. Installs
all of their dependencies and links any cross-dependencies.

## Tests

##### Static

`yarn lint`: runs global linting from root level, ensuring all packages are
following conventions specified in [.eslintrc](.eslintrc).

`yarn prettier`: runs formatting from root level, ensuring all packages are
following conventions specified in [.prettierrc](.prettierrc).

`yarn validate`: ensures that the project adheres to Typescript checks,
formatting and linting rules.

## Web Application

To run the web application from the root:

```bash
# To run locally:
yarn dev
```

> To read more about the webapp click [here](./packages/webapp/README.md)

### Node version

We are supporting and running [node@12](https://nodejs.org/en/about/releases/).
Please ensure that your local environment has the correct version
[installed](https://nodejs.org/en/download/).


