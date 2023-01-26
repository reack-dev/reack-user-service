const ws = require('ws');
const logger = require('./logger')

const WSServer = new ws.WebSocketServer({ noServer: true });
const Sockets = {};

WSServer.on('connection', (socket, request) => {
  const url = request.headers.host;
  Sockets[url] = socket;
  logger.info('WebSocket connected with URL: ' + url)

  socket.on('close', () => {
    delete Sockets[url];
    logger.info('WebSocket client disconnected, delete ' + url);
  })
});

module.exports = { WSServer, Sockets };
