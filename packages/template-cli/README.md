# template-cli

Builds a Node.js with React SSR template from a command line interface (CLI).

## Dependencies

We are using npx to execute and create the [template-cli](./packages/template-cli) [npx](https://www.npmjs.com/package/npx).

We are supporting and running [node@12](https://nodejs.org/en/about/releases/). Please ensure that your local environment has the correct version
[installed](https://nodejs.org/en/download/).

We are leveraging [npm](https://www.npmjs.com/) for dependency management - follow the
installation instructions for your OS [here](https://www.npmjs.com/get-npm).

## Create app from template

Creates an amido-stacks template in your local directory much like express-generate with an addition of `build/, deploy/, docs/, src/` folders as per the Amido-Stacks standards.

1. Install dependencies required to generate the templated app:
```bash
cd ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/template-cli
npm install
npm run build
```

2. Change to a directory for testing - e.g. $HOME and run
```bash
cd ${SELECTED_DIR}
npx ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/template-cli
```

3. Follow the CLI prompts to create a templated app with user defined configuration:
- Project Name: _default_: current directory (will create a directory with this name)
- Project Type: _default_: SSR (server side rendering)
- Platform: _default_: AKS (Azure Kubernetes Service)
- CI/CD Tooling: _default_: AzureDevOps

4. Navigate to the created project directory to install template dependencies:
e.g. ${SELECTED_DIR}/$PROJECT_NAME
```bash
cd ${SELECTED_DIR}/$PROJECT_NAME/src/ssr
npm install
```

5. Build and run the app:
```bash
npm run build
npm run start
```

Open Browser and hit [http://localhost:3000](http://localhost:3000)


## Testing

```bash
npm run test
```

We are using [Jest.js](https://jestjs.io/) for testing including code coverage.
