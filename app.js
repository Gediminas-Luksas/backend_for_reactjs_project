const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const config = require('./config/db');

const teamRouts = require('./api/routers/teams');
const newsRouts = require('./api/routers/news');
const userRouts = require('./api/routers/user');
const rulesRouts = require('./api/routers/rules');

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log('Database is connected on MongoDB');
    },
    err => {
      console.log('Can not connect to the database' + err);
    },
  );

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Accsess-Control-Allow-Origin', '*');
  res.header(
    'Accsess-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Accsess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/teams', teamRouts);
app.use('/news', newsRouts);
app.use('/user', userRouts);
app.use('/rules', rulesRouts);

app.use((req, res, next) => {
  const error = new Error('Not Found...');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
