const mongoose = require('mongoose')
const mongoDB = process.env.MLAB
mongoose.Promise = global.Promise

beforeEach(function(done) {
  mongoose.connection.collections.notes.drop(function() {
    done()
  })
})

before(function(done) {
  mongoose.connect(process.env.MLAB, {
    useMongoClient: true
  })
  mongoose.connection
    .once('open', function() {
      console.log('Connection is made')
      done()
    })
    .on('error', function(err) {
      console.log('Connection error: ', err)
    })
})
