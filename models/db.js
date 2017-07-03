const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/scores'

mongoose.connect(dbURI)

let scoreSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  speed: { type: Number, required: true },
  time: { type: Number, required: true },
  text: { type: String, required: true },
  source: { type: String },
  date: { type: Number, default: new Date().getTime() }
});

mongoose.model('Score', scoreSchema)
