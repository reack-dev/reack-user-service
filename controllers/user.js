const userRouter = require('express').Router();
const RequestModel = require('../models/request');
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

userRouter.get("/display/:url", async (req, res) => {
  const url = req.params.url;

  // fetch url id associated with url
  const { id: urlId } = await db.getUrlIdForUrl(url);

  // fetch all requests (no_sql_ids) associated with url
  const requests = await db.getRequestsForUrlId(urlId);
  const json = {
    randomString: url,
    requests: [],
  };

  // for each request, get rawObject from mongoDB
  for (let req of requests) {
    const requestObject = await RequestModel.findById(req.no_sql_id); 
    json.requests.push(requestObject); 
  }

  console.log("line 46", json);
  res.send(json);
});

module.exports = userRouter;
