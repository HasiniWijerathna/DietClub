'use strict';
const path = require('path');

exports.assetsPath = (config, _path) => {
  const assetsSubDirectory = process.env.NODE_ENV !== 'development'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
