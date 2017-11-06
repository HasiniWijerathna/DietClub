const path = require('path');
const config = require('../config')('development');

const env = process.env.NODE_ENV;
const deploymentBuild = env !== 'development';

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  context: projectRoot,
  entry: path.resolve(projectRoot, 'src/scripts/Index'),

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: config.build.assetsRoot,
    publicPath: deploymentBuild ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=stage-0,presets[]=react,presets[]=es2015',
    }, {
      test: /\.scss$/,
      include: /src/,
      loaders: [
        'style',
        'css',
        'autoprefixer?browsers=last 3 versions',
        'sass?outputStyle=expanded',
      ],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'url?limit=8192',
        'img',
      ],
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
};
