const server = require('http').createServer()
// var express = require('express')
// var router = express.Router()
const io = require('socket.io')(server)
let participators = []
function addParticipator (user) {
  removeParticipator(user.id)
  participators.push(user)
}
function removeParticipator (id) {
  participators = participators.filter(part => part.id !== id)
}
io.on('connection', (socket) => {
  io.emit('welcome', {
    msg: `welcome ${socket.id}~`,
    id: -1
  })
  socket.emit('reqUser')
  socket.on('resUser', (user) => {
    addParticipator(user)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', Object.assign(msg, {
      id: socket.id
    }))
  })
  socket.on('disconnect', () => {
    removeParticipator(socket.id)
    io.emit('leave', {
      msg: `${socket.id} leaved, bye~`,
      id: -1
    })
  })
  socket.on('reqAllPart', ([offset, num]) => {
    socket.emit('resAllPart', {
      // participators: participators.slice(offset, offset + num),
      participators,
      total: participators.length
    })
  })
})

// const app = express().use('chatRoom', router)
// app.listen(3010, () => {
//   console.log('Listening at 3010')
// })
server.listen(3010)
