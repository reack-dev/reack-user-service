const http = require('http');

const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
// const initiateWebSocket = require('./controllers/web-socket');

const server = http.createServer(app);
// initiateWebSocket(server);

server.listen(config.PORT, config.HOST, () => {
  logger.info(`Server running on port ${config.PORT}...`);
});
