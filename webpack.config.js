var path = require('path');
var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {

  var params = {
    entry: {
      ui: './src/ui.js',
      code: './src/code.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ]
        },
        {
          test: /\.(mp3|ogg|wav|mp4)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'global': {} // Fix missing symbol error when running in developer VM
      }),
      new HtmlWebPackPlugin({
        title: 'Frame Reactions',
        inject: 'body',
        filename: 'index.html',
        minify: false,
        chunks: ['ui']
      }),
      new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/ui/]),
    ]
  };

  if (/\-\-mode\=production/i.test(process.argv[process.argv.length - 1])) {

    params.mode = 'production';

  }

  if (/\-\-mode\=development/i.test(process.argv[process.argv.length - 1])) {

    params.mode = 'development';
    params.devtool = 'inline-source-map';

    params.devServer = {
      host: 'localhost',
      compress: true,
      port: 8080,
      historyApiFallback: true,
      open: true
    };

  }

  return params;

};
