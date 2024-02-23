const serviceConfig = require('./service.config');

module.exports = {
  entry: 'src/index.ts',
  bundleAnalyzerReport: false,
  devServer: {
    port: 8880,
    open: false,
    proxy: serviceConfig.proxy,
  },
};
