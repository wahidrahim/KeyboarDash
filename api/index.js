const axios = require('axios')
const express = require('express')
const router = express.Router()

require('dotenv').config()

const mongoose = require('mongoose');
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
}

const mongodbUri = `mongodb://${process.env.DB_USRNM}:${process.env.DB_PSWRD}@ds147882.mlab.com:47882/whispering-liatris`

mongoose.connect(mongodbUri, options)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  // Wait for the database connection to establish, then start the app.
})

const scoreSchema = mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  speed: Number,
  time: Number,
  text: String,
  source: String,
  date: { type: Number, default: new Date().getTime() }
})

const Score = mongoose.model('Score', scoreSchema)

router.get('/scores', (req, res) => {
  // TODO refactor
  let sortBy = '-date'

  if (req.query.by === 'speed') {
    sortBy = '-speed'
  } else if (req.query.by === 'name') {
    sortBy = 'name -date'
  }

  Score.find({})
  .sort(sortBy)
  .exec((err, scores) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(scores)
  })
})

router.post('/score', (req, res) => {
  Score.create(req.body, (err, score) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200).end()
  })
})

router.get('/randomQuote', (req, res) => {
  const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

  axios.get(url)
  .then((response) => {
    res.json(response.data)
  })
  .catch((err) => {
    res.send(err)
  })
})

module.exports = router
