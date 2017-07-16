const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const socket = require('socket.io')

// const api = require('./api')

const app = express()
const io = socket()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))

// app.use('/api/', api)

io.listen(app.listen(port, () => {
  console.log('listening on', port)
}))

let players = []
let messages = []

io.on('connect', (socket) => {
  const player = {
    id: socket.id,
    name: socket.id,
    color: 'red'
  }

  players.push(player)
  io.emit('updatePlayers', players)
  socket.broadcast.send({
    text: `${player.name} has joined`
  })
  socket.emit('updatePlayer', player)

  socket.on('message', (msg) => {
    io.send(msg)
    messages.push(msg)
  })

  socket.on('updatePlayer', (player) => {
    const i = players.findIndex((p) => {
      return p.id === player.id
    })

    io.send({
      text: `${players[i].name} changed name to ${player.name}`
    })

    players[i] = player
  })

  socket.on('disconnect', () => {
    const i = players.findIndex((p) => {
      return p.id === socket.id
    })

    io.send({
      text: `${players[i].name} has left`
    })

    players.splice(i, 1)

    io.emit('updatePlayers', players)
  })
})
