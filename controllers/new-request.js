const newRequestRouter = require('express').Router();
const { Sockets } = require('../utils/websocket');

// We need to send this through the web socket
newRequestRouter.post('/newRequest', async (req, res, next) => {
  const randomString = req.body.randomString

  if (Sockets && Sockets[randomString]) { // look for current active WebSocket connections
    Sockets[randomString].send(JSON.stringify(req.body.requests));
    res.status(200).send({ message: 'Forwarded to front-end' });
  } else { // no matching connection found
    res.status(400).send({ message: 'Client not connected with WebSocket or not found, payload not forwarded'})
  }
});

module.exports = newRequestRouter;
