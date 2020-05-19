/*
Configure environment variables
    We are pulling in the environment-configuration as defined for the webapp.
    This ensures that we have a sole source of truth for all required 
  

    Optional: @applitools/eyes-cypress    
    Configure Eyes-Cypress plugin
        Eyes-Cypress acts as a Cypress plugin, so it should be configured as such. 
        Unfortunately there's no easy way to do this automatically, so it's added AFTER
        the definition of module.exports.
        Documentation: https://www.npmjs.com/package/@applitools/eyes-cypress#1-configure-eyes-cypress-plugin
*/

/**
 * @type {Cypress.PluginConfig}
 */

// This is specific to create-react-app
const getClientEnvironment = require("../../../config/env")
const paths = require("../../../config/paths")

module.exports = (on, config) => {
    // modify config values
    config.defaultCommandTimeout = 10000

    // Get the current NODE_ENV and determine the correct app paths from it
    const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
    const protocol = process.env.HTTPS === "true" ? "https" : "http"
    const port = process.env.PORT || 3000
    const HOST = process.env.HOST || "0.0.0.0"
    const baseUrl = env.raw.PUBLIC_URL || HOST

    config.baseUrl = `${protocol}://${baseUrl}:${port}/${env.raw.APP_BASE_PATH}`

    //Pull in all the environment runtime configuration for the webapp
    config.env = {
        ...getClientEnvironment.raw,
    }
    console.log(config)

    // return config
    return config
}

// Pre-req: npm install --save-dev @applitools/eyes-cypress
// ⚠️ IMPORTANT: the eyes this code after the definition of module.exports
// require("@applitools/eyes-cypress")(module)
