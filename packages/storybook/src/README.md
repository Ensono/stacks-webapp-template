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

```
Note: To avoid running the CSR in localhost CORS issues we can run the SSR app in the background and use MENU_API_URL env point to http://localhost:3000
```

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

Compile and watch for code changes: `npm run test:cypress:watch`

Run locally in
[Cypress Test Runner](https://docs.cypress.io/guides/guides/command-line.html#cypress-open):
`npm run test:cypress:open`

> ⚠️ IMPORTANT: For local development, you will need to start the server to host
> the webapp under dev. See [npm-start](#npm-start).

## Environment variables

We need to ensure that Cypress knows the following at a minimum:

- protocol (e.g. https)
- host (e.g. google.com)
- path (e.g. /images)

All variables should be pulled in using the same method the app does. In this
case, this is all dont in `cypress/plugins/index.config.js`

## Scripts

For all Cypress oriented scripts, see the
[`test:cypress` scripts](./package.json).
