const serviceConfig = require('./service.config');
const theme = require('./theme');

module.exports = {
  entry: 'src/index.tsx',
  bundleAnalyzerReport: false,
  devServer: {
    port: 8881,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: serviceConfig.proxy,
  },
  configureWebpack: {
    output: {
      library: 'app1',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_app1`,
    },
  },
  css: {
    lessModifyVars: theme,
  }
};
