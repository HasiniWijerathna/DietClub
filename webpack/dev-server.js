'use strict';
const webpack = require('webpack');
const opn = require('opn');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config')('development');
const webpackConfig = require('./webpack.dev.conf');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env.NODE_ENV;
}

// default port where dev server listens for incoming traffic
const port = process.env.port || config.dev.port;

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  historyApiFallback: true,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.

  clientLogLevel: 'info',
  // Control the console log messages shown in the browser when using inline mode.
  // Can be `error`, `warning`, `info` or `none`.

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,

  stats: {
    colors: true,
  },
});

server.listen(port, 'localhost', (err) => {
  if (err) console.error(err); // eslint-disable-line
  console.log('=> Webpack development server is running on port %s', port); // eslint-disable-line
});

let initialCompile = true;

compiler.plugin('done', function() {
  if (initialCompile) {
    initialCompile = false;
    process.stdout.write('Webpack: Done!');
    opn('http://localhost:' + port);
  }
});
