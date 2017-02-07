const root = require('./helpers').root;

/**
 * Register the typescript compiler with Node, so that we can write our specs in typescript without
 * the need for an explicit compilation step before running the tests.
 *
 * See https://github.com/TypeStrong/ts-node
 */
require('ts-node/register');

module.exports = {
  config: {
    baseUrl: 'http://localhost:8080/',

    specs: [
      root('src/**/*.e2e.ts')
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
      showTiming: true,
      showColors: true,
      isVerbose: false,
      includeStackTrace: false,
      defaultTimeoutInterval: 400000,
      print: function() {}
    },

    directConnect: true,

    capabilities: {
      browserName: 'chrome',
      chromeOptions: {args: ['show-fps-counter=true']}
    },

    onPrepare: function() {
      let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
      browser.ignoreSynchronization = true;
    },

    useAllAngular2AppRoots: true
  }
};
