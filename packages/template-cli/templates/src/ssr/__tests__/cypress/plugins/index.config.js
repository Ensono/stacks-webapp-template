/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const conf = require("../../../environment-configuration")
require("@applitools/eyes-cypress")(module)

module.exports = (on, config) => {
    console.log(config) // see what all is in here!

    // modify config values
    config.defaultCommandTimeout = 10000
    config.baseUrl = `${conf.APP_BASE_URL}:${conf.PORT}/${conf.APP_BASE_PATH}`

    //Pull in all the environment runtime configuration for the webapp
    config.env = {...conf}

    // return config
    return config
}
