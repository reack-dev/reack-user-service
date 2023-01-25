const Client = require('pg').Client;

function logQuery(statement, parameters) {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
}

async function dbQuery(statement, ...parameters) {
  let client = new Client({ database: DATABASE_NAME });

  await client.connect();
  logQuery(statement, parameters);
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
}

module.exports = dbQuery;
