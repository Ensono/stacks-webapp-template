# stacks-webapp-template

# ![stacks-webapp-template](.github/images/stacks_logo.png)

### Dependencies
`yarn` on the root of the application to install all the dependencies.


### Node version
We are supporting and running [node@12](https://nodejs.org/en/about/releases/). Please ensure that your local environment has the correct version [installed](https://nodejs.org/en/download/).

## Tests

1. Static 
`yarn lint`: runs global linting from root level, ensuring all packages are following conventions specified in [.eslintrc](.eslintrc).
`yarn prettier`: runs formatting from root level, ensuring all packages are following conventions specified in [.prettierrc](.prettierrc).
`yarn validatte`: ensures that the project adheres to Typescript checks, formatting and linting rules.

## Web Application

To run the web application from the root:

```bash
# To run locally:
yarn webapp:dev
```

> To read more about the webapp click [here](./webapp/README.md)
