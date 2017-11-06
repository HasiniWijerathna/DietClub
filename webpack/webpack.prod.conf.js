'use strict';
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils');
const webpackBase = require('./webpack.base.conf');

module.exports = (config) => {
  // Output configs of production build
  const output = {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV !== 'development' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: utils.assetsPath(config, 'js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath(config, 'js/[id].[chunkhash].js'),
  };

  const env = config.build.env;

  // Plugins
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath(config, 'css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: 'favicon.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module, count) => {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ];

  return merge(webpackBase, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,

    resolve: {
      extensions: ['', '.js', '.jsx'],
    },

    output,

    plugins,
  });
};
