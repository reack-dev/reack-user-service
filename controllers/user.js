const userRouter = require('express').Router();

const Persistence = require('./persistence');
const db = new Persistence();

const funcHelpers = require('../utils/func-helpers');

userRouter.get('/generateURL', async (req, res, next) => {
  const RANDOM_STRING_LENGTH = 10;
  const randomString = funcHelpers.generateRandomString(RANDOM_STRING_LENGTH);

  const storedNewURL = await db.insertNewURL(randomString);

  if (!storedNewURL) {
    res.set({ 'Retry-After': 120 });
    res
      .status(503)
      .json({ error: 'Could not generate new URL. Try again later.' });
    return;
  }

  res.status(201).json({ randomString, requests: [] });
});

module.exports = userRouter;
