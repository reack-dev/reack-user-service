require('express-async-errors');

const express = require('express');
const cors = require('cors');

const store = require('connect-loki');
const session = require('express-session');
const LokiStore = store(session);

const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.static());
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
    secret: config.secret,
    store: new LokiStore({}),
  })
);

// Routes go here

// Maybe another middleware to handle unkownEndpoints
app.use(middleware.unkownEndpoints);
app.use(middleware.errorHandler);

module.exports = app;
