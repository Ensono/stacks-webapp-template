/*
Global configuration properties
    The following configuration properties cannot be defined using the first method of passing them to cy.eyesOpen.
    They should be defined either in the applitools.config.js file or as environment variables.

    Documentation: https://github.com/applitools/eyes.sdk.javascript1/tree/master/packages/eyes-cypress#global-configuration-properties

    There are 3 ways to specify test configuration:
     1. Arguments to cy.eyesOpen()
     2. Environment variables
     3. The applitools.config.js file
    The list above is also the order of precedence.

⚠️ IMPORTANT: If APPLITOOLS_IS_DISABLED=true all calls to Eyes-Cypress commands will be silently ignored.
*/

module.exports = {
    apiKey: process.env.APPLITOOLS_API_KEY,
    appName: "Yumido Webapp",
    showLogs: true,
    saveDebugData: true,
    failCypressOnDiff: false, //If true, then the Cypress test fails if an eyes visual test fails. If false and an eyes test fails, then the Cypress test does not fail.
    saveNewTests: true, //New tests are saved by default
}
