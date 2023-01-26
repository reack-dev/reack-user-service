const dbQuery = require('../sql-db/db-query');
const SQL = require('../sql-db/sql-queries');

class Persistence {
  constructor() {}

  async insertNewURL(randomString) {
    const result = await dbQuery(SQL.INSERT_NEW_URL, randomString);
    return result.rowCount === 1;
  }
}

module.exports = Persistence;
