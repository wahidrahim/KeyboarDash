const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const socket = require('socket.io')

const api = require('./api')

const app = express()
const io = socket()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))

app.use('/api/', api)

io.listen(app.listen(port, () => {
  console.log('listening on', port)
}))

let players = []
let messages = []

io.on('connect', (socket) => {
  socket.emit('id', socket.id)

  socket.on('disconnect', (socket) => {
    players = players.filter((player) => {
      player.id != socket.id
    })

    io.emit('updatePlayers', players)
  })

  socket.on('newPlayer', (data) => {
    // const player = {
    //   ...data,
    //   id: socket.id
    // }

    const player = data
    player.id = socket.id

    players.push(player)

    io.emit('updatePlayers', players)
  })

  socket.on('sendMessage', (message) => {
    messages.push(message)
    // io.emit('newMessage', message)
    io.emit('updateMessages', messages)
  })
})
