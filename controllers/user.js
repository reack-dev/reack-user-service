const userRouter = require('express').Router();
const generateRandomString = require('../utils/generate-random-string');

userRouter.get('/generateURL', async (req, res, next) => {
  RANDOM_STRING_LENGTH = 10;
  newURL = generateRandomString(RANDOM_STRING_LENGTH);
});
