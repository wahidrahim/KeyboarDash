const cors = require('cors')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const axios = require('axios')
const express = require('express')
const socket = require('socket.io')

const app = express()
const io = socket()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))


firebase.initializeApp({
  databaseURL: 'https://spidersunflower.firebaseio.com',
});

const scoresRef = firebase.database().ref('scores')

app.get('/api/scores', (req, res) => {
  const orderBy = req.query.by || 'date'
  let scores = []

  scoresRef.orderByChild(orderBy).on('child_added', (snapshot) => {
    if (req.query.by === 'date' || req.query.by === 'speed') {
      scores.unshift(snapshot.val())
    } else {
      scores.push(snapshot.val())
    }
  })

  setTimeout(() => res.json(scores), 100)
})

app.post('/api/score', (req, res) => {
  scoresRef.push(req.body, (err, score) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(score)
  })
})

app.get('/api/randomQuote', (req, res) => {
    // const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getquote&format=json&lang=en'
    const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    axios.get(url)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.send(err)
    })
})

io.listen(app.listen(port, () => {
  console.log('listening on', port)
}))

let playersCount = 0

io.on('connect', (socket) => {
  playersCount++
  io.emit('updatePlayersCount', playersCount)

  socket.on('disconnect', (socket) => {
    playersCount--
    io.emit('updatePlayersCount', playersCount)
  })
})
