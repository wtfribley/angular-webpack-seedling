Error.stackTraceLimit = Infinity;

require('core-js');
require('rxjs');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

// Initialize the testing environment.
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

// create a webpack require context
// see https://webpack.github.io/docs/context.html#require-context
//
// this context can load anything in `./src` matching the given regex. we then
// use it to actually require each of those files.
var context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
