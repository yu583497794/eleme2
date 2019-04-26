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
var restaurants = require('../restaurants.json')
var ratings = require('./data/rating/rating.json')
// console.log(restaurants)
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
      // app.get('/api/login', function (req, res) {
      //   let url = 'https://www.ele.me/restapi/eus/v1/current_user'
      //   axios.get(url, {
      //     params: req.query,
      //     headers: {
      //       referer: 'https://www.ele.me/place/wt3mee622q3t?latitude=30.515977&longitude=114.414724'
      //     }
      //   }).then(response => {
      //     console.log(response)
      //     console.log('?????????????????????????')
      //     res.json([])
      //   }).catch(e => {
      //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      //     // console.log(e)
      //   })
      // })
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
        // 登陆问题
        // var url = 'https://www.ele.me/restapi/shopping/restaurants'
        // axios.get(url, {
        //   params: req.query,
        //   headers: {
        //     referer: 'https://www.ele.me/place/wt3mee622q3t?latitude=30.515977&longitude=114.4',
        //     'x-shard': 'loc = 114.410972, 30.507451',
        //     // cookie: 'ubt_ssid=95v6uzys9ipnc2spzukt2u19cxa3l4c2_2018-09-19; perf_ssid=f1h6h8jbln6zq9fh07nwzmrqmymfnjh6_2018-09-19; _utrace=b6c9430cb5118e4440d6ec720e4ec55c_2018-09-19; USERID=988249458; SID=6xyqKNYyImThX1eolo3vHD1AbwryQXQWEnyg; track_id=1537327981%7Cc485d4a2c14df058d75c84fd3d88f5dd3d6d9a999deaabdef2%7C353d4ef6f95dffc64257c8250762e485; cna=0fgDFEKVm2UCAdNFxTWSOPgr; isg=BEFBvfFL_m24UBIIVa6GfUIEUI2IK3BVLNJN8qOWPMinimBc675PN1nLaPjMsU2Y',
        //     // 'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Mobile Safari/537.36'
        //   }
        // }).then((response) => {
        //   res.json(response.data)
        //   console.log(response.data)
        // }).catch((e) => {
        //   console.log(e)
        //   res.json([])
        // })
        let from = req.query.offset
        let to = parseInt(from) + parseInt(req.query.limit)
        let response = restaurants.slice(from, to)
        res.json(response)
      })
      app.get('/api/menu', (req, res) => {
        let url = `./data/menu/${req.query.restaurant_id}.json`
        console.log(url)
        let menu = require(url)
        res.json(menu)
        // var url = 'https://www.ele.me/restapi/shopping/v2/menu'
        // axios.get(url, {
        //   params: req.query,
        //   headers: {
        //     referer: 'https://www.ele.me/' + req.query.restaurant_id,
        //     'x-shard': `shopid=${req.query.restaurant_id};loc=114.414724,30.515977`,
        //     scheme: 'https'
        //   }
        // }).then((response) => {
        //   console.log(response)
        //   res.json(response.data)
        // }).catch((e) =>{
        //   console.log(e)
        // })
      })
      // app.get('/api/rating', (req, res) => {
      //   const id = req.query.id
      //   var url = `https://www.ele.me/restapi/ugc/v1/restaurant/${id}/ratings`
      //   // var url = `https://elm.cangdu.org/ugc/v2/restaurants/${id}/ratings`
      //   delete req.id
      //   // console.log(req.query)
      //   return axios.get(url, {
      //     params: req.query,
      //     headers: {
      //       referer: 'https://www.ele.me/shop/'+ id + '/rate',
      //       'x-shard':'shopid='+ id +';loc=114.414724,30.515977',
      //       'cookie': 'ubt_ssid=95v6uzys9ipnc2spzukt2u19cxa3l4c2_2018-09-19; _utrace=b6c9430cb5118e4440d6ec720e4ec55c_2018-09-19; cna=0fgDFEKVm2UCAdNFxTWSOPgr; eleme__ele_me=fc4194a1b2839561e7a290898d4d07ad%3A87a8a0210f57bd09d39ee07556a342ab7188b874; UTUSER=988249458; track_id=1537327981|c485d4a2c14df058d75c84fd3d88f5dd3d6d9a999deaabdef2|353d4ef6f95dffc64257c8250762e485; USERID=988249458; SID=59L9LZ55pcYa3AEQu3c215SaYgI0yu6BSfKA; isg=BPLyL-F4-hoIYsGdqtNlEJWBQzgHxjMoYrER4LzLH6WQT5NJpBLELATtO-1zP261'
      //     }
      //   }).then((response) => {
      //     console.log(response)
      //     response = Object.assign(response.data, {
      //       errno: true
      //     })
      //     res.json(response.data)
      //   }).catch((e) => {
      //     console.log(e)
      //     const response = {
      //       errno: false,
      //       message: '不给我接口,我也很无奈啊~'
      //     }
      //     res.json(response)
      //   })
      // })
      app.get('/api/rating', (req, res) => {
        const ratings = require('./data/rating/rating.json')
        // 注意将字符串转化为数字, 否则会直接加载完全部的数据
        const limit = parseInt(req.query.limit)
        let offset = parseInt(req.query.offset)
        let end = limit + offset
        let response = ratings.slice(offset, end)
        res.json(Object.assign(response, {
          errno: true
        }))
      })
      // app.get('/api/rating-overview', (req, res) => {
      //   const id = req.query.id
      //   const url = `https://www.ele.me/restapi/ugc/v1/restaurants/${id}/rating_scores`
      //   delete req.query.id
      //   axios.get(url, {
      //     headers: {
      //       referer: `https://www.ele.me/shop/${id}/rate`,
      //       cookie: 'ubt_ssid=95v6uzys9ipnc2spzukt2u19cxa3l4c2_2018-09-19; _utrace=b6c9430cb5118e4440d6ec720e4ec55c_2018-09-19; cna=0fgDFEKVm2UCAdNFxTWSOPgr; eleme__ele_me=fc4194a1b2839561e7a290898d4d07ad%3A87a8a0210f57bd09d39ee07556a342ab7188b874; UTUSER=988249458; track_id=1537327981|c485d4a2c14df058d75c84fd3d88f5dd3d6d9a999deaabdef2|353d4ef6f95dffc64257c8250762e485; USERID=988249458; SID=59L9LZ55pcYa3AEQu3c215SaYgI0yu6BSfKA; isg=BPLyL-F4-hoIYsGdqtNlEJWBQzgHxjMoYrER4LzLH6WQT5NJpBLELATtO-1zP261',
      //       'x-shard': 'shopid=E1206146692683190592;loc=114.414724,30.515977'
      //     },
      //     params: req.query
      //   }).then((response) => {
      //     res.json(response.data)
      //   })
      // })
      app.get('/api/rating-overview', (req, res) => {
        let id = req.query.id
        let response = require(`./data/rating/${id}`)
        res.json(response)
      })
      app.get('/api/qualification', (req, res) => {
        const url = `https://h5.ele.me/restapi/shopping/v1/restaurants/${req.query.id}/business/qualification`
        delete req.query.id
        axios.get(url, {
          params: req.query,
          headers: {
            referer: 'https://h5.ele.me/shop/certification/',
            'x-shard': 'loc=114.414724,30.515977'
          }
        }).then((response) => {
          console.log(response)
          res.json(response.data)
        }).catch(e => {
          const response = Object.assign({}, e.data, {
            images: ["b65be36c9540d3963d49b583a182229fjpeg", "1514dce1b89136537dab5725d558741bjpeg"]
          })
          console.log(response)
          res.json(response)
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
