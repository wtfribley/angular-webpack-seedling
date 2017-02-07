# Angular with Webpack
## A seed project.

This is a basic Angular seed project with a Webpack build. Using `npm run`, there are tasks for linting, unit tests, end-to-end tests, code coverage and documentation generation.

##### Acknowledgements

The basic idea, some of the structure and answers to many of my questions were provided by [this repository by AngularClass](https://github.com/AngularClass/angular2-webpack-starter). Elsewhere I will provide links to the documentation and other resources I found useful for this project.

And, obviously, this contains a (somewhat) finished [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) demo application.

### Usage

This project uses `npm` to run various build tasks. This section will walk through a typical development cycle, explaining each task you might use. For a complete description of all available tasks, have a look at the `package.json` file &mdash; it should be relatively self-explanatory.

First, you'll want to begin serving your project:

**npm start** or **npm run server**

This will use [webpack-dev-server](https://github.com/webpack/webpack-dev-server/) with the `./config/webpack.dev.js` configuration to build and serve your project. Your files will be watched for changes and live-reloaded in the browser.

While developing, you'll want to run tests:

**npm run test**

First use [tslint](https://github.com/palantir/tslint) for style checking, then [Karma](https://github.com/karma-runner/karma) to run unit tests and finally [Protractor](https://github.com/angular/protractor) to run full end-to-end tests. Unit test coverage will be generated by [Istanbul](https://github.com/gotwarlost/istanbul).

> <small>There are a variety of other bits and pieces &mdash; plugins for both Karma and Webpack &mdash; that are necessary to get Istanbul to work. If you're curious, you'll find the relevant links in the comments for `./config/karma.conf.js` and `./config/webpack.test.js`.</small>

Often you'd like to run just your unit tests or just your e2e tests, but not both. Or maybe you want your unit tests to be automatically re-run when code changes. Here are some tasks for that:
  - `npm run unit`
  - `npm run unit:watch`
  - `npm run e2e`

When you're ready to release something, you'll need to build your project:

**npm run build**

Run a production build of the project, using [Webpack](https://github.com/webpack/webpack) and the `./config/webpack.prod.js` configuration file. Bundled resources are minified and saved in the `./dist` directory with the build hash in the filename (to support graceful deployments).

Finally, you may want to share your documentation with others:

**npm run docs**

Generate documentation using [TypeDoc](https://github.com/TypeStrong/typedoc).

> <small>TypeDoc has some bugs at the moment. This means that spec files will be included in the docs and you'll see a bunch of `Cannot find name...` errors when docs are generated. These are safe to ignore. When TypeDoc releases fixes, this project will be updated.</small>

In practice, you may have an automated deployment process that enforces linting, passing tests,
some amount of test coverage, etc. In that case you may want to use:

**npm run release**

This will first lint and test your project, if that succeeds it will continue to build and generate docs.

There are more tasks in `package.json`, but they should be pretty self-explanatory.

### Technologies

There's one curve-ball here that probably needs some explanation, but everything else is pretty standard.

**Pug**

This project uses [Pug](https://github.com/pugjs/pug) (formerly called Jade) to make writing HTML less tedious. Pug is, of course, an HTML templating language &mdash; but its inclusion here is purely for convenience, so you don't have to write all those `</closing>` tags. If you come up with cool ways to use its templating features, more power to you.

**Jasmine, SASS** (node-sass)**, TypeScript**

All pretty standard, nothing to see here.

**Protractor, Selenium, WebDriver**

To simplify things, this project uses a direct connection to Chrome Driver... so, by default, Selenium isn't used at all. That's great if all you care about is Chrome, but if you want to run
across different browsers/versions you'll need to make some changes to the Protractor config.

### Structure

Given that this seed project contains the "Tour of Heroes" demo application, the file structure shouldn't be much of a surprise &mdash; for the most part, it adheres to recommendations given in the Angular tutorial. But for completeness' sake, here's a quick overview with a few callouts where necessary:

#### `./`
> `.editorconfig` Make sure your editor can read this file. Avoids having to add a bunch of "use 2 spaces" comments to newbies' code reviews. For more [see this](http://editorconfig.org/).

> `.gitignore`

> `package.json` If you have a questions about an npm task or which dependencies are being used, this is the place to go.

> `README.md` You're lookin' at it!

> `tsconfig.json` TypeScript settings for the project. Applies whenever TypeScript is compiled.
  

#### `./config`
> `helpers.js`

> `karma.conf.js`

> `protractor.conf.js`

> `tslint.json`

> `typedoc.json`

> `webpack.common.js` All Webpack builds will use this configuration (minus a couple places in this file that depend on whether we're running tests or not).

> `webpack.dev.js`

> `webpack.prod.js`

> `webpack.test.js` 

#### `./src`
> `./app` Here's where the application goes. Obviously.

> `./assets` This directory isn't currently used. But it'd be a good place to put things like images, fonts, etc.

> `index.pug`

> `main.browser.sass` This is the entry point for the SASS bundle that *will not* be inlined into the Javascript by Webpack. In other words, any SASS in this file (or imported by this file), will
be extracted into a separate CSS-only bundle. If you want to include a SASS library like Bootstrap, this is the place to do it.

> `main.browser.ts` Bootstrap the application for the browser environment.

> `main.karma.js` Bootstrap the app for testing.

> `polyfills.browser.ts` Include some necessary polyfills... these will hopefully become unnecessary over time (some of them may already be unnecessary).

> `vendor.browser.ts` Import vendor libraries. This is a pretty blunt instrument &mdash; in practice you may want to get rid of this file altogether and be more surgical about which pieces of which frameworks you actually include.

##### A note on end-to-end tests.
If you look inside the `./src/app` directory, you'll see that there is an `app.e2e.ts` file with some preliminary Protractor tests. This e2e spec file lives &mdash; roughly &mdash; alongside the code it's testing, just like unit test specs. This may or may not work for your project.

If it becomes weird or unintuitive to include end-to-end test specs alongside application code, it's perfectly acceptable to create a `./e2e` or `./test` directory at the project root. You'll have to update `./config/protractor.conf.js` to point to the new spec files, but other than that everything will be the same. You can even put e2e specs in both places, if it makes sense for your project.

### What's left?

This seed project contains everything you need to get off the ground with Angular and Webpack. But there's still more to do. This list isn't necessarily exhaustive, it's just what I can think of right now...

- add AoT compiling with tree shaking.
- [Server-side rendering](https://github.com/angular/universal) (i.e. using the Angular router on the server for faster loading).
- update TypeDoc once they fix their issues (`exclude` and `lib`).
- create `bootstrap`, `material`, etc. branches?
- run Angular in a web worker?

### License

The MIT License (MIT)

Copyright 2017 wtfribley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.