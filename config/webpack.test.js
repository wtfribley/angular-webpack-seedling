const root = require('./helpers').root;

/**
 * Webpack configuation
 *
 * See https://webpack.js.org/configuration
 */
module.exports = function() {

  var config = require('./webpack.common')({NODE_ENV: 'test'});

  config.performance = {
    hints: false
  };

  /**
   * Options affecting the treatment of various types of modules.
   *
   * See https://webpack.js.org/configuration/module/
   */
  config.module.rules.push(

    /**
     * Support code coverage.
     *
     * See https://github.com/deepsweet/istanbul-instrumenter-loader
     */
    {
      test: /\.ts$/,
      enforce: 'post',
      include: root('src'),
      exclude: [/\.(spec|e2e)\.ts$/],
      use: 'istanbul-instrumenter-loader'
    }
  )

  return config;
}();
