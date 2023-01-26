const dbQuery = require('../sql-db/db-query');
const SQL = require('../sql-db/sql-queries');

class Persistence {
  constructor() {}

  async insertNewURL(randomString) {
    const result = await dbQuery(SQL.INSERT_NEW_URL, randomString);
    return result.rowCount === 1;
  }

  async getUrlIdForUrl(url) {
    let result = await dbQuery(SQL.SELECT_URL_ID, url);

    return result.rows[0];
  }

  async getRequestsForUrlId(urlId) {
    let result = await dbQuery(SQL.SELECT_REQUESTS, urlId);

    return result.rows;
  }
}

module.exports = Persistence;
