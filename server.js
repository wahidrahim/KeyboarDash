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

  socket.on('disconnect', () => {
    players = players.filter((p) => {
      return p.id != socket.id
    })

    console.log(players)

    io.emit('updatePlayers', players)
  })
})
