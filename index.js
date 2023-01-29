const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
const { WSServer } = require('./utils/websocket');


const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}...`);
});

// When a client sends a request to connect via WebSocket,
// the App server receives the request to 'upgrade' to WebSocket protocol
server.on('upgrade', (request, socket, head) => {
  // WebSocket Server handles the upgrade event
  WSServer.handleUpgrade(request, socket, head, (ws) => {
    //WebSocket Server opens up a socket, triggers the 'connection' event
    WSServer.emit('connection', ws, request);
  });
});
