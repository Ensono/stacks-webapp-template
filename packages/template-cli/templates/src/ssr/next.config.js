const path = require('path')
const webpack = require('webpack')

// next.config.js
module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      compositions: path.join(__dirname, 'compositions'),
      components: path.join(__dirname, 'components'),
      constants: path.join(__dirname, 'constants'),
      config: path.join(__dirname, 'config'),
    }

    return config
  },
  assetPrefix: process.env.APP_BASE_PATH || '',
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    EXAMPLE_VAR_FOR_FE: 'define_me',
  },
}
