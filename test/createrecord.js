const Card = require('../models/cardInstance')
const assert = require('chai').assert

describe('Creates a record in the DB', function(){
  let newRecord
  
  beforeEach(function(done){
    newRecord = new Card({
      title: 'My new note',
      body: 'Some lorem ipsum text'
    })
    newRecord.save().then(function(){
      done()
    })
  })
  
  it('Record is created and found in the DB', function(done){
    Card.findOne({ title: 'My new note' }).then(function(result){
      //some assertion goes here
      assert(result.title === 'My new note')
      done()
    })
  })
  
  it('Finds record and edits it with new information', function(done){
    //write test here
    Card.findOne({ title: 'My new note' }).then(function(result) {
      result.body = 'Edited body'
      result.save(function (err, updatedCard) {
        if (err) throw err
        assert(result.body === updatedCard.body)
        done()
      })
     })
    })

  it ('Finds record and deletes it', function(done){
  //   //write test here
  Card.remove({ title: 'My new note' }, function(err){
    if (err) throw err
    Card.findOne({ title: 'My new note' }).then(function(result) {
      assert(result === null)
      done()
    })
  })
  })

})