var express = require('express');
var config = require('./config/index');
var axios = require('axios')
const app = express();
var apiRouter = express.Router();
var restaurants = require('./restaurants.json')
var ratings = require('./build/data/rating/rating.json')
app.get('/api/banners', (req, res) => {
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

app.get('/api/recommends', (req, res) => {
  let from = req.query.offset
  let to = parseInt(from) + parseInt(req.query.limit)
  let response = restaurants.slice(from, to)
  res.json(response)
  })
app.get('/api/menu', (req, res) => {
  let url = `./build/data/menu/${req.query.restaurant_id}.json`
  let menu = require(url)
  res.json(menu)
})
app.get('/api/rating', (req, res) => {
  const ratings = require('./build/data/rating/rating.json')
  // 注意将字符串转化为数字, 否则会直接加载完全部的数据
  const limit = parseInt(req.query.limit)
  let offset = parseInt(req.query.offset)
  let end = limit + offset
  let response = ratings.slice(offset, end)
  res.json(Object.assign(response, {
    errno: true
  }))
})
 app.get('/api/rating-overview', (req, res) => {
   let id = req.query.id
   let response = require(`./build/data/rating/${id}`)
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
 // app.use('/api', apiRoutes)
 // 静态目录
 app.use(express.static('./dist'))

 var port = process.env.PORT || config.build.port
 // var port = 3007;
 module.exports = app.listen(port, function (err) {
   if (err) {
     console.log(err)
     return
   }
   console.log('Listening at http://localhost:' + port + '\n')
 })