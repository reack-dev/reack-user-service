const Client = require('pg').Client;

const config = require('../utils/config');
const logger = require('../utils/logger');

function logQuery(statement, parameters) {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  logger.info(formattedTimeStamp, statement, parameters);
}

async function dbQuery(statement, ...parameters) {

  const CONNECTION = {
    password: 'max',
    port: 5432,
    user: 'max',
    database: config.SQL_DB_NAME,
    host: 'localhost',
  };

  let client = new Client(CONNECTION);

  await client.connect();
  logQuery(statement, parameters);
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
}

module.exports = dbQuery;
