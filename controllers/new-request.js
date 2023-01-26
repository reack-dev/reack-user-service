const newRequestRouter = require('express').Router();

const { Client } = require('../utils/client');

newRequestRouter.post('/newRequest', async (req, res) => {
  const body = req.body;
  const client = Client.getClient(body.randomString);

  if (!client) {
    res.status(404).send({
      error:
        'The provided random string does not match to any currently open connections.',
    });
    return;
  }

  client.processMsg({ action: 'forward-to-client' }, body);
  res.status(200).send({ message: 'Forwarding to front-end' });
});

module.exports = newRequestRouter;
