'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./production.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  api: {
    protocol: '"http://"',
    baseURL: '"localhost:3000"',
    prefix: '""',
    version: '""',
  },
});
