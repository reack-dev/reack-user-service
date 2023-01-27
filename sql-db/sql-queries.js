module.exports = {
  INSERT_NEW_URL: `INSERT INTO url (random_url_string) VALUES ($1)`,
  SELECT_REQUESTS: `SELECT no_sql_id FROM request WHERE url_id = $1 ORDER BY ts DESC`,
  SELECT_URL_ID: `SELECT id FROM url WHERE random_url_string = $1`
};
