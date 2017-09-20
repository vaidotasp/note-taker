require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.MLAB
mongoose.Promise = global.Promise

beforeEach(function(done) {
  mongoose.connection.collections.cards.drop(function() {
    done()
  })
})

before(function(done) {
  let dbconnection = mongoose.connect(uri, {useMongoClient: true})
  .then((db) => console.log('Successful connection to the DB'))
  .catch((err) => console.error(err))
  done()
})

