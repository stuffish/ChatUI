'use strict'
const path = require('path')
const glob = require('globby') 
const utils = require('./utils')
const merge = require('webpack-merge')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const CSS_PATH = {
  css: {
    pattern: ['../src/styles/**/[^_]*.scss', '../src/styles/**/*.scss', '../src/styles/*.scss'],
    // dst: path.resolve(__dirname, 'static/build/webpack'),
    dst: config.build.assetsLib,
  }
}

function getCSSEntries(config) {
  let fileList = glob.sync(config.pattern)
  return fileList.reduce(function (previous, current) {
    let filePath = path.parse(path.relative(config.src, current))
    let withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    return previous
  }, {})
}
const wpconfig = {
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname, '../'),
  entry: getCSSEntries(CSS_PATH.css),
  output: {
    path: CSS_PATH.css.dst,
    filename: 'style.css',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['style-loader', 'css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.scss']
  },
  plugins: [
    new ExtractTextPlugin('/lib/style.css'),
  ]
}

module.exports = merge(wpconfig, {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
})