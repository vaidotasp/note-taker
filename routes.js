const express = require('express')
const router = express.Router()
const Card = require('./models/cardInstance')
const moment = require('moment')

router.get('/', function(req, res, next) {
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
  let title = req.body.title
  let body = req.body.body
  let newCard = new Card({
    title: title,
    body: body
  })
  //save the card into the collection
  newCard.save(function(err, card) {
    if (err) return next(err)
    res.status(201)
    //find all cards and display
    Card.find({})
      .sort({ updatedAt: -1 })
      .exec(function(err, cards) {
        if (err) return next(err)
        res.render('index', {
          cards: cards
        })
      })
  })
})

router.put('/card/:id', function(req, res, next) {
  let updates = {
    title: req.body.title,
    body: req.body.body,
    updatedAt: new Date() //FIXME: this can be implemented in Schema by using methods => need to figure out how later
  }
  Card.findOneAndUpdate(
    { _id: req.params.id },
    updates,
    {
      upsert: true,
      new: true
    },
    function(err, doc) {
      if (err) return next(err)
      let formattedUpdateTime = moment(doc.updatedAt).format('DD.MM.YY')
      res.json(formattedUpdateTime)
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
