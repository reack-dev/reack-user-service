const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');

const { Client } = require('../utils/client');

function initiateWebSocketServer(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    const id = uuidv4();
    const client = new Client(id, ws);

    ws.on('message', async (message) => {
      const msg = JSON.parse(message);
      client.processMsg(msg);
    });

    ws.on('close', () => {
      // when a connection is closed, we could go in the database (i.e., SQL & NoSQL) and delete all records associated with this connection
      // we can do this because we know the urls associated with this client
    });

    ws.on('error', () => {
      // What do we want to do if the connection closes due to an error?
    });
  });

  return wss;
}

module.exports = {
  initiateWebSocketServer,
};
