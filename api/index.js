var express = require('express');
var router = express.Router();
require('../models/db')

const mongoose = require('mongoose')
let scores = mongoose.model('Score')

router.get('/scores', function(req, res, next) {
  scores.find({}, (err, scores) => {
    if (err) return res.send('err')

    res.json(scores)
  })
});


router.post('/scores', function(req, res, next) {
  let score = {
    name: req.body.name,
    speed: req.body.speed,
    time: req.body.time,
    text: req.body.text,
    source: req.body.source,
    date: req.body.date
  }

  console.log(score)
  scores.create(score, (err, score) => {
    if (err) {
      return res.send('err')
    }

    console.log(score)
    res.send(score)
  })


});

module.exports = router;
