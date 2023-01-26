require('express-async-errors');

// For sessions if required
// const store = require('connect-loki');
// const session = require('express-session');
// const LokiStore = store(session);
// app.use(
//   session({
//     cookie: {
//       httpOnly: true,
//       maxAge: 31 * 24 * 60 * 60 * 1000,
//       path: '/',
//       secure: false,
//     },
//     name: 'requestBin-session-id',
//     resave: false,
//     saveUninitialized: true,
//     secret: config.SECRET,
//     store: new LokiStore({}),
//   })
// );

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const newRequestRouter = require('./controllers/new-request');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(express.static('build'));
app.use(express.json());

// Routes go here
app.use(newRequestRouter);
app.use(middleware.unkownEndpoints);
app.use(middleware.errorHandler);

module.exports = app;
