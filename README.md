# stacks-webapp-template

# ![stacks-webapp-template](.github/images/stacks_logo.png)


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

## To create sample app locally

See [template-ci](./packages/template-cli/README.md) for information.


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


