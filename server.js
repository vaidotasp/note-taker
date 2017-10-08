require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const jsonParser = require('body-parser').json
const bodyParser = require('body-parser')
app.locals.moment = require('moment')

const mongoose = require('mongoose')
const mongoDB = process.env.MLAB
mongoose.Promise = global.Promise
let dbconnection = mongoose
  .connect(mongoDB, { useMongoClient: true })
  .then(db => console.log('Success: Connection to DB is made'))
  .catch(err => console.error(err))

app.set('view engine', 'pug')
app.use(jsonParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

//404 handler is not an error handler, it is the last route
app.use(function(req, res, next) {
  res.status(404).send('Page Not Found')
})

//default error handler. We need to pass err to next() => next(err) for this to trigger
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.json({ error: err.message })
})

app.listen(3000 || process.env.PORT)
