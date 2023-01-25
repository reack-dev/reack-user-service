const dbQuery = require('../sql-db/db-query');
const SQL = require('../sql-db/sql-queries');

class Persistence {
  constructor() {}

  async insertNewURL(randomString) {
    result = await dbQuery(SQL.INSERT_NEW_URL, randomString);
  }
}
