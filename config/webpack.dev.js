// Webpack plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack configuation
 *
 * See https://webpack.js.org/configuration
 */
module.exports = function() {

  var config = require('./webpack.common')({NODE_ENV: 'development'});

  /**
   * Control how source maps are generated.
   *
   * See https://webpack.js.org/configuration/devtool/
   */
  config.devtool = 'cheap-module-source-map';

  /**
   * Set various development-specific output options.
   *
   * See https://webpack.js.org/configuration/output/
   */
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[id].chunk.js';

  /**
   * Add development-specific Webpack plugins.
   *
   * See https://webpack.js.org/configuration/plugins/
   */
  config.plugins.push(

    /**
     * Extract CSS files.
     *
     * See See https://github.com/webpack/extract-text-webpack-plugin
     */
    new ExtractTextPlugin('[name].css'),

    /**
     * Switch loaders into debug mode. The docs are somewhat contradictory and ambiguous here, but
     * this method appears to be recommended.
     *
     * See https://webpack.js.org/guides/migrating/#debug
     */
    new LoaderOptionsPlugin({debug: true})

  );

  /**
   * Configure the webpack-dev-server.
   *
   * See https://webpack.js.org/configuration/dev-server/
   * See http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    stats: 'minimal'
  };

  return config;
}();
