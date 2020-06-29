// ***********************************************
// Configure environment variables
//     We are pulling in the environment-configuration as defined for the webapp.
//     This ensures that we have a sole source of truth for all required

//     Optional: @applitools/eyes-cypress
//     Configure Eyes-Cypress plugin
//         Eyes-Cypress acts as a Cypress plugin, so it should be configured as such.
//         Unfortunately there's no easy way to do this automatically, so it's added AFTER
//         the definition of module.exports.
//         Documentation: https://www.npmjs.com/package/@applitools/eyes-cypress#1-configure-eyes-cypress-plugin
// ***********************************************

/**
 * @type {Cypress.PluginConfig}
 */

// This is specific to create-react-app
const conf = require("../config")

module.exports = (on, config) => {
    // modify config values
    config.defaultCommandTimeout = 10000
    config.baseUrl = `${conf.APP_BASE_URL}${conf.APP_BASE_PATH}`

    // Pull in all the environment runtime configuration for the webapp
    config.env = {
        ...conf,
    }
    console.log(config)

    // return config
    return config
}
