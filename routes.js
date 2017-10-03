/*
TODO: 
*/
const express = require('express')
const router = express.Router()
const Card = require('./models/cardInstance')

router.get('/', function(req, res, next) {
  //res.sendFile(__dirname + '/views/index.html')
  Card.find({})
    .sort({ updatedAt: -1 })
    .exec(function(err, cards) {
      if (err) return next(err)
      //res.json(cards)
      res.render('index', {
        cards: cards
      })
    })
})

router.post('/newcard', function(req, res, next) {
  //grab value from the new card fields {mock for now}
  let title = 'My New Card'
  let body =
    'This is my cards body, which contains my best thoughts on the matter, thanks so much'
  //create a card instance from those fields
  let newCard = new Card({
    title: title,
    body: body
  })
  //save the card into the collection
  newCard.save(function(err, card) {
    if (err) return next(err)
    res.status(201)
    res.json(card)
  })
})

router.put('/card/:id', function(req, res, next) {
  let updates = {
    title: req.body.title,
    body: req.body.body,
    updatedAt: new Date() //FIXME: this can be implemented in Schema by using methonds => need to figure out how later
  }
  Card.findOneAndUpdate(
    { _id: req.params.id },
    updates,
    { upsert: true },
    function(err, doc) {
      if (err) return next(err)
      res.json(doc)
    }
  )
})

router.delete('/card/:id', function(req, res, next) {
  Card.findByIdAndRemove(req.params.id, function(err, success) {
    if (err) return next(err)
    res.status(200).send(success) //FIXME:sending back the reference to the client, might not need this?
  })
})

module.exports = router
