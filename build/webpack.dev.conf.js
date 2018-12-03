'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
var express= require('express')
var axios = require('axios')
const app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
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
    before (app) {
      app.get('/api/banners', function (req, res) {
        var url = "https://h5.ele.me/restapi/shopping/v2/banners"
        axios.get(url, {
          headers: {
            referer: 'https://h5.ele.me/msite/',
            'x-shard': 'loc = 114.410972, 30.507451'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 手机api需要登录
      // app.get('/api/recommends', (req, res) => {
      //   var url = 'https://h5.ele.me/restapi/shopping/v3/restaurants'
      //   axios.get(url, {
      //     params: req.query,
      //     header: {
      //       referer: 'https://h5.ele.me/',
      //       'x-shard': 'loc = 114.410972, 30.507451',
      //       cookie: 'ubt_ssid=95v6uzys9ipnc2spzukt2u19cxa3l4c2_2018-09-19; perf_ssid=f1h6h8jbln6zq9fh07nwzmrqmymfnjh6_2018-09-19; _utrace=b6c9430cb5118e4440d6ec720e4ec55c_2018-09-19; USERID=988249458; SID=6xyqKNYyImThX1eolo3vHD1AbwryQXQWEnyg; track_id=1537327981%7Cc485d4a2c14df058d75c84fd3d88f5dd3d6d9a999deaabdef2%7C353d4ef6f95dffc64257c8250762e485; cna=0fgDFEKVm2UCAdNFxTWSOPgr; isg=BEFBvfFL_m24UBIIVa6GfUIEUI2IK3BVLNJN8qOWPMinimBc675PN1nLaPjMsU2Y',
      //       'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Mobile Safari/537.36'
      //     }
      //   }).then((response) => {
      //     res.json(response.data)
      //   }).catch((e) => {
      //     console.log(e)
      //   })
      // })
      app.get('/api/recommends', (req, res) => {
        var url = 'https://www.ele.me/restapi/shopping/restaurants'
        axios.get(url, {
          params: req.query,
          headers: {
            referer: 'https://www.ele.me/place/wt3mee622q3t?latitude=30.515977&longitude=114.4',
            'x-shard': 'loc = 114.410972, 30.507451',
            // cookie: 'ubt_ssid=95v6uzys9ipnc2spzukt2u19cxa3l4c2_2018-09-19; perf_ssid=f1h6h8jbln6zq9fh07nwzmrqmymfnjh6_2018-09-19; _utrace=b6c9430cb5118e4440d6ec720e4ec55c_2018-09-19; USERID=988249458; SID=6xyqKNYyImThX1eolo3vHD1AbwryQXQWEnyg; track_id=1537327981%7Cc485d4a2c14df058d75c84fd3d88f5dd3d6d9a999deaabdef2%7C353d4ef6f95dffc64257c8250762e485; cna=0fgDFEKVm2UCAdNFxTWSOPgr; isg=BEFBvfFL_m24UBIIVa6GfUIEUI2IK3BVLNJN8qOWPMinimBc675PN1nLaPjMsU2Y',
            // 'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Mobile Safari/537.36'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          res.json([])
        })
      })
      app.get('/api/menu', (req, res) => {
        var url = 'https://www.ele.me/restapi/shopping/v2/menu'
        axios.get(url, {
          params: req.query,
          headers: {
            referer: 'https://www.ele.me/' + req.query.restaurant_id,
            'x-shard': `shopid=${req.query.restaurant_id};loc=114.414724,30.515977`,
            scheme: 'https'
          }
        }).then((response) => {
          console.log(response)
          res.json(response.data)
        }).catch((e) =>{
          console.log(e)
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
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
})
