const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
const { initiateWebSocketServer } = require('./controllers/web-socket-server');

const server = http.createServer(app);
const wss = initiateWebSocketServer(server);

server.listen(config.PORT, config.HOST, () => {
  logger.info(`HTTP server listening on port ${config.PORT}...`);
});

wss.on('listening', () => {
  logger.info(`WebSocket server listening on port ${config.PORT}...`);
});
