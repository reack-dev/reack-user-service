const userRouter = require('express').Router();

const db = require('./persistence');

const generateRandomString = require('../utils/generate-random-string');

userRouter.get('/generateURL', async (req, res, next) => {
  RANDOM_STRING_LENGTH = 10;
  randomString = generateRandomString(RANDOM_STRING_LENGTH);

  storedNewURL = await db.insertNewURL(randomString);
});
