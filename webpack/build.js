'use strict';
require('shelljs/global');

const path = require('path');
const webpack = require('webpack');
const ora = require('ora');

const environment = require('./environment');
const config = require('../config')(environment);
const webpackConfig = require('./webpack.prod.conf')(config);

/* eslint-disable */
console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
);
/* eslint-enable */

const spinner = ora('building for ' + environment + '...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

// Disabling eslint for these because these are inherited from ShellJS globals asn ESLint doesn't recognize this
/* eslint-disable */
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);
/* eslint-enable */

webpack(webpackConfig, (err, stats) => {
  spinner.stop();

  if (err) {
    throw err;
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n');
});
