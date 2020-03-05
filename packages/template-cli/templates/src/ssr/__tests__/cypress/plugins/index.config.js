/**
 * @type {Cypress.PluginConfig}
 */

require("@applitools/eyes-cypress")(module)
const conf = require("../../../environment-configuration")

module.exports = (on, config) => {
    // modify config values
    config.defaultCommandTimeout = 10000
    config.baseUrl = `${conf.APP_BASE_URL}:${conf.PORT}/${conf.APP_BASE_PATH}`

    //Pull in all the environment runtime configuration for the webapp
    config.env = {
        ...conf,
    }
    console.log(config)

    // return config
    return config
}
