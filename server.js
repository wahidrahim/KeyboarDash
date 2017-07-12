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

io.on('connect', (socket) => {
  socket.on('disconnect', (socket) => {
  })

  socket.on('updatePlayer', (data) => {
    // Object.entries(data).map(([key, value]) => {
    //
    // })

    players.push(data)

    io.emit('updatePlayers', players)
  })
})
