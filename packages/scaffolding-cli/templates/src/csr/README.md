[![Maintained by Amido](https://img.shields.io/badge/Maintained%20by-Amido-yellow)](https://amido.com/)

# Client Side Rendering Web Application

CSR webapp is bootstrapped from
[Create-React-App](https://create-react-app.dev/docs/getting-started)

## Implementation details

The template is a Client Side Rendered (CSR) implementation using:

- [React.js](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://docs.cypress.io/)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `dist` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

### Making a Progressive Web App

This section has moved here:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here:
https://facebook.github.io/create-react-app/docs/advanced-configuration


## Cypress: Functional Testing

## Getting started

Run `npm install --save-dev cypress axe-core cypress-axe @types/cypress-axe @applitools/eyes-cypress`

## Folder structure

├── __tests__
│   └── fixtures
│     ├── add-menu-response.json
│     └── get-menu-response.json
├── config
│   ├── cypress
│   │   ├── plugins
│   │   │   └── index.config.js
│   │   ├── support
│   │   │   └── index.config.js
│   │   └── tsconfig.cypress.json
│   ├── env.js
├── public
├── scripts
├── src
├── README.md
├── cypress.json
├── package-lock.json
├── package.json
└── tsconfig.json

### env.js

This contains shared environmental config for both the webapp and Cypress. We can pull this into `plugins/index.config.js` to append to the global Cypress config.

### tsconfig.cypress.json

Contains the typescript configuration for compiling Cypress tests.

Applitools (optional):
  If you opt to use Applitools with Cypress, it's here that you will need to add reference to the types:

  `"types": ["node", "cypress", "cypress-axe", "@applitools/eyes-cypress"]`

  and where the files are located in the node modules so that they too are compiled with Cypress tests:
  `"files": ["../../node_modules/@applitools/eyes-cypress/eyes-index.d.ts"]`

## Environment varibales

We need to ensure that Cypress knows the following at a minimum:

* protocol (e.g. https)
* host (e.g. google.com)
* path (e.g. /images)

All variables should be pulled in using the same method the app does. In this case, this is all dont in `cypress/plugins/index.config.js`

## Scripts

    "test:cypress:build": "node_modules/.bin/tsc --project config/cypress/tsconfig.cypress.json",
    "test:cypress:watch": "npm run test:cypress:build -- --watch",
    "test:cypress:run": "npm run test:cypress:build && node_modules/.bin/cypress run --spec \"**/*.cy.js\"",
    "test:cypress:axe:run": "npm run test:cypress:run -- --spec \"**/*.test.axe.cy.js\"",
    "test:cypress:open": "npm run test:cypress:build && node_modules/.bin/cypress open",
    "test:cypress": "env CI=true node_modules/.bin/start-server-and-test start https://$HOST:$PORT test:cypress:run"
