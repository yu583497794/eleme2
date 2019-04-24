const server = require('http').createServer()
// var express = require('express')
// var router = express.Router()
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log(socket.id)
  io.emit('welcome', {
    msg: `welcome ${socket.id}~`,
    id: -1
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      msg,
      id: socket.id
    })
  })
})

// const app = express().use('chatRoom', router)
// app.listen(3010, () => {
//   console.log('Listening at 3010')
// })
server.listen(3010)
