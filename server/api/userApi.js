var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')
var sendMail = require('../email/email')

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
var verifyCode = function () {
  let ch = ['0', '1', '2', '3', '4', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  let ret = ''
  for (let i = 0; i < 6; i++) {
    ret += ch[Math.floor(Math.random() * ch.length)]
  }
  return ret
}
// 不可行
// var getUser = function (key, value) {
//   var sqlName = $sql.user.select_name
//   sqlName += " where " + key + " = '" + value + "'"
//   console.log(sqlName)
//   conn.query(sqlName, value, function (err, result) {
//     if (err) {
//       console.log('1')
//     }
//     return result
//   })
// }
// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  console.log(params.birth)
  // conection.query(addSql, addSqlParams, function(err, result){...})
  // addSqlParams是数组
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
  var sqlName = $sql.user.select_name
  var params = req.body
  // var keywords = JSON.parse(Object.keys(params)[0])
  if (params.name) {
    sqlName += ` where username ='${params.name}'`
    // console.log(sql_name)
  }
  conn.query(sqlName, params.name, function (err, result) {
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
router.post('/queryVerifyCode', (req, res) => {
  console.log(req)
  if (!req.body.id && !req.body.email) {
    res.send({
      code: 0,
      message: '非法请求!'
    })
    return
  }
  try {
    let id = req.body.id
    // 用户email不一致
    let sqlName = `select email from user where id = ${id}`
    conn.query(sqlName, id, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          code: 0,
          message: '服务器数据库出现错误'
        })
        return
      }
      if (result[0] === undefined) {
        res.send({
          code: 0,
          message: '该用户尚未绑定邮箱'
        })
      } else if (result[0].email !== req.body.email) {
        res.send({
          code: 0,
          message: '该邮箱不是绑定的邮箱'
        })
      } else {
        let code = verifyCode()
        console.log(code)
        let message = {
          from: 'fairy_bq@163.com',
          to: result[0].email,
          subject: '程序媛ybq',
          text: `成功了${code}`
        }
        sendMail(message).then((info) => {
          let date = Date.parse(new Date().toString())
          let sqlUpdate = `UPDATE user SET code = ?, date = ?, isLive = ? WHERE id = ?`
          conn.query(sqlUpdate, [code, date, 'false', id], (err, ret) => {
            if (err) {
              console.log(err)
            }
            if (ret.affectedRows === undefined) {
              res.send({
                code: 0,
                message: '不存在的用户'
              })
            } else {
              res.send({
                code: 1,
                message: '请注意查收邮件'
              })
            }
          })
        }).catch(err => {
          console.log(err)
          res.send({
            code: 0,
            message: err
          })
        })
      }
    })
  } catch (e) {
    res.send({
      code: 0,
      message: '请稍后再试'
    })
  }
})
router.post('/sendVerifyCode', (req, res) => {
  try {
    let id = req.body.id
    let sqlName = `SELECT code, date FROM user WHERE id = ${id}`
    conn.query(sqlName, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result[0] === undefined) {
        res.send({
          code: 0,
          message: '发送验证码有误'
        })
      } else {
        console.log(result[0])
        console.log(req.body.code)
        console.log(req.body.date)
        if (req.body.code === result[0].code && req.body.date - result[0].date <= 300000) {
          let sqlUpdate = `UPDATE user SET isLive = ? WHERE id = ${id}`
          conn.query(sqlUpdate, ['true'], (err, updateRet) => {
            if (err) {
              console.log(err)
              res.send({
                code: 0,
                message: '修改验证码状态失败'
              })
            } else {
              res.send({
                code: 1,
                message: '验证通过'
              })
            }
          })
        } else if (req.body.date - result[0].date > 300000) {
          res.send({
            code: 0,
            message: '验证码过期'
          })
        } else {
          res.send({
            code: 0,
            message: '输入的验证码错误'
          })
        }
      }
    })
  } catch (e) {
    console.log(e)
    res.send({
      code: 0,
      message: '验证失败'
    })
  }
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
router.post('/getUserId', (req, res) => {
  // 获取用户信息
  var sqlName
  var params = req.body
  console.log(req.body)
  if (params.name) {
    sqlName = `select id from user where username ='${params.name}'`
  }
  try {
    conn.query(sqlName, params.name, function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result[0] === undefined) {
        res.send('-1')
      } else {
        jsonWrite(res, result[0])
      }
    })
  } catch (err) {
    console.log(err)
  }
})
// 更新用户信息
router.post('/updateUser', (req, res) => {
  try {
    var sqlUpdate = $sql.user.update_user
    var params = req.body
    console.log(params)
    if (params.id) {
      sqlUpdate += `email = '${params.email}'`
    }
    conn.query(sqlUpdate, params.id, function (err, result) {
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
  } catch (e) {
    res.send({
      code: 0,
      message: '更新失败了T^T'
    })
  }
})
router.post('/modifyPassword', (req, res) => {
  try {
    let sqlUpdate = `UPDATE user SET password = ?, repeatPass = ? WHERE id = ?`
    var params = req.body
    var id = params.id
    let sqlName = 'SELECT isLive, date FROM user WHERE id = ?'
    conn.query(sqlName, [id], (err, liveInfo) => {
      if (err) {
        console.log(err)
      }
      if (liveInfo[0] === undefined) {
        res.send({
          code: 0,
          message: '修改失败'
        })
      } else {
        if (liveInfo[0].isLive === 'true' && params.date - liveInfo[0].date <= 300000) {
          conn.query(sqlUpdate, [params.pass, params.pass, params.id], (err, result) => {
            if (err) {
              console.log(err)
            }
            if (result.affectedRows === undefined) {
              res.send({
                code: 0,
                message: '修改密码失败,请联系管理员'
              })
            } else {
              conn.query('UPDATE user SET isLive = ? WHERE  id = ?', ['false', params.id], (err, updateRet) => {
                if (err) {
                  console.log(err)
                }
              })
              res.send({
                code: 1,
                message: 'ok'
              })
            }
          })
        } else {
          res.send({
            code: 0,
            message: '验证过期'
          })
        }
      }
    })
  } catch (e) {
    res.send({
      code: 0,
      message: '修改密码失败'
    })
  }
})
module.exports = router
