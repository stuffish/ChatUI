'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const express = require('express');
const app = express();
const appData = require('../api/data.json');
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/contacts', (req, res) => {
        res.json({
          errno: 0,
          data: appData.contacts
        });
      }),
      app.get('/api/user_overview/10001', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[0]
        });
      }),
      app.get('/api/user_overview/10002', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[1]
        });
      }),
      app.get('/api/user_overview/10003', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[2]
        });
      }),
      app.get('/api/user_overview/10004', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[3]
        });
      }),
      app.get('/api/user_overview/10005', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[4]
        });
      }),
      app.get('/api/user_overview/10006', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[5]
        });
      }),
      app.get('/api/user_overview/10007', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[6]
        });
      }),
      app.get('/api/user_overview/10008', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[7]
        });
      }),
      app.get('/api/user_overview/10009', (req, res) => {
        res.json({
          errno: 0,
          data: appData.userProfile[8]
        });
      }),
      app.get('/api/chat_data/10001', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10001
        });
      }),
      app.get('/api/chat_data/10002', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10002
        });
      }),
      app.get('/api/chat_data/10003', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10003
        });
      }),
      app.get('/api/chat_data/10004', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10004
        });
      }),
      app.get('/api/chat_data/10005', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10005
        });
      }),
      app.get('/api/chat_data/10006', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10006
        });
      }),
      app.get('/api/chat_data/10007', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10007
        });
      }),
      app.get('/api/chat_data/10008', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10008
        });
      }),
      app.get('/api/chat_data/10009', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10009
        });
      }),
      app.get('/api/chat_data/10001/1515231466', (req, res) => {
        res.json({
          errno: 0,
          data: appData.chatData_10001_more
        });
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
});
