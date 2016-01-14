var express = require('express');
var router = express.Router();
var Model = require('./../app/models/task');
var _ = require('lodash');

router.get('/tasks',function(req,res,next) {
  Model.find().exec(function(err,collection){
    if(err) {
      res.json({ error: "something went wrong" })
    } else {
      res.json(collection);
    }
  });
});

router.post('/tasks',function(req,res,next){
  var Task = new Model(req.body);
  Task.save(function(err,collection) {
    if(err){
      res.json({ error: "can't save it"});
    } else {
      res.json(collection);
    }
  });
});


router.put('/tasks',function(req,res,next) {
  Model.findOne({_id: req.body._id}).exec(function(err,collection) {
    if(err) {
      res.json({ error: "No task found"});
    } else {
      collection = _.extend(collection,req.body);
      collection.save(function(err,data) {
        res.json(data);
      });
    }
  });
});

router.delete('/tasks',function(req,res,next){
  Model.remove({_id: {$in: req.body.id } }).exec(function(err,collection) {
    if(err) {
      res.json({ error: "something went wrong" })
     } else {
      res.json({ message: 'Success' });
     }
  });
});

module.exports = router;
