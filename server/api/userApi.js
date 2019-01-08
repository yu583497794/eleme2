var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')

var conn = mysql.createConnection(models.mysql)

conn.connect()

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.send('err')
  } else {
    console.log(ret)
    res.send(ret)
  }
}
// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  console.log(params.birth)
  conn.query(sql, [params.name, params.email, params.pass, params.checkPass], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 查找用户接口
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name
  var params = req.body
  // var keywords = JSON.parse(Object.keys(params)[0])
  if (params.name) {
    sql_name += ` where username ='${params.name}'`
    // console.log(sql_name)
  }
  conn.query(sql_name, params.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send({
        code: -1,
        message: '用户不存在'
      })
    } else {
      var resultArray = result[0]
      // console.log(resultArray)
      // console.log(params)
      if (resultArray.password === params.pass) {
        console.log('Login successfully!')
        let ret = Object.assign(resultArray, {
          message: '登陆成功',
          code: 1
        })
        // jsonWrite(res, ret)
        res.send(ret)
      } else {
        res.send({
          code: 0,
          message: '密码输入有误'
        })
      }
    }
  })
})
// router.post('/login', (req, res) => {
//   var sql_name = $sql.user.select_name
//   var params = req.body
//   console.log(req.body)
//   console.log(Object.keys(params)[0])
//   var keywords = JSON.parse(Object.keys(params)[0])
//   if (keywords.name) {
//     sql_name += ` where username ='${keywords.name}'`
//     console.log(sql_name)
//   }
//   conn.query(sql_name, keywords.name, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     if (result[0] === undefined) {
//       res.send('-1')
//     } else {
//       var resultArray = result[0]
//       console.log(resultArray)
//       console.log(keywords)
//       if (resultArray.password === keywords.password) {
//         jsonWrite(res, result)
//       } else {
//         res.send('0')
//       }
//     }
//   })
// })
// 获取用户信息
router.get('/getUser', (req, res) => {
  var sql_name = $sql.user.select_name
  var params = req.body
  console.log(params)
  if (params.name) {
    sql_name += `where username ='${params.name}'`
  }
  conn.query(sql_name, params.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      jsonWrite(res, result)
    }
  })
})

// 更新用户信息
router.post('/updateUser', (req, res) => {
  var sql_update = $sql.user.update_user
  var params = req.body
  console.log(params)
  if (params.id) {
    sql_update += `email = '${params.email}'`
  }
  conn.query(sql_update, params.id, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result)
    if (result.affectedRows === undefined) {
      res.send('更新失败,请联系管理员')
    } else {
      res.send('ok')
    }
  })
})

module.exports = router
