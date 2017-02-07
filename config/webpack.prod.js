const root = require('./helpers').root;

// Webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack configuation
 *
 * See https://webpack.js.org/configuration
 */
module.exports = function() {

  var config = require('./webpack.common')({NODE_ENV: 'production'});

  /**
   * Control how source maps are generated.
   *
   * See https://webpack.js.org/configuration/devtool/
   */
  config.devtool = 'cheap-module-source-map';

  /**
   * Set various production-specific output options.
   *
   * See https://webpack.js.org/configuration/output/
   */
  config.output.filename = '[name].[chunkhash].js';
  config.output.chunkFilename = '[id].[chunkhash].chunk.js';

  /**
   * Add production-specific Webpack plugins.
   *
   * See https://webpack.js.org/configuration/plugins/
   */
  config.plugins.push(

    /**
     * Copy assets into the build directory.
     *
     * See https://github.com/kevlened/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{from: root('src', 'assets')}]),

    /**
     * Extract CSS files.
     *
     * See See https://github.com/webpack/extract-text-webpack-plugin
     */
    new ExtractTextPlugin('[name].[hash].css'),

    /**
     * Only emit files when there are no errors.
     *
     * See https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
     */
    new NoErrorsPlugin(),

    /**
     * Minify javascript.
     *
     * In Webpack 2, this no longer switches loaders into minification mode. See below for more.
     *
     * See https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     * See https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
     */
    new UglifyJsPlugin({minimize: true, compress: true}),
    new LoaderOptionsPlugin({minimize: true})
  );

  return config;
};
