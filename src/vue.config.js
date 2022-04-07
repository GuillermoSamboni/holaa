const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'DFP App',
    themeColor: '#238276',
    msTileColor: '#238276',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#238276',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
