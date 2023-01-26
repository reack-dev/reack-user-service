require('express-async-errors');

const express = require('express');
const cors = require('cors');

const store = require('connect-loki');
const session = require('express-session');
const LokiStore = store(session);

const morgan = require('morgan');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const userRouter = require('./controllers/user');
const newRequestRouter = require('./controllers/new-request');

const app = express();

// app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('common'));

// Sessions
app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: 31 * 24 * 60 * 60 * 1000,
      path: '/',
      secure: false,
    },
    name: 'requestBin-session-id',
    resave: false,
    saveUninitialized: true,
    secret: config.SECRET,
    store: new LokiStore({}),
  })
);

// Routes go here
app.use(userRouter);
app.use(newRequestRouter);

app.use(middleware.unkownEndpoints);
app.use(middleware.errorHandler);

module.exports = app;
