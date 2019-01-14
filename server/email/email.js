// Usage::Nodemailer https: //nodemailer.com/usage/
var nodemailer = require('nodemailer')
// var smtpTransport = require('nodemail-smtp-transport')
var config = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'fairy_bq@163.com',
    pass: 'ybj9643'
  }
}

var transporter = nodemailer.createTransport(config)

module.exports = function (mail) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, function (err, info) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(info)
        resolve(info)
      }
    })
  })
}
