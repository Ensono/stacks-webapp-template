const path = require("path")
const conf = require("./environment-configuration")

// next.config.js
module.exports = {
    webpack(config) {
        // eslint-disable-next-line
        config.resolve.alias = {
            ...config.resolve.alias,
            compositions: path.join(__dirname, "compositions"),
            components: path.join(__dirname, "components"),
            constants: path.join(__dirname, "constants"),
            config: path.join(__dirname, "environment-configuration"),
            utils: path.join(__dirname, "utils"),
        }
        // config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp:/moment$/ }))
        // config.plugins.push(new webpack.IgnorePlugin(/\/*.test.\/*/, /components$*/ ))
        // config.plugins.push(new webpack.IgnorePlugin(/\/*.test.\/*/, /components$*/ ))
        // config.plugins.push(new webpack.IgnorePlugin(/.+?cypress(.*)/gim))
        // config.plugins.push(new webpack.IgnorePlugin(/.+?jest(.*)/gim))
        // config.plugins.push(new webpack.IgnorePlugin(/components.*\/*.test.*/))
        // config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /components.*\/*.test.*/}))
        // /pages.*\/test.*/
        // config.plugins.push(new webpack.IgnorePlugin(/\/*.cy.ts\//))
        return config
    },
    assetPrefix: process.env.APP_BASE_PATH || "",
    // Only include tsx files for serving, excluding the *.cy.ts files for Cypress
    pageExtensions: ["tsx"],
    target: "server",
    serverRuntimeConfig: {
        // Will only be available on the server side
        ...conf,
        mySecret: "secret",
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        // only exposes staticly assigned/generated vars generated at build time to the client at runtime - BE CAREFUL with this
        ...conf,
        EXAMPLE_VAR_FOR_FE: "define_me",
    },
}
