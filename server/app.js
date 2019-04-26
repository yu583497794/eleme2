// Express服务器入口文件
const userApi = require('./api/userApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/log-api/user', userApi)
app.use(express.static('../dist') )
app.listen(3006)
console.log('success listen at port: 3006')
