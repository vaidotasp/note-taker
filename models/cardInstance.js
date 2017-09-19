const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  title: String,
  body: String,
  time: { type: Date, default: Date.now }
})

const Card = mongoose.model('card', CardSchema)

module.exports = Card
