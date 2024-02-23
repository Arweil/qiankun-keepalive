const serviceConfig = require('./service.config');

module.exports = {
  entry: 'src/index.tsx',
  bundleAnalyzerReport: false,
  devServer: {
    port: 8882,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: serviceConfig.proxy,
  },
  configureWebpack: {
    output: {
      library: 'app2',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_app2`,
    },
  },
};
