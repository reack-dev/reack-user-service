const newRequestRouter = require('express').Router();

// We need to send this through the web socket
newRequestRouter.post('/newRequest', async (req, res, next) => {
  body = req.body;
  console.log(body);
  res.status(200).send({ message: 'Forwarding to front-end' });
});

module.exports = newRequestRouter;
