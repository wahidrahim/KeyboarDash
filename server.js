const cors = require('cors')
const firebase = require('firebase')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static(__dirname))

firebase.initializeApp({
  databaseURL: 'https://spidersunflower.firebaseio.com',
});

const scoresRef = firebase.database().ref('scores')

app.get('/api/scores', (req, res, next) => {
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

app.listen(port, () => {
  console.log('listening on', port)
})
