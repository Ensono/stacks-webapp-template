// ***********************************************
// Example configuation file to pull in runtime environment variables.

// This exisits for the purposes of demonstrating a standalone Cypress framework.

// To ensure DRY tests, that ideally this would be defined by the webapp, and Cypress would read from the same source.
// ***********************************************

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BASE_PATH: process.env.APP_BASE_PATH || "",

    // Additional webapp environment variables can be defined here.
    // These will be available globally to every Cypress test.
    EXAMPLE_VAR: "example environment specific variable",
}
