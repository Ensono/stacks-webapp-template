// Export all environment and static variables. Pulled into Cypress at build time with plugins/index.config.js

const APP_ENVIRONMENT_VARIABLES = require("./environment-variables")

module.exports = {
    ...APP_ENVIRONMENT_VARIABLES,
    MY_STATIC_APP_VARIABLE: "anything static across environments goes here",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    TEST: process.env.NODE_ENV === "test",
    PRODUCTION: process.env.NODE_ENV !== ("development" || "test"),
}
