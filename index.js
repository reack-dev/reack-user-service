const ws = require('ws');
const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
const { WSServer } = require('./utils/websocket');
// const initiateWebSocket = require('./controllers/web-socket');
// const wsListener = new ws.WebSocketServer({ noServer: true });

// const server = http.createServer(app);
// initiateWebSocket(server);

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}...`);
});

server.on('upgrade', (request, socket, head) => {
  WSServer.handleUpgrade(request, socket, head, (ws) => {
    WSServer.emit('connection', ws, request);
  });
});
