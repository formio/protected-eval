/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(path.resolve(__dirname, 'lib'), 'index.js'),
  output: {
    library: 'protected-eval',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'protected-eval.js',
  },
  mode: 'production',
  performance: {hints: false},
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ],
  resolve: {
    fallback: {
      vm: require.resolve('vm-browserify')
    }
  },
  externals: {
    formiojs: 'Formio',
  },
};
