const express = require('express')
const app = express()

//purely for connection testing - will remove 
const mongoose = require('mongoose')
const mongoDB = process.env.MLAB
mongoose.Promise = global.Promise; 

app.use(express.static('public'))

app.get('/', function(request, response) {
  //lets test the connection here
  response.sendFile(__dirname + '/views/index.html')
})

app.listen(3000 || process.env.PORT)

let dbconnection = mongoose.connect(mongoDB, {useMongoClient: true})
.then((db) => console.log('Success'))
.catch((err) => console.error(err))
