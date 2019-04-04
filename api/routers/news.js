const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// auth 
const auth = require('../middleware/auth');

const News = require('../models/news');

router.get('/',  (req, res, next) => {
  News.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res, next) => {
  const today = new Date();
  const news = new News({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    texts: req.body.texts,
    created: today,
  });
  news
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST request to /teams',
        news: result,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:newsId', (req, res, next) => {
  const id = req.params.teamId;
  News.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No valid ID...' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:newsId', (req, res, next) => {
  const id = req.params.newsId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  News.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:newsId', (req, res, next) => {
  const id = req.params.teamId;
  News.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
