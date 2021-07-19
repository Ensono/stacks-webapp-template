# @amidostacks/scaffolding-cli Bootstrap Image

Using the @amidostacks/node:14:0.0.1 base image, installs the @amidostacks/scaffolding-cli package to build a supplied project type.
Useful for testing the end to end scenario, emulating what the consumers of @amidostacks/scaffolding-cli will experience.

Versions:

- node: 12.x
- typescript: 3.7.5
- @amidostacks/scaffolding-cli: x.x

## Usage

Assumes the users do not need any environment variables configured.

### With supplied config file

This will take the sample bootstrapped config file and bootstrap the project. Assumes the current working directory contains a valid JSON config file to bootstrap the project from.

Input arguments:

- `PROJECT_WORKDIR`: Expected project root. Not that the project is bootstrapped into the directory as defined by the `projectName` in the bootstrap config JSON, e.g. yumidoexampleapp/src
- `CONFIG_FILENAME`: The name of the config file to bootstrap, e.g. ssr.bootstrap-config.json
- `VERSION`: The version of @amidostacks/scaffolding-cli, defaults to `latest`

`docker build --build-arg PROJECT_WORKDIR=<PROJECT_WORKDIR> --build-arg CONFIG_FILENAME=<CONFIG_FILENAME> . -t scaffolding-cli`

Using the built image:

- To run the project tests: `docker run -it --rm scaffolding-cli npm run test`
- To build the project `docker run -it --rm scaffolding-cli npm run build`

All the project package scripts can be executed as sanity checks.

### Interactive

Runs interactively, with entry point being the project root directory (`PROJECT_WORKDIR`).

`docker build --build-arg PROJECT_WORKDIR=<PROJECT_WORKDIR> --build-arg CONFIG_FILENAME=<CONFIG_FILENAME> . -t scaffolding-cli`
`docker run -it --rm scaffolding-cli /bin/bash`
