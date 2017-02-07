const root = require('./helpers').root;

// Webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack configuation
 *
 * See https://webpack.js.org/configuration
 *
 * @param {object} options
 * @param {string} options.env  The current build environment: 'development', 'test', 'production'
 * @return {object} Configuration object usable by Webpack.
 */
module.exports = function(options) {

  // there are some behaviors common to non-test environments that will be included here.
  const isTest = options.NODE_ENV === 'test';

  return {

    /**
     * Set the base directory.
     *
     * See https://webpack.js.org/configuration/entry-context/#context
     */
    context: root(),

    /**
     * Cache generated code to improve performance during incremental builds.
     *
     * Enabled by default in watch mode. Uncomment to disable.
     *
     * See https://webpack.js.org/configuration/other-options/#cache
     */
    //cache: false

    /**
     * Entry point for our bundles.
     *
     * See https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: isTest ? {} : {
      polyfills: './src/polyfills.browser.ts',
      vendor: './src/vendor.browser.ts',
      app: './src/main.browser.ts'
    },

    /**
     * Options affecting the output of compiled bundles.
     *
     * See https://webpack.js.org/configuration/output/
     */
    output: isTest ? {} : {
      path: root('dist')
    },

    /**
     * Options affecting the resolution of modules.
     *
     * See https://webpack.js.org/configuration/resolve/
     */
    resolve: {

      // only discover files with these extensions
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.sass', '.html', '.pug', '.jade'],

      // provide aliases so deeply nested files can cleanly import common modules.
      alias: {
        'app': 'src/app',
        'common': 'src/app/common'
      }
    },

    /**
     * Options affecting the treatment of various types of modules.
     *
     * See https://webpack.js.org/configuration/module/
     */
    module: {

      noParse: [
        /.+zone\.js\/dist\/.+/
      ],

      rules: [

        /**
         * Typescript support.
         *
         * Replaces templateUrl and styleUrl with require().
         *
         * See https://github.com/TypeStrong/ts-loader
         * See https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          exclude: isTest ? [] : [/\.(spec|e2e)\.ts$/],
          use: ['ts-loader', 'angular2-template-loader']
        },

        /**
         * JSON support.
         *
         * See https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        /**
         * CSS support.
         *
         * Any CSS *not* in src/app will be bundled in an external CSS file.
         *
         * See https://github.com/webpack/extract-text-webpack-plugin
         * See https://github.com/webpack/css-loader
         * See https://github.com/webpack/null-loader
         */
        {
          test: /\.css$/,
          exclude: root('src', 'app'),
          // See https://github.com/webpack/extract-text-webpack-plugin/issues/265
          // @TODO: switch to `use` once ExtractTextPlugin supports correct Webpack 2 syntax.
          loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
            loader: [
              {loader: 'css-loader', query: {sourceMap: true}}
            ]
          })
        },

        /**
         * CSS files in src/app are inlined into whichever file imports them.
         *
         * See https://github.com/webpack/raw-loader
         */
        {
          test: /\.css$/,
          include: root('src', 'app'),
          use: 'raw-loader'
        },

        /**
         * SASS support.
         *
         * As with vanilla CSS, files *not* in src/app are bundled separately.
         *
         * See https://github.com/jtangelder/sass-loader
         */
        {
          test: /\.(scss|sass)$/,
          exclude: root('src', 'app'),
          // @TODO: switch to `use` once ExtractTextPlugin is fixed.
          loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
            loader: [
              {loader: 'css-loader', query: {sourceMap: true}},
              {loader: 'sass-loader', query: {sourceMap: true}}
            ]
          })
        },

        /**
         * SASS files in src/app are inlined into whichever file imports them.
         */
        {
          test: /\.(scss|sass)$/,
          include: root('src', 'app'),
          use: [
            'raw-loader',
            {loader: 'sass-loader', query: {sourceMap: true}}
          ]
        },

        /**
         * PUG/JADE support.
         *
         * The official pug loader imports the template function -- we just want a string of
         * already-compiled HTML. That's why we're using the pug-html-loader.
         *
         * See https://github.com/willyelm/pug-html-loader
         */
        {
          test: /\.(jade|pug)$/,
          use: [{loader: 'pug-html-loader', options: {doctype: 'html'}}]
        },

        /**
         * HTML support.
         */
        {
          test: /\.html$/,
          use: 'raw-loader'
        },

        /**
         * Font, image and other asset support.
         *
         * See https://github.com/webpack/file-loader
         */
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [{loader: 'file-loader', options: {name: '[name].[hash].[ext]'}}]
        }
      ]
    },

    /**
     * Add Webpack plugins.
     *
     * See https://webpack.js.org/configuration/plugins/
     */
    plugins: [

      /**
       * Provide NODE_ENV constant, allowing code to change behavior based on compile-time
       * environment.
       *
       * See https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       * (docs for webpack 2 will be here: https://webpack.js.org/plugins/)
       */
      new DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify(options.NODE_ENV || 'development')}
      }),

      /**
       * For reasons that remain unclear, Angular's use of System.import generates a warning
       * during compilation. The workaround is to "provide context" (whatever that means).
       *
       * See https://github.com/angular/angular/issues/11580
       * See https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       */
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('src')
      )

    ].concat(isTest ? [] : [

      /**
       * Generate common chunks if necessary.
       *
       * See https://webpack.js.org/guides/code-splitting-libraries/
       * See https://webpack.js.org/plugins/commons-chunk-plugin/
       */
      new CommonsChunkPlugin({name: ['vendor', 'polyfills']}),

      /**
       * Inject script and link tags into index.html.
       *
       * See https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        chunksSortMode: 'dependency'
      })
    ])
  };
}
