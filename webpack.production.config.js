const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'cheap-module-source-map',

  entry: [
    './main.js'
  ],

  context: resolve(__dirname, 'src'),

  output: {
    filename: 'bundle.[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  resolve: {
    alias: {
      src: resolve(__dirname, 'src')
    },
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new ExtractTextPlugin({ filename: './styles/[name].[hash].css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([
      { from: './images/*', to: './images/[name].[hash].[ext]' },
      { from: './images/speakers', to: './images/speakers' },
      { from: './public', to: './'}
    ]),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'sass-loader', query: { sourceMap: false } },
          ],
          publicPath: '../'
        }),
      },
      { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=15000&name=images/[name].[hash].[ext]' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader?name=fonts/[name].[hash].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=50000&mimetype=image/svg+xml&name=images/[name].[hash].[ext]' }
    ]
  },
};

module.exports = config;
