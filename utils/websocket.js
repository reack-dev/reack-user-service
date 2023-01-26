const ws = require('ws');
const logger = require('./logger')

// initialize a WebSocket Server that works on the same port with App server
const WSServer = new ws.WebSocketServer({ noServer: true });
const Sockets = {};

// When a client establishes a connection with WebSocket Server:
WSServer.on('connection', (socket, request) => {
  const url = request.headers.host; // define unique client identifier here
  Sockets[url] = socket; // store the socket with UCI
  logger.info('WebSocket connected with URL: ' + url)

  // removes socket from Sockets collection when client disconnects
  socket.on('close', () => {
    delete Sockets[url];
    logger.info('WebSocket client disconnected, delete ' + url);
  })
});

module.exports = { WSServer, Sockets };
